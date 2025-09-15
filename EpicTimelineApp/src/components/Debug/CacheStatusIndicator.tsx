/**
 * CacheStatusIndicator - Simple cache status display for development
 * P2 Cache Implementation: Visual indicator of cache performance
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import EventService from '../../services/EventService';
import CacheDebugPanel from '../Debug/CacheDebugPanel';

interface CacheStatusIndicatorProps {
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  showInProduction?: boolean;
}

const CacheStatusIndicator: React.FC<CacheStatusIndicatorProps> = ({ 
  position = 'top-right',
  showInProduction = false 
}) => {
  const [cacheStats, setCacheStats] = useState<any>(null);
  const [showDebugPanel, setShowDebugPanel] = useState(false);

  // Only show in development mode unless explicitly enabled for production
  const shouldShow = showInProduction || __DEV__;

  useEffect(() => {
    if (!shouldShow) return;

    const updateStats = () => {
      const stats = EventService.getCacheStats();
      setCacheStats(stats);
    };

    updateStats();
    const interval = setInterval(updateStats, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [shouldShow]);

  if (!shouldShow || !cacheStats) return null;

  const getStatusColor = () => {
    if (cacheStats.troyDataCached && cacheStats.hitRate > 50) return '#4CAF50'; // Green
    if (cacheStats.troyDataCached) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const getPositionStyle = () => {
    const base = {
      position: 'absolute' as const,
      zIndex: 999,
    };

    switch (position) {
      case 'top-right':
        return { ...base, top: 50, right: 10 };
      case 'bottom-right':
        return { ...base, bottom: 50, right: 10 };
      case 'top-left':
        return { ...base, top: 50, left: 10 };
      case 'bottom-left':
        return { ...base, bottom: 50, left: 10 };
      default:
        return { ...base, top: 50, right: 10 };
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.indicator, getPositionStyle(), { backgroundColor: getStatusColor() }]}
        onPress={() => setShowDebugPanel(true)}
      >
        <Text style={styles.indicatorText}>
          • {cacheStats.totalEntries}
        </Text>
        <Text style={styles.subText}>
          {cacheStats.troyDataCached ? '◦ ' : '•'}
        </Text>
      </TouchableOpacity>

      <CacheDebugPanel
        isVisible={showDebugPanel}
        onClose={() => setShowDebugPanel(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    padding: 8,
    borderRadius: 8,
    minWidth: 50,
    alignItems: 'center',
    opacity: 0.8,
  },
  indicatorText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 8,
    marginTop: 2,
  },
});

export default CacheStatusIndicator;
