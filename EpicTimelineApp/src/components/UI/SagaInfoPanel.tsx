import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  ViewStyle,
} from 'react-native';
import SongList from '../Audio/SongList';
import SongDataService from '../../services/SongDataService';
import EventService, { ApiEvent, Character } from '../../services/EventService';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import CharacterDetailModal from './CharacterDetailModal';
import { getEpicCharacter, EPIC_CHARACTERS } from '../../utils/epicCharacters';

// Define saga data structure
export interface SagaInfo {
  id: string;
  name: string;
  color: string;
  description: string;
  theme: string;
  keyCharacters: string[];
  songs: {
    title: string;
    description: string;
    duration?: string;
    completed?: boolean;
  }[];
  locations: string[];
  lat: number;
  lng: number;
  released?: boolean;
  totalSongs?: number;
  completedSongs?: number;
  significance?: string;
}

interface SagaInfoPanelProps {
  saga: SagaInfo | null;
  isVisible: boolean;
  onClose: () => void;
  style?: ViewStyle;
  allSagas?: SagaInfo[];
  onSagaSelect?: (saga: SagaInfo) => void;
}

const EPIC_SAGAS: SagaInfo[] = [
  {
    id: 'troy',
    name: 'Troy Saga',
    color: '#E74C3C',
    description: 'The legendary story of the Trojan War, featuring heroes like Odysseus in an epic battle that would determine the fate of Troy.',
    theme: 'Honor, war, and the cost of glory',
    keyCharacters: ['Odysseus', 'Athena', 'Polites', 'Eurylochus'],
    songs: [
      { title: 'The Horse and the Infant', description: 'A prophecy foretells the fall of Troy', duration: '2:42', completed: true },
      { title: 'Just a Man', description: 'Odysseus faces a moral dilemma', duration: '3:15', completed: true },
      { title: 'Full Speed Ahead', description: 'The journey begins', duration: '2:58', completed: true },
      { title: 'Open Arms', description: 'Encountering the Lotus Eaters', duration: '3:32', completed: true },
      { title: 'Warrior of the Mind', description: 'Athena guides a young hero', duration: '4:01', completed: true }
    ],
    locations: ['Troy', 'Greek Ships', 'Trojan Plains'],
    lat: 39.9574,
    lng: 26.2394,
    released: true,
    totalSongs: 5,
    completedSongs: 5,
    significance: 'The epic tale that started it all'
  },
  {
    id: 'cyclops',
    name: 'Cyclops Saga',
    color: '#F39C12',
    description: 'Odysseus and his crew encounter the terrifying Cyclops Polyphemus in a deadly game of wit and survival.',
    theme: 'Cleverness vs. brute force',
    keyCharacters: ['Odysseus', 'Polyphemus', 'Athena', 'Eurylochus'],
    songs: [
      { title: 'Polyphemus', description: 'The giant awakens', duration: '3:20', completed: true },
      { title: 'Survive', description: 'A battle for survival begins', duration: '4:12', completed: true },
      { title: 'Remember Them', description: 'Honoring the fallen', duration: '3:48', completed: true },
      { title: 'My Goodbye', description: 'A divine farewell', duration: '4:35', completed: true }
    ],
    locations: ['Cyclops Island', 'Polyphemus Cave'],
    lat: 37.0625,
    lng: 22.9492,
    released: true,
    totalSongs: 4,
    completedSongs: 4,
    significance: 'A test of intelligence over strength'
  },
  {
    id: 'ocean',
    name: 'Ocean Saga',
    color: '#3498DB',
    description: 'Odysseus faces the wrath of Poseidon and encounters new challenges on the vast ocean.',
    theme: 'Divine punishment and perseverance',
    keyCharacters: ['Odysseus', 'Poseidon', 'Eurylochus', 'Aeolus'],
    songs: [
      { title: 'Storm', description: 'The seas rage against the crew', duration: '3:45', completed: true },
      { title: 'Luck Runs Out', description: 'Doubt creeps into the crew', duration: '4:20', completed: true },
      { title: 'Keep Your Friends Close', description: 'Trust becomes precious', duration: '5:15', completed: true },
      { title: 'Ruthlessness', description: 'Poseidon\'s lesson', duration: '3:58', completed: true }
    ],
    locations: ['Open Ocean', 'Aeolus Island'],
    lat: 38.0,
    lng: 20.0,
    released: true,
    totalSongs: 4,
    completedSongs: 4,
    significance: 'Divine wrath and consequences'
  }
];

