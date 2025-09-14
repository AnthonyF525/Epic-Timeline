import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { EpicLocation, getSagaColor } from '../EpicTimelineMap/constants';

interface LocationHotspotProps {
  location: EpicLocation;
  index: number;
  isSelected: boolean;
  isVisible: boolean;
  mapBounds: {
    width: number;
    height: number;
    latRange: [number, number];
    lngRange: [number, number];
  };
  onPress: (location: EpicLocation) => void;
  onLongPress?: (location: EpicLocation) => void;
}

export const LocationHotspot: React.FC<LocationHotspotProps> = ({
  location,
  index,
  isSelected,
  isVisible,
  mapBounds,
  onPress,
  onLongPress,
}) => {
  const animatedScale = React.useRef(new Animated.Value(1)).current;
  const animatedOpacity = React.useRef(new Animated.Value(0)).current;
  const pulseAnimation = React.useRef<Animated.CompositeAnimation | null>(null);

  // Calculate position on map based on lat/lng coordinates
  const calculatePosition = React.useCallback(() => {
    const { width, height, latRange, lngRange } = mapBounds;
    
    // Convert lat/lng to x/y coordinates
    const x = ((location.longitude - lngRange[0]) / (lngRange[1] - lngRange[0])) * width;
    const y = ((latRange[1] - location.latitude) / (latRange[1] - latRange[0])) * height;
    
    return { x, y };
  }, [location.latitude, location.longitude, mapBounds]);

  // Determine hotspot type and styling
  const getHotspotStyle = React.useCallback(() => {
    const isTroy = location.name.toLowerCase().includes('troy');
    const sagaColor = getSagaColor(location.saga);
    
    if (isTroy) {
      return {
        backgroundColor: '#8B0000', // Dark red for Troy
        borderColor: '#FFD700', // Gold border for Troy
        size: 20,
        icon: '🏛️',
        priority: 1,
      };
    }

    return {
      backgroundColor: sagaColor,
      borderColor: 'rgba(255, 255, 255, 0.8)',
      size: isSelected ? 18 : 14,
      icon: getLocationIcon(location.saga),
      priority: 2,
    };
  }, [location.name, location.saga, isSelected]);

  // Get saga-specific icon
  const getLocationIcon = (saga: string): string => {
    const sagaIcons: Record<string, string> = {
      'troy-saga': '🏛️',
      'cyclops-saga': '👁️',
      'ocean-saga': '🌊',
      'circe-saga': '🔮',
      'underworld-saga': '💀',
      'thunder-saga': '⚡',
      'wisdom-saga': '🦉',
      'vengeance-saga': '⚔️',
      'ithaca-saga': '🏠',
    };
    return sagaIcons[saga] || '📍';
  };

  // Handle visibility animation
  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, animatedOpacity]);

  // Handle selection animation
  React.useEffect(() => {
    if (isSelected) {
      // Start pulsing animation
      pulseAnimation.current = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedScale, {
            toValue: 1.3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(animatedScale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.current.start();
    } else {
      // Stop pulsing and reset scale
      if (pulseAnimation.current) {
        pulseAnimation.current.stop();
      }
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (pulseAnimation.current) {
        pulseAnimation.current.stop();
      }
    };
  }, [isSelected, animatedScale]);

  // Handle press with haptic feedback
  const handlePress = React.useCallback(() => {
    // Quick scale animation for press feedback
    Animated.sequence([
      Animated.timing(animatedScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedScale, {
        toValue: isSelected ? 1.3 : 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress(location);
  }, [animatedScale, isSelected, location, onPress]);

  const handleLongPress = React.useCallback(() => {
    if (onLongPress) {
      onLongPress(location);
    }
  }, [location, onLongPress]);

  const position = calculatePosition();
  const hotspotStyle = getHotspotStyle();

  // Don't render if position is outside bounds
  if (position.x < 0 || position.x > mapBounds.width || 
      position.y < 0 || position.y > mapBounds.height) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.hotspotContainer,
        {
          left: position.x - hotspotStyle.size / 2,
          top: position.y - hotspotStyle.size / 2,
          opacity: animatedOpacity,
          transform: [{ scale: animatedScale }],
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.hotspot,
          {
            width: hotspotStyle.size,
            height: hotspotStyle.size,
            backgroundColor: hotspotStyle.backgroundColor,
            borderColor: hotspotStyle.borderColor,
            borderRadius: hotspotStyle.size / 2,
          },
          isSelected && styles.selectedHotspot,
        ]}
        onPress={handlePress}
        onLongPress={handleLongPress}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.hotspotIcon,
          { fontSize: hotspotStyle.size * 0.6 }
        ]}>
          {hotspotStyle.icon}
        </Text>
      </TouchableOpacity>

      {/* Location label for selected hotspot */}
      {isSelected && (
        <View style={styles.labelContainer}>
          <View style={[
            styles.label,
            { backgroundColor: hotspotStyle.backgroundColor }
          ]}>
            <Text style={styles.labelText} numberOfLines={1}>
              {location.name}
            </Text>
            <Text style={styles.labelSaga}>
              {location.saga.replace('-saga', '').toUpperCase()}
            </Text>
          </View>
          <View style={[
            styles.labelArrow,
            { borderTopColor: hotspotStyle.backgroundColor }
          ]} />
        </View>
      )}

      {/* Journey connection line (for Troy) */}
      {location.name.toLowerCase().includes('troy') && (
        <View style={styles.troyIndicator}>
          <View style={styles.journeyStartMarker}>
            <Text style={styles.journeyStartText}>START</Text>
          </View>
        </View>
      )}

      {/* Journey order indicator */}
      <View style={[
        styles.orderIndicator,
        { backgroundColor: hotspotStyle.backgroundColor }
      ]}>
        <Text style={styles.orderText}>{index + 1}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  hotspotContainer: {
    position: 'absolute',
    zIndex: 10,
    alignItems: 'center',
  },

  hotspot: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  selectedHotspot: {
    borderWidth: 3,
    shadowColor: '#FFD700',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },

  hotspotIcon: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  // Label styles
  labelContainer: {
    position: 'absolute',
    top: -40,
    alignItems: 'center',
    minWidth: 100,
  },

  label: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },

  labelText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  labelSaga: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 8,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 1,
  },

  labelArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },

  // Order indicator
  orderIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },

  orderText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
  },

  // Troy specific styles
  troyIndicator: {
    position: 'absolute',
    bottom: -25,
    alignItems: 'center',
  },

  journeyStartMarker: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8B0000',
  },

  journeyStartText: {
    color: '#8B0000',
    fontSize: 8,
    fontWeight: 'bold',
  },
});