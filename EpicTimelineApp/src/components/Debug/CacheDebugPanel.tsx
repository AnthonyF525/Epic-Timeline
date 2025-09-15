/**
 * CacheDebugPanel - Development utility for monitoring cache performance
 * P2 Cache Implementation: Debug panel for Troy data caching
 * 
 * This component provides real-time cache statistics and management tools
 * for development and debugging purposes.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import EventService from '../../services/EventService';
import CacheInitializer from '../../services/CacheInitializer';

interface CacheDebugPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const CacheDebugPanel: React.FC<CacheDebugPanelProps> = ({ isVisible, onClose }) => {
  const [metrics, setMetrics] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const updateMetrics = () => {
    const newMetrics = CacheInitializer.getDetailedMetrics();
    setMetrics(newMetrics);
  };

  useEffect(() => {
    if (isVisible) {
      updateMetrics();
      const interval = setInterval(updateMetrics, 2000); // Update every 2 seconds
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleForceRefresh = async () => {
    setRefreshing(true);
    try {
      await CacheInitializer.forceRefresh();
      updateMetrics();
    } catch (error) {
      console.error('Force refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleClearCache = () => {
    EventService.clearCache();
    updateMetrics();
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (ms: number | null): string => {
    if (!ms) return 'N/A';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  if (!metrics) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.panel}>
          <View style={styles.header}>
            <Text style={styles.title}>Cache Debug Panel</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Cache Status */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cache Status</Text>
              <View style={styles.statusRow}>
                <Text style={styles.label}>Health:</Text>
                <Text style={[styles.value, { color: getHealthColor(metrics.health) }]}>
                  {metrics.health.toUpperCase()}
                </Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.label}>Initialized:</Text>
                <Text style={styles.value}>{metrics.initialized ? 'Yes' : 'No'}</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.label}>Background Refresh:</Text>
                <Text style={styles.value}>
                  {metrics.backgroundRefreshActive ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>

            {/* Cache Statistics */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Statistics</Text>
              <View style={styles.statusRow}>
                <Text style={styles.label}>Total Entries:</Text>
                <Text style={styles.value}>{metrics.cache.totalEntries}</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.label}>Memory Usage:</Text>
                <Text style={styles.value}>{formatBytes(metrics.cache.memoryUsage)}</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.label}>Hit Rate:</Text>
                <Text style={styles.value}>{metrics.cache.hitRate}%</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.label}>Miss Rate:</Text>
                <Text style={styles.value}>{metrics.cache.missRate}%</Text>
              </View>
            </View>

            {/* Troy Data Specific */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Troy Data</Text>
              <View style={styles.statusRow}>
                <Text style={styles.label}>Cached:</Text>
                <Text style={styles.value}>
                  {metrics.cache.troyDataCached ? 'Yes' : 'No'}
                </Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.label}>Age:</Text>
                <Text style={styles.value}>{formatDuration(metrics.troyDataAge)}</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.label}>Last Update:</Text>
                <Text style={styles.value}>
                  {metrics.cache.lastTroyUpdate 
                    ? new Date(metrics.cache.lastTroyUpdate).toLocaleTimeString()
                    : 'Never'
                  }
                </Text>
              </View>
            </View>

            {/* Recommendations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommendations</Text>
              {metrics.recommendations.map((rec: string, index: number) => (
                <Text key={index} style={styles.recommendation}>
                  {rec}
                </Text>
              ))}
            </View>

            {/* Configuration */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Configuration</Text>
              <View style={styles.statusRow}>
                <Text style={styles.label}>Preload Troy:</Text>
                <Text style={styles.value}>
                  {metrics.config.preloadTroyData ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.label}>Refresh Interval:</Text>
                <Text style={styles.value}>{metrics.config.refreshIntervalMinutes}m</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.label}>Dev Mode:</Text>
                <Text style={styles.value}>
                  {metrics.config.enableDevelopmentMode ? 'On' : 'Off'}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.refreshButton]} 
              onPress={handleForceRefresh}
              disabled={refreshing}
            >
              <Text style={styles.actionButtonText}>
                {refreshing ? 'Refreshing...' : 'Force Refresh'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.clearButton]} 
              onPress={handleClearCache}
            >
              <Text style={styles.actionButtonText}>Clear Cache</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const getHealthColor = (health: string): string => {
  switch (health) {
    case 'healthy': return '#4CAF50';
    case 'warning': return '#FF9800';
    case 'error': return '#F44336';
    default: return '#9E9E9E';
  }
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  panel: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    width: '100%',
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: '#FFB347',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFB347',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFB347',
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: '#B0C4DE',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
  },
  recommendation: {
    fontSize: 12,
    color: '#B0C4DE',
    marginVertical: 2,
    paddingLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  refreshButton: {
    backgroundColor: '#4CAF50',
  },
  clearButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CacheDebugPanel;
