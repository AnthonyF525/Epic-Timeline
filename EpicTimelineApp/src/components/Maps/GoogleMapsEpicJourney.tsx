/**
 * GoogleMapsEpicJourney - Real Mediterranean Map with Google Maps
 * 
 * This component replaces the SVG map with real Google Maps showing
 * actual Mediterranean locations from EPIC: The Musical
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Alert
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

// Real Mediterranean coordinates for EPIC locations
const EPIC_REAL_LOCATIONS = [
  {
    id: 1,
    name: 'Troy',
    saga: 'Troy',
    latitude: 39.9574,
    longitude: 26.2394,
    color: '#E74C3C',
    description: 'The ancient city of Troy (Hisarlik, Turkey) - where the legendary Trojan War took place.',
    songs: ['The Horse and the Infant', 'Just a Man', 'Full Speed Ahead', 'Open Arms', 'Warrior of the Mind'],
    characters: [
      { name: 'Odysseus', title: 'King of Ithaca', description: 'The clever hero who devised the Trojan Horse' },
      { name: 'Athena', title: 'Goddess of Wisdom', description: 'Divine patron of Odysseus' }
    ]
  },
  {
    id: 2,
    name: 'Sicily (Cyclops Island)',
    saga: 'Cyclops',
    latitude: 37.0625,
    longitude: 15.0871,
    color: '#F39C12',
    description: 'Sicily, Italy - home of the Cyclops Polyphemus in Greek mythology.',
    songs: ['Polyphemus', 'Survive', 'Remember Them', 'My Goodbye'],
    characters: [
      { name: 'Polyphemus', title: 'Cyclops', description: 'The giant one-eyed son of Poseidon' },
      { name: 'Odysseus', title: 'King of Ithaca', description: 'Uses wit to escape the Cyclops' }
    ]
  },
  {
    id: 3,
    name: 'Lipari Islands (Aeolus)',
    saga: 'Ocean',
    latitude: 38.4869,
    longitude: 14.9637,
    color: '#3498DB',
    description: 'The Aeolian Islands off Sicily - domain of Aeolus, keeper of the winds.',
    songs: ['Storm', 'Luck Runs Out', 'Keep Your Friends Close', 'Ruthlessness'],
    characters: [
      { name: 'Aeolus', title: 'Wind God', description: 'Divine keeper of the winds' },
      { name: 'Poseidon', title: 'God of the Sea', description: 'Divine enemy of Odysseus' }
    ]
  },
  {
    id: 4,
    name: 'Monte Circeo (Circe\'s Island)',
    saga: 'Circe',
    latitude: 41.2033,
    longitude: 13.0508,
    color: '#9B59B6',
    description: 'Monte Circeo, Italy - the promontory associated with the sorceress Circe.',
    songs: ['Puppeteer', 'Wouldn\'t You Like', 'Done For', 'There Are Other Ways'],
    characters: [
      { name: 'Circe', title: 'Sorceress', description: 'Powerful witch who transforms men into pigs' },
      { name: 'Hermes', title: 'Messenger God', description: 'Divine guide who helps Odysseus' }
    ]
  },
  {
    id: 5,
    name: 'Cape Taenarum (Underworld Entrance)',
    saga: 'Underworld',
    latitude: 36.3922,
    longitude: 22.4789,
    color: '#34495E',
    description: 'Cape Taenarum, Greece - mythical entrance to the Underworld.',
    songs: ['The Underworld', 'No Longer You', 'Monster'],
    characters: [
      { name: 'Tiresias', title: 'Blind Prophet', description: 'Spirit who reveals the future to Odysseus' },
      { name: 'Anticlea', title: 'Odysseus\' Mother', description: 'Spirit of Odysseus\' deceased mother' }
    ]
  },
  {
    id: 6,
    name: 'Strait of Messina (Scylla & Charybdis)',
    saga: 'Thunder',
    latitude: 38.2466,
    longitude: 15.6912,
    color: '#F1C40F',
    description: 'The narrow strait between Sicily and Calabria - home of Scylla and Charybdis.',
    songs: ['Suffering', 'Different Beast', 'Scylla', 'Mutiny', 'Thunder Bringer'],
    characters: [
      { name: 'Scylla', title: 'Six-Headed Monster', description: 'Terrifying sea monster' },
      { name: 'Zeus', title: 'King of Gods', description: 'Divine judge who tests Odysseus' }
    ]
  },
  {
    id: 7,
    name: 'Ogygia (Calypso\'s Island)',
    saga: 'Wisdom',
    latitude: 35.8617,
    longitude: 14.3754,
    color: '#3498DB',
    description: 'Mythical island of Calypso - often placed near Malta or Gozo.',
    songs: ['Legendary', 'Little Wolf', 'We\'ll Be Fine', 'Love in Paradise', 'God Games'],
    characters: [
      { name: 'Calypso', title: 'Immortal Nymph', description: 'Divine being who holds Odysseus captive' },
      { name: 'Athena', title: 'Goddess of Wisdom', description: 'Advocates for Odysseus\' release' }
    ]
  },
  {
    id: 8,
    name: 'Ithaca, Greece',
    saga: 'Ithaca',
    latitude: 38.4419,
    longitude: 20.6611,
    color: '#E74C3C',
    description: 'The island kingdom of Ithaca - Odysseus\' homeland and final destination.',
    songs: ['The Challenge', 'Hold Them Down', 'Odysseus', 'I Can\'t Help But Wonder', 'Would You Fall in Love with Me Again'],
    characters: [
      { name: 'Penelope', title: 'Queen of Ithaca', description: 'Faithful wife of Odysseus' },
      { name: 'Antinous', title: 'Leader of Suitors', description: 'Main antagonist in Ithaca' },
      { name: 'Telemachus', title: 'Prince of Ithaca', description: 'Son of Odysseus and Penelope' }
    ]
  }
];

const SAGA_COLORS = {
  'Troy': '#E74C3C',
  'Cyclops': '#F39C12',
  'Ocean': '#3498DB',
  'Circe': '#9B59B6',
  'Underworld': '#34495E',
  'Thunder': '#F1C40F',
  'Wisdom': '#3498DB',
  'Vengeance': '#16A085',
  'Ithaca': '#E74C3C'
};

interface GoogleMapsEpicJourneyProps {
  selectedSaga?: string | null;
  showJourneyPath?: boolean;
  onLocationSelect?: (location: any) => void;
}

const GoogleMapsEpicJourney: React.FC<GoogleMapsEpicJourneyProps> = ({
  selectedSaga = null,
  showJourneyPath = true,
  onLocationSelect
}) => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Filter locations by selected saga
  const filteredLocations = selectedSaga 
    ? EPIC_REAL_LOCATIONS.filter(loc => loc.saga.toLowerCase() === selectedSaga.toLowerCase())
    : EPIC_REAL_LOCATIONS;

  // Create journey path coordinates
  const journeyPathCoordinates = filteredLocations.map(location => ({
    latitude: location.latitude,
    longitude: location.longitude
  }));

  // Mediterranean region bounds
  const mediterraneanRegion = {
    latitude: 38.0,
    longitude: 20.0,
    latitudeDelta: 12.0,
    longitudeDelta: 20.0,
  };

  const handleMarkerPress = (location: any) => {
    console.log('◦  Real location pressed:', location.name);
    setSelectedLocation(location);
    setShowModal(true);
    onLocationSelect?.(location);
  };

  const handleSongPress = (songTitle: string) => {
    console.log('• Song pressed:', songTitle);
    // TODO: Integrate with Spotify API
    Alert.alert('Song Selected', `"${songTitle}" - Spotify integration coming soon!`);
  };

  const renderLocationModal = () => (
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
              {/* Header with Back Button */}
              <View style={styles.modalHeader}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.backButtonText}>← Back to Map</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.modalTitle}>{selectedLocation.name}</Text>
              <Text style={[styles.modalSaga, { color: selectedLocation.color }]}>
                {selectedLocation.saga.toUpperCase()} SAGA
              </Text>
              
              <Text style={styles.modalDescription}>{selectedLocation.description}</Text>
              
              {/* Songs Section */}
              <Text style={styles.modalSectionTitle}>Songs at this Location:</Text>
              {selectedLocation.songs.map((song: string, index: number) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.modalSongItem}
                  onPress={() => handleSongPress(song)}
                >
                  <Text style={styles.songText}>• {song}</Text>
                  <Text style={styles.playIcon}>▶•</Text>
                </TouchableOpacity>
              ))}

              {/* Characters Section */}
              <Text style={styles.modalSectionTitle}>Characters at this Location:</Text>
              {selectedLocation.characters.map((character: any, index: number) => (
                <View key={index} style={styles.characterCard}>
                  <Text style={styles.characterName}>
                    {character.name} - {character.title}
                  </Text>
                  <Text style={styles.characterDescription}>
                    {character.description}
                  </Text>
                </View>
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
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EPIC: The Musical - Real Mediterranean Journey</Text>
      
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={mediterraneanRegion}
          onMapReady={() => setMapReady(true)}
          mapType="hybrid" // Shows satellite imagery with labels
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
        >
          {/* Journey Path */}
          {showJourneyPath && journeyPathCoordinates.length > 1 && (
            <Polyline
              coordinates={journeyPathCoordinates}
              strokeColor="#FFD700"
              strokeWidth={3}
              lineDashPattern={[5, 5]}
            />
          )}

          {/* Location Markers */}
          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              title={location.name}
              description={`${location.saga} Saga - ${location.songs.length} songs`}
              onPress={() => handleMarkerPress(location)}
              pinColor={location.color}
            />
          ))}
        </MapView>
      </View>

      {/* Map Legend */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>◦  Real Mediterranean Locations</Text>
        <Text style={styles.legendText}>Tap markers to explore songs and characters</Text>
      </View>

      {renderLocationModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#2C3E50',
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  legendContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    maxHeight: '80%',
    minWidth: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  backButton: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
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
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    color: '#34495E',
    textAlign: 'center',
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#2C3E50',
  },
  modalSongItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  songText: {
    color: '#2C3E50',
    fontSize: 14,
    flex: 1,
  },
  playIcon: {
    color: '#27AE60',
    fontSize: 16,
  },
  characterCard: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  characterDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 18,
  },
  modalButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoogleMapsEpicJourney;
export { EPIC_REAL_LOCATIONS, SAGA_COLORS };
