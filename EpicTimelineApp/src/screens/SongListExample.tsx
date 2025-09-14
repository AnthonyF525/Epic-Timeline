/**
 * Example Screen demonstrating SongList component with P2 requirements:
 * - Song titles
 * - Duration display
 * - Perspective data (character viewpoints and narrative context)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SongList, { Song } from '../components/Audio/SongList';
import SongDataService from '../services/SongDataService';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

const SongListExample: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'trackNumber' | 'title' | 'duration' | 'releaseDate'>('trackNumber');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Audio player integration
  const { playSong } = useAudioPlayer();

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    setLoading(true);
    try {
      const fetchedSongs = await SongDataService.fetchSongs();
      setSongs(fetchedSongs);
    } catch (error) {
      console.error('Error loading songs:', error);
      Alert.alert('Error', 'Failed to load songs. Using mock data.');
      setSongs(SongDataService.getMockSongs());
    }
    setLoading(false);
  };

  const handleSongPress = (song: Song) => {
    Alert.alert(
      `${song.title}`,
      `Track #${song.trackNumber}\nDuration: ${Math.floor(song.durationSeconds / 60)}:${(song.durationSeconds % 60).toString().padStart(2, '0')}\nPerspective: ${song.perspective}\n\n${song.narrativeContext}`,
      [{ text: 'OK' }]
    );
  };

  const handleSongPlay = (song: Song) => {
    // Use the audio player context to play the song
    playSong(song, songs);
  };

  const toggleSort = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDirection('asc');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Loading Epic Timeline Songs...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Epic Timeline - Song List Demo</Text>
        <Text style={styles.subtitle}>P2: Titles, Duration & Perspective Data</Text>
        
        {/* Search */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search songs, characters, themes, or perspectives..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Sort Controls */}
        <View style={styles.sortControls}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          {(['trackNumber', 'title', 'duration'] as const).map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.sortButton,
                sortBy === option && styles.sortButtonActive
              ]}
              onPress={() => toggleSort(option)}
            >
              <Text style={[
                styles.sortButtonText,
                sortBy === option && styles.sortButtonTextActive
              ]}>
                {option === 'trackNumber' ? '#' : option}
                {sortBy === option && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <SongList
        songs={songs}
        showSagaFilter={true}
        showPerspectiveFilter={true}
        showAudioControls={true}
        showDetails={true}
        showThemes={true}
        onSongPress={handleSongPress}
        onSongPlay={handleSongPlay}
        searchQuery={searchQuery}
        sortBy={sortBy}
        sortDirection={sortDirection}
        style={styles.songList}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          • Song titles and track numbers displayed
        </Text>
        <Text style={styles.footerText}>
          • Duration shown in MM:SS format
        </Text>
        <Text style={styles.footerText}>
          • Perspective data shows character viewpoints
        </Text>
        <Text style={styles.footerText}>
          • Narrative context explains story significance
        </Text>
        <Text style={styles.footerText}>
          • Search within Troy Saga (try "Odysseus", "War", "Horse")
        </Text>
        <Text style={styles.footerText}>
          • Filter by character perspective (Odysseus, Athena, etc.)
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1419',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sortControls: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  sortLabel: {
    fontSize: 14,
    color: '#B0B0B0',
    marginRight: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 4,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sortButtonActive: {
    backgroundColor: 'rgba(74, 144, 226, 0.3)',
    borderColor: '#4A90E2',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#B0B0B0',
    fontWeight: '500',
  },
  sortButtonTextActive: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  songList: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
});

export default SongListExample;
