import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import CharacterDetailModal from '../components/UI/CharacterDetailModal';
import { Character } from '../services/EventService';

const CharacterModalDemo: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Sample characters from Troy events with enhanced details
  const sampleCharacters: Character[] = [
    {
      id: 1,
      name: "Odysseus",
      description: "The cunning king of Ithaca, hero of the Trojan War known for his intelligence and tactical genius. Master of strategy and deception, he devised the plan for the Trojan Horse that ended the 10-year siege.",
      characterType: "Hero",
      isProtagonist: true,
      aliases: ["King of Ithaca", "Son of Laertes", "The Cunning One"],
      powers: ["Strategic Genius", "Master of Disguise", "Divine Favor (Athena)", "Exceptional Archery"]
    },
    {
      id: 2,
      name: "Athena",
      description: "Goddess of wisdom, warfare, and strategic combat. Patron deity of heroes and defender of justice. She is Odysseus's divine mentor and protector throughout his journey.",
      characterType: "Goddess",
      isProtagonist: false,
      aliases: ["Pallas Athena", "Grey-Eyed Athena", "Goddess of Wisdom"],
      powers: ["Divine Wisdom", "Strategic Warfare", "Shape-shifting", "Divine Protection", "Prophecy"]
    },
    {
      id: 3,
      name: "Polites",
      description: "Odysseus's most loyal friend and the voice of optimism among the crew. A brave warrior with an infectious positive spirit who believes in greeting the world with open arms and trust.",
      characterType: "Friend",
      isProtagonist: false,
      aliases: ["The Optimist", "Odysseus's Best Friend"],
      powers: ["Inspiring Leadership", "Combat Skills", "Unwavering Loyalty", "Positive Influence"]
    },
    {
      id: 4,
      name: "Eurylochus",
      description: "Odysseus's brother-in-law and second-in-command. A pragmatic and cautious warrior who often questions Odysseus's decisions, prioritizing the crew's immediate safety over long-term strategy.",
      characterType: "Lieutenant",
      isProtagonist: false,
      aliases: ["Second-in-Command", "Brother-in-law of Odysseus"],
      powers: ["Military Tactics", "Leadership", "Combat Expertise", "Crew Management"]
    },
    {
      id: 15,
      name: "Zeus",
      description: "King of the gods, ruler of Mount Olympus and the sky. The most powerful deity in the Greek pantheon, known for his thunderbolts and divine justice. Father of many gods and heroes.",
      characterType: "God",
      isProtagonist: false,
      aliases: ["King of the Gods", "Thunder Bearer", "Sky Father", "Lord of Olympus"],
      powers: ["Thunder and Lightning", "Divine Authority", "Shape-shifting", "Prophecy", "Weather Control"]
    },
  ];

  const handleCharacterPress = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCharacter(null);
  };

  const getCharacterTypeColor = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'hero':
        return '#FF6B35';
      case 'goddess':
      case 'god':
        return '#FFB347';
      case 'monster':
        return '#8B0000';
      case 'friend':
        return '#4A90E2';
      case 'lieutenant':
        return '#9370DB';
      case 'child':
        return '#98FB98';
      case 'chorus':
        return '#87CEEB';
      case 'sorceress':
        return '#DA70D6';
      case 'wind god':
        return '#40E0D0';
      default:
        return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Character Detail Modal Demo</Text>
          <Text style={styles.subtitle}>
            P2 Feature: Tap character tags to view detailed information
          </Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>• How it works:</Text>
          <Text style={styles.instructionsText}>
            • Character tags in event timelines are now clickable{'\n'}
            • Tap any character below to see detailed information{'\n'}
            • Modal includes character type, powers, aliases, and description{'\n'}
            • Integrates with Troy events in SagaInfoPanel
          </Text>
        </View>

        {/* Demo Character Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Troy Saga Characters</Text>
          <Text style={styles.sectionSubtitle}>
            Tap any character to view their detailed profile
          </Text>
          
          <View style={styles.characterGrid}>
            {sampleCharacters.map((character) => (
              <TouchableOpacity
                key={character.id}
                style={[
                  styles.characterCard,
                  { borderLeftColor: getCharacterTypeColor(character.characterType) }
                ]}
                onPress={() => handleCharacterPress(character)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`View details for ${character.name}`}
              >
                <View style={styles.characterCardHeader}>
                  <Text style={styles.characterCardName}>{character.name}</Text>
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
                
                <Text style={styles.characterCardDescription} numberOfLines={2}>
                  {character.description}
                </Text>
                
                {character.isProtagonist && (
                  <Text style={styles.protagonistBadge}>⭐ Protagonist</Text>
                )}
                
                <Text style={styles.tapHint}>Tap to view details →</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Integration Info */}
        <View style={styles.integrationSection}>
          <Text style={styles.integrationTitle}>• Integration Status</Text>
          <Text style={styles.integrationText}>
            • CharacterDetailModal component created{'\n'}
            • Enhanced Character interface with detailed properties{'\n'}
            • EventService updated with character details{'\n'}
            • Modal integration ready for SagaInfoPanel{'\n'}
            • Clickable character tags implementation
          </Text>
        </View>
      </ScrollView>

      {/* Character Detail Modal */}
      <CharacterDetailModal
        character={selectedCharacter}
        isVisible={isModalVisible}
        onClose={handleModalClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFB347',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0C4DE',
    textAlign: 'center',
    lineHeight: 22,
  },
  instructionsContainer: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#B0C4DE',
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 16,
  },
  characterGrid: {
    gap: 16,
  },
  characterCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  characterCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  characterCardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  characterTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  characterTypeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  characterCardDescription: {
    fontSize: 14,
    color: '#B0C4DE',
    lineHeight: 20,
    marginBottom: 8,
  },
  protagonistBadge: {
    fontSize: 12,
    color: '#FFB347',
    fontWeight: '600',
    marginBottom: 4,
  },
  tapHint: {
    fontSize: 12,
    color: '#888888',
    fontStyle: 'italic',
    textAlign: 'right',
  },
  integrationSection: {
    backgroundColor: 'rgba(255, 179, 71, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB347',
    marginBottom: 20,
  },
  integrationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFB347',
    marginBottom: 8,
  },
  integrationText: {
    fontSize: 14,
    color: '#B0C4DE',
    lineHeight: 20,
  },
});

export default CharacterModalDemo;
