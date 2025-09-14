import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { mapStyles } from '../styles';
import { EpicLocation, MapLoadingState } from '../constants';
import { AnimatedLocationCard } from './AnimatedLocationCard';

interface LocationsListProps {
  locations: EpicLocation[];
  selectedLocation?: EpicLocation | null;
  loadingState: MapLoadingState;
  onLocationPress: (location: EpicLocation) => void;
  troyLocation?: EpicLocation | null;
}

export const LocationsList: React.FC<LocationsListProps> = ({
  locations,
  selectedLocation,
  loadingState,
  onLocationPress,
  troyLocation,
}) => {
  if (locations.length === 0) {
    return (
      <View style={mapStyles.noLocationsContainer}>
        <Text style={mapStyles.noLocationsText}>
          {loadingState.isLoadingLocations ? '⏳ Loading EPIC Locations...' : '📍 No Locations Found'}
        </Text>
        <Text style={mapStyles.noLocationsSubText}>
          {loadingState.isLoadingLocations ? 
            'Fetching Odysseus\'s journey data...' : 
            'The epic journey data is not available.'}
        </Text>
        {!loadingState.isLoadingLocations && (
          <TouchableOpacity style={mapStyles.retryButton}>
            <Text style={mapStyles.retryButtonText}>🔄 Retry Loading</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // Update your FlatList renderItem:
  const renderLocationItem = ({ item, index }: { item: EpicLocation; index: number }) => {
    const isTroy = item.name.toLowerCase().includes('troy');
    
    return (
      <AnimatedLocationCard
        location={item}
        index={index}
        isSelected={selectedLocation?.id === item.id}
        isTroy={isTroy}
        isLoading={loadingState.isLoadingLocations}
        onPress={() => onLocationPress(item)}
      />
    );
  };

  // Update your FlatList:
  return (
    <View style={mapStyles.locationsContainer}>
      <FlatList
        data={locations}
        renderItem={renderLocationItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        // Add animation performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={10}
        style={mapStyles.locationsList}
      />
    </View>
  );
};
