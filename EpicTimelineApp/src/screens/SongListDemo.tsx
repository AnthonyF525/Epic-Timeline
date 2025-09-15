/**
 * SongListDemo Screen
 * Demonstrates the SongList component with Epic: The Musical songs
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import SongList, { Song } from '../components/Audio/SongList';
import SongService from '../services/SongService';

const SongListDemo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'trackNumber' | 'title' | 'duration' | 'releaseDate'>('trackNumber');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showOnlyReleased, setShowOnlyReleased] = useState(false);

  // Get all songs from the service
  const allSongs = SongService.getSampleSongs();
  const filteredSongs = showOnlyReleased 
    ? allSongs.filter(song => song.isReleased)
    : allSongs;

  const handleSongPress = (song: Song) => {
    const duration = `${Math.floor(song.durationSeconds / 60)}:${(song.durationSeconds % 60).toString().padStart(2, '0')}`;
    Alert.alert(
      song.title,
      `From: ${song.saga.title}\nDuration: ${duration}\nStatus: ${song.isReleased ? 'Released' : 'Upcoming'}\n\n${song.description}`,
      [
        { text: 'View Characters', onPress: () => showCharacters(song) },
        { text: 'View Themes', onPress: () => showThemes(song) },
        { text: 'Close', style: 'cancel' },
      ]
    );
  };

  const handleSongPlay = (song: Song) => {
    if (!song.isReleased) {
      Alert.alert('Coming Soon', `"${song.title}" will be available when it releases.`);
      return;
    }
    
    Alert.alert(
      'Now Playing',
      `${song.title}\n\nThis would start audio playback if audio files were available.`,
      [{ text: 'OK' }]
    );
  };

  const showCharacters = (song: Song) => {
    const characters = song.characters?.join(', ') || 'No characters listed';
    Alert.alert('Characters', characters);
  };

  const showThemes = (song: Song) => {
    const themes = song.themes?.join(', ') || 'No themes listed';
    Alert.alert('Themes', themes);
  };

  const toggleSort = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDirection('asc');
    }
  };

  const getSagaStats = () => {
    const stats = SongService.getSagaStats();
    return stats.map((stat: any) => 
      `${stat.name}: ${stat.releasedSongs}/${stat.totalSongs} songs (${stat.totalDuration.formatted})`
    ).join('\n');
  };

  const showStats = () => {
    Alert.alert('Saga Statistics', getSagaStats());
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F1419" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Epic: The Musical</Text>
        <Text style={styles.subtitle}>Song Collection</Text>
        
        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search songs, characters, themes..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.controlButton, sortBy === 'trackNumber' && styles.controlButtonActive]}
            onPress={() => toggleSort('trackNumber')}
          >
            <Text style={[styles.controlButtonText, sortBy === 'trackNumber' && styles.controlButtonTextActive]}>
              Track # {sortBy === 'trackNumber' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.controlButton, sortBy === 'title' && styles.controlButtonActive]}
            onPress={() => toggleSort('title')}
          >
            <Text style={[styles.controlButtonText, sortBy === 'title' && styles.controlButtonTextActive]}>
              Title {sortBy === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.controlButton, sortBy === 'duration' && styles.controlButtonActive]}
            onPress={() => toggleSort('duration')}
          >
            <Text style={[styles.controlButtonText, sortBy === 'duration' && styles.controlButtonTextActive]}>
              Duration {sortBy === 'duration' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterButton, showOnlyReleased && styles.filterButtonActive]}
            onPress={() => setShowOnlyReleased(!showOnlyReleased)}
          >
            <Text style={[styles.filterButtonText, showOnlyReleased && styles.filterButtonTextActive]}>
              {showOnlyReleased ? 'Released Only' : 'All Songs'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Stats Button */}
        <TouchableOpacity style={styles.statsButton} onPress={showStats}>
          <Text style={styles.statsButtonText}>View Statistics</Text>
        </TouchableOpacity>
      </View>

      {/* Song List */}
      <SongList
        songs={filteredSongs}
        showSagaFilter={true}
        showAudioControls={true}
        showDetails={true}
        onSongPress={handleSongPress}
        onSongPlay={handleSongPlay}
        searchQuery={searchQuery}
        sortBy={sortBy}
        sortDirection={sortDirection}
        style={styles.songList}
      />
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {filteredSongs.length} songs • Epic: The Musical by Jorge Rivera-Herrans
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  controlButtonActive: {
    backgroundColor: 'rgba(74, 144, 226, 0.3)',
    borderColor: '#4A90E2',
  },
  controlButtonText: {
    color: '#B0B0B0',
    fontSize: 12,
    fontWeight: '500',
  },
  controlButtonTextActive: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 165, 0, 0.3)',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(255, 165, 0, 0.3)',
    borderColor: '#FFA500',
  },
  filterButtonText: {
    color: '#FFA500',
    fontSize: 12,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    fontWeight: '600',
  },
  statsButton: {
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.5)',
  },
  statsButtonText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '600',
  },
  songList: {
    flex: 1,
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  footerText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default SongListDemo;
