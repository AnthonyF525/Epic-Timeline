import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
// ✅ Update this import for Expo
import { EpicTimelineMap } from '../components/EpicTimelineMap';
import { MapService, EpicMapLocation } from '../services/MapService';
import { SagaService } from '../services';
import { Saga } from '../types';

export const MapScreen: React.FC = () => {
  const [selectedSaga, setSelectedSaga] = useState<string>('');
  const [sagas, setSagas] = useState<Saga[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<EpicMapLocation | null>(null);
  const [showJourney, setShowJourney] = useState(true);
  const [locations, setLocations] = useState<EpicMapLocation[]>([]);

  useEffect(() => {
    loadSagas();
    loadLocations();
  }, []);

  const loadSagas = async () => {
    try {
      const sagaData = await SagaService.getAllSagas();
      setSagas(sagaData);
    } catch (error) {
      console.error('🚨 Error loading sagas:', error);
      Alert.alert('Error', 'Failed to load Epic Timeline sagas');
    }
  };

  const loadLocations = () => {
    const allLocations = MapService.getAllLocations();
    console.log('🎭 EPIC Locations loaded:', allLocations.length);
    console.log('🗺️ First location:', allLocations[0]);
    setLocations(allLocations);
  };

  const handleSagaFilter = (sagaId: string) => {
    setSelectedSaga(sagaId);
    const filteredLocations = MapService.getLocationsBySaga(sagaId);
    setLocations(filteredLocations);
  };

  const handleLocationSelect = (location: EpicMapLocation) => {
    setSelectedLocation(location);
    Alert.alert(
      `📍 ${location.name}`,
      `${location.description}\n\n✨ ${location.significance}`,
      [{ text: 'Explore More', style: 'default' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎭 Epic Timeline Map</Text>
        <Text style={styles.subtitle}>Explore Classical Literature Locations</Text>
      </View>

      {/* Saga Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedSaga === '' && styles.filterButtonActive]}
          onPress={() => handleSagaFilter('')}
        >
          <Text style={[styles.filterText, selectedSaga === '' && styles.filterTextActive]}>
            All Sagas
          </Text>
        </TouchableOpacity>
        {sagas.map((saga) => (
          <TouchableOpacity
            key={saga.id}
            style={[styles.filterButton, selectedSaga === saga.id && styles.filterButtonActive]}
            onPress={() => handleSagaFilter(saga.id)}
          >
            <Text style={[styles.filterText, selectedSaga === saga.id && styles.filterTextActive]}>
              {saga.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Journey Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, showJourney && styles.toggleButtonActive]}
          onPress={() => setShowJourney(!showJourney)}
        >
          <Text style={[styles.toggleText, showJourney && styles.toggleTextActive]}>
            {showJourney ? '🗺️ Hide Journey' : '🗺️ Show Journey'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <EpicTimelineMap
          locations={locations}
          selectedLocation={selectedLocation}
          showJourney={showJourney}
          onLocationPress={handleLocationSelect}
        />
      </View>

      {/* Location Info Panel */}
      {selectedLocation && (
        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>📍 {selectedLocation.name}</Text>
          <Text style={styles.infoDescription}>{selectedLocation.description}</Text>
          <Text style={styles.infoSaga}>From: {selectedLocation.saga.toUpperCase()}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderBottomWidth: 2,
    borderBottomColor: '#4A90E2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0C4DE',
    fontStyle: 'italic',
  },
  filtersContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#2d3748',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  filterButtonActive: {
    backgroundColor: '#4A90E2',
  },
  filterText: {
    color: '#B0C4DE',
    fontWeight: '600',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#ffffff',
  },
  toggleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#2d3748',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#4A90E2',
  },
  toggleText: {
    color: '#B0C4DE',
    fontWeight: '600',
    fontSize: 16,
  },
  toggleTextActive: {
    color: '#ffffff',
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  infoPanel: {
    backgroundColor: '#16213e',
    padding: 20,
    borderTopWidth: 2,
    borderTopColor: '#4A90E2',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: '#B0C4DE',
    marginBottom: 8,
    lineHeight: 20,
  },
  infoSaga: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default MapScreen;