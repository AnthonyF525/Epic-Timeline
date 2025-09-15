/**
 * SongList Component for Epic Timeline
 * Displays songs from sagas with audio playback controls, progress tracking, and interactive features
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  ActivityIndicator,
  Alert,
  Dimensions,
  Linking,
} from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import SpotifyService from '../../services/SpotifyService';

export interface Song {
  id: number;
  title: string;
  trackNumber: number;
  description?: string;
  durationSeconds: number;
  themes?: string[];
  saga: {
    id: number;
    title: string;
    description: string;
    releaseDate?: string;
    episodeCount: number;
    genres: string[];
    themes: string[];
    inspirations: string[];
    albumArtUrl?: string;
    amazonMusicUrl?: string;
    youtubePlaylistUrl?: string;
    totalDurationSeconds: number;
  };
  characters: Array<{
    id: number;
    name: string;
    characterType?: string;
    description?: string;
    isProtagonist?: boolean;
    aliases?: string[];
    powers?: string[];
  }>;
  // Additional frontend-specific fields
  audioUrl?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  lyrics?: string[];
  isReleased?: boolean;
  perspective?: string; // Character perspective/POV for the song
  narrativeContext?: string; // Story context or narrative significance
}

export interface SongListProps {
  songs: Song[];
  currentSaga?: string;
  showSagaFilter?: boolean;
  showAudioControls?: boolean;
  showDetails?: boolean;
  showThemes?: boolean; // P2: Control theme chips display
  showPerspectiveFilter?: boolean; // P2: Control perspective filtering
  onSongPress?: (song: Song) => void;
  onSongPlay?: (song: Song) => void;
  style?: any;
  maxHeight?: number;
  searchQuery?: string;
  sortBy?: 'trackNumber' | 'title' | 'duration' | 'releaseDate';
  sortDirection?: 'asc' | 'desc';
}

/**
 * Individual Song Item Component
 */
