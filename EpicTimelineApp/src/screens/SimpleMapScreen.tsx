import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SimpleMapScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏛️ Epic Timeline Map</Text>
      <Text style={styles.subtitle}>Loading the Mediterranean...</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Map will appear here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e1a',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4A90E2',
    marginBottom: 20,
  },
  placeholder: {
    width: '100%',
    height: 300,
    backgroundColor: '#16213e',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  placeholderText: {
    color: '#B0C4DE',
    fontSize: 14,
  },
});

export default SimpleMapScreen;
