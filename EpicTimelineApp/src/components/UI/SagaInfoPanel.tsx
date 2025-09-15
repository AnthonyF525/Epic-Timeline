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
      { title: 'Open Arms', description: 'Polites advocates for kindness and trust', duration: '3:32', completed: true },
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
  },
  {
    id: 'circe',
    name: 'Circe Saga',
    color: '#9B59B6',
    description: 'Odysseus encounters the powerful sorceress Circe, who transforms his men and tests his resolve.',
    theme: 'Magic, transformation, and wisdom',
    keyCharacters: ['Odysseus', 'Circe', 'Eurylochus', 'Hermes'],
    songs: [
      { title: 'Puppeteer', description: 'Circe weaves her magic', duration: '3:15', completed: true },
      { title: 'Wouldn\'t You Like', description: 'Hermes offers guidance', duration: '2:48', completed: true },
      { title: 'Done For', description: 'Magic meets determination', duration: '4:20', completed: true },
      { title: 'There Are Other Ways', description: 'A different path emerges', duration: '3:52', completed: true }
    ],
    locations: ['Circe\'s Island'],
    lat: 39.1099,
    lng: 16.9864,
    released: true,
    totalSongs: 4,
    completedSongs: 4,
    significance: 'Learning wisdom through magic'
  },
  {
    id: 'underworld',
    name: 'Underworld Saga',
    color: '#34495E',
    description: 'Odysseus descends to the Underworld to seek guidance from the prophet Tiresias.',
    theme: 'Death, prophecy, and sacrifice',
    keyCharacters: ['Odysseus', 'Tiresias', 'Anticlea'],
    songs: [
      { title: 'The Underworld', description: 'Journey to the realm of the dead', duration: '3:40', completed: true },
      { title: 'No Longer You', description: 'Tiresias reveals the future', duration: '4:15', completed: true },
      { title: 'Monster', description: 'Odysseus accepts his dark transformation', duration: '3:06', completed: true }
    ],
    locations: ['Gates of Hades', 'River Styx'],
    lat: 36.9214,
    lng: 22.4889,
    released: true,
    totalSongs: 3,
    completedSongs: 3,
    significance: 'Confronting mortality and destiny'
  },
  {
    id: 'thunder',
    name: 'Thunder Saga',
    color: '#F1C40F',
    description: 'Zeus tests Odysseus in a devastating choice between his crew and his return home.',
    theme: 'Divine justice and impossible choices',
    keyCharacters: ['Odysseus', 'Zeus', 'Eurylochus', 'Scylla'],
    songs: [
      { title: 'Suffering', description: 'The crew faces the threat of the sirens', duration: '3:28', completed: true },
      { title: 'Different Beast', description: 'Odysseus embraces ruthlessness', duration: '3:45', completed: true },
      { title: 'Scylla', description: 'The six-headed monster strikes', duration: '4:02', completed: true },
      { title: 'Mutiny', description: 'The crew rebels', duration: '4:18', completed: true },
      { title: 'Thunder Bringer', description: 'Zeus delivers judgment', duration: '4:35', completed: true }
    ],
    locations: ['Strait of Messina', 'Thrinacia Island'],
    lat: 38.2466,
    lng: 15.6912,
    released: true,
    totalSongs: 5,
    completedSongs: 5,
    significance: 'The ultimate test of leadership'
  },
  {
    id: 'wisdom',
    name: 'Wisdom Saga',
    color: '#3498DB',
    description: 'Odysseus learns hard truths about love, loss, and the price of survival.',
    theme: 'Growth through suffering',
    keyCharacters: ['Odysseus', 'Athena', 'Calypso', 'Antinous'],
    songs: [
      { title: 'Legendary', description: 'Telemachus wonders if he can live up to the stories of his father', duration: '3:20', completed: true },
      { title: 'Little Wolf', description: 'Antinous underestimates the prince', duration: '3:55', completed: true },
      { title: 'We\'ll Be Fine', description: 'Telemachus and Athena\'s bond strengthens', duration: '4:12', completed: true },
      { title: 'Love in Paradise', description: 'Flashback to Calypso\'s island prison', duration: '5:28', completed: true },
      { title: 'God Games', description: 'Athena pleads with Zeus for Odysseus', duration: '4:45', completed: true }
    ],
    locations: ['Calypso\'s Island', 'Mount Olympus'],
    lat: 35.8617,
    lng: 14.3754,
    released: true,
    totalSongs: 5,
    completedSongs: 5,
    significance: 'Wisdom earned through trials'
  },
  {
    id: 'vengeance',
    name: 'Vengeance Saga',
    color: '#1ABC9C',
    description: 'Odysseus gets a final chance to returns home to Ithaca. The challenges this time will be the hardest yet.',
    theme: 'Justice, Revenge, and Reclamation',
    keyCharacters: ['Odysseus', 'Antinous', 'Melanthius', 'Amphinomus'],
    songs: [
      { title: 'Not Sorry for Loving You', description: 'Calypso\'s final plea', duration: '3:33', completed: true },
      { title: 'Dangerous', description: 'Hermes tells Odysseus about his final chance to get home', duration: '3:26', completed: true },
      { title: 'Charybdis', description: 'Final trial before reaching home', duration: '3:44', completed: true },
      { title: 'Get in the Water', description: 'Poseidon demands respect and revenge', duration: '4:02', completed: true },
      { title: '600 Strike', description: 'Odysseus unleashes his fury on Poseidon', duration: '4:18', completed: true }
    ],
    locations: ['Ithaca Palace', 'Telemachus\'s Training Grounds'],
    lat: 38.4419,
    lng: 20.6611,
    released: true,
    totalSongs: 5,
    completedSongs: 5,
    significance: 'The family fights back against the suitors'
  },
  {
    id: 'ithaca',
    name: 'Ithaca Saga',
    color: '#E74C3C',
    description: 'The final saga as Odysseus reclaims his throne and reunites with his family.',
    theme: 'Homecoming and redemption',
    keyCharacters: ['Odysseus', 'Penelope', 'Telemachus', 'Antinous'],
    songs: [
      { title: 'The Challenge', description: 'A contest for the queen', duration: '3:30', completed: false },
      { title: 'Hold Them Down', description: 'The suitors\' plot', duration: '3:45', completed: false },
      { title: 'Odysseus', description: 'The king reveals himself', duration: '4:20', completed: false },
      { title: 'I Can\'t Help But Wonder', description: 'Telemachus\'s lays out his doubts and hopes as he reunites with his father', duration: '4:05', completed: false },
      { title: 'Would You Fall in Love with Me Again', description: 'Odysseus and Penelope\'s reunion', duration: '3:15', completed: false }
    ],
    locations: ['Ithaca Palace', 'Penelope\'s Chamber'],
    lat: 38.4419,
    lng: 20.6611,
    released: false,
    totalSongs: 5,
    completedSongs: 0,
    significance: 'The long-awaited homecoming'
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
    console.log('• Character pressed:', characterName);
    
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
      'Polites': 9,
      'Antinous': 10,
      'Aeolus': 11,
      'Hermes': 12,
      'Tiresias': 13,
      'Anticlea': 14,
      'Calypso': 15,
      'Zeus': 16,
      'Helios': 17,
      'Scylla': 18
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
      // Map saga IDs to location identifiers that EventService can use
      const locationMap: { [key: string]: string } = {
        'troy': 'troy',
        'cyclops': 'cyclops-island',
        'ocean': 'ocean-saga',
        'circe': 'circe-island', 
        'underworld': 'underworld',
        'thunder': 'thunder-saga',
        'wisdom': 'wisdom-saga',
        'vengeance': 'vengeance-saga',
        'ithaca': 'ithaca'
      };
      
      const locationId = locationMap[saga.id];
      
      if (locationId) {
        console.log(`Loading events for saga: ${saga.name} (${saga.id}) with locationId: ${locationId}`);
        const events = await EventService.getEvents({ locationId });
        setSagaEvents(events);
        console.log(`✓ Loaded ${events.length} events for ${saga.name}`);
      } else {
        console.warn(`No location mapping found for saga: ${saga.id}`);
        setSagaEvents([]);
      }
    } catch (error) {
      console.error('✗ Failed to load saga events:', error);
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
        <ScrollView showsVerticalScrollIndicator={false} style={styles.songList}>
          {saga.songs.map((song, index) => (
            <TouchableOpacity key={index} style={styles.songCard}>
              <View style={styles.songHeader}>
                <Text style={styles.songTitle}>{song.title}</Text>
                <View style={styles.songActions}>
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => {
                      // Create a Song object for the audio player
                      const songData: any = {
                        id: index + 1,
                        title: song.title,
                        trackNumber: index + 1,
                        description: song.description,
                        durationSeconds: 240, // Default 4 minutes
                        audioUrl: null, // Will be populated by Spotify service
                        saga: {
                          id: 1,
                          title: saga.name,
                          description: saga.description,
                          episodeCount: saga.songs.length,
                          genres: ['Musical Theatre'],
                          themes: [saga.theme],
                          inspirations: ['Greek Mythology'],
                          totalDurationSeconds: saga.songs.length * 240
                        },
                        characters: []
                      };
                      console.log('• Playing song:', songData.title);
                      playSong(songData);
                    }}
                  >
                    <Text style={styles.playButtonText}>▶•</Text>
                  </TouchableOpacity>
                  <Text style={styles.songDuration}>{song.duration}</Text>
                </View>
              </View>
              <Text style={styles.songDescription}>{song.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
              <Text style={styles.backToMapButtonIcon}>◦ </Text>
              <Text style={styles.backToMapButtonText}>Back to Map</Text>
            </TouchableOpacity>
            
            <View style={styles.headerText}>
              <Text style={styles.title}>{saga.name}</Text>
              <Text style={styles.subtitle}>
                {saga.totalSongs || saga.songs.length} songs
              </Text>
            </View>
            
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>•</Text>
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
  songCard: {
    backgroundColor: '#16213e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  songHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  songTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  songActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  playButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  songDuration: {
    color: '#B0C4DE',
    fontSize: 14,
    fontWeight: '500',
  },
  songDescription: {
    color: '#E6E6FA',
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 18,
  },
  songStatus: {
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  completed: {
    backgroundColor: '#27AE60',
    color: '#FFFFFF',
  },
  upcoming: {
    backgroundColor: '#F39C12',
    color: '#FFFFFF',
  },
});

export default SagaInfoPanel;
export { EPIC_SAGAS };
