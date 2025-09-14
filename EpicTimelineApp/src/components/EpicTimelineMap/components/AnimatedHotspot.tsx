import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Circle, Text, G } from 'react-native-svg';
import { EpicLocation } from '../constants';
import { TROY_SAGA_COLORS } from './troyColors';
import { useHotspotAnimations } from '../hooks/useHotspotAnimations';

const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface AnimatedHotspotProps {
  location: EpicLocation;
  x: number;
  y: number;
  isSelected: boolean;
  onPress: () => void;
}

export const AnimatedHotspot: React.FC<AnimatedHotspotProps> = ({
  location,
  x,
  y,
  isSelected,
  onPress,
}) => {
  const isTroy = location.name.toLowerCase().includes('troy');
  const isSpecial = location.culturalSignificance === 'PRIMARY' || location.culturalSignificance === 'LEGENDARY';
  
  // Entrance animation
  const entranceScale = useRef(new Animated.Value(0)).current;
  const entranceOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Stagger entrance animations - Troy appears first, others follow
    const delay = isTroy ? 500 : 1000 + Math.random() * 1000;
    
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(entranceScale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(entranceOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
  }, []);

  const {
    pulseScale,
    pulseOpacity,
    hoverScale,
    selectionScale,
    onHoverIn,
    onHoverOut,
  } = useHotspotAnimations(isSelected, isTroy, {
    pulseEnabled: isTroy || isSpecial,
    pulseScale: isTroy ? 1.5 : 1.3,
    pulseDuration: isTroy ? 2500 : 2000,
  });

  // Colors based on location type
  const colors = isTroy ? {
    fill: TROY_SAGA_COLORS.primary,
    stroke: TROY_SAGA_COLORS.gold,
    pulseColor: TROY_SAGA_COLORS.fire,
    textColor: TROY_SAGA_COLORS.text,
    shadowColor: TROY_SAGA_COLORS.smoke,
    strokeWidth: 3,
    radius: 14,
  } : {
    fill: isSpecial ? '#d4af37' : '#ff6b6b',
    stroke: '#ffffff',
    pulseColor: '#d4af37',
    textColor: '#ffffff',
    shadowColor: '#000000',
    strokeWidth: 2,
    radius: isSpecial ? 12 : 8,
  };

  return (
    <AnimatedG
      transform={[
        { scale: entranceScale },
        { scale: selectionScale },
        { scale: hoverScale },
      ]}
      opacity={entranceOpacity}
    >
      {/* Shadow/Glow effect for Troy */}
      {isTroy && (
        <Circle
          cx={x}
          cy={y}
          r="20"
          fill={colors.shadowColor}
          fillOpacity="0.3"
          onPress={onPress}
        />
      )}

      {/* Pulse animation circle */}
      {(isTroy || isSpecial) && (
        <AnimatedCircle
          cx={x}
          cy={y}
          r="25"
          fill="none"
          stroke={colors.pulseColor}
          strokeWidth="2"
          strokeOpacity={pulseOpacity}
          transform={[{ scale: pulseScale }]}
          onPress={onPress}
        />
      )}

      {/* Main hotspot circle */}
      <Circle
        cx={x}
        cy={y}
        r={colors.radius}
        fill={colors.fill}
        stroke={colors.stroke}
        strokeWidth={colors.strokeWidth}
        onPress={onPress}
        onPressIn={onHoverIn}
        onPressOut={onHoverOut}
      />

      {/* Location label */}
      <Text
        x={x}
        y={y - 30}
        textAnchor="middle"
        fontSize={isTroy ? "14" : "12"}
        fill={colors.textColor}
        fontWeight={isTroy ? "bold" : "normal"}
        stroke={isTroy ? colors.shadowColor : undefined}
        strokeWidth={isTroy ? "0.5" : undefined}
        onPress={onPress}
      >
        {isTroy ? `⚔️ ${location.name}` : location.name}
      </Text>

      {/* Troy war symbol */}
      {isTroy && (
        <Text
          x={x}
          y={y + 6}
          textAnchor="middle"
          fontSize="16"
          fill={colors.stroke}
          onPress={onPress}
        >
          🏛️
        </Text>
      )}

      {/* Selection indicator */}
      {isSelected && (
        <Circle
          cx={x}
          cy={y}
          r={colors.radius + 6}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="2"
          strokeDasharray="5,3"
          opacity="0.8"
          onPress={onPress}
        />
      )}
    </AnimatedG>
  );
};