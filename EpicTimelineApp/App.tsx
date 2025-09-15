import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import MapScreen from './src/screens/MapScreen';
import { AudioPlayerProvider, useAudioPlayer } from './src/contexts/AudioPlayerContext';
import AudioPlayer from './src/components/Audio/AudioPlayer';

const AppContent = () => {
  const { currentSong, playlist, isPlayerVisible, playSong, hidePlayer } = useAudioPlayer();

  // Initialize app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('• Starting Epic Timeline app...');
        // App initialization can happen here if needed
      } catch (error) {
        console.error('✗ App initialization failed:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Enhanced Three-Panel Layout with MapScreen */}
      <MapScreen />
      
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
