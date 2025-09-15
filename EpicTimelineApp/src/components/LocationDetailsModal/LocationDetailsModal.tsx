import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

interface Location {
  id: string;
  name: string;
  coordinates: { x: number; y: number; z?: number };
  description: string;
  saga?: string;
  significance?: string;
  modernLocation?: string;
  mythologyFacts?: string[];
  songs?: string[];
  culturalSignificance?: 'PRIMARY' | 'SECONDARY' | 'LEGENDARY';
  isRealPlace?: boolean;
  isMythological?: boolean;
}

interface LocationDetailsModalProps {
  visible: boolean;
  location: Location | null;
  onClose: () => void;
}

export const LocationDetailsModal: React.FC<LocationDetailsModalProps> = ({
  visible,
  location,
  onClose,
}) => {
  if (!location) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{location.name}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>•</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {location.modernLocation && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Modern Location</Text>
              <Text style={styles.sectionText}>{location.modernLocation}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionText}>{location.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Coordinates</Text>
            <Text style={styles.sectionText}>
              {location.coordinates.x}°N, {location.coordinates.y}°E
            </Text>
          </View>

          {location.significance && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Significance</Text>
              <Text style={styles.sectionText}>{location.significance}</Text>
            </View>
          )}

          {location.mythologyFacts && location.mythologyFacts.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Mythology Facts</Text>
              {location.mythologyFacts.map((fact, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  • {fact}
                </Text>
              ))}
            </View>
          )}

          {location.songs && location.songs.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Featured Songs</Text>
              {location.songs.map((song, index) => (
                <Text key={index} style={styles.songItem}>
                  • {song}
                </Text>
              ))}
            </View>
          )}

          {location.saga && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Epic Saga</Text>
              <Text style={styles.sectionText}>{location.saga}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#16213e',
    borderBottomWidth: 1,
    borderBottomColor: '#d4af37',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d4af37',
    flex: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#1a1a2e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#e6e6e6',
    lineHeight: 24,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#e6e6e6',
    lineHeight: 24,
    marginBottom: 4,
  },
  songItem: {
    fontSize: 16,
    color: '#d4af37',
    lineHeight: 24,
    marginBottom: 4,
  },
});