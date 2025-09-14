/**
 * EpicInteractiveMap - Enhanced Intera// Types for the interactive map
interface MapLocation extends SagaLocation {
  x: number;
  y: number;
  color: string;
  sagaIndex: number;
  songs: Song[];
  events: ApiEvent[];
  characters: Character[];
  isVisited: boolean;
  isActive: boolean;
}r All EPIC Sagas
 * 
 * This component creates a comprehensive interactive map showing all locations,
 * events, songs, and characters across the entire EPIC: The Musical journey.
 * 
 * Features:
 * - All 9 sagas with comprehensive seed data
 * - Interactive location hotspots with detailed information
 * - Song and event timeline integration
 * - Character relationship visualization
 * - Saga filtering and progression tracking
 * - Journey path visualization
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Alert,
  Modal,
  FlatList
} from 'react-native';
import Svg, {
  Path,
  Circle,
  Text as SvgText,
  Line,
  Defs,
  RadialGradient,
  Stop,
  Polyline,
  Polygon
} from 'react-native-svg';
import SeedDataService, { SagaLocation, SagaSeedData } from '../../services/SeedDataService';
import { Song } from '../Audio/SongList';
import { ApiEvent, Character } from '../../services/EventService';

// Types for the interactive map
interface MapLocation extends SagaLocation {
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

interface SagaTheme {
  name: string;
  color: string;
  darkColor: string;
  lightColor: string;
  index: number;
}

// Saga themes and colors based on the musical
const SAGA_THEMES: SagaTheme[] = [
  { name: 'troy', color: '#CD853F', darkColor: '#8B4513', lightColor: '#DEB887', index: 0 },
  { name: 'cyclops', color: '#FF6B35', darkColor: '#B8441F', lightColor: '#FFA07A', index: 1 },
  { name: 'ocean', color: '#4A90E2', darkColor: '#2E5BDA', lightColor: '#87CEEB', index: 2 },
  { name: 'circe', color: '#9B59B6', darkColor: '#7D3C98', lightColor: '#DDA0DD', index: 3 },
  { name: 'underworld', color: '#2C3E50', darkColor: '#1B2631', lightColor: '#5D6D7E', index: 4 },
  { name: 'thunder', color: '#F1C40F', darkColor: '#D4AC0D', lightColor: '#F7DC6F', index: 5 },
  { name: 'wisdom', color: '#E67E22', darkColor: '#CA6F1E', lightColor: '#F8C471', index: 6 },
  { name: 'vengeance', color: '#E74C3C', darkColor: '#CB4335', lightColor: '#F1948A', index: 7 },
  { name: 'ithaca', color: '#27AE60', darkColor: '#229954', lightColor: '#82E0AA', index: 8 }
];

// Convert geographic coordinates to SVG coordinates
const coordsToSVG = (lat: number, lon: number, mapWidth: number, mapHeight: number) => {
  // Mediterranean bounds (approximate)
  const minLat = 30, maxLat = 45;
  const minLon = -10, maxLon = 40;
  
  const x = ((lon - minLon) / (maxLon - minLon)) * mapWidth;
  const y = mapHeight - ((lat - minLat) / (maxLat - minLat)) * mapHeight;
  
  return { x: Math.max(50, Math.min(mapWidth - 50, x)), y: Math.max(50, Math.min(mapHeight - 50, y)) };
};

// Mediterranean coastline path for visual context
const MEDITERRANEAN_COASTLINE = "M50,300 Q200,250 350,280 Q500,260 650,300 Q800,280 950,300 Q950,200 800,180 Q650,160 500,180 Q350,160 200,180 Q50,200 50,300 Z";

interface EpicInteractiveMapProps {
  onLocationSelect?: (location: MapLocation) => void;
  selectedSaga?: string | null;
  showJourneyPath?: boolean;
  interactive?: boolean;
}

const EpicInteractiveMap: React.FC<EpicInteractiveMapProps> = ({
  onLocationSelect,
  selectedSaga = null,
  showJourneyPath = true,
  interactive = true
}) => {
  const [seedDataService] = useState(() => SeedDataService);
  const [allLocations, setAllLocations] = useState<MapLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [filterSaga, setFilterSaga] = useState<string | null>(selectedSaga);
  const [currentProgress, setCurrentProgress] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const mapWidth = screenWidth - 40;
  const mapHeight = screenHeight * 0.6;

  // Initialize seed data and process locations
  useEffect(() => {
    const initializeMap = async () => {
      setIsLoading(true);
      try {
        await seedDataService.initialize();
        const processedLocations = await processAllSagaLocations();
        setAllLocations(processedLocations);
      } catch (error) {
        console.error('Failed to initialize interactive map:', error);
        Alert.alert('Map Error', 'Failed to load saga data for the interactive map.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeMap();
  }, []);

  // Process all saga locations into map locations
  const processAllSagaLocations = async (): Promise<MapLocation[]> => {
    const allMapLocations: MapLocation[] = [];
    const availableSagas = seedDataService.getAvailableSagas();

    for (const sagaId of availableSagas) {
      const sagaData = seedDataService.getSagaSeedData(sagaId);
      if (!sagaData) continue;

      const sagaTheme = SAGA_THEMES.find(theme => theme.name === sagaId);
      if (!sagaTheme) continue;

      // Process each location in the saga
      sagaData.locations.forEach((location: SagaLocation, index: number) => {
        const svgCoords = coordsToSVG(location.latitude, location.longitude, mapWidth, mapHeight);
        
        const mapLocation: MapLocation = {
          ...location,
          x: svgCoords.x,
          y: svgCoords.y,
          color: sagaTheme.color,
          sagaIndex: sagaTheme.index,
          songs: sagaData.songs.filter((song: Song) => 
            song.saga?.title?.toLowerCase().includes(sagaId) ||
            (song.description && song.description.toLowerCase().includes(location.name.toLowerCase()))
          ),
          events: sagaData.events.filter((event: ApiEvent) => 
            event.location?.name === location.name ||
            event.location?.id === location.id
          ),
          characters: sagaData.characters.filter((character: Character) =>
            (character.description && character.description.toLowerCase().includes(location.name.toLowerCase())) ||
            sagaData.events.some((event: ApiEvent) => 
              event.location?.name === location.name && 
              event.characters.some((char: any) => char.id === character.id)
            )
          ),
          isVisited: sagaTheme.index < currentProgress,
          isActive: sagaTheme.index === currentProgress
        };

        allMapLocations.push(mapLocation);
      });
    }

    // Sort by saga order for journey progression
    return allMapLocations.sort((a, b) => {
      if (a.sagaIndex !== b.sagaIndex) return a.sagaIndex - b.sagaIndex;
      return a.id - b.id;
    });
  };

  // Filter locations based on selected saga
  const filteredLocations = useMemo(() => {
    if (!filterSaga) return allLocations;
    return allLocations.filter(location => location.saga === filterSaga);
  }, [allLocations, filterSaga]);

  // Generate journey path
  const journeyPath = useMemo(() => {
    const pathLocations = filterSaga ? filteredLocations : allLocations;
    return pathLocations
      .slice(0, currentProgress + 1)
      .map(loc => `${loc.x},${loc.y}`)
      .join(' ');
  }, [filteredLocations, allLocations, filterSaga, currentProgress]);

  // Handle location press
  const handleLocationPress = (location: MapLocation) => {
    if (!interactive) return;

    setSelectedLocation(location);
    setShowDetails(true);
    onLocationSelect?.(location);

    // Animate selection
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      })
    ]).start();
  };

  // Render location hotspot
  const renderLocationHotspot = (location: MapLocation) => {
    const isSelected = selectedLocation?.id === location.id;
    const radius = isSelected ? 12 : (location.isActive ? 10 : 8);
    const strokeWidth = isSelected ? 3 : (location.isActive ? 2 : 1);

    return (
      <React.Fragment key={location.id}>
        {/* Glow effect for active/selected locations */}
        {(location.isActive || isSelected) && (
          <Circle
            cx={location.x}
            cy={location.y}
            r={radius + 5}
            fill={location.color}
            fillOpacity={0.3}
          />
        )}
        
        {/* Main location circle */}
        <Circle
          cx={location.x}
          cy={location.y}
          r={radius}
          fill={location.isVisited ? location.color : '#ddd'}
          stroke={isSelected ? '#fff' : location.color}
          strokeWidth={strokeWidth}
          onPress={() => handleLocationPress(location)}
        />

        {/* Location label */}
        <SvgText
          x={location.x}
          y={location.y - radius - 8}
          fontSize={10}
          fontWeight="bold"
          textAnchor="middle"
          fill={location.color}
        >
          {location.name}
        </SvgText>

        {/* Song count indicator */}
        {location.songs.length > 0 && (
          <Circle
            cx={location.x + radius - 2}
            cy={location.y - radius + 2}
            r={6}
            fill="#FF6B35"
          />
        )}
        {location.songs.length > 0 && (
          <SvgText
            x={location.x + radius - 2}
            y={location.y - radius + 5}
            fontSize={8}
            textAnchor="middle"
            fill="white"
          >
            {location.songs.length}
          </SvgText>
        )}
      </React.Fragment>
    );
  };

  // Render saga filter buttons
  const renderSagaFilters = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
      <TouchableOpacity
        style={[styles.filterButton, !filterSaga && styles.filterButtonActive]}
        onPress={() => setFilterSaga(null)}
      >
        <Text style={[styles.filterText, !filterSaga && styles.filterTextActive]}>All Sagas</Text>
      </TouchableOpacity>
      
      {SAGA_THEMES.map(theme => (
        <TouchableOpacity
          key={theme.name}
          style={[
            styles.filterButton,
            { borderColor: theme.color },
            filterSaga === theme.name && { backgroundColor: theme.color }
          ]}
          onPress={() => setFilterSaga(filterSaga === theme.name ? null : theme.name)}
        >
          <Text style={[
            styles.filterText,
            filterSaga === theme.name && { color: 'white' }
          ]}>
            {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // Render location details modal
  const renderLocationDetails = () => (
    <Modal
      visible={showDetails}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowDetails(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {selectedLocation && (
            <>
              <Text style={styles.modalTitle}>{selectedLocation.name}</Text>
              <Text style={styles.modalSaga}>{selectedLocation.saga.toUpperCase()} SAGA</Text>
              <Text style={styles.modalDescription}>{selectedLocation.description}</Text>
              
              {selectedLocation.songs.length > 0 && (
                <>
                  <Text style={styles.modalSectionTitle}>Songs ({selectedLocation.songs.length})</Text>
                  {selectedLocation.songs.map(song => (
                    <Text key={song.id} style={styles.modalListItem}>♪ {song.title}</Text>
                  ))}
                </>
              )}

              {selectedLocation.events.length > 0 && (
                <>
                  <Text style={styles.modalSectionTitle}>Events ({selectedLocation.events.length})</Text>
                  {selectedLocation.events.slice(0, 3).map(event => (
                    <Text key={event.id} style={styles.modalListItem}>• {event.title}</Text>
                  ))}
                  {selectedLocation.events.length > 3 && (
                    <Text style={styles.modalListItem}>... and {selectedLocation.events.length - 3} more</Text>
                  )}
                </>
              )}

              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowDetails(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading EPIC Journey Map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EPIC: The Musical - Interactive Journey Map</Text>
      
      {renderSagaFilters()}

      <View style={styles.mapContainer}>
        <Svg width={mapWidth} height={mapHeight} style={styles.map}>
          <Defs>
            <RadialGradient id="oceanGradient" cx="50%" cy="50%">
              <Stop offset="0%" stopColor="#4A90E2" stopOpacity="0.8"/>
              <Stop offset="100%" stopColor="#2E5BDA" stopOpacity="0.3"/>
            </RadialGradient>
          </Defs>

          {/* Mediterranean background */}
          <Path
            d={MEDITERRANEAN_COASTLINE}
            fill="url(#oceanGradient)"
            stroke="#2E5BDA"
            strokeWidth={2}
          />

          {/* Journey path */}
          {showJourneyPath && journeyPath && (
            <Polyline
              points={journeyPath}
              stroke="#34495E"
              strokeWidth={3}
              strokeDasharray="5,5"
              fill="none"
            />
          )}

          {/* Location hotspots */}
          {filteredLocations.map(renderLocationHotspot)}
        </Svg>
      </View>

      {/* Progress controls */}
      <View style={styles.progressContainer}>
        <TouchableOpacity
          style={styles.progressButton}
          onPress={() => setCurrentProgress(Math.max(0, currentProgress - 1))}
          disabled={currentProgress === 0}
        >
          <Text style={styles.progressButtonText}>← Previous</Text>
        </TouchableOpacity>
        
        <Text style={styles.progressText}>
          {currentProgress + 1} / {filteredLocations.length} locations
        </Text>
        
        <TouchableOpacity
          style={styles.progressButton}
          onPress={() => setCurrentProgress(Math.min(filteredLocations.length - 1, currentProgress + 1))}
          disabled={currentProgress >= filteredLocations.length - 1}
        >
          <Text style={styles.progressButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>

      {renderLocationDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2C3E50',
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
  filterContainer: {
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  filterButtonActive: {
    backgroundColor: '#2C3E50',
    borderColor: '#2C3E50',
  },
  filterText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
  filterTextActive: {
    color: 'white',
  },
  mapContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  map: {
    backgroundColor: '#E8F4FD',
    borderRadius: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  progressButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3498DB',
    borderRadius: 20,
  },
  progressButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2C3E50',
  },
  modalSaga: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3498DB',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    color: '#34495E',
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#2C3E50',
  },
  modalListItem: {
    fontSize: 14,
    marginBottom: 5,
    color: '#34495E',
    paddingLeft: 10,
  },
  modalCloseButton: {
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  modalCloseText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EpicInteractiveMap;
