/**
 * EpicGoogleMap - Real Mediterranean Map for EPIC: The Musical
 * 
 * Uses Google Maps to show actual geographic locations from Odysseus's journey
 * across the Mediterranean Sea, with accurate coordinates for Troy, Ithaca, etc.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';

// Real geographic coordinates for EPIC locations
const EPIC_REAL_LOCATIONS = {
  'Troy': { 
    latitude: 39.9570, 
    longitude: 26.2390, 
    title: 'Troy (Hisarlik, Turkey)',
    description: 'Ancient city of Troy, site of the legendary Trojan War',
    saga: 'Troy',
    color: '#E74C3C'
  },
  'Ismarus': {
    latitude: 40.9167,
    longitude: 25.8667,
    title: 'Ismarus (Thrace)',
    description: 'First stop after Troy, land of the Cicones',
    saga: 'Troy', 
    color: '#E74C3C'
  },
  'Lotus Eaters Island': {
    latitude: 33.9249,
    longitude: 18.3403,
    title: 'Djerba Island (Tunisia)',
    description: 'Possible location of the Lotus Eaters',
    saga: 'Troy',
    color: '#E74C3C'
  },
  'Cyclops Island': { 
    latitude: 37.7510, 
    longitude: 14.9934, 
    title: 'Sicily (Mount Etna)',
    description: 'Home of Polyphemus the Cyclops, near Mount Etna',
    saga: 'Cyclops',
    color: '#F39C12'
  },
  'Aeolus Island': { 
    latitude: 38.4869, 
    longitude: 14.9637, 
    title: 'Lipari Islands (Italy)',
    description: 'Floating island of Aeolus, keeper of the winds',
    saga: 'Ocean',
    color: '#3498DB'
  },
  'Laestrygonians': {
    latitude: 41.2033,
    longitude: 13.8508,
    title: 'Formia (Italy)', 
    description: 'Land of the giant cannibals',
    saga: 'Ocean',
    color: '#3498DB'
  },
  'Circe Island': { 
    latitude: 41.2033, 
    longitude: 12.8508, 
    title: 'Monte Circeo (Italy)',
    description: 'Circe\'s magical island, now a promontory in Italy',
    saga: 'Circe',
    color: '#9B59B6'
  },
  'Gates of Hades': {
    latitude: 36.9214,
    longitude: 22.4889,
    title: 'Cape Matapan (Greece)',
    description: 'Entrance to the Underworld in Greek mythology',
    saga: 'Underworld',
    color: '#34495E'
  },
  'Sirens Rock': {
    latitude: 40.6311,
    longitude: 14.0522,
    title: 'Capri Island (Italy)',
    description: 'Island of the deadly Sirens',
    saga: 'Thunder',
    color: '#F1C40F'
  },
  'Strait of Messina': { 
    latitude: 38.2466, 
    longitude: 15.6912, 
    title: 'Strait of Messina (Sicily)',
    description: 'Narrow passage between Scylla and Charybdis',
    saga: 'Thunder',
    color: '#F1C40F'
  },
  'Thrinacia Island': {
    latitude: 37.5079,
    longitude: 15.0830,
    title: 'Sicily (Eastern Coast)',
    description: 'Island of Helios\'s sacred cattle',
    saga: 'Thunder',
    color: '#F1C40F'
  },
  'Calypso Island': {
    latitude: 35.8617,
    longitude: 14.3754,
    title: 'Gozo Island (Malta)',
    description: 'Ogygia, Calypso\'s island paradise',
    saga: 'Wisdom',
    color: '#3498DB'
  },
  'Ithaca': { 
    latitude: 38.4419, 
    longitude: 20.6611, 
    title: 'Ithaca Island (Greece)',
    description: 'Odysseus\'s homeland and final destination',
    saga: 'Ithaca',
    color: '#27AE60'
  }
};

// Journey path coordinates in order
const ODYSSEY_PATH = [
  EPIC_REAL_LOCATIONS['Troy'],
  EPIC_REAL_LOCATIONS['Ismarus'],
  EPIC_REAL_LOCATIONS['Lotus Eaters Island'],
  EPIC_REAL_LOCATIONS['Cyclops Island'],
  EPIC_REAL_LOCATIONS['Aeolus Island'],
  EPIC_REAL_LOCATIONS['Laestrygonians'],
  EPIC_REAL_LOCATIONS['Circe Island'],
  EPIC_REAL_LOCATIONS['Gates of Hades'],
  EPIC_REAL_LOCATIONS['Sirens Rock'],
  EPIC_REAL_LOCATIONS['Strait of Messina'],
  EPIC_REAL_LOCATIONS['Thrinacia Island'],
  EPIC_REAL_LOCATIONS['Calypso Island'],
  EPIC_REAL_LOCATIONS['Ithaca']
];

interface EpicGoogleMapProps {
  selectedSaga?: string | null;
  onLocationSelect?: (location: any) => void;
  showJourneyPath?: boolean;
}

const EpicGoogleMap: React.FC<EpicGoogleMapProps> = ({
  selectedSaga = null,
  onLocationSelect,
  showJourneyPath = true
}) => {
  const [region, setRegion] = useState<Region>({
    latitude: 38.0, // Center of Mediterranean
    longitude: 20.0,
    latitudeDelta: 12.0, // Zoom level to show Mediterranean
    longitudeDelta: 15.0,
  });

  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  // Filter locations by saga
  const filteredLocations = selectedSaga 
    ? Object.values(EPIC_REAL_LOCATIONS).filter(loc => 
        loc.saga.toLowerCase() === selectedSaga.toLowerCase()
      )
    : Object.values(EPIC_REAL_LOCATIONS);

  // Handle marker press
  const handleMarkerPress = (location: any) => {
    setSelectedLocation(location);
    onLocationSelect?.(location);
    
    // Show location details
    Alert.alert(
      location.title,
      `${location.description}\n\n${location.saga} Saga`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  // Mediterranean map style
  const mapStyle = [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#a2daf2" }]
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry",
      stylers: [{ color: "#f7f1df" }]
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry", 
      stylers: [{ color: "#d0e3b4" }]
    }
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        customMapStyle={mapStyle}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
      >
        {/* Journey Path Polyline */}
        {showJourneyPath && (
          <Polyline
            coordinates={ODYSSEY_PATH.map(loc => ({
              latitude: loc.latitude,
              longitude: loc.longitude
            }))}
            strokeColor="#34495E"
            strokeWidth={3}
            strokePattern={[10, 5]} // Dashed line
          />
        )}

        {/* Location Markers */}
        {filteredLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            title={location.title}
            description={location.description}
            pinColor={location.color}
            onPress={() => handleMarkerPress(location)}
          >
            {/* Custom marker callout */}
          </Marker>
        ))}
      </MapView>

      {/* Map Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setRegion({
            latitude: 38.0,
            longitude: 20.0, 
            latitudeDelta: 12.0,
            longitudeDelta: 15.0,
          })}
        >
          <Text style={styles.controlButtonText}>Reset View</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setRegion({
            latitude: EPIC_REAL_LOCATIONS['Troy'].latitude,
            longitude: EPIC_REAL_LOCATIONS['Troy'].longitude,
            latitudeDelta: 2.0,
            longitudeDelta: 2.0,
          })}
        >
          <Text style={styles.controlButtonText}>Go to Troy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setRegion({
            latitude: EPIC_REAL_LOCATIONS['Ithaca'].latitude,
            longitude: EPIC_REAL_LOCATIONS['Ithaca'].longitude,
            latitudeDelta: 2.0,
            longitudeDelta: 2.0,
          })}
        >
          <Text style={styles.controlButtonText}>Go to Ithaca</Text>
        </TouchableOpacity>
      </View>

      {/* Location Info Panel */}
      {selectedLocation && (
        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>{selectedLocation.title}</Text>
          <Text style={styles.infoDescription}>{selectedLocation.description}</Text>
          <Text style={styles.infoSaga}>{selectedLocation.saga} Saga</Text>
          <TouchableOpacity
            style={styles.closeInfo}
            onPress={() => setSelectedLocation(null)}
          >
            <Text style={styles.closeInfoText}>•</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    backgroundColor: 'rgba(52, 73, 94, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoPanel: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 8,
    lineHeight: 18,
  },
  infoSaga: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498DB',
  },
  closeInfo: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeInfoText: {
    color: '#2C3E50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EpicGoogleMap;
export { EPIC_REAL_LOCATIONS };