// Main SagaInfoPanel component
const SagaInfoPanel: React.FC<SagaInfoPanelProps> = ({
  saga,
  isVisible,
  onClose,
  style,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'songs' | 'events'>('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [sagaEvents, setSagaEvents] = useState<ApiEvent[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { playSong } = useAudioPlayer();

  // Animation effect
  useEffect(() => {
    if (isVisible && saga) {
      slideAnim.setValue(1);
      fadeAnim.setValue(0);

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isVisible, saga, slideAnim, fadeAnim]);

  // Handle character press for modal
  const handleCharacterPress = async (characterName: string) => {
    console.log('🎭 Character pressed:', characterName);
    
    // Map character names to their IDs in EventService
    const characterIdMap: {[key: string]: number} = {
      'Odysseus': 1,
      'Penelope': 2,
      'Telemachus': 3,
      'Athena': 4,
      'Poseidon': 5,
      'Polyphemus': 6,
      'Circe': 7,
      'Eurylochus': 8,
      'Polites': 9
    };
    
    let character: Character | null = null;
    
    // First try to find character in current events
    for (const event of sagaEvents) {
      character = event.characters.find(c => c.name === characterName) || null;
      if (character) break;
    }
    
    // If not found, try to get full character data from EventService
    if (!character) {
      const characterId = characterIdMap[characterName];
      if (characterId) {
        try {
          character = await EventService.getCharacterDetails(characterId);
        } catch (error) {
          console.warn('Failed to get character details from EventService:', error);
        }
      }
    }
    
    // Final fallback with EPIC character data
    if (!character) {
      character = getEpicCharacter(characterName);
    }
    
    setSelectedCharacter(character);
  };

  // Load events when saga changes
  useEffect(() => {
    if (saga && activeTab === 'events') {
      loadSagaEvents();
    }
  }, [saga, activeTab]);

  const loadSagaEvents = async () => {
    if (!saga) return;
    
    setIsLoading(true);
    try {
      const locationMap: { [key: string]: string } = {
        'troy': 'troy',
        'cyclops': 'cyclops-island'
      };
      
      const locationId = locationMap[saga.id];
      
      if (locationId) {
        const events = await EventService.getEvents({ locationId });
        setSagaEvents(events);
      } else {
        setSagaEvents([]);
      }
    } catch (error) {
      console.error('❌ Failed to load saga events:', error);
      setSagaEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderOverviewTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{saga?.description}</Text>
      </View>
      
      <View style={styles.themeContainer}>
        <Text style={styles.sectionTitle}>Central Theme</Text>
        <Text style={styles.themeText}>{saga?.theme}</Text>
      </View>

      <View style={styles.charactersContainer}>
        <Text style={styles.sectionTitle}>Key Characters</Text>
        <View style={styles.charactersList}>
          {saga?.keyCharacters.map((character, index) => (
            <TouchableOpacity
              key={index}
              style={styles.characterTag}
              onPress={() => handleCharacterPress(character)}
            >
              <Text style={styles.characterName}>{character}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.locationsContainer}>
        <Text style={styles.sectionTitle}>Locations</Text>
        <View style={styles.locationsList}>
          {saga?.locations.map((location, index) => (
            <View key={index} style={styles.locationTag}>
              <Text style={styles.locationName}>{location}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderSongsTab = () => (
    <View style={styles.tabContent}>
      {saga && (
        <SongList
          songs={saga.songs.map((s, index) => ({
            id: index + 1,
            title: s.title,
            trackNumber: index + 1,
            description: s.description,
            durationSeconds: parseInt(s.duration?.split(':')[0] || '3') * 60 + parseInt(s.duration?.split(':')[1] || '0'),
            saga: {
              id: 1,
              title: saga.name,
              description: saga.description,
              episodeCount: saga.songs.length,
              genres: ['Musical Theatre', 'Rock Opera'],
              themes: [saga.theme],
              inspirations: ['Homer\'s Odyssey'],
              totalDurationSeconds: saga.songs.reduce((total, song) => {
                const duration = song.duration?.split(':');
                return total + (parseInt(duration?.[0] || '3') * 60 + parseInt(duration?.[1] || '0'));
              }, 0)
            },
            characters: saga.keyCharacters.map((name) => {
              // Map character names to full character objects for EPIC: The Musical
              return getEpicCharacter(name);
            }),
            perspective: 'Odysseus',
            narrativeContext: s.description,
            isReleased: s.completed || false
          }))}
          onSongPress={(song) => {
            console.log('🎵 Song pressed:', song.title);
            // TODO: Implement proper song playback integration
          }}
          style={styles.songList}
        />
      )}
    </View>
  );

  const renderEventsTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading events...</Text>
        </View>
      ) : sagaEvents.length > 0 ? (
        <View style={styles.eventsContainer}>
          {sagaEvents.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventOrder}>#{event.sequenceOrder}</Text>
              </View>
              <Text style={styles.eventDescription}>{event.description}</Text>
              
              {event.characters && event.characters.length > 0 && (
                <View style={styles.eventCharacters}>
                  <Text style={styles.eventCharactersLabel}>Characters:</Text>
                  <View style={styles.eventCharactersList}>
                    {event.characters.map((character, charIndex) => (
                      <TouchableOpacity
                        key={charIndex}
                        style={styles.eventCharacterTag}
                        onPress={() => handleCharacterPress(character.name)}
                      >
                        <Text style={styles.eventCharacterName}>{character.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            No events found for {saga?.name}
          </Text>
        </View>
      )}
    </ScrollView>
  );

  if (!isVisible || !saga) {
    return null;
  }

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          style,
          {
            transform: [{
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, Dimensions.get('window').width],
              }),
            }],
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={[styles.header, { backgroundColor: saga.color }]}>
          <View style={styles.headerContent}>
            {/* Back to Map button */}
            <TouchableOpacity style={styles.backToMapButton} onPress={onClose}>
              <Text style={styles.backToMapButtonIcon}>🗺️</Text>
              <Text style={styles.backToMapButtonText}>Back to Map</Text>
            </TouchableOpacity>
            
            <View style={styles.headerText}>
              <Text style={styles.title}>{saga.name}</Text>
              <Text style={styles.subtitle}>
                {saga.totalSongs || saga.songs.length} songs • {saga.released ? 'Released' : 'Coming Soon'}
              </Text>
            </View>
            
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'songs' && styles.activeTab]}
            onPress={() => setActiveTab('songs')}
          >
            <Text style={[styles.tabText, activeTab === 'songs' && styles.activeTabText]}>
              Songs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'events' && styles.activeTab]}
            onPress={() => setActiveTab('events')}
          >
            <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
              Events
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'songs' && renderSongsTab()}
          {activeTab === 'events' && renderEventsTab()}
        </View>
      </Animated.View>

      {/* Character Detail Modal */}
      <CharacterDetailModal
        character={selectedCharacter}
        isVisible={!!selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: Dimensions.get('window').width * 0.85,
    maxWidth: 400,
    backgroundColor: '#1a1a2e',
    borderLeftWidth: 1,
    borderLeftColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: { flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  backToMapButtonIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  backToMapButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#2a2a4e',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4A90E2',
  },
  tabText: {
    fontSize: 16,
    color: '#B0C4DE',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  content: { flex: 1 },
  tabContent: { flex: 1, padding: 20 },
  songList: { flex: 1 },
  descriptionContainer: { marginBottom: 24 },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#E6E6FA',
  },
  themeContainer: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 12,
  },
  themeText: {
    fontSize: 16,
    color: '#B0C4DE',
    fontStyle: 'italic',
  },
  charactersContainer: { marginBottom: 24 },
  charactersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  characterTag: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  characterName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  locationsContainer: { marginBottom: 24 },
  locationsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  locationTag: {
    backgroundColor: '#6C7B95',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  locationName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  eventsContainer: { gap: 16 },
  eventCard: {
    backgroundColor: '#2a2a4e',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  eventOrder: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  eventDescription: {
    fontSize: 16,
    color: '#E6E6FA',
    lineHeight: 22,
    marginBottom: 12,
  },
  eventCharacters: { marginBottom: 12 },
  eventCharactersLabel: {
    fontSize: 14,
    color: '#B0C4DE',
    fontWeight: '600',
    marginBottom: 8,
  },
  eventCharactersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  eventCharacterTag: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  eventCharacterName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#B0C4DE',
    fontSize: 16,
  },
  emptyStateContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#E6E6FA',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default SagaInfoPanel;
export { EPIC_SAGAS };
