import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Character } from '../../services/EventService';

interface CharacterDetailModalProps {
  character: Character | null;
  isVisible: boolean;
  onClose: () => void;
}

const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({
  character,
  isVisible,
  onClose,
}) => {
  if (!character) return null;

  const getCharacterTypeColor = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'king':
        return '#FFD700'; // Gold for royalty
      case 'queen':
        return '#DDA0DD'; // Plum for queen
      case 'prince':
        return '#87CEEB'; // Sky blue for young prince
      case 'goddess':
        return '#FFB347'; // Orange for Athena
      case 'god':
        return '#4169E1'; // Royal blue for Poseidon
      case 'cyclops':
        return '#8B0000'; // Dark red for monster
      case 'sorceress':
        return '#DA70D6'; // Orchid for Circe
      case 'sailor':
        return '#4A90E2'; // Blue for crew
      default:
        return '#6B7280';
    }
  };

  const getCharacterIcon = (character?: Character) => {
    if (!character) return '•';
    
    // Specific icons for EPIC: The Musical characters
    switch (character.name.toLowerCase()) {
      case 'odysseus':
        return '◦ '; // Sword for the warrior king
      case 'penelope':
        return '•'; // Crown for the queen
      case 'telemachus':
        return '◦ '; // Shield for the young prince
      case 'athena':
        return '⚪'; // Wisdom symbol for the goddess of wisdom
      case 'poseidon':
        return '•'; // Trident for the god of the sea
      case 'polyphemus':
        return '◦ '; // Eye for the cyclops
      case 'circe':
        return '•'; // Crystal ball for the sorceress
      case 'eurylochus':
        return '•'; // Anchor for the loyal sailor
      default:
        // Fallback to type-based icons
        switch (character.characterType?.toLowerCase()) {
          case 'king':
            return '◦ ';
          case 'queen':
            return '•';
          case 'prince':
            return '◦ ';
          case 'goddess':
            return '⚪';
          case 'god':
            return '•';
          case 'cyclops':
            return '◦ ';
          case 'sorceress':
            return '•';
          case 'sailor':
            return '•';
          default:
            return '•';
        }
    }
  };

  const getRelationshipTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'spouse':
      case 'husband':
      case 'wife':
        return '#FFB6C1'; // Light pink for spouses
      case 'family':
      case 'son':
      case 'daughter':
      case 'father':
      case 'mother':
        return '#90EE90'; // Light green for family
      case 'ally':
      case 'friend':
        return '#87CEEB'; // Sky blue for allies
      case 'enemy':
        return '#FF6B6B'; // Light red for enemies
      case 'patron':
      case 'divine':
        return '#FFD700'; // Gold for divine relationships
      case 'mentor':
        return '#DDA0DD'; // Plum for mentors
      case 'crew':
      case 'captain':
        return '#20B2AA'; // Light sea green for crew
      default:
        return '#D3D3D3'; // Light gray for unknown
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.characterHeaderInfo}>
              <Text style={styles.characterIcon}>
                {getCharacterIcon(character)}
              </Text>
              <View style={styles.characterBasicInfo}>
                <Text style={styles.characterName}>{character.name}</Text>
                {character.characterType && (
                  <View 
                    style={[
                      styles.characterTypeBadge,
                      { backgroundColor: getCharacterTypeColor(character.characterType) }
                    ]}
                  >
                    <Text style={styles.characterTypeText}>
                      {character.characterType}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>•</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Description */}
            {character.description && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.characterDescription}>
                  {character.description}
                </Text>
              </View>
            )}

            {/* Protagonist Status */}
            {character.isProtagonist !== undefined && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Role</Text>
                <View style={styles.roleContainer}>
                  <Text style={styles.roleText}>
                    {character.isProtagonist ? '⭐ Protagonist' : '• Supporting Character'}
                  </Text>
                </View>
              </View>
            )}

            {/* Aliases */}
            {character.aliases && character.aliases.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Known As</Text>
                <View style={styles.aliasContainer}>
                  {character.aliases.map((alias, index) => (
                    <View key={index} style={styles.aliasTag}>
                      <Text style={styles.aliasText}>{alias}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Powers */}
            {character.powers && character.powers.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Powers & Abilities</Text>
                <View style={styles.powersContainer}>
                  {character.powers.map((power, index) => (
                    <View key={index} style={styles.powerItem}>
                      <Text style={styles.powerIcon}>•</Text>
                      <Text style={styles.powerText}>{power}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Relationships */}
            {character.relationships && character.relationships.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Relationships</Text>
                <View style={styles.relationshipsContainer}>
                  {character.relationships.map((relationship, index) => (
                    <View key={index} style={styles.relationshipItem}>
                      <View style={styles.relationshipHeader}>
                        <Text style={styles.relationshipName}>
                          {relationship.characterName}
                        </Text>
                        <View style={[
                          styles.relationshipTypeBadge,
                          { backgroundColor: getRelationshipTypeColor(relationship.relationshipType) }
                        ]}>
                          <Text style={styles.relationshipTypeText}>
                            {relationship.relationshipType}
                          </Text>
                        </View>
                      </View>
                      {relationship.description && (
                        <Text style={styles.relationshipDescription}>
                          {relationship.description}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Character Stats/Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Character Details</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Character ID</Text>
                  <Text style={styles.statValue}>#{character.id}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Type</Text>
                  <Text style={styles.statValue}>
                    {character.characterType || 'Unknown'}
                  </Text>
                </View>
                {character.isProtagonist !== undefined && (
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Story Role</Text>
                    <Text style={styles.statValue}>
                      {character.isProtagonist ? 'Main Character' : 'Supporting'}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Footer space */}
            <View style={styles.footerSpace} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.85,
    minHeight: screenHeight * 0.4,
    paddingTop: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  characterHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  characterIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  characterBasicInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  characterTypeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  characterTypeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFB347',
    marginBottom: 12,
  },
  characterDescription: {
    fontSize: 16,
    color: '#B0C4DE',
    lineHeight: 24,
  },
  roleContainer: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  roleText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
  aliasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  aliasTag: {
    backgroundColor: 'rgba(255, 179, 71, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFB347',
  },
  aliasText: {
    color: '#FFB347',
    fontSize: 14,
    fontWeight: '500',
  },
  powersContainer: {
    gap: 8,
  },
  powerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  powerIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  powerText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '500',
    flex: 1,
  },
  relationshipsContainer: {
    gap: 12,
  },
  relationshipItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  relationshipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  relationshipName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  relationshipTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  relationshipTypeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000000',
    textTransform: 'capitalize',
  },
  relationshipDescription: {
    fontSize: 13,
    color: '#B0C4DE',
    lineHeight: 20,
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  statLabel: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footerSpace: {
    height: 20,
  },
});

export default CharacterDetailModal;
