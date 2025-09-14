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
import SagaInfoPanel from '../components/UI/SagaInfoPanel';
import { MapService, Location } from '../services/MapService';
import { SagaService } from '../services';
import { Saga } from '../types';
import { EpicLocation } from '../components/EpicTimelineMap/constants';

// Transform Location to EpicLocation for the map component
const transformLocationToEpicLocation = (location: Location): EpicLocation => ({
  id: location.id,
  name: location.name,
  latitude: location.coordinates.y, // y is latitude
  longitude: location.coordinates.x, // x is longitude  
  description: location.description,
  saga: location.saga || 'Unknown Saga',
  significance: location.significance,
  songs: location.songs || [],
});

export const MapScreen: React.FC = () => {
  const [selectedSaga, setSelectedSaga] = useState<string>('');
  const [sagas, setSagas] = useState<Saga[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showJourney, setShowJourney] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // P2: Saga Info Panel state
  const [showSagaPanel, setShowSagaPanel] = useState(false);
  const [selectedSagaInfo, setSelectedSagaInfo] = useState<any>(null);

  // Troy Saga data for the info panel
  const troyPageData = {
    id: 'troy',
    name: 'The Troy Saga',
    color: '#FF4500',
    description: 'The beginning of Odysseus\'s epic journey, starting with the fall of Troy and his first moral challenges. After 10 years of war, victory comes at a cost that will haunt the hero forever.',
    theme: 'War, Strategy, and Moral Complexity',
    keyCharacters: ['Odysseus', 'Astyanax', 'Polites', 'Eurylochus'],
    songs: [
      {
        title: 'The Horse and the Infant',
        description: 'Odysseus faces the prophecy about Astyanax and makes a devastating choice.',
        duration: '4:15'
      },
      {
        title: 'Just a Man',
        description: 'Odysseus grapples with the weight of his decisions and their consequences.',
        duration: '4:42'
      },
      {
        title: 'Full Speed Ahead',
        description: 'The crew sets sail from Troy, optimistic about their journey home.',
        duration: '3:38'
      },
      {
        title: 'Open Arms',
        description: 'Polites encourages kindness and trust, contrasting with Odysseus\'s caution.',
        duration: '3:25'
      },
      {
        title: 'Warrior of the Mind',
        description: 'Athena appears to guide Odysseus, revealing their special connection.',
        duration: '4:20'
      }
    ],
    locations: ['Troy', 'Ancient Citadel', 'Trojan Palace'],
    emotionalTone: 'Epic, conflicted, and morally complex',
    musicalStyle: 'Orchestral with modern elements and character themes',
    keyMoments: [
      'The fall of Troy',
      'The infant\'s fate',
      'Departure from Troy',
      'First divine intervention',
      'Setting the moral tone'
    ],
    symbolism: 'Troy represents the cost of victory and the weight of leadership',
    order: 1
  };

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

  const loadLocations = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('📍 Loading locations with Troy priority...');
      
      // Try to fetch Troy specifically first, then all locations
      const [troyData, allData] = await Promise.allSettled([
        MapService.getTroyLocation(),
        MapService.getAllLocations()
      ]);

      let locations: Location[] = [];

      if (allData.status === 'fulfilled') {
        locations = allData.value;
        console.log('✅ All locations loaded:', locations.length);
      } else if (troyData.status === 'fulfilled' && troyData.value) {
        // If only Troy loaded, use it plus other static fallbacks if available
        console.log('⚠️ Only Troy loaded, using Troy data');
        locations = [troyData.value];
      } else {
        throw new Error('Failed to load any location data');
      }
      
      // Ensure data is an array and has Troy
      if (!Array.isArray(locations) || locations.length === 0) {
        throw new Error('Invalid location data format');
      }

      console.log('🏛️ Troy location confirmed:', locations[0]?.name);
      setLocations(locations);
    } catch (err) {
      console.error('❌ Failed to load locations:', err);
      setError(err instanceof Error ? err.message : 'Failed to load locations');
      // Use empty array as fallback since we don't have static locations
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSagaFilter = (sagaId: string) => {
    setSelectedSaga(sagaId);
    // TODO: Implement saga filtering when backend supports it
    console.log('Filtering by saga:', sagaId);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    
    // P2: Check if this is Troy and show the Troy Saga info panel
    const isTroy = location.name.toLowerCase().includes('troy');
    
    if (isTroy) {
      console.log('🏛️ Troy hotspot tapped - showing Troy Saga panel');
      setSelectedSagaInfo(troyPageData);
      setShowSagaPanel(true);
    } else {
      // For other locations, show the standard alert
      Alert.alert(
        `📍 ${location.name}`,
        `${location.description}\n\n✨ ${location.significance}`,
        [{ text: 'Explore More', style: 'default' }]
      );
    }
  };

  // P2: Saga panel handlers
  const handleCloseSagaPanel = () => {
    setShowSagaPanel(false);
    setSelectedSagaInfo(null);
  };

  const handleSagaSelect = (sagaId: string) => {
    console.log('Selected saga:', sagaId);
    // TODO: Navigate to specific saga if needed
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e' }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>Loading Epic Timeline Map...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e', padding: 20 }}>
        <Text style={{ color: '#ff6b6b', fontSize: 18, marginBottom: 10 }}>Error Loading Map</Text>
        <Text style={{ color: '#fff', textAlign: 'center' }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Remove Header section completely */}
      
      {/* Remove Journey Toggle section completely */}

      {/* Map - Now takes up almost the full screen */}
      <View style={[styles.mapContainer, { flex: 1, margin: 0, padding: 0 }]}>
        <EpicTimelineMap
          locations={locations.map(transformLocationToEpicLocation)}
          selectedLocation={selectedLocation ? transformLocationToEpicLocation(selectedLocation) : null}
          showJourney={showJourney}
          onLocationPress={(epicLocation: EpicLocation) => {
            // Find the original Location object to use in our state
            const originalLocation = locations.find(loc => loc.id === epicLocation.id);
            if (originalLocation) {
              handleLocationSelect(originalLocation);
            }
          }}
        />
      </View>

      {/* Location Info Panel - Keep this at bottom if needed */}
      {selectedLocation && (
        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>📍 {selectedLocation.name}</Text>
          <Text style={styles.infoDescription}>{selectedLocation.description}</Text>
          <Text style={styles.infoSaga}>From: {(selectedLocation.saga || 'Unknown Saga').toUpperCase()}</Text>
        </View>
      )}

      {/* P2: Troy Saga Info Panel */}
      <SagaInfoPanel
        saga={selectedSagaInfo}
        isVisible={showSagaPanel}
        onClose={handleCloseSagaPanel}
        onSagaSelect={handleSagaSelect}
        animationType="slide-right"
      />
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