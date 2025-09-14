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
import { EpicTimelineMap } from '../components/EpicTimelineMap';
import { EpicMapLocation } from '../services/MapService';
import { SagaService } from '../services';
import { Saga } from '../types';

export const MapScreen: React.FC = () => {
  const [selectedSaga, setSelectedSaga] = useState<string>('');
  const [sagas, setSagas] = useState<Saga[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<EpicMapLocation | null>(null);
  const [showJourney, setShowJourney] = useState(true);

  useEffect(() => {
    loadSagas();
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

  const handleSagaSelect = (sagaTitle: string) => {
    setSelectedSaga(selectedSaga === sagaTitle ? '' : sagaTitle);
  };

  const handleLocationPress = (location: EpicMapLocation) => {
    setSelectedLocation(location);
    Alert.alert(
      location.name,
      `${location.description}\n\nVisited in: ${location.visitedInSaga?.join(', ') || 'Unknown'}`,
      [
        { text: 'Close', style: 'cancel' },
        { 
          text: 'Learn More', 
          onPress: () => {
            // Navigate to location details screen
            console.log('🎭 Navigate to location details:', location.name);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Epic Timeline Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎭 Epic Timeline Map</Text>
        <Text style={styles.subtitle}>Follow Odysseus's Journey</Text>
      </View>

      {/* ✅ Saga Filter Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, !selectedSaga && styles.filterButtonActive]}
          onPress={() => setSelectedSaga('')}
        >
          <Text style={[styles.filterButtonText, !selectedSaga && styles.filterButtonTextActive]}>
            All Locations
          </Text>
        </TouchableOpacity>
        
        {sagas.map((saga) => (
          <TouchableOpacity
            key={saga.id}
            style={[styles.filterButton, selectedSaga === saga.title && styles.filterButtonActive]}
            onPress={() => handleSagaSelect(saga.title)}
          >
            <Text style={[styles.filterButtonText, selectedSaga === saga.title && styles.filterButtonTextActive]}>
              {saga.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ✅ Journey Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, showJourney && styles.toggleButtonActive]}
          onPress={() => setShowJourney(!showJourney)}
        >
          <Text style={[styles.toggleButtonText, showJourney && styles.toggleButtonTextActive]}>
            {showJourney ? '🗺️ Hide Journey' : '🗺️ Show Journey'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Epic Timeline Map */}
      <EpicTimelineMap
        selectedSaga={selectedSaga}
        showJourney={showJourney}
        showUserLocation={true}
        onLocationPress={handleLocationPress}
      />

      {/* ✅ Location Info Panel */}
      {selectedLocation && (
        <View style={styles.locationInfo}>
          <Text style={styles.locationName}>{selectedLocation.name}</Text>
          <Text style={styles.locationDescription}>{selectedLocation.description}</Text>
          <Text style={styles.locationSaga}>
            Saga: {selectedLocation.visitedInSaga?.join(', ') || 'Multiple'}
          </Text>
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
    padding: 16,
    backgroundColor: '#16213e',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#eee',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
  },
  filterContainer: {
    backgroundColor: '#16213e',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  filterButton: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  filterButtonActive: {
    backgroundColor: '#3498db',
  },
  filterButtonText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  toggleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#16213e',
  },
  toggleButton: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  toggleButtonActive: {
    backgroundColor: '#e74c3c',
  },
  toggleButtonText: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: '500',
  },
  toggleButtonTextActive: {
    color: '#fff',
  },
  locationInfo: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(22, 33, 62, 0.95)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 14,
    color: '#eee',
    marginBottom: 8,
  },
  locationSaga: {
    fontSize: 12,
    color: '#bbb',
  },
});

export default MapScreen;