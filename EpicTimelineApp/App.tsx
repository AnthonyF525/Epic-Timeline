import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import BasicEpicMap from './src/screens/BasicEpicMap';
import InteractiveMapScreen from './src/screens/InteractiveMapScreen';
import CharacterModalDemo from './src/screens/CharacterModalDemo';
import { AudioPlayerProvider, useAudioPlayer } from './src/contexts/AudioPlayerContext';
import AudioPlayer from './src/components/Audio/AudioPlayer';
import CacheInitializer from './src/services/CacheInitializer';

const AppContent = () => {
  const { currentSong, playlist, isPlayerVisible, playSong, hidePlayer } = useAudioPlayer();

  // Initialize cache system when app starts
  useEffect(() => {
    const initializeCache = async () => {
      try {
        console.log('🚀 Initializing Epic Timeline cache system...');
        
        // Configure cache for optimal Troy data performance
        await CacheInitializer.configure({
          preloadTroyData: true,
          backgroundRefresh: true,
          refreshIntervalMinutes: 30,
          enableDevelopmentMode: __DEV__,
        });
        
        await CacheInitializer.initialize();
        
        // Log cache status
        const health = CacheInitializer.getCacheHealth();
        console.log(`📦 Cache initialized: ${health.status}`, health.details.summary);
        
      } catch (error) {
        console.error('❌ Cache initialization failed:', error);
      }
    };

    initializeCache();

    // Cleanup on unmount
    return () => {
      CacheInitializer.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Enhanced Interactive Map with all 9 sagas */}
      <InteractiveMapScreen />
      
      {/* Global Audio Player - overlays on top of everything */}
      <AudioPlayer
        currentSong={currentSong}
        playlist={playlist}
        isVisible={isPlayerVisible}
        onSongChange={(song) => playSong(song, playlist)}
        onClose={hidePlayer}
        style={styles.audioPlayer}
      />
    </View>
  );
};

export default function App() {
  return (
    <AudioPlayerProvider>
      <AppContent />
    </AudioPlayerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  audioPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});
