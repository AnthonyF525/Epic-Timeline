/**
 * InteractiveMapScreen - Full-featured screen for the EPIC Interactive Map
 * 
 * This screen provides a complete interface for exploring all EPIC sagas through
 * an interactive map, including detailed location information, song lists,
 * event timelines, and character information.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';
import EpicJourneyMap from '../components/Maps/EpicJourneyMap';
import SeedDataService, { SagaSeedData } from '../services/SeedDataService';
import { Song } from '../components/Audio/SongList';
import { ApiEvent, Character } from '../services/EventService';

interface MapLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance?: string;
  type: string;
  features: string[];
  x: number;
  y: number;
  color: string;
  sagaIndex: number;
  songs: Song[];
  events: ApiEvent[];
  characters: Character[];
  isVisited: boolean;
  isActive: boolean;
}

interface SagaStats {
  name: string;
  totalLocations: number;
  totalSongs: number;
  totalEvents: number;
  totalCharacters: number;
  color: string;
}

const InteractiveMapScreen: React.FC = () => {
  const [seedDataService] = useState(() => SeedDataService);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [showSongModal, setShowSongModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [sagaStats, setSagaStats] = useState<SagaStats[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    setIsLoading(true);
    try {
      await seedDataService.initialize();
      generateSagaStats();
    } catch (error) {
      console.error('Failed to initialize map screen:', error);
      Alert.alert('Error', 'Failed to load EPIC saga data.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSagaStats = () => {
    const stats: SagaStats[] = [];
    const availableSagas = seedDataService.getAvailableSagas();
    const sagaColors = [
      '#CD853F', '#FF6B35', '#4A90E2', '#9B59B6', '#2C3E50',
      '#F1C40F', '#E67E22', '#E74C3C', '#27AE60'
    ];

    availableSagas.forEach((sagaId: string, index: number) => {
      const sagaData = seedDataService.getSagaSeedData(sagaId);
      if (sagaData) {
        stats.push({
          name: sagaId.charAt(0).toUpperCase() + sagaId.slice(1),
          totalLocations: sagaData.locations.length,
          totalSongs: sagaData.songs.length,
          totalEvents: sagaData.events.length,
          totalCharacters: sagaData.characters.length,
          color: sagaColors[index] || '#2C3E50'
        });
      }
    });

    setSagaStats(stats);
  };

  const handleLocationSelect = (location: MapLocation) => {
    setSelectedLocation(location);
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderSongItem = ({ item }: { item: Song }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        setSelectedSong(item);
        setShowSongModal(false);
        Alert.alert(
          item.title,
          `${item.description}\n\nDuration: ${formatDuration(item.durationSeconds)}\nThemes: ${item.themes?.join(', ') || 'N/A'}`,
          [{ text: 'OK' }]
        );
      }}
    >
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{item.title}</Text>
        <Text style={styles.listItemSubtitle}>
          Track {item.trackNumber} • {formatDuration(item.durationSeconds)}
        </Text>
        <Text style={styles.listItemDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEventItem = ({ item }: { item: ApiEvent }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{item.title}</Text>
        <Text style={styles.listItemSubtitle}>
          Sequence {item.sequenceOrder} • {item.eventContext?.importance || 'Standard'}
        </Text>
        <Text style={styles.listItemDescription} numberOfLines={3}>
          {item.description}
        </Text>
        {item.songs && item.songs.length > 0 && (
          <Text style={styles.eventSongs}>
            • {item.songs.map(song => song.title).join(', ')}
          </Text>
        )}
      </View>
    </View>
  );

  const renderCharacterItem = ({ item }: { item: Character }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{item.name}</Text>
        <Text style={styles.listItemSubtitle}>
          {item.characterType} {item.isProtagonist ? '• Protagonist' : ''}
        </Text>
        <Text style={styles.listItemDescription} numberOfLines={3}>
          {item.description}
        </Text>
        {item.aliases && item.aliases.length > 0 && (
          <Text style={styles.characterAliases}>
            Also known as: {item.aliases.slice(0, 2).join(', ')}
          </Text>
        )}
      </View>
    </View>
  );

  const renderStatsItem = ({ item }: { item: SagaStats }) => (
    <View style={[styles.statsCard, { borderLeftColor: item.color }]}>
      <Text style={styles.statsTitle}>{item.name} Saga</Text>
      <View style={styles.statsRow}>
        <Text style={styles.statsLabel}>Locations: </Text>
        <Text style={styles.statsValue}>{item.totalLocations}</Text>
      </View>
      <View style={styles.statsRow}>
        <Text style={styles.statsLabel}>Songs: </Text>
        <Text style={styles.statsValue}>{item.totalSongs}</Text>
      </View>
      <View style={styles.statsRow}>
        <Text style={styles.statsLabel}>Events: </Text>
        <Text style={styles.statsValue}>{item.totalEvents}</Text>
      </View>
      <View style={styles.statsRow}>
        <Text style={styles.statsLabel}>Characters: </Text>
        <Text style={styles.statsValue}>{item.totalCharacters}</Text>
      </View>
    </View>
  );

  const renderQuickActions = () => {
    if (!selectedLocation) return null;

    return (
      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>
          {selectedLocation.name} • {selectedLocation.saga.toUpperCase()}
        </Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#3498DB' }]}
            onPress={() => setShowSongModal(true)}
            disabled={selectedLocation.songs.length === 0}
          >
            <Text style={styles.actionButtonText}>
              • Songs ({selectedLocation.songs.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#E67E22' }]}
            onPress={() => setShowEventModal(true)}
            disabled={selectedLocation.events.length === 0}
          >
            <Text style={styles.actionButtonText}>
              • Events ({selectedLocation.events.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#9B59B6' }]}
            onPress={() => setShowCharacterModal(true)}
            disabled={selectedLocation.characters.length === 0}
          >
            <Text style={styles.actionButtonText}>
              • Characters ({selectedLocation.characters.length})
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.locationDescription} numberOfLines={3}>
          {selectedLocation.description}
        </Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading EPIC Interactive Map...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EPIC: The Musical</Text>
        <Text style={styles.headerSubtitle}>Interactive Journey Map</Text>
        <TouchableOpacity
          style={styles.statsButton}
          onPress={() => setShowStatsModal(true)}
        >
          <Text style={styles.statsButtonText}>• Saga Statistics</Text>
        </TouchableOpacity>
      </View>

      <EpicJourneyMap
        onLocationSelect={handleLocationSelect}
        showJourneyPath={true}
      />

      {renderQuickActions()}

      {/* Songs Modal */}
      <Modal
        visible={showSongModal}
        animationType="slide"
        onRequestClose={() => setShowSongModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Songs at {selectedLocation?.name}
            </Text>
            <TouchableOpacity onPress={() => setShowSongModal(false)}>
              <Text style={styles.modalCloseButton}>•</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={selectedLocation?.songs || []}
            renderItem={renderSongItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.modalList}
          />
        </SafeAreaView>
      </Modal>

      {/* Events Modal */}
      <Modal
        visible={showEventModal}
        animationType="slide"
        onRequestClose={() => setShowEventModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Events at {selectedLocation?.name}
            </Text>
            <TouchableOpacity onPress={() => setShowEventModal(false)}>
              <Text style={styles.modalCloseButton}>•</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={selectedLocation?.events || []}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.modalList}
          />
        </SafeAreaView>
      </Modal>

      {/* Characters Modal */}
      <Modal
        visible={showCharacterModal}
        animationType="slide"
        onRequestClose={() => setShowCharacterModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Characters at {selectedLocation?.name}
            </Text>
            <TouchableOpacity onPress={() => setShowCharacterModal(false)}>
              <Text style={styles.modalCloseButton}>•</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={selectedLocation?.characters || []}
            renderItem={renderCharacterItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.modalList}
          />
        </SafeAreaView>
      </Modal>

      {/* Saga Statistics Modal */}
      <Modal
        visible={showStatsModal}
        animationType="slide"
        onRequestClose={() => setShowStatsModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>EPIC Saga Statistics</Text>
            <TouchableOpacity onPress={() => setShowStatsModal(false)}>
              <Text style={styles.modalCloseButton}>•</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={sagaStats}
            renderItem={renderStatsItem}
            keyExtractor={(item) => item.name}
            style={styles.modalList}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 18,
    color: '#2C3E50',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 10,
  },
  statsButton: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  statsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  quickActions: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    minWidth: 80,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  locationDescription: {
    fontSize: 14,
    color: '#34495E',
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  modalCloseButton: {
    fontSize: 24,
    color: '#7F8C8D',
    paddingLeft: 20,
  },
  modalList: {
    flex: 1,
  },
  listItem: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  listItemSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  listItemDescription: {
    fontSize: 14,
    color: '#34495E',
    lineHeight: 20,
  },
  eventSongs: {
    fontSize: 12,
    color: '#3498DB',
    marginTop: 5,
    fontStyle: 'italic',
  },
  characterAliases: {
    fontSize: 12,
    color: '#9B59B6',
    marginTop: 5,
    fontStyle: 'italic',
  },
  statsCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statsLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  statsValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
});

export default InteractiveMapScreen;
