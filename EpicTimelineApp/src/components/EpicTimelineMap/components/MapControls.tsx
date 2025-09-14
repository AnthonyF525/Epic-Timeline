import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { mapStyles } from '../styles';
import { MapLoadingState, MEDITERRANEAN_BOUNDS, EpicLocation } from '../constants';

interface MapControlsProps {
  loadingState: MapLoadingState;
  zoomLevel: number;
  isMinZoom: boolean;
  isMaxZoom: boolean;
  troyLocation: EpicLocation | null | undefined;
  onResetToMediterranean: () => void;
  onFocusOnTroy: () => void;
  onFitToLocations: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  loadingState,
  zoomLevel,
  isMinZoom,
  isMaxZoom,
  troyLocation,
  onResetToMediterranean,
  onFocusOnTroy,
  onFitToLocations,
  onZoomIn,
  onZoomOut,
}) => {
  return (
    <View style={mapStyles.mapControls}>
      <TouchableOpacity 
        style={[
          mapStyles.controlButton,
          loadingState.isFocusing && mapStyles.controlButtonDisabled
        ]} 
        onPress={onResetToMediterranean}
        disabled={loadingState.isFocusing}
      >
        <Text style={mapStyles.controlButtonText}>🌊 Reset View</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          mapStyles.controlButton, 
          mapStyles.troyFocusButton,
          (loadingState.isFocusing || !troyLocation) && mapStyles.controlButtonDisabled
        ]} 
        onPress={onFocusOnTroy}
        disabled={loadingState.isFocusing || !troyLocation}
      >
        <Text style={mapStyles.troyFocusButtonText}>
          {loadingState.isFocusing ? '⏳ Focusing...' : '🏛️ Focus Troy'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          mapStyles.controlButton,
          loadingState.isLoadingLocations && mapStyles.controlButtonDisabled
        ]} 
        onPress={onFitToLocations}
        disabled={loadingState.isLoadingLocations}
      >
        <Text style={mapStyles.controlButtonText}>📍 Fit All</Text>
      </TouchableOpacity>
      
      {/* Enhanced Zoom Controls with Loading States */}
      <View style={mapStyles.zoomControls}>
        <TouchableOpacity 
          style={[
            mapStyles.zoomButton,
            (isMinZoom || loadingState.isFocusing) && mapStyles.zoomButtonDisabled
          ]} 
          onPress={onZoomOut}
          disabled={isMinZoom || loadingState.isFocusing}
        >
          <Text style={[
            mapStyles.zoomButtonText,
            (isMinZoom || loadingState.isFocusing) && mapStyles.zoomButtonTextDisabled
          ]}>-</Text>
        </TouchableOpacity>
        
        <View style={mapStyles.zoomLevelContainer}>
          <Text style={mapStyles.zoomLevel}>{zoomLevel}x</Text>
          <Text style={mapStyles.zoomRange}>
            {MEDITERRANEAN_BOUNDS.zoom.min}-{MEDITERRANEAN_BOUNDS.zoom.max}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[
            mapStyles.zoomButton,
            (isMaxZoom || loadingState.isFocusing) && mapStyles.zoomButtonDisabled
          ]}
          onPress={onZoomIn}
          disabled={isMaxZoom || loadingState.isFocusing}
        >
          <Text style={[
            mapStyles.zoomButtonText,
            (isMaxZoom || loadingState.isFocusing) && mapStyles.zoomButtonTextDisabled
          ]}>+</Text>
        </TouchableOpacity>
      </View>
      
      {/* Status indicator */}
      <View style={mapStyles.statusIndicator}>
        <Text style={mapStyles.statusText}>
          {loadingState.isLoadingLocations ? '⏳ Loading...' : 
           loadingState.error ? '⚠️ Error' : 
           '✅ Ready'}
        </Text>
      </View>
    </View>
  );
};
