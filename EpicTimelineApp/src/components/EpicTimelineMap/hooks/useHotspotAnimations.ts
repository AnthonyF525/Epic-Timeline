import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export interface HotspotAnimationConfig {
  pulseEnabled: boolean;
  pulseScale: number;
  pulseDuration: number;
  pulseDelay: number;
  hoverScale: number;
  hoverDuration: number;
}

export const useHotspotAnimations = (
  isSelected: boolean,
  isTroy: boolean,
  config: Partial<HotspotAnimationConfig> = {}
) => {
  const defaultConfig: HotspotAnimationConfig = {
    pulseEnabled: true,
    pulseScale: 1.3,
    pulseDuration: 2000,
    pulseDelay: isTroy ? 0 : Math.random() * 1000, // Troy pulses immediately
    hoverScale: 1.2,
    hoverDuration: 200,
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Animation values
  const pulseScale = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.6)).current;
  const hoverScale = useRef(new Animated.Value(1)).current;
  const selectionScale = useRef(new Animated.Value(1)).current;

  // Pulse animation for special locations (Troy, Ithaca, etc.)
  useEffect(() => {
    if (!finalConfig.pulseEnabled) return;

    const createPulseAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(pulseScale, {
              toValue: finalConfig.pulseScale,
              duration: finalConfig.pulseDuration / 2,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(pulseOpacity, {
              toValue: 0.2,
              duration: finalConfig.pulseDuration / 2,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(pulseScale, {
              toValue: 1,
              duration: finalConfig.pulseDuration / 2,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(pulseOpacity, {
              toValue: 0.6,
              duration: finalConfig.pulseDuration / 2,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
        ])
      );
    };

    // Start pulse animation with delay
    const timer = setTimeout(() => {
      createPulseAnimation().start();
    }, finalConfig.pulseDelay);

    return () => {
      clearTimeout(timer);
      pulseScale.stopAnimation();
      pulseOpacity.stopAnimation();
    };
  }, [finalConfig.pulseEnabled, finalConfig.pulseScale, finalConfig.pulseDuration, finalConfig.pulseDelay]);

  // Selection animation
  useEffect(() => {
    Animated.spring(selectionScale, {
      toValue: isSelected ? 1.15 : 1,
      tension: 150,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [isSelected]);

  // Hover functions
  const onHoverIn = () => {
    Animated.spring(hoverScale, {
      toValue: finalConfig.hoverScale,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const onHoverOut = () => {
    Animated.spring(hoverScale, {
      toValue: 1,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  return {
    pulseScale,
    pulseOpacity,
    hoverScale,
    selectionScale,
    onHoverIn,
    onHoverOut,
  };
};