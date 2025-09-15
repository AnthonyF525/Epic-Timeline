import React from 'react';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Region } from 'react-native-maps';
import { useMapLogic } from './EpicTimelineMap/hooks/useMapLogic';
import { LoadingScreen, ErrorScreen, MapControls, LocationsList, SagaLegend } from './EpicTimelineMap/components';
import { mapStyles } from './EpicTimelineMap/styles';
import {
  MEDITERRANEAN_BOUNDS,
  TROY_FOCUS_CONFIG,
  EPIC_THEME,
  MapLoadingState,
  EpicLocation,
  EpicTimelineMapProps,
  getSagaColor,
  getLocationIcon,
} from './EpicTimelineMap/constants';
import { LocationHotspot } from '../Timeline/LocationHotspot';

export const EpicTimelineMap: React.FC<EpicTimelineMapProps> = ({
  locations = [], // Default to empty array to prevent undefined
  selectedLocation,
  showJourney,
  onLocationPress,
}) => {
  
  // Debug the props coming in
  console.log('▶ EPIC TIMELINE MAP:', {
    locationsCount: locations?.length || 0,
    selectedLocation: selectedLocation?.name,
    showJourney,
    hasOnLocationPress: !!onLocationPress,
  });

  const {
    // State values
    currentBounds,
    zoomLevel,
    panOffset,
    isDragging,
    loadingState,
    mapErrors,
    troyLocation,
    
    // Calculated values
    isMaxZoom,
    isMinZoom,
    
    // Functions
    onPanGestureEvent,
    onPanHandlerStateChange,
    zoomIn,
    zoomOut,
    resetToMediterranean,
    focusOnTroy,
    fitToLocations,
    handleLocationPress,
    clearErrors,
    retryOperation,
  } = useMapLogic(locations, selectedLocation, onLocationPress);

  // Show loading screen during initialization
  if (loadingState.isInitializing || loadingState.isLoading) {
    return <LoadingScreen loadingState={loadingState} />;
  }

  // Show error screen for non-recoverable errors
  if (loadingState.error && mapErrors[0] && !mapErrors[0].recoverable) {
    return (
      <ErrorScreen 
        loadingState={loadingState}
        mapErrors={mapErrors}
        onRetry={retryOperation}
        onClearErrors={clearErrors}
      />
    );
  }

  return (
    <GestureHandlerRootView style={mapStyles.container}>
      <View style={mapStyles.mapPlaceholder}>
        {/* Enhanced Map Header with Loading/Error States */}
        <View style={mapStyles.mapHeader}>
          <Text style={mapStyles.placeholderTitle}>◦  EPIC: The Musical Map</Text>
          <Text style={mapStyles.placeholderSubtitle}>
            Mediterranean Sea • Odysseus's Journey Through {locations.length} Locations
          </Text>
          <Text style={mapStyles.boundsInfo}>
            • {currentBounds.center.latitude.toFixed(1)}°N, {currentBounds.center.longitude.toFixed(1)}°E
            • Zoom: {zoomLevel}x
          </Text>
          
          {/* Enhanced status indicators */}
          <Text style={mapStyles.panInfo}>
            🧭 Pan: ({panOffset.x.toFixed(1)}, {panOffset.y.toFixed(1)}) 
            {isDragging && " • Dragging"}
            {loadingState.isFocusing && " • Focusing"}
            {loadingState.isLoadingLocations && " • Loading Locations"}
          </Text>
          
          {/* Error indicator */}
          {loadingState.error && (
            <View style={mapStyles.errorIndicator}>
              <Text style={mapStyles.errorIndicatorText}>
                ◦  {loadingState.error} (Tap to dismiss)
              </Text>
            </View>
          )}
          
          {/* Troy Focus Indicator */}
          {troyLocation && (
            <Text style={mapStyles.troyFocusIndicator}>
              ◦  Troy Location Ready • Ancient City of Heroes
            </Text>
          )}
        </View>

        {/* Enhanced Map Controls with Loading States */}
        <MapControls
          loadingState={loadingState}
          zoomLevel={zoomLevel}
          isMinZoom={isMinZoom}
          isMaxZoom={isMaxZoom}
          troyLocation={troyLocation}
          onResetToMediterranean={resetToMediterranean}
          onFocusOnTroy={focusOnTroy}
          onFitToLocations={fitToLocations}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
        />

        {/* Show "No Locations" state with retry option */}
        {locations.length === 0 ? (
          <View style={mapStyles.noLocationsContainer}>
            <Text style={mapStyles.noLocationsText}>
              {loadingState.isLoadingLocations ? '• Loading EPIC Locations...' : '• No Locations Found'}
            </Text>
            <Text style={mapStyles.noLocationsSubText}>
              {loadingState.isLoadingLocations ? 
                'Fetching Odysseus\'s journey data...' : 
                'The epic journey data is not available.'}
            </Text>
            {!loadingState.isLoadingLocations && (
              <View style={mapStyles.retryButton}>
                <Text style={mapStyles.retryButtonText}>• Retry Loading</Text>
              </View>
            )}
          </View>
        ) : (
          /* Real Mediterranean Map with React Native Maps */
          <View style={mapStyles.mapContainer}>
            <MapView
              style={mapStyles.mapView}
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
              initialRegion={{
                latitude: MEDITERRANEAN_BOUNDS.center.latitude,
                longitude: MEDITERRANEAN_BOUNDS.center.longitude,
                latitudeDelta: MEDITERRANEAN_BOUNDS.span.latitudeDelta,
                longitudeDelta: MEDITERRANEAN_BOUNDS.span.longitudeDelta,
              }}
              showsUserLocation={false}
              showsMyLocationButton={false}
              showsCompass={true}
              showsScale={true}
              mapType="standard"
              onRegionChangeComplete={(region) => {
                console.log('◦  Map region changed:', region);
              }}
            >
              {/* Render location markers on the real map */}
              {locations.map((location, index) => {
                const isTroy = location.name.toLowerCase().includes('troy');
                const sagaColor = getSagaColor(location.saga);
                
                // Generate Mediterranean coordinates if not provided
                // Distribute locations around the Mediterranean based on saga
                const getDefaultCoordinates = (index: number, saga: string) => {
                  const baseLatitude = MEDITERRANEAN_BOUNDS.center.latitude;
                  const baseLongitude = MEDITERRANEAN_BOUNDS.center.longitude;
                  
                  // Troy gets its real coordinates
                  if (isTroy) {
                    return { latitude: 39.9576, longitude: 26.2385 };
                  }
                  
                  // Distribute other locations around the Mediterranean
                  const positions = [
                    { latitude: 37.9755, longitude: 23.7348 }, // Athens area
                    { latitude: 40.6401, longitude: 22.9444 }, // Thessaloniki area  
                    { latitude: 36.3932, longitude: 25.4615 }, // Santorini area
                    { latitude: 35.5138, longitude: 24.0180 }, // Crete area
                    { latitude: 38.1667, longitude: 15.5500 }, // Sicily area
                    { latitude: 40.8518, longitude: 14.2681 }, // Naples area
                    { latitude: 36.7372, longitude: 3.0865 },  // Algeria area
                    { latitude: 31.2001, longitude: 29.9187 }, // Alexandria area
                  ];
                  
                  return positions[index % positions.length] || 
                         { latitude: baseLatitude, longitude: baseLongitude };
                };
                
                const coordinates = location.coordinates || getDefaultCoordinates(index, location.saga);
                
                return (
                  <Marker
                    key={location.id}
                    coordinate={coordinates}
                    title={location.name}
                    description={`${location.saga} • ${location.description || 'Epic location from The Musical'}`}
                    onPress={() => {
                      console.log('• MAP MARKER CLICKED:', location.name);
                      handleLocationPress(location);
                    }}
                  >
                    <View style={[
                      mapStyles.mapMarker,
                      {
                        backgroundColor: sagaColor,
                        borderColor: isTroy ? EPIC_THEME.colors.epicGold : '#FFFFFF',
                        borderWidth: isTroy ? 3 : 2,
                      },
                      selectedLocation?.id === location.id && mapStyles.selectedMarker,
                    ]}>
                      <Text style={mapStyles.markerIcon}>
                        {isTroy ? '◦ ' : getLocationIcon(location.saga)}
                      </Text>
                      <View style={mapStyles.markerNumber}>
                        <Text style={mapStyles.markerNumberText}>
                          {index + 1}
                        </Text>
                      </View>
                    </View>
                  </Marker>
                );
              })}
            </MapView>

            {/* Map Controls Overlay */}
            <View style={mapStyles.mapControlsOverlay}>
              <MapControls
                loadingState={loadingState}
                zoomLevel={zoomLevel}
                isMinZoom={isMinZoom}
                isMaxZoom={isMaxZoom}
                troyLocation={troyLocation}
                onResetToMediterranean={resetToMediterranean}
                onFocusOnTroy={focusOnTroy}
                onFitToLocations={fitToLocations}
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
              />
            </View>
            
            {/* Map Header Overlay */}
            <View style={mapStyles.mapHeaderOverlay}>
              <Text style={mapStyles.mapTitle}>◦  EPIC: The Musical Journey</Text>
              <Text style={mapStyles.mapSubtitle}>
                Mediterranean Sea • {locations.length} Locations
              </Text>
            </View>
            
            {/* LocationsList as side panel */}
            <View style={mapStyles.locationsOverlay}>
              <LocationsList
                locations={locations}
                selectedLocation={selectedLocation}
                loadingState={loadingState}
                onLocationPress={handleLocationPress}
                troyLocation={troyLocation}
              />
            </View>
          </View>
        )}

        {/* Saga Legend */}
        <SagaLegend />
      </View>
    </GestureHandlerRootView>
  );
};