import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { LocationCard } from './LocationCard';
import { EpicLocation } from '../constants';
import { useHotspotAnimations } from '../hooks/useHotspotAnimations';

interface AnimatedLocationCardProps {
  location: EpicLocation;
  index: number;
  isSelected: boolean;
  isTroy: boolean;
  isLoading: boolean;
  onPress: () => void;
}

export const AnimatedLocationCard: React.FC<AnimatedLocationCardProps> = ({
  location,
  index,
  isSelected,
  isTroy,
  isLoading,
  onPress,
}) => {
  const {
    hoverScale,
    selectionScale,
    onHoverIn,
    onHoverOut,
  } = useHotspotAnimations(isSelected, isTroy, {
    pulseEnabled: false, // Cards don't pulse, only hotspots do
    hoverScale: 1.05,
    hoverDuration: 150,
  });

  return (
    <Animated.View
      style={{
        transform: [
          { scale: selectionScale },
          { scale: hoverScale },
        ],
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onHoverIn}
        onPressOut={onHoverOut}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <LocationCard
          location={location}
          index={index}
          isSelected={isSelected}
          isTroy={isTroy}
          isLoading={isLoading}
          onPress={() => {}} // onPress handled by TouchableOpacity
        />
      </TouchableOpacity>
    </Animated.View>
  );
};