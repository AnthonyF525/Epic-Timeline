/**
 * Quick Test: Google Maps Component Verification
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Test basic imports first
console.log('Testing imports...');

try {
  const MapView = require('react-native-maps');
  console.log('✓ react-native-maps imported successfully');
} catch (error) {
  console.log('• react-native-maps import failed:', error.message);
}

try {
  const EpicGoogleMap = require('./src/components/Maps/EpicGoogleMap').default;
  console.log('✓ EpicGoogleMap imported successfully');
} catch (error) {
  console.log('• EpicGoogleMap import failed:', error.message);
}

// Simple test component
const MapTest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map Test Component</Text>
      <Text style={styles.subtitle}>
        If you see this, React Native is working!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0C4DE',
    textAlign: 'center',
  },
});

export default MapTest;
