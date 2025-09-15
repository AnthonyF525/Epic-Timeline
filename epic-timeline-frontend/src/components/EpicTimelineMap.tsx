import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { MapService, EpicMapLocation } from '../services/MapService';

interface EpicTimelineMapProps {
  selectedSaga?: string;
  showJourney?: boolean;
  showUserLocation?: boolean;
  onLocationPress?: (location: EpicMapLocation) => void;
}

const EpicTimelineMap = ({
  selectedSaga,
  showJourney = true,
  showUserLocation = false,
  onLocationPress
}: EpicTimelineMapProps) => {
  const [epicLocations, setEpicLocations] = useState([]);
  const [journeyRoute, setJourneyRoute] = useState([]);

  useEffect(() => {
    loadEpicLocations();
  }, [selectedSaga]);

  const loadEpicLocations = async () => {
    try {
      if (selectedSaga) {
        const sagaLocations = await MapService.getSagaRoute(selectedSaga);
        setEpicLocations(sagaLocations);
      } else {
        const allLocations = await MapService.getEpicLocations();
        setEpicLocations(allLocations);
      }

      if (showJourney) {
        const journey = await MapService.getOdysseusJourney();
        setJourneyRoute(journey);
      }
    } catch (error) {
      console.error('ERROR Error loading Epic Timeline locations:', error);
      Alert.alert('Error', 'Failed to load Epic Timeline map data');
    }
  };

  const handleMarkerPress = (location: EpicMapLocation) => {
    if (onLocationPress) {
      onLocationPress(location);
    }
  };

  const getMarkerImage = (iconType: string) => {
    // You can replace these with custom Epic Timeline marker images
    switch (iconType) {
      case 'castle': return require('../assets/markers/troy.png');
      case 'home': return require('../assets/markers/ithaca.png');
      case 'eye': return require('../assets/markers/cyclops.png');
      case 'magic-wand': return require('../assets/markers/circe.png');
      case 'skull': return require('../assets/markers/underworld.png');
      default: return undefined;
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={MapService.getEpicMapRegion()}
        showsUserLocation={showUserLocation}
        showsMyLocationButton={showUserLocation}
        mapType="terrain" // Good for showing ancient geography
        customMapStyle={epicMapStyle} // Custom styling for Epic Timeline
      >
        {/* ✓ Epic Timeline Location Markers */}
        {epicLocations.map((location) => (
          <Marker
            coordinate={{
              latitude: location.coordinates.latitude,
              longitude: location.coordinates.longitude,
            }}
            title={location.name}
            description={location.description}
            onPress={() => handleMarkerPress(location)}
            pinColor={location.markerColor}
            image={getMarkerImage(location.markerIcon || 'default')}
          />
        ))}

        {/* ✓ Odysseus's Journey Route */}
        {showJourney && journeyRoute.length > 1 && (
          <Polyline
            coordinates={journeyRoute.map(loc => ({
              latitude: loc.coordinates.latitude,
              longitude: loc.coordinates.longitude,
            }))}
            strokeColor="#3498DB"
            strokeWidth={3}
            geodesic={true}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

// ✓ CUSTOM MAP STYLE FOR EPIC TIMELINE
const epicMapStyle = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#193341"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c5530"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];

export default EpicTimelineMap;