/**
 * AudioPlayer Component for Epic Timeline
 * Advanced audio player with full playback controls, progress tracking, and queue management
 * P2 Integration: Comprehensive audio experience for songs
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
  Dimensions,
  AppState,
  AppStateStatus,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio, AVPlaybackStatus, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { Song } from './SongList';

export interface AudioPlayerProps {
  currentSong?: Song | null;
  playlist?: Song[];
  isVisible?: boolean;
  onSongChange?: (song: Song) => void;
  onClose?: () => void;
  style?: any;
}

export interface PlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  duration: number;
  position: number;
  progress: number;
  volume: number;
  isShuffled: boolean;
  repeatMode: 'off' | 'one' | 'all';
  currentIndex: number;
  error: string | null;
  isBuffering: boolean;
  loadingProgress: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentSong,
  playlist = [],
  isVisible = false,
  onSongChange,
  onClose,
  style,
}) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    isLoading: false,
    duration: 0,
    position: 0,
    progress: 0,
    volume: 1.0,
    isShuffled: false,
    repeatMode: 'off',
    currentIndex: 0,
    error: null,
    isBuffering: false,
    loadingProgress: 0,
  });

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubPosition, setScrubPosition] = useState(0);
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const screenWidth = Dimensions.get('window').width;

  // Initialize audio with background support
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        // Configure audio for background playback
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        });
        console.log('Audio mode configured for background playback');
      } catch (error) {
        console.error('Failed to configure audio mode:', error);
      }
    };

    initializeAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Handle app state changes for background playback
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      console.log('App state changed:', appState, '->', nextAppState);
      
      if (appState === 'active' && nextAppState === 'background') {
        // App going to background - ensure audio continues
        console.log('App backgrounded, maintaining audio playback');
      } else if (appState === 'background' && nextAppState === 'active') {
        // App coming back to foreground
        console.log('App foregrounded, resuming UI updates');
        // Refresh player state when coming back from background
        if (sound) {
          sound.getStatusAsync().then((status) => {
            if (status.isLoaded) {
              const progress = status.durationMillis 
                ? (status.positionMillis / status.durationMillis) * 100 
                : 0;
              
              setPlayerState(prev => ({
                ...prev,
                isPlaying: status.isPlaying || false,
                position: status.positionMillis || 0,
                duration: status.durationMillis || 0,
                progress,
              }));
            }
          });
        }
      }
      
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, [appState, sound]);

  // Animate visibility
  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  // Load and play song
  const loadSong = async (song: Song) => {
    try {
      setPlayerState(prev => ({ 
        ...prev, 
        isLoading: true, 
        error: null, 
        isBuffering: true,
        loadingProgress: 0
      }));

      // Unload previous sound
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      // Simulate loading progress for demo
      const progressInterval = setInterval(() => {
        setPlayerState(prev => {
          const newProgress = Math.min(prev.loadingProgress + 10, 90);
          return { ...prev, loadingProgress: newProgress };
        });
      }, 100);

      // For demo purposes, we'll use a placeholder audio URL
      // In production, you'd use song.audioUrl
      const audioUri = song.audioUrl || 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { 
          shouldPlay: false,
          volume: playerState.volume,
          isLooping: playerState.repeatMode === 'one',
          // Enhanced configuration for background playback
          progressUpdateIntervalMillis: 1000,
          positionMillis: 0,
        }
      );

      clearInterval(progressInterval);
      setSound(newSound);
      
      if (status.isLoaded) {
        setPlayerState(prev => ({
          ...prev,
          duration: status.durationMillis || 0,
          isLoading: false,
          isBuffering: false,
          loadingProgress: 100,
          error: null,
        }));

        // Set up status updates
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        
        // Set up Now Playing info for background audio
        await setupNowPlayingInfo(song);
      } else {
        throw new Error('Failed to load audio file');
      }
    } catch (error) {
      console.error('Error loading song:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      setPlayerState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isBuffering: false,
        error: `Failed to load "${song.title}": ${errorMessage}`,
        loadingProgress: 0,
      }));
      
      // Show user-friendly error message
      Alert.alert(
        'Playback Error', 
        `Could not load "${song.title}". Please check your internet connection and try again.`,
        [
          { text: 'OK', onPress: () => setPlayerState(prev => ({ ...prev, error: null })) },
          { text: 'Retry', onPress: () => loadSong(song) }
        ]
      );
    }
  };

  // Set up Now Playing info for background audio
  const setupNowPlayingInfo = async (song: Song) => {
    try {
      // Note: In a real app, you'd use react-native-track-player or similar
      // for full Now Playing and lock screen controls
      console.log(`Setting up Now Playing info for: ${song.title}`);
      
      // For now, we'll just log the info
      // In production, you'd integrate with:
      // - iOS: Now Playing Info Center (MPNowPlayingInfoCenter)
      // - Android: MediaSession API
      const nowPlayingInfo = {
        title: song.title,
        artist: song.saga.title,
        album: 'Epic Timeline',
        duration: playerState.duration / 1000, // Convert to seconds
        elapsed: playerState.position / 1000,
        perspective: song.perspective,
      };
      
      console.log('Now Playing Info:', nowPlayingInfo);
    } catch (error) {
      console.error('Failed to set up Now Playing info:', error);
    }
  };

  // Playback status update handler
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      const progress = status.durationMillis 
        ? (status.positionMillis / status.durationMillis) * 100 
        : 0;

      setPlayerState(prev => ({
        ...prev,
        isPlaying: status.isPlaying || false,
        position: status.positionMillis || 0,
        duration: status.durationMillis || 0,
        progress,
        isBuffering: false, // Audio is loaded and ready
        error: null, // Clear any previous errors
      }));

      // Animate progress bar
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 100,
        useNativeDriver: false,
      }).start();

      // Handle song end
      if (status.didJustFinish) {
        handleNext();
      }
    } else if (status.error) {
      console.error('Playback status error:', status.error);
      setPlayerState(prev => ({
        ...prev,
        error: `Playback error: ${status.error}`,
        isPlaying: false,
        isBuffering: false,
      }));
    }
  };

  // Load song when currentSong changes
  useEffect(() => {
    if (currentSong) {
      const songIndex = playlist.findIndex(song => song.id === currentSong.id);
      setPlayerState(prev => ({ ...prev, currentIndex: songIndex >= 0 ? songIndex : 0 }));
      loadSong(currentSong);
    }
  }, [currentSong]);

  // Play/Pause functionality
  const handlePlayPause = async () => {
    if (!sound) return;

    try {
      setPlayerState(prev => ({ ...prev, isBuffering: true }));
      
      if (playerState.isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      
      setPlayerState(prev => ({ ...prev, isBuffering: false, error: null }));
      
      // Update Now Playing info when playback state changes
      if (currentSong) {
        await setupNowPlayingInfo(currentSong);
      }
    } catch (error) {
      console.error('Playback error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Playback failed';
      
      setPlayerState(prev => ({ 
        ...prev, 
        isBuffering: false,
        error: `Playback error: ${errorMessage}`,
        isPlaying: false
      }));
      
      Alert.alert(
        'Playback Error',
        'There was an issue with playback. Please try again.',
        [
          { text: 'OK', onPress: () => setPlayerState(prev => ({ ...prev, error: null })) }
        ]
      );
    }
  };

  // Next song
  const handleNext = () => {
    if (playlist.length === 0) return;

    let nextIndex = playerState.currentIndex + 1;
    
    if (playerState.repeatMode === 'all' && nextIndex >= playlist.length) {
      nextIndex = 0;
    } else if (nextIndex >= playlist.length) {
      return; // Stop at end if not repeating
    }

    const nextSong = playlist[nextIndex];
    if (nextSong && onSongChange) {
      onSongChange(nextSong);
    }
  };

  // Previous song
  const handlePrevious = () => {
    if (playlist.length === 0) return;

    let prevIndex = playerState.currentIndex - 1;
    
    if (prevIndex < 0) {
      prevIndex = playerState.repeatMode === 'all' ? playlist.length - 1 : 0;
    }

    const prevSong = playlist[prevIndex];
    if (prevSong && onSongChange) {
      onSongChange(prevSong);
    }
  };

  // Seek to position - Enhanced with scrubbing preview
  const handleSeek = async (value: number) => {
    if (!sound || !playerState.duration) return;

    const position = (value / 100) * playerState.duration;
    try {
      setPlayerState(prev => ({ ...prev, isBuffering: true }));
      await sound.setPositionAsync(position);
      setPlayerState(prev => ({ ...prev, isBuffering: false, error: null }));
    } catch (error) {
      console.error('Seek error:', error);
      setPlayerState(prev => ({ 
        ...prev, 
        isBuffering: false,
        error: 'Failed to seek to position'
      }));
    }
  };

  // Enhanced scrubbing with preview
  const handleScrubStart = () => {
    setIsScrubbing(true);
  };

  const handleScrubChange = (value: number) => {
    if (isScrubbing) {
      setScrubPosition(value);
      // Don't update actual player state during scrubbing - just preview position
    }
  };

  const handleScrubEnd = async (value: number) => {
    setIsScrubbing(false);
    setScrubPosition(0);
    
    // Actually seek to the position
    await handleSeek(value);
  };

  // Get the current progress value for display
  const getCurrentProgress = () => {
    return isScrubbing ? scrubPosition : playerState.progress;
  };

  // Get the current position for time display
  const getCurrentPosition = () => {
    if (isScrubbing) {
      return (scrubPosition / 100) * playerState.duration;
    }
    return playerState.position;
  };

  // Volume control
  const handleVolumeChange = async (volume: number) => {
    if (!sound) return;

    try {
      await sound.setVolumeAsync(volume);
      setPlayerState(prev => ({ ...prev, volume, error: null }));
    } catch (error) {
      console.error('Volume error:', error);
      setPlayerState(prev => ({ 
        ...prev, 
        error: 'Failed to adjust volume'
      }));
    }
  };

  // Toggle repeat mode
  const toggleRepeat = () => {
    const modes: Array<'off' | 'one' | 'all'> = ['off', 'one', 'all'];
    const currentIndex = modes.indexOf(playerState.repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    
    setPlayerState(prev => ({ ...prev, repeatMode: nextMode }));
    
    if (sound) {
      sound.setIsLoopingAsync(nextMode === 'one');
    }
  };

  // Format time
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get repeat icon
  const getRepeatIcon = () => {
    switch (playerState.repeatMode) {
      case 'one': return '🔂';
      case 'all': return '🔁';
      default: return '🔁';
    }
  };

  // Enhanced close handler with background audio warning
  const handleCloseWithBackgroundInfo = () => {
    if (playerState.isPlaying && onClose) {
      Alert.alert(
        'Background Audio',
        'Music will continue playing in the background. You can control playback from the notification panel or by reopening the app.',
        [
          { text: 'Continue Playing', onPress: () => onClose() },
          { 
            text: 'Stop & Close', 
            onPress: async () => {
              if (sound) {
                await sound.pauseAsync();
              }
              onClose();
            },
            style: 'destructive'
          }
        ]
      );
    } else if (onClose) {
      onClose();
    }
  };

  if (!isVisible || !currentSong) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 0],
              }),
            },
          ],
          opacity: fadeAnim,
        },
        style,
      ]}
    >
      {/* Compact Player */}
      {!isExpanded && (
        <TouchableOpacity
          style={styles.compactPlayer}
          onPress={() => setIsExpanded(true)}
          activeOpacity={0.8}
        >
          <View style={styles.songInfo}>
            <Text style={styles.compactTitle} numberOfLines={1}>
              {currentSong.title}
            </Text>
            <Text style={styles.compactArtist} numberOfLines={1}>
              {currentSong.saga.title} • {currentSong.perspective || 'Epic Timeline'}
            </Text>
          </View>

          <View style={styles.compactControls}>
            <TouchableOpacity 
              onPress={handlePlayPause} 
              style={[
                styles.compactPlayButton,
                (playerState.isLoading || playerState.error) && styles.playButtonDisabled
              ]}
              disabled={playerState.isLoading || playerState.error !== null}
            >
              <Text style={styles.compactPlayIcon}>
                {playerState.isLoading ? '⏳' : 
                 playerState.isBuffering ? '⏰' :
                 playerState.error ? '⚠️' :
                 playerState.isPlaying ? '⏸️' : '▶️'}
              </Text>
            </TouchableOpacity>
            {onClose && (
              <TouchableOpacity onPress={handleCloseWithBackgroundInfo} style={styles.compactCloseButton}>
                <Text style={styles.compactCloseIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Progress bar */}
          <View style={styles.compactProgress}>
            <Animated.View
              style={[
                styles.compactProgressBar,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                    extrapolate: 'clamp',
                  }),
                },
              ]}
            />
          </View>
        </TouchableOpacity>
      )}

      {/* Expanded Player */}
      {isExpanded && (
        <View style={styles.expandedPlayer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setIsExpanded(false)}>
              <Text style={styles.collapseIcon}>▼</Text>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Now Playing</Text>
              {appState === 'background' && playerState.isPlaying && (
                <Text style={styles.backgroundIndicator}>🎵 Background</Text>
              )}
            </View>
            {onClose && (
              <TouchableOpacity onPress={handleCloseWithBackgroundInfo}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Song Info */}
          <View style={styles.songDetails}>
            <Text style={styles.songTitle}>{currentSong.title}</Text>
            <Text style={styles.songArtist}>{currentSong.saga.title}</Text>
            {currentSong.perspective && (
              <Text style={styles.songPerspective}>{currentSong.perspective}</Text>
            )}
            
            {/* Theme chips */}
            {currentSong.themes && currentSong.themes.length > 0 && (
              <View style={styles.themesContainer}>
                {currentSong.themes.slice(0, 4).map((theme, index) => (
                  <View key={index} style={styles.themeChip}>
                    <Text style={styles.themeText}>{theme}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Loading Progress Indicator */}
          {playerState.isLoading && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingBar}>
                <Animated.View
                  style={[
                    styles.loadingProgress,
                    {
                      width: `${playerState.loadingProgress}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.loadingText}>
                Loading... {playerState.loadingProgress}%
              </Text>
            </View>
          )}

          {/* Buffering Indicator */}
          {playerState.isBuffering && !playerState.isLoading && (
            <View style={styles.bufferingContainer}>
              <Text style={styles.bufferingText}>⏳ Buffering...</Text>
            </View>
          )}

          {/* Error Display */}
          {playerState.error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorText}>{playerState.error}</Text>
              <TouchableOpacity
                style={styles.errorDismissButton}
                onPress={() => setPlayerState(prev => ({ ...prev, error: null }))}
              >
                <Text style={styles.errorDismissText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Progress */}
          <View style={styles.progressSection}>
            <Slider
              style={[
                styles.progressSlider,
                isScrubbing && styles.progressSliderScrubbing
              ]}
              value={getCurrentProgress()}
              minimumValue={0}
              maximumValue={100}
              onSlidingStart={handleScrubStart}
              onValueChange={handleScrubChange}
              onSlidingComplete={handleScrubEnd}
              minimumTrackTintColor={isScrubbing ? "#FFB347" : "#FF6B35"}
              maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
              thumbTintColor={isScrubbing ? "#FFB347" : "#FF6B35"}
              disabled={playerState.isLoading || playerState.isBuffering}
            />
            <View style={styles.timeContainer}>
              <Text style={[
                styles.timeText,
                isScrubbing && styles.timeTextScrubbing
              ]}>
                {formatTime(getCurrentPosition())}
              </Text>
              <Text style={styles.timeText}>
                {formatTime(playerState.duration)}
              </Text>
            </View>
          </View>

          {/* Main Controls */}
          <View style={styles.mainControls}>
            <TouchableOpacity onPress={handlePrevious} style={styles.controlButton}>
              <Text style={styles.controlIcon}>⏮️</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handlePlayPause} 
              style={[
                styles.playButton,
                (playerState.isLoading || playerState.isBuffering) && styles.playButtonDisabled
              ]}
              disabled={playerState.isLoading || playerState.error !== null}
            >
              <Text style={styles.playIcon}>
                {playerState.isLoading ? '⏳' : 
                 playerState.isBuffering ? '⏰' :
                 playerState.error ? '⚠️' :
                 playerState.isPlaying ? '⏸️' : '▶️'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNext} style={styles.controlButton}>
              <Text style={styles.controlIcon}>⏭️</Text>
            </TouchableOpacity>
          </View>

          {/* Secondary Controls */}
          <View style={styles.secondaryControls}>
            <TouchableOpacity onPress={toggleRepeat} style={styles.secondaryButton}>
              <Text style={[
                styles.secondaryIcon,
                { opacity: playerState.repeatMode !== 'off' ? 1 : 0.5 }
              ]}>
                {getRepeatIcon()}
              </Text>
            </TouchableOpacity>

            <View style={styles.volumeContainer}>
              <Text style={styles.volumeIcon}>🔊</Text>
              <Slider
                style={styles.volumeSlider}
                value={playerState.volume}
                minimumValue={0}
                maximumValue={1}
                onValueChange={handleVolumeChange}
                minimumTrackTintColor="#FF6B35"
                maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
              />
            </View>
          </View>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
  compactPlayer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  songInfo: {
    flex: 1,
    marginRight: 12,
  },
  compactTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  compactArtist: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  compactControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactPlayButton: {
    padding: 8,
  },
  compactPlayIcon: {
    fontSize: 18,
  },
  compactCloseButton: {
    padding: 8,
    marginLeft: 4,
  },
  compactCloseIcon: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  compactProgress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  compactProgressBar: {
    height: '100%',
    backgroundColor: '#FF6B35',
  },
  expandedPlayer: {
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  collapseIcon: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backgroundIndicator: {
    color: '#FFB347',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '500',
  },
  closeIcon: {
    color: '#B0B0B0',
    fontSize: 18,
  },
  songDetails: {
    alignItems: 'center',
    marginBottom: 32,
  },
  songTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  songArtist: {
    color: '#B0B0B0',
    fontSize: 16,
    marginBottom: 4,
  },
  songPerspective: {
    color: '#FF6B35',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  themesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  themeChip: {
    backgroundColor: 'rgba(255, 165, 0, 0.15)',
    borderColor: 'rgba(255, 165, 0, 0.4)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  themeText: {
    fontSize: 10,
    color: '#FFB347',
    fontWeight: '600',
  },
  progressSection: {
    marginBottom: 32,
  },
  progressSlider: {
    height: 40,
  },
  progressSliderScrubbing: {
    height: 44,
    opacity: 0.9,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  timeTextScrubbing: {
    color: '#FFB347',
    fontWeight: '600',
  },
  mainControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  controlButton: {
    padding: 12,
    marginHorizontal: 16,
  },
  controlIcon: {
    fontSize: 24,
  },
  playButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 32,
    padding: 16,
    marginHorizontal: 20,
  },
  playIcon: {
    fontSize: 28,
    color: '#FFFFFF',
  },
  secondaryControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondaryButton: {
    padding: 8,
  },
  secondaryIcon: {
    fontSize: 20,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 20,
  },
  volumeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  volumeSlider: {
    flex: 1,
    height: 30,
  },
  // Loading and Error State Styles
  loadingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  loadingText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '500',
  },
  bufferingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  bufferingText: {
    color: '#FFD700',
    fontSize: 12,
    fontStyle: 'italic',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF3B30',
  },
  errorIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  errorText: {
    flex: 1,
    color: '#FF3B30',
    fontSize: 12,
    lineHeight: 16,
  },
  errorDismissButton: {
    padding: 4,
    marginLeft: 8,
  },
  errorDismissText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: 'bold',
  },
  playButtonDisabled: {
    opacity: 0.6,
  },
});

export default AudioPlayer;
