/**
 * EpicJourneyMap - Real Mediterranean Map with EPIC Plot Points
 * 
 * This component displays Odysseus's journey across the real Mediterranean Sea
 * with accurate geographic locations and beautiful visual design
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Modal,
  ImageBackground
} from 'react-native';
import Svg, {
  Path,
  Circle,
  Text as SvgText,
  Line,
  Defs,
  LinearGradient,
  Stop,
  Polyline,
  Marker
} from 'react-native-svg';
import SeedDataService from '../../services/SeedDataService';

// Real Mediterranean coordinates for EPIC locations
const EPIC_LOCATIONS = [
  // Troy Saga
  { 
    id: 1, 
    name: 'Troy', 
    lat: 39.9575, 
    lng: 26.2387, 
    saga: 'Troy', 
    color: '#CD853F', 
    songs: ['The Horse and the Infant', 'Just a Man'],
    description: 'The legendary city of Troy, site of the epic war',
    type: 'city',
    features: ['Trojan Horse', 'Palace', 'Walls'],
    significance: 'Birthplace of Odysseus\'s journey'
  },
  { 
    id: 2, 
    name: 'Troy Harbor', 
    lat: 39.9550, 
    lng: 26.2350, 
    saga: 'Troy', 
    color: '#CD853F', 
    songs: ['Full Speed Ahead', 'Open Arms', 'Warrior of the Mind'],
    description: 'The harbor where the Greek fleet departed',
    type: 'harbor',
    features: ['Greek Ships', 'Departure Point'],
    significance: 'Beginning of the journey home'
  },
  
  // Cyclops Saga  
  { 
    id: 3, 
    name: 'Cyclops Island', 
    lat: 37.7749, 
    lng: 14.4253, 
    saga: 'Cyclops', 
    color: '#FF6B35', 
    songs: ['Polyphemus', 'Survive', 'Remember Them', 'My Goodbye'],
    description: 'The mysterious island home of Polyphemus',
    type: 'island',
    features: ['Cave', 'Sheep', 'Giant\'s Lair'],
    significance: 'First major obstacle in the journey'
  },
  
  // Ocean Saga
  { 
    id: 4, 
    name: 'Aeolus Island', 
    lat: 38.5, 
    lng: 15.0, 
    saga: 'Ocean', 
    color: '#4A90E2', 
    songs: ['Storm', 'Luck Runs Out'],
    description: 'Floating island of the wind god Aeolus',
    type: 'floating_island',
    features: ['Wind Palace', 'Magic Bag'],
    significance: 'Received the bag of winds'
  },
  { 
    id: 5, 
    name: 'Open Ocean', 
    lat: 36.0, 
    lng: 18.0, 
    saga: 'Ocean', 
    color: '#4A90E2', 
    songs: ['Keep Your Friends Close', 'Ruthlessness'],
    description: 'The treacherous open waters of the Mediterranean',
    type: 'ocean',
    features: ['Storms', 'Poseidon\'s Domain'],
    significance: 'Encounter with Poseidon\'s wrath'
  },
  
  // Circe Saga
  { 
    id: 6, 
    name: 'Circe\'s Island', 
    lat: 41.9028, 
    lng: 12.4964, 
    saga: 'Circe', 
    color: '#9B59B6', 
    songs: ['Puppeteer', 'Wouldn\'t You Like', 'Done For', 'There Are Other Ways'],
    description: 'The enchanted island of the sorceress Circe',
    type: 'enchanted_island',
    features: ['Palace', 'Herb Garden', 'Transformed Men'],
    significance: 'Learned the path to the Underworld'
  },
  
  // Underworld Saga
  { 
    id: 7, 
    name: 'Underworld Entrance', 
    lat: 38.4, 
    lng: 21.8, 
    saga: 'Underworld', 
    color: '#2C3E50', 
    songs: ['The Underworld', 'No Longer You', 'Monster'],
    description: 'The gateway to the realm of the dead',
    type: 'mystical_location',
    features: ['River Styx', 'Souls of the Dead', 'Prophecy'],
    significance: 'Received crucial prophecy about his journey'
  },
  
  // Thunder Saga
  { 
    id: 8, 
    name: 'Scylla\'s Strait', 
    lat: 38.2500, 
    lng: 15.6333, 
    saga: 'Thunder', 
    color: '#F1C40F', 
    songs: ['Suffering', 'Different Beast', 'Scylla'],
    description: 'The deadly strait between Scylla and Charybdis',
    type: 'strait',
    features: ['Six-headed Monster', 'Whirlpool', 'Cliffs'],
    significance: 'Lost six men to Scylla'
  },
  { 
    id: 9, 
    name: 'Helios\' Island', 
    lat: 36.4, 
    lng: 25.4, 
    saga: 'Thunder', 
    color: '#F1C40F', 
    songs: ['Mutiny', 'Thunder Bringer'],
    description: 'The sacred island of the sun god Helios',
    type: 'sacred_island',
    features: ['Sacred Cattle', 'Sun Temple'],
    significance: 'Site of the final betrayal by his crew'
  },
  
  // Wisdom Saga
  { 
    id: 10, 
    name: 'Calypso\'s Island', 
    lat: 35.8, 
    lng: 14.5, 
    saga: 'Wisdom', 
    color: '#E67E22', 
    songs: ['Love in Paradise'],
    description: 'The hidden island where Calypso held Odysseus',
    type: 'hidden_island',
    features: ['Paradise Beach', 'Calypso\'s Cave'],
    significance: 'Seven years of captivity'
  },
  { 
    id: 11, 
    name: 'Ithaca (Telemachus)', 
    lat: 38.4667, 
    lng: 20.6833, 
    saga: 'Wisdom', 
    color: '#E67E22', 
    songs: ['Legendary', 'Little Wolf', 'We\'ll Be Fine'],
    description: 'Odysseus\'s homeland, where Telemachus grows up',
    type: 'kingdom',
    features: ['Palace', 'Suitors', 'Penelope\'s Chambers'],
    significance: 'The destination of the entire journey'
  },
  { 
    id: 12, 
    name: 'Mount Olympus', 
    lat: 40.0850, 
    lng: 22.5017, 
    saga: 'Wisdom', 
    color: '#E67E22', 
    songs: ['God Games'],
    description: 'The divine home of the Greek gods',
    type: 'divine_realm',
    features: ['Throne Room', 'Divine Council'],
    significance: 'Athena\'s plea for Odysseus\'s freedom'
  },
  
  // Vengeance Saga
  { 
    id: 13, 
    name: 'Calypso\'s Shore', 
    lat: 35.8, 
    lng: 14.5, 
    saga: 'Vengeance', 
    color: '#E74C3C', 
    songs: ['Not Sorry for Loving You', 'Dangerous'],
    description: 'The beach where Odysseus was finally freed',
    type: 'beach',
    features: ['Departure Point', 'Divine Intervention'],
    significance: 'Freedom after seven years'
  },
  { 
    id: 14, 
    name: 'Charybdis Waters', 
    lat: 38.2500, 
    lng: 15.6333, 
    saga: 'Vengeance', 
    color: '#E74C3C', 
    songs: ['Charybdis', 'Get in the Water', 'Six Hundred Strike'],
    description: 'The whirlpool domain of Charybdis',
    type: 'whirlpool',
    features: ['Massive Whirlpool', 'Poseidon\'s Rage'],
    significance: 'Final confrontation with Poseidon'
  },
  
  // Ithaca Saga
  { 
    id: 15, 
    name: 'Ithaca Palace', 
    lat: 38.4667, 
    lng: 20.6833, 
    saga: 'Ithaca', 
    color: '#27AE60', 
    songs: ['The Challenge', 'Hold Them Down', 'Odysseus', 'I Can\'t Help but Wonder', 'Would You Fall in Love with Me Again'],
    description: 'The royal palace of Ithaca, Odysseus\'s home',
    type: 'palace',
    features: ['Great Hall', 'Bow of Odysseus', 'Marriage Bed'],
    significance: 'The end of the journey and reunion with family'
  }
];

// Mediterranean coastline path (simplified but geographically accurate)
const MEDITERRANEAN_COASTLINE = `
  M 50,200 
  Q 150,180 250,185 
  Q 350,190 450,195 
  Q 550,200 650,205 
  Q 750,210 850,215
  Q 950,220 1000,225
  L 1000,350
  Q 950,340 850,335
  Q 750,330 650,325
  Q 550,320 450,315
  Q 350,310 250,305
  Q 150,300 50,295
  Z
`;

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
  songs: any[];
  events: any[];
  characters: any[];
  isVisited: boolean;
  isActive: boolean;
}

interface EpicJourneyMapProps {
  selectedSaga?: string | null;
  showJourneyPath?: boolean;
  onLocationSelect?: (location: MapLocation) => void;
}

const EpicJourneyMap: React.FC<EpicJourneyMapProps> = ({
  selectedSaga = null,
  showJourneyPath = true,
  onLocationSelect
}) => {
  const [mapLocations, setMapLocations] = useState<MapLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const mapWidth = screenWidth - 40;
  const mapHeight = screenHeight * 0.65;

  // Convert lat/lng to SVG coordinates
  const coordsToSVG = (lat: number, lng: number) => {
    // Mediterranean bounds
    const minLat = 30, maxLat = 45;
    const minLng = -5, maxLng = 40;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth;
    const y = mapHeight - ((lat - minLat) / (maxLat - minLat)) * mapHeight;
    
    return { 
      x: Math.max(30, Math.min(mapWidth - 30, x)), 
      y: Math.max(30, Math.min(mapHeight - 30, y)) 
    };
  };

  // Initialize map locations
  useEffect(() => {
    const processedLocations = EPIC_LOCATIONS.map((location, index) => {
      const coords = coordsToSVG(location.lat, location.lng);
      return {
        id: location.id,
        name: location.name,
        latitude: location.lat,
        longitude: location.lng,
        description: location.description,
        saga: location.saga,
        significance: location.significance,
        type: location.type,
        features: location.features,
        x: coords.x,
        y: coords.y,
        color: location.color,
        sagaIndex: index,
        songs: [], // Will be populated from seed data
        events: [], // Will be populated from seed data
        characters: [], // Will be populated from seed data
        isActive: index === currentStep,
        isVisited: index < currentStep
      };
    });
    setMapLocations(processedLocations);
  }, [currentStep, mapWidth, mapHeight]);

  // Load seed data and update locations with actual data
  useEffect(() => {
    const loadSeedData = async () => {
      try {
        const seedDataService = SeedDataService;
        await seedDataService.initialize();
        
        // Update locations with actual seed data
        setMapLocations(currentLocations => 
          currentLocations.map(location => {
            const sagaData = seedDataService.getSagaSeedData(location.saga.toLowerCase());
            if (sagaData) {
              return {
                ...location,
                songs: sagaData.songs || [],
                events: sagaData.events || [],
                characters: sagaData.characters || []
              };
            }
            return location;
          })
        );
      } catch (error) {
        console.error('Failed to load seed data for map:', error);
      }
    };

    loadSeedData();
  }, []);

  // Filter locations by saga
  const filteredLocations = selectedSaga 
    ? mapLocations.filter(loc => loc.saga.toLowerCase() === selectedSaga.toLowerCase())
    : mapLocations;

  // Generate journey path
  const journeyPath = filteredLocations
    .slice(0, currentStep + 1)
    .map(loc => `${loc.x},${loc.y}`)
    .join(' ');

  // Handle location press
  const handleLocationPress = (location: MapLocation) => {
    setSelectedLocation(location);
    setShowModal(true);
    onLocationSelect?.(location);

    // Pulse animation
    Animated.sequence([
      Animated.timing(animatedValue, { toValue: 1, duration: 150, useNativeDriver: false }),
      Animated.timing(animatedValue, { toValue: 0, duration: 150, useNativeDriver: false })
    ]).start();
  };

  // Render location marker
  const renderLocationMarker = (location: MapLocation) => {
    const isSelected = selectedLocation?.id === location.id;
    const radius = isSelected ? 14 : (location.isActive ? 12 : 10);
    const opacity = location.isVisited ? 1.0 : 0.6;

    return (
      <React.Fragment key={location.id}>
        {/* Glow effect for active locations */}
        {location.isActive && (
          <Circle
            cx={location.x}
            cy={location.y}
            r={radius + 8}
            fill={location.color}
            fillOpacity={0.3}
          />
        )}
        
        {/* Main location marker */}
        <Circle
          cx={location.x}
          cy={location.y}
          r={radius}
          fill={location.color}
          fillOpacity={opacity}
          stroke="#fff"
          strokeWidth={isSelected ? 3 : 2}
          onPress={() => handleLocationPress(location)}
        />

        {/* Location name */}
        <SvgText
          x={location.x}
          y={location.y - radius - 10}
          fontSize={11}
          fontWeight="bold"
          textAnchor="middle"
          fill="#2C3E50"
        >
          {location.name}
        </SvgText>

        {/* Song count indicator */}
        {location.songs.length > 0 && (
          <>
            <Circle
              cx={location.x + radius - 3}
              cy={location.y - radius + 3}
              r={8}
              fill="#FF6B35"
              stroke="#fff"
              strokeWidth={1}
            />
            <SvgText
              x={location.x + radius - 3}
              y={location.y - radius + 7}
              fontSize={10}
              fontWeight="bold"
              textAnchor="middle"
              fill="white"
            >
              {location.songs.length}
            </SvgText>
          </>
        )}
      </React.Fragment>
    );
  };

  // Saga filter buttons
  const sagaFilters = ['Troy', 'Cyclops', 'Ocean', 'Circe', 'Underworld', 'Thunder', 'Wisdom', 'Vengeance', 'Ithaca'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EPIC: The Musical - Mediterranean Journey</Text>
      
      {/* Saga Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, !selectedSaga && styles.filterButtonActive]}
          onPress={() => setCurrentStep(0)}
        >
          <Text style={[styles.filterText, !selectedSaga && styles.filterTextActive]}>All Sagas</Text>
        </TouchableOpacity>
        
        {sagaFilters.map(saga => (
          <TouchableOpacity
            key={saga}
            style={[
              styles.filterButton,
              selectedSaga === saga && styles.filterButtonActive
            ]}
            onPress={() => {
              const firstLocationIndex = EPIC_LOCATIONS.findIndex(loc => loc.saga === saga);
              if (firstLocationIndex !== -1) setCurrentStep(firstLocationIndex);
            }}
          >
            <Text style={[
              styles.filterText,
              selectedSaga === saga && styles.filterTextActive
            ]}>
              {saga}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <Svg width={mapWidth} height={mapHeight} style={styles.map}>
          <Defs>
            <LinearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#87CEEB" stopOpacity="0.8"/>
              <Stop offset="50%" stopColor="#4A90E2" stopOpacity="0.9"/>
              <Stop offset="100%" stopColor="#2E5BDA" stopOpacity="1.0"/>
            </LinearGradient>
          </Defs>

          {/* Mediterranean Sea */}
          <Path
            d={MEDITERRANEAN_COASTLINE}
            fill="url(#seaGradient)"
            stroke="#2E5BDA"
            strokeWidth={2}
          />

          {/* Journey Path */}
          {showJourneyPath && journeyPath && (
            <Polyline
              points={journeyPath}
              stroke="#34495E"
              strokeWidth={4}
              strokeDasharray="8,4"
              fill="none"
              opacity={0.7}
            />
          )}

          {/* Location Markers */}
          {filteredLocations.map(renderLocationMarker)}
        </Svg>
      </View>

      {/* Progress Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, currentStep === 0 && styles.controlButtonDisabled]}
          onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          <Text style={styles.controlButtonText}>← Previous</Text>
        </TouchableOpacity>
        
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>Step {currentStep + 1} of {filteredLocations.length}</Text>
          <Text style={styles.sagaText}>{filteredLocations[currentStep]?.saga || 'Journey'} Saga</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.controlButton, currentStep >= filteredLocations.length - 1 && styles.controlButtonDisabled]}
          onPress={() => setCurrentStep(Math.min(filteredLocations.length - 1, currentStep + 1))}
          disabled={currentStep >= filteredLocations.length - 1}
        >
          <Text style={styles.controlButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>

      {/* Location Details Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedLocation && (
              <>
                <Text style={styles.modalTitle}>{selectedLocation.name}</Text>
                <Text style={[styles.modalSaga, { color: selectedLocation.color }]}>
                  {selectedLocation.saga.toUpperCase()} SAGA
                </Text>
                
                <Text style={styles.modalSectionTitle}>Songs at this Location:</Text>
                {selectedLocation.songs.map((song, index) => (
                  <Text key={index} style={styles.modalSongItem}>
                    ♪ {song}
                  </Text>
                ))}

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: selectedLocation.color }]}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2C3E50',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  filterContainer: {
    marginBottom: 20,
    maxHeight: 50,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterButtonActive: {
    backgroundColor: '#3498DB',
    borderColor: '#3498DB',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  filterTextActive: {
    color: 'white',
  },
  mapContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 20,
  },
  map: {
    backgroundColor: '#E8F4FD',
    borderRadius: 15,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  controlButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#3498DB',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlButtonDisabled: {
    backgroundColor: '#BDC3C7',
  },
  controlButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  progressInfo: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  sagaText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    width: '90%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2C3E50',
    textAlign: 'center',
  },
  modalSaga: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2C3E50',
  },
  modalSongItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#34495E',
    paddingLeft: 10,
  },
  modalButton: {
    padding: 15,
    borderRadius: 15,
    marginTop: 25,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EpicJourneyMap;