const SongItem: React.FC<{
  song: Song;
  isPlaying: boolean;
  isLoading: boolean;
  progress: number;
  showAudioControls: boolean;
  showDetails: boolean;
  showThemes: boolean; // P2: Control theme chips display
  onPress: () => void;
  onPlay: () => void;
  onPause: () => void;
}> = ({
  song,
  isPlaying,
  isLoading,
  progress,
  showAudioControls,
  showDetails,
  showThemes,
  onPress,
  onPlay,
  onPause,
}) => {
  const [expanded, setExpanded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Animation for song state changes
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isPlaying ? 0.8 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isPlaying]);

  const handlePress = () => {
    setExpanded(!expanded);
    onPress();
    
    // Animate expansion
    Animated.timing(slideAnim, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getReleaseStatusColor = () => {
    if (song.isReleased === false) return '#FFA500'; // Orange for unreleased
    return '#4CAF50'; // Green for released
  };

  const getReleaseStatusText = () => {
    if (song.isReleased === false) return 'Upcoming';
    return 'Released';
  };

  return (
    <Animated.View style={[styles.songItem, { opacity: fadeAnim }]}>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.songHeader,
          isPlaying && styles.songHeaderPlaying,
          !song.isReleased && styles.songHeaderUnreleased,
        ]}
        activeOpacity={0.7}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Song: ${song.title}. Duration: ${formatDuration(song.durationSeconds)}. ${getReleaseStatusText()}`}
        accessibilityHint="Tap to expand song details"
      >
        <View style={styles.songMainInfo}>
          <View style={styles.songTitleRow}>
            <Text style={styles.songOrder}>#{song.trackNumber}</Text>
            <Text 
              style={[
                styles.songTitle,
                song.isReleased === false && styles.songTitleUnreleased,
                isPlaying && styles.songTitlePlaying,
              ]}
              numberOfLines={expanded ? 0 : 1}
            >
              {song.title}
            </Text>
            <View style={[styles.releaseStatus, { backgroundColor: getReleaseStatusColor() }]}>
              <Text style={styles.releaseStatusText}>
                {getReleaseStatusText()}
              </Text>
            </View>
          </View>
          
          <View style={styles.songMetaRow}>
            <Text style={styles.songDuration}>{formatDuration(song.durationSeconds)}</Text>
            <Text style={styles.songSaga}>{song.saga.title}</Text>
          </View>

          {/* Perspective Data - New for P2 requirement */}
          {song.perspective && (
            <View style={styles.perspectiveRow}>
              <Text style={styles.perspectiveLabel}>Perspective:</Text>
              <Text style={styles.perspectiveText}>{song.perspective}</Text>
            </View>
          )}

          {song.narrativeContext && (
            <View style={styles.narrativeRow}>
              <Text style={styles.narrativeLabel}>Context:</Text>
              <Text style={styles.narrativeText} numberOfLines={expanded ? 0 : 1}>
                {song.narrativeContext}
              </Text>
            </View>
          )}

          {/* Theme tags/chips - P2 Requirement */}
          {showThemes && song.themes && song.themes.length > 0 && (
            <View style={styles.mainThemesContainer}>
              <View style={styles.themeChipsRow}>
                {song.themes.slice(0, 3).map((theme, index) => (
                  <View key={index} style={styles.themeChip}>
                    <Text style={styles.themeChipText}>{theme}</Text>
                  </View>
                ))}
                {song.themes.length > 3 && (
                  <View style={styles.moreThemesChip}>
                    <Text style={styles.moreThemesText}>+{song.themes.length - 3}</Text>
                  </View>
                )}
              </View>
            </View>
          )}
          
          {/* Progress bar for currently playing song */}
          {isPlaying && progress > 0 && (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
          )}
        </View>

        {/* Audio Controls */}
        {showAudioControls && song.isReleased !== false && (
          <TouchableOpacity
            onPress={handlePlayPause}
            style={styles.playButton}
            disabled={isLoading}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={isPlaying ? 'Pause song' : 'Play song'}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.playButtonText}>
                {isPlaying ? '◦ ' : '▶•'}
              </Text>
            )}
          </TouchableOpacity>
        )}

        {/* Expansion indicator */}
        <TouchableOpacity style={styles.expandButton}>
          <Text style={styles.expandIcon}>
            {expanded ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Expanded Details */}
      {expanded && showDetails && (
        <Animated.View 
          style={[
            styles.songDetails,
            {
              maxHeight: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 300],
              }),
            },
          ]}
        >
          {song.description && (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Description:</Text>
              <Text style={styles.detailText}>{song.description}</Text>
            </View>
          )}

          {song.characters && song.characters.length > 0 && (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Characters:</Text>
              <View style={styles.tagContainer}>
                {song.characters.map((character, index) => (
                  <View key={index} style={[styles.tag, styles.characterTag]}>
                    <Text style={styles.tagText}>{character.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {song.themes && song.themes.length > 0 && (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Themes:</Text>
              <View style={styles.tagContainer}>
                {song.themes.map((theme, index) => (
                  <View key={index} style={[styles.tag, styles.themeTag]}>
                    <Text style={styles.tagText}>{theme}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* External Links */}
          <View style={styles.linksContainer}>
            {song.youtubeUrl && (
              <TouchableOpacity
                style={[styles.linkButton, styles.youtubeButton]}
                onPress={() => Alert.alert('YouTube', 'Open in YouTube app')}
              >
                <Text style={styles.linkButtonText}>• YouTube</Text>
              </TouchableOpacity>
            )}
            {/* Always show Spotify button for EPIC songs */}
            <TouchableOpacity
              style={[styles.linkButton, styles.spotifyButton]}
              onPress={async () => {
                try {
                  let spotifyUrl = song.spotifyUrl;
                  
                  // If no URL in song data, try to get from our service
                  if (!spotifyUrl) {
                    spotifyUrl = SpotifyService.getSpotifyUrl(song.title);
                  }
                  
                  if (spotifyUrl) {
                    await Linking.openURL(spotifyUrl);
                  } else {
                    Alert.alert('Spotify', 'Song not available on Spotify');
                  }
                } catch (error) {
                  console.error('Failed to open Spotify URL:', error);
                  Alert.alert('Error', 'Failed to open Spotify link');
                }
              }}
            >
              <Text style={styles.linkButtonText}>• Spotify</Text>
            </TouchableOpacity>
          </View>

          {song.saga.releaseDate && (
            <View style={styles.releaseDateContainer}>
              <Text style={styles.releaseDateText}>
                Released: {new Date(song.saga.releaseDate).toLocaleDateString()}
              </Text>
            </View>
          )}
        </Animated.View>
      )}
    </Animated.View>
  );
};

/**
 * Main SongList Component
 */
const SongList: React.FC<SongListProps> = ({
  songs,
  currentSaga,
  showSagaFilter = true,
  showAudioControls = true,
  showDetails = true,
  showThemes = true, // P2: Default to showing themes
  showPerspectiveFilter = true, // P2: Default to showing perspective filter
  onSongPress,
  onSongPlay,
  style,
  maxHeight,
  searchQuery = '',
  sortBy = 'trackNumber',
  sortDirection = 'asc',
}) => {
  // P2: Use global audio player context instead of local state
  const { currentSong, isPlaying, isLoading, error, playSong, pauseSong } = useAudioPlayer();
  
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs);
  const [selectedSaga, setSelectedSaga] = useState<string>(currentSaga || 'All');
  const [selectedPerspective, setSelectedPerspective] = useState<string>('All'); // P2: Perspective filter state

  // Filter and sort songs
  useEffect(() => {
    let filtered = [...songs];

    // Filter by saga
    if (selectedSaga !== 'All') {
      filtered = filtered.filter(song => song.saga.title === selectedSaga);
    }

    // P2: Filter by character perspective
    if (selectedPerspective !== 'All') {
      filtered = filtered.filter(song => {
        if (!song.perspective) return false;
        // Extract character name from perspective (e.g., "Odysseus (conflicted leader)" -> "Odysseus")
        const perspectiveCharacter = song.perspective.split('(')[0].trim();
        return perspectiveCharacter.toLowerCase().includes(selectedPerspective.toLowerCase()) ||
               song.perspective.toLowerCase().includes(selectedPerspective.toLowerCase());
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.description?.toLowerCase().includes(query) ||
        song.characters?.some(char => char.name.toLowerCase().includes(query)) ||
        song.themes?.some(theme => theme.toLowerCase().includes(query)) ||
        song.perspective?.toLowerCase().includes(query) ||
        song.narrativeContext?.toLowerCase().includes(query)
      );
    }

    // Sort songs
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'duration':
          aValue = a.durationSeconds;
          bValue = b.durationSeconds;
          break;
        case 'releaseDate':
          aValue = a.saga.releaseDate ? new Date(a.saga.releaseDate).getTime() : 0;
          bValue = b.saga.releaseDate ? new Date(b.saga.releaseDate).getTime() : 0;
          break;
        default: // trackNumber
          aValue = a.trackNumber;
          bValue = b.trackNumber;
          break;
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredSongs(filtered);
  }, [songs, selectedSaga, selectedPerspective, searchQuery, sortBy, sortDirection]);

  const handleSongPress = (song: Song) => {
    onSongPress?.(song);
  };

  const handleSongPlay = (song: Song) => {
    // P2: Use global audio player context
    if (currentSong?.id === song.id && isPlaying) {
      pauseSong();
    } else {
      playSong(song, filteredSongs);
    }
    onSongPlay?.(song);
  };

  const handleSongPause = () => {
    // P2: Use global audio player context
    pauseSong();
  };

  const handleNextSong = () => {
    const currentIndex = filteredSongs.findIndex(song => song.id === currentSong?.id);
    if (currentIndex < filteredSongs.length - 1) {
      const nextSong = filteredSongs[currentIndex + 1];
      handleSongPlay(nextSong);
    }
  };

  const getUniqueSagas = (): string[] => {
    const sagas = ['All', ...new Set(songs.map(song => song.saga.title))];
    return sagas;
  };

  // P2: Get unique character perspectives for filtering
  const getUniquePerspectives = (): string[] => {
    const perspectives = ['All'];
    const characterSet = new Set<string>();
    
    songs.forEach(song => {
      if (song.perspective) {
        // Extract character name from perspective (e.g., "Odysseus (conflicted leader)" -> "Odysseus")
        const characterName = song.perspective.split('(')[0].trim();
        if (characterName && !characterName.includes('&')) {
          characterSet.add(characterName);
        }
        // Also add composite perspectives like "Odysseus & Crew"
        if (characterName.includes('&')) {
          characterSet.add(characterName);
        }
      }
    });
    
    perspectives.push(...Array.from(characterSet).sort());
    return perspectives;
  };

  const screenHeight = Dimensions.get('window').height;
  const listMaxHeight = maxHeight || screenHeight * 0.6;

  return (
    <View style={[styles.container, style]}>
      {/* Header with Saga Filter */}
      {showSagaFilter && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Songs</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.sagaFilter}
          >
            {getUniqueSagas().map((saga) => (
              <TouchableOpacity
                key={saga}
                style={[
                  styles.sagaFilterButton,
                  selectedSaga === saga && styles.sagaFilterButtonActive,
                ]}
                onPress={() => setSelectedSaga(saga)}
              >
                <Text 
                  style={[
                    styles.sagaFilterText,
                    selectedSaga === saga && styles.sagaFilterTextActive,
                  ]}
                >
                  {saga}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* P2: Character Perspective Filter */}
      {showPerspectiveFilter && (
        <View style={styles.header}>
          <Text style={styles.perspectiveHeaderTitle}>Filter by Character</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.perspectiveFilter}
          >
            {getUniquePerspectives().map((perspective) => (
              <TouchableOpacity
                key={perspective}
                style={[
                  styles.perspectiveFilterButton,
                  selectedPerspective === perspective && styles.perspectiveFilterButtonActive,
                ]}
                onPress={() => setSelectedPerspective(perspective)}
              >
                <Text 
                  style={[
                    styles.perspectiveFilterText,
                    selectedPerspective === perspective && styles.perspectiveFilterTextActive,
                  ]}
                >
                  {perspective}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Songs List */}
      <ScrollView 
        style={[styles.songsList, { maxHeight: listMaxHeight }]}
        showsVerticalScrollIndicator={true}
        accessible={true}
        accessibilityLabel={`Song list with ${filteredSongs.length} songs`}
      >
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <SongItem
              key={song.id}
              song={song}
              isPlaying={isPlaying && currentSong?.id === song.id}
              isLoading={isLoading && currentSong?.id === song.id} // P2: Loading state from global player
              progress={0} // P2: Progress handled by global player
              showAudioControls={showAudioControls}
              showDetails={showDetails}
              showThemes={showThemes}
              onPress={() => handleSongPress(song)}
              onPlay={() => handleSongPlay(song)}
              onPause={handleSongPause}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'No songs match your search' : 'No songs available'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Current Song Info */}
      {/* P2: Now Playing indicator using global context */}
      {isPlaying && currentSong && (
        <View style={styles.nowPlaying}>
          <Text style={styles.nowPlayingText}>
            • Now Playing: {currentSong.title}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1419',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  sagaFilter: {
    flexDirection: 'row',
  },
  sagaFilterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sagaFilterButtonActive: {
    backgroundColor: 'rgba(74, 144, 226, 0.3)',
    borderColor: '#4A90E2',
  },
  sagaFilterText: {
    color: '#B0B0B0',
    fontSize: 14,
    fontWeight: '500',
  },
  sagaFilterTextActive: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  // P2: Perspective filter styles
  perspectiveHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFB74D',
    marginBottom: 12,
  },
  perspectiveFilter: {
    flexDirection: 'row',
  },
  perspectiveFilterButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 183, 77, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 183, 77, 0.2)',
  },
  perspectiveFilterButtonActive: {
    backgroundColor: 'rgba(255, 183, 77, 0.3)',
    borderColor: '#FFB74D',
  },
  perspectiveFilterText: {
    color: '#D0D0D0',
    fontSize: 13,
    fontWeight: '500',
  },
  perspectiveFilterTextActive: {
    color: '#FFB74D',
    fontWeight: '600',
  },
  songsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  songItem: {
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  songHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  songHeaderPlaying: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderColor: 'rgba(74, 144, 226, 0.3)',
  },
  songHeaderUnreleased: {
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    borderColor: 'rgba(255, 165, 0, 0.3)',
  },
  songMainInfo: {
    flex: 1,
  },
  songTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  songOrder: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
    minWidth: 25,
  },
  songTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginHorizontal: 8,
  },
  songTitlePlaying: {
    color: '#4A90E2',
  },
  songTitleUnreleased: {
    color: '#FFA500',
  },
  releaseStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  releaseStatusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  songMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  songDuration: {
    fontSize: 12,
    color: '#B0B0B0',
    fontFamily: 'monospace',
  },
  songSaga: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  perspectiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  perspectiveLabel: {
    fontSize: 10,
    color: '#4A90E2',
    fontWeight: '600',
    marginRight: 6,
  },
  perspectiveText: {
    fontSize: 10,
    color: '#E0E0E0',
    fontStyle: 'italic',
  },
  narrativeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  narrativeLabel: {
    fontSize: 10,
    color: '#FFA500',
    fontWeight: '600',
    marginRight: 6,
    minWidth: 45,
  },
  narrativeText: {
    flex: 1,
    fontSize: 10,
    color: '#B0B0B0',
    lineHeight: 14,
  },
  progressContainer: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 1.5,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 1.5,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  playButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  expandButton: {
    padding: 8,
  },
  expandIcon: {
    fontSize: 12,
    color: '#888',
  },
  songDetails: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  detailSection: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#E0E0E0',
    lineHeight: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  characterTag: {
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
    borderColor: 'rgba(138, 43, 226, 0.5)',
    borderWidth: 1,
  },
  themeTag: {
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
    borderColor: 'rgba(255, 165, 0, 0.5)',
    borderWidth: 1,
  },
  // New P2 theme chip styles for main song display
  mainThemesContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
  themeChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  themeChipText: {
    fontSize: 10,
    color: '#FFB347',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  moreThemesChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  moreThemesText: {
    fontSize: 10,
    color: '#B0B0B0',
    fontWeight: '500',
  },
  tagText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  linksContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  linkButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  youtubeButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderColor: 'rgba(255, 0, 0, 0.3)',
  },
  spotifyButton: {
    backgroundColor: 'rgba(30, 215, 96, 0.1)',
    borderColor: 'rgba(30, 215, 96, 0.3)',
  },
  linkButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  releaseDateContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  releaseDateText: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  nowPlaying: {
    padding: 12,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(74, 144, 226, 0.3)',
  },
  nowPlayingText: {
    fontSize: 12,
    color: '#4A90E2',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default SongList;
