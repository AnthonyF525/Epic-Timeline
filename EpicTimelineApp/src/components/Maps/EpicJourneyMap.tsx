/**
 * EpicJourneyMap - Real Mediterranean Map with EPIC Plot Points
 * 
 * This component displays Odysseus's journey across the real Mediterranean Sea
 * with accurate geographic locations and beautiful visual design
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Modal,
  ImageBackground,
  Alert
} from 'react-native';
import Svg, {
  Path,
  Circle,
  Text as SvgText,
  Line,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Polyline,
  Marker
} from 'react-native-svg';
import SeedDataService from '../../services/SeedDataService';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import { Song } from '../Audio/SongList';
import realSpotifyService from '../../services/RealSpotifyService';

// Real Mediterranean coordinates for EPIC locations
const EPIC_LOCATIONS = [
  // Troy Saga
  { 
    id: 1, 
    name: 'Troy', 
    lat: 39.9575, 
    lng: 26.2387, 
    saga: 'Troy', 
    color: '#CD853F', 
    songs: ['The Horse and the Infant', 'Just a Man'],
    description: 'The legendary city of Troy, site of the epic war',
    type: 'city',
    features: ['Trojan Horse', 'Palace', 'Walls'],
    significance: 'Birthplace of Odysseus\'s journey',
    characters: [
      {
        name: 'Odysseus',
        title: 'King of Ithaca',
        description: 'The clever hero who devised the Trojan Horse strategy and now faces the burden of leadership.',
        powers: ['Strategic Genius', 'Leadership', 'Archery'],
        personality: ['Clever', 'Ruthless when necessary', 'Protective of his men'],
        role: 'Main protagonist struggling with the weight of command'
      },
      {
        name: 'Polites',
        title: 'Odysseus\'s Best Friend',
        description: 'The optimistic and kind-hearted friend who believes in greeting the world with open arms.',
        powers: ['Emotional Intelligence', 'Loyalty'],
        personality: ['Optimistic', 'Kind', 'Trusting'],
        role: 'The moral compass and heart of the crew'
      }
    ]
  },
  { 
    id: 2, 
    name: 'Troy Harbor', 
    lat: 39.9550, 
    lng: 26.2350, 
    saga: 'Troy', 
    color: '#CD853F', 
    songs: ['Full Speed Ahead', 'Open Arms', 'Warrior of the Mind'],
    description: 'The harbor where the Greek fleet departed',
    type: 'harbor',
    features: ['Greek Ships', 'Departure Point'],
    significance: 'Beginning of the journey home',
    characters: [
      {
        name: 'Odysseus',
        title: 'King of Ithaca',
        description: 'The leader preparing to lead his men home after ten years of war.',
        powers: ['Leadership', 'Strategic Planning', 'Navigation'],
        personality: ['Confident', 'Eager to return home', 'Responsible for his crew'],
        role: 'Captain setting sail for what should be a simple journey home'
      },
      {
        name: 'Athena',
        title: 'Goddess of Wisdom',
        description: 'The divine patron who guides Odysseus with wisdom and strategic advice.',
        powers: ['Divine Wisdom', 'Strategic Guidance', 'Divine Protection'],
        personality: ['Wise', 'Protective', 'Challenging'],
        role: 'Divine mentor who tests and guides Odysseus'
      }
    ]
  },
  
  // Cyclops Saga  
  { 
    id: 3, 
    name: 'Cyclops Island', 
    lat: 37.7749, 
    lng: 14.4253, 
    saga: 'Cyclops', 
    color: '#FF6B35', 
    songs: ['Polyphemus', 'Survive', 'Remember Them', 'My Goodbye'],
    description: 'The mysterious island home of Polyphemus',
    type: 'island',
    features: ['Cave', 'Sheep', 'Giant\'s Lair'],
    significance: 'First major obstacle in the journey',
    characters: [
      {
        name: 'Polyphemus',
        title: 'Cyclops Son of Poseidon',
        description: 'The massive one-eyed giant who traps Odysseus and his men in his cave.',
        powers: ['Immense Strength', 'Stone Throwing', 'Divine Heritage'],
        personality: ['Savage', 'Territorial', 'Simple-minded'],
        role: 'First major antagonist in Odysseus\'s journey'
      },
      {
        name: 'Odysseus',
        title: 'King of Ithaca',
        description: 'Uses his wit and cunning to escape the Cyclops, but reveals his true name in pride.',
        powers: ['Strategic Mind', 'Cunning', 'Leadership'],
        personality: ['Clever', 'Prideful', 'Protective'],
        role: 'Protagonist learning the cost of pride'
      }
    ]
  },
  
  // Ocean Saga
  { 
    id: 4, 
    name: 'Aeolus Island', 
    lat: 38.5, 
    lng: 15.0, 
    saga: 'Ocean', 
    color: '#4A90E2', 
    songs: ['Storm', 'Luck Runs Out'],
    description: 'Floating island of the wind god Aeolus',
    type: 'floating_island',
    features: ['Wind Palace', 'Magic Bag'],
    significance: 'Received the bag of winds',
    characters: [
      {
        name: 'Aeolus',
        title: 'God of the Winds',
        description: 'The divine keeper of the winds who grants Odysseus the bag of winds to help him reach home.',
        powers: ['Wind Control', 'Weather Manipulation'],
        personality: ['Helpful', 'Generous', 'Divine'],
        role: 'Divine ally who provides crucial assistance to Odysseus'
      },
      {
        name: 'Odysseus',
        title: 'King of Ithaca',
        description: 'Receives the gift of winds from Aeolus but struggles with trust and leadership.',
        powers: ['Strategic Mind', 'Leadership'],
        personality: ['Clever', 'Determined', 'Burden-bearer'],
        role: 'Protagonist seeking divine aid for his journey home'
      }
    ]
  },
  { 
    id: 5, 
    name: 'Open Ocean', 
    lat: 36.0, 
    lng: 18.0, 
    saga: 'Ocean', 
    color: '#4A90E2', 
    songs: ['Keep Your Friends Close', 'Ruthlessness'],
    description: 'The treacherous open waters of the Mediterranean',
    type: 'ocean',
    features: ['Storms', 'Poseidon\'s Domain'],
    significance: 'Encounter with Poseidon\'s wrath',
    characters: [
      {
        name: 'Poseidon',
        title: 'God of the Sea',
        description: 'The wrathful sea god who punishes Odysseus for harming his son Polyphemus.',
        powers: ['Ocean Control', 'Storm Creation', 'Divine Wrath'],
        personality: ['Vengeful', 'Powerful', 'Unforgiving'],
        role: 'Primary antagonist seeking vengeance against Odysseus'
      }
    ]
  },
  
  // Circe Saga
  { 
    id: 6, 
    name: 'Circe\'s Island', 
    lat: 41.9028, 
    lng: 12.4964, 
    saga: 'Circe', 
    color: '#9B59B6', 
    songs: ['Puppeteer', 'Wouldn\'t You Like', 'Done For', 'There Are Other Ways'],
    description: 'The enchanted island of the sorceress Circe',
    type: 'enchanted_island',
    features: ['Palace', 'Herb Garden', 'Transformed Men'],
    significance: 'Learned the path to the Underworld',
    characters: [
      {
        name: 'Circe',
        title: 'Goddess of Magic',
        description: 'The powerful sorceress who initially transforms Odysseus\'s men into pigs but becomes an ally.',
        powers: ['Transformation Magic', 'Potion Brewing', 'Prophecy'],
        personality: ['Cunning', 'Seductive', 'Wise'],
        role: 'Antagonist turned ally who provides crucial guidance'
      },
      {
        name: 'Hermes',
        title: 'Messenger God',
        description: 'The divine messenger who provides Odysseus with the moly herb to resist Circe\'s magic.',
        powers: ['Divine Speed', 'Divine Knowledge', 'Magic Resistance'],
        personality: ['Helpful', 'Mischievous', 'Wise'],
        role: 'Divine guide who aids Odysseus against Circe'
      }
    ]
  },
  
  // Underworld Saga
  { 
    id: 7, 
    name: 'Underworld Entrance', 
    lat: 38.4, 
    lng: 21.8, 
    saga: 'Underworld', 
    color: '#2C3E50', 
    songs: ['The Underworld', 'No Longer You', 'Monster'],
    description: 'The gateway to the realm of the dead',
    type: 'mystical_location',
    features: ['River Styx', 'Souls of the Dead', 'Prophecy'],
    significance: 'Received crucial prophecy about his journey',
    characters: [
      {
        name: 'Tiresias',
        title: 'Prophet of the Dead',
        description: 'The blind prophet who reveals Odysseus\'s dark future and the path home.',
        powers: ['Prophecy', 'Spirit Communication', 'Divine Sight'],
        personality: ['Wise', 'Ominous', 'Truthful'],
        role: 'Oracle who reveals the harsh truth about Odysseus\'s journey'
      },
      {
        name: 'Anticlea',
        title: 'Odysseus\'s Mother',
        description: 'Odysseus\'s mother who died waiting for his return, bringing him immense guilt.',
        powers: ['Maternal Love', 'Spirit Form'],
        personality: ['Loving', 'Sorrowful', 'Devoted'],
        role: 'Emotional catalyst who shows the cost of Odysseus\'s absence'
      }
    ]
  },
  
  // Thunder Saga
  { 
    id: 8, 
    name: 'Scylla\'s Strait', 
    lat: 38.2500, 
    lng: 15.6333, 
    saga: 'Thunder', 
    color: '#F1C40F', 
    songs: ['Suffering', 'Different Beast', 'Scylla'],
    description: 'The deadly strait between Scylla and Charybdis',
    type: 'strait',
    features: ['Six-headed Monster', 'Whirlpool', 'Cliffs'],
    significance: 'Lost six men to Scylla',
    characters: [
      {
        name: 'Scylla',
        title: 'Six-Headed Monster',
        description: 'The terrifying sea monster with six heads that devours six of Odysseus\'s men.',
        powers: ['Multiple Heads', 'Massive Size', 'Sea Monster Strength'],
        personality: ['Monstrous', 'Hungry', 'Territorial'],
        role: 'Deadly obstacle that forces Odysseus to sacrifice his men'
      }
    ]
  },
  { 
    id: 9, 
    name: 'Helios\' Island', 
    lat: 36.4, 
    lng: 25.4, 
    saga: 'Thunder', 
    color: '#F1C40F', 
    songs: ['Mutiny', 'Thunder Bringer'],
    description: 'The sacred island of the sun god Helios',
    type: 'sacred_island',
    features: ['Sacred Cattle', 'Sun Temple'],
    significance: 'Site of the final betrayal by his crew',
    characters: [
      {
        name: 'Eurylochus',
        title: 'Second in Command',
        description: 'Odysseus\'s trusted lieutenant who leads the mutiny and slaughter of Helios\'s cattle.',
        powers: ['Leadership', 'Combat Skills'],
        personality: ['Loyal but desperate', 'Pragmatic', 'Ultimately selfish'],
        role: 'Friend turned betrayer who dooms the crew'
      },
      {
        name: 'Zeus',
        title: 'King of the Gods',
        description: 'The supreme god who must punish the crew for eating Helios\'s sacred cattle.',
        powers: ['Thunder', 'Divine Justice', 'Ultimate Authority'],
        personality: ['Just', 'Powerful', 'Unforgiving'],
        role: 'Divine judge who enforces cosmic law'
      }
    ]
  },
  
  // Wisdom Saga
  { 
    id: 10, 
    name: 'Calypso\'s Island', 
    lat: 35.8, 
    lng: 14.5, 
    saga: 'Wisdom', 
    color: '#E67E22', 
    songs: ['Love in Paradise'],
    description: 'The hidden island where Calypso held Odysseus',
    type: 'hidden_island',
    features: ['Paradise Beach', 'Calypso\'s Cave'],
    significance: 'Seven years of captivity',
    characters: [
      {
        name: 'Calypso',
        title: 'Immortal Nymph',
        description: 'The immortal sea nymph who falls in love with Odysseus and holds him captive for seven years.',
        powers: ['Immortality', 'Island Control', 'Divine Beauty'],
        personality: ['Loving', 'Possessive', 'Lonely'],
        role: 'Captor who genuinely loves Odysseus but ultimately must let him go'
      }
    ]
  },
  { 
    id: 11, 
    name: 'Ithaca (Telemachus)', 
    lat: 38.4667, 
    lng: 20.6833, 
    saga: 'Wisdom', 
    color: '#E67E22', 
    songs: ['Legendary', 'Little Wolf', 'We\'ll Be Fine'],
    description: 'Odysseus\'s homeland, where Telemachus grows up',
    type: 'kingdom',
    features: ['Palace', 'Suitors', 'Penelope\'s Chambers'],
    significance: 'The destination of the entire journey',
    characters: [
      {
        name: 'Telemachus',
        title: 'Prince of Ithaca',
        description: 'Odysseus\'s son who grows up without his father and must learn to be strong.',
        powers: ['Royal Authority', 'Growing Wisdom', 'Determination'],
        personality: ['Young', 'Eager', 'Brave'],
        role: 'The next generation who must prove himself worthy'
      },
      {
        name: 'Athena',
        title: 'Goddess of Wisdom',
        description: 'The wise goddess who mentors Telemachus and guides him on his journey to manhood.',
        powers: ['Divine Wisdom', 'Strategic Warfare', 'Divine Protection'],
        personality: ['Wise', 'Strategic', 'Protective'],
        role: 'Divine mentor who helps Telemachus grow strong'
      }
    ]
  },
  { 
    id: 12, 
    name: 'Mount Olympus', 
    lat: 40.0850, 
    lng: 22.5017, 
    saga: 'Wisdom', 
    color: '#E67E22', 
    songs: ['God Games'],
    description: 'The divine home of the Greek gods',
    type: 'divine_realm',
    features: ['Throne Room', 'Divine Council'],
    significance: 'Athena\'s plea for Odysseus\'s freedom',
    characters: [
      {
        name: 'Athena',
        title: 'Goddess of Wisdom',
        description: 'The patron goddess of Odysseus who challenges the other gods to free him.',
        powers: ['Divine Wisdom', 'Strategic Warfare', 'Persuasion'],
        personality: ['Wise', 'Determined', 'Loyal'],
        role: 'Divine advocate fighting for Odysseus\'s freedom'
      },
      {
        name: 'Zeus',
        title: 'King of the Gods',
        description: 'The supreme god who oversees the divine challenge that will determine Odysseus\'s fate.',
        powers: ['Supreme Authority', 'Thunder', 'Divine Justice'],
        personality: ['Powerful', 'Fair', 'Ultimate Judge'],
        role: 'Divine arbiter who allows the contest for Odysseus\'s fate'
      }
    ]
  },
  
  // Vengeance Saga
  { 
    id: 13, 
    name: 'Calypso\'s Shore', 
    lat: 35.8, 
    lng: 14.5, 
    saga: 'Vengeance', 
    color: '#E74C3C', 
    songs: ['Not Sorry for Loving You', 'Dangerous'],
    description: 'The beach where Odysseus was finally freed',
    type: 'beach',
    features: ['Departure Point', 'Divine Intervention'],
    significance: 'Freedom after seven years',
    characters: [
      {
        name: 'Calypso',
        title: 'Immortal Nymph',
        description: 'The nymph who must finally release Odysseus despite her love for him.',
        powers: ['Immortality', 'Island Magic', 'Divine Love'],
        personality: ['Heartbroken', 'Accepting', 'Generous'],
        role: 'Former captor who gives Odysseus the tools for his final journey'
      }
    ]
  },
  { 
    id: 14, 
    name: 'Charybdis Waters', 
    lat: 38.2500, 
    lng: 15.6333, 
    saga: 'Vengeance', 
    color: '#E74C3C', 
    songs: ['Charybdis', 'Get in the Water', 'Six Hundred Strike'],
    description: 'The whirlpool domain of Charybdis',
    type: 'whirlpool',
    features: ['Massive Whirlpool', 'Poseidon\'s Rage'],
    significance: 'Final confrontation with Poseidon',
    characters: [
      {
        name: 'Poseidon',
        title: 'God of the Sea',
        description: 'The sea god who confronts Odysseus one final time for revenge.',
        powers: ['Ocean Control', 'Divine Wrath', 'Storm Creation'],
        personality: ['Wrathful', 'Persistent', 'Proud'],
        role: 'Final divine antagonist who must be defeated'
      }
    ]
  },
  
  // Ithaca Saga
  { 
    id: 15, 
    name: 'Ithaca Palace', 
    lat: 38.4667, 
    lng: 20.6833, 
    saga: 'Ithaca', 
    color: '#27AE60', 
    songs: ['The Challenge', 'Hold Them Down', 'Odysseus', 'I Can\'t Help but Wonder', 'Would You Fall in Love with Me Again'],
    description: 'The royal palace of Ithaca, Odysseus\'s home',
    type: 'palace',
    features: ['Great Hall', 'Bow of Odysseus', 'Marriage Bed'],
    significance: 'The end of the journey and reunion with family',
    characters: [
      {
        name: 'Penelope',
        title: 'Queen of Ithaca',
        description: 'Odysseus\'s faithful wife who has waited twenty years for his return.',
        powers: ['Loyalty', 'Wisdom', 'Inner Strength'],
        personality: ['Faithful', 'Strong', 'Patient'],
        role: 'The devoted wife who represents home and love'
      },
      {
        name: 'Odysseus',
        title: 'King of Ithaca',
        description: 'The returning hero who must prove his identity and reclaim his throne.',
        powers: ['Combat Skills', 'Strategic Mind', 'Archery Mastery'],
        personality: ['Transformed', 'Determined', 'Home-seeking'],
        role: 'The changed hero who has finally returned home'
      }
    ]
  }
];

// Mediterranean coastline path (simplified but geographically accurate)
const MEDITERRANEAN_COASTLINE = `
  M 50,200 
  Q 150,180 250,185 
  Q 350,190 450,195 
  Q 550,200 650,205 
  Q 750,210 850,215
  Q 950,220 1000,225
  L 1000,350
  Q 950,340 850,335
  Q 750,330 650,325
  Q 550,320 450,315
  Q 350,310 250,305
  Q 150,300 50,295
  Z
`;

interface MapLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance?: string;
  type: string;
  features: string[];
  x: number;
  y: number;
  color: string;
  sagaIndex: number;
  songs: any[];
  events: any[];
  characters: any[];
  isVisited: boolean;
  isActive: boolean;
}

interface EpicJourneyMapProps {
  selectedSaga?: string | null;
  showJourneyPath?: boolean;
  onLocationSelect?: (location: MapLocation) => void;
}

const EpicJourneyMap: React.FC<EpicJourneyMapProps> = ({
  selectedSaga = null,
  showJourneyPath = true,
  onLocationSelect
}) => {
  const [mapLocations, setMapLocations] = useState<MapLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  // Animation values for enhanced effects
  const pulseScale = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.6)).current;
  const entranceAnimations = useRef(new Map()).current;

  // Audio player integration
  const { playSong } = useAudioPlayer();

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const mapWidth = screenWidth - 40;
  const mapHeight = screenHeight * 0.65;

  // Convert lat/lng to SVG coordinates
  const coordsToSVG = (lat: number, lng: number) => {
    // Mediterranean bounds
    const minLat = 30, maxLat = 45;
    const minLng = -5, maxLng = 40;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth;
    const y = mapHeight - ((lat - minLat) / (maxLat - minLat)) * mapHeight;
    
    return { 
      x: Math.max(30, Math.min(mapWidth - 30, x)), 
      y: Math.max(30, Math.min(mapHeight - 30, y)) 
    };
  };

  // Initialize map locations
  useEffect(() => {
    const processedLocations = EPIC_LOCATIONS.map((location, index) => {
      const coords = coordsToSVG(location.lat, location.lng);
      return {
        id: location.id,
        name: location.name,
        latitude: location.lat,
        longitude: location.lng,
        description: location.description,
        saga: location.saga,
        significance: location.significance,
        type: location.type,
        features: location.features,
        x: coords.x,
        y: coords.y,
        color: location.color,
        sagaIndex: index,
        songs: [], // Will be populated from seed data
        events: [], // Will be populated from seed data
        characters: [], // Will be populated from seed data
        isActive: index === currentStep,
        isVisited: index < currentStep
      };
    });
    setMapLocations(processedLocations);
  }, [currentStep, mapWidth, mapHeight]);

  // Load seed data and update locations with actual data
  useEffect(() => {
    const loadSeedData = async () => {
      try {
        const seedDataService = SeedDataService;
        await seedDataService.initialize();
        
        // Update locations with actual seed data
        setMapLocations(currentLocations => 
          currentLocations.map(location => {
            const sagaData = seedDataService.getSagaSeedData(location.saga.toLowerCase());
            if (sagaData) {
              return {
                ...location,
                songs: sagaData.songs || [],
                events: sagaData.events || [],
                characters: sagaData.characters || []
              };
            }
            return location;
          })
        );
      } catch (error) {
        console.error('Failed to load seed data for map:', error);
      }
    };

    loadSeedData();
  }, []);

  // Initialize pulse animations for special locations
  useEffect(() => {
    const createPulseAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(pulseScale, {
              toValue: 1.4,
              duration: 1500,
              useNativeDriver: false,
            }),
            Animated.timing(pulseOpacity, {
              toValue: 0.2,
              duration: 1500,
              useNativeDriver: false,
            }),
          ]),
          Animated.parallel([
            Animated.timing(pulseScale, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: false,
            }),
            Animated.timing(pulseOpacity, {
              toValue: 0.6,
              duration: 1500,
              useNativeDriver: false,
            }),
          ]),
        ])
      );
    };

    // Pulsing animations disabled
    // const shouldPulse = mapLocations.some(loc => 
    //   loc.name.toLowerCase().includes('troy') || loc.name.toLowerCase().includes('ithaca palace')
    // );

    // if (shouldPulse) {
    //   const timer = setTimeout(() => {
    //     createPulseAnimation().start();
    //   }, 1000);

    //   return () => {
    //     clearTimeout(timer);
    //     pulseScale.stopAnimation();
    //     pulseOpacity.stopAnimation();
    //   };
    // }
  }, [mapLocations]);

  // Entrance animations for locations
  useEffect(() => {
    mapLocations.forEach((location, index) => {
      if (!entranceAnimations.has(location.id)) {
        const entranceScale = new Animated.Value(0);
        const entranceOpacity = new Animated.Value(0);
        
        entranceAnimations.set(location.id, { entranceScale, entranceOpacity });
        
        // Stagger entrance animations
        const delay = index * 200 + (location.name.toLowerCase().includes('troy') ? 0 : 500);
        
        setTimeout(() => {
          Animated.parallel([
            Animated.spring(entranceScale, {
              toValue: 1,
              tension: 100,
              friction: 8,
              useNativeDriver: false,
            }),
            Animated.timing(entranceOpacity, {
              toValue: 1,
              duration: 800,
              useNativeDriver: false,
            }),
          ]).start();
        }, delay);
      }
    });
  }, [mapLocations]);

  // Filter locations by saga
  const filteredLocations = selectedSaga 
    ? mapLocations.filter(loc => loc.saga.toLowerCase() === selectedSaga.toLowerCase())
    : mapLocations;

  // Generate journey path
  const journeyPath = filteredLocations
    .slice(0, currentStep + 1)
    .map(loc => `${loc.x},${loc.y}`)
    .join(' ');

  // Handle song press to play audio with Spotify integration
  const handleSongPress = async (songTitle: string | any, location: MapLocation) => {
    const title = typeof songTitle === 'string' ? songTitle : songTitle.title || 'Unknown Song';
    console.log('• Song clicked:', title, 'from', location.name);
    
    try {
      // Try Spotify first
      const authStatus = realSpotifyService.getAuthStatus();
      
      if (authStatus.configured && authStatus.authenticated) {
        const result = await realSpotifyService.playTrack(title);
        
        if (result.success) {
          Alert.alert('• Now Playing', result.message);
          return;
        }
      }

      // Fallback to audio player
      playWithAudioPlayer(title, location);
      
    } catch (error) {
      console.error('✗ Song play error:', error);
      playWithAudioPlayer(title, location);
    }
  };

  const playWithAudioPlayer = (title: string, location: MapLocation) => {
    try {
      // Create a properly typed song object for the audio player
      const songIndex = location.songs.findIndex(s => 
        (typeof s === 'string' ? s : s.title) === title
      );
      
      const song: Song = {
        id: location.id * 1000 + Math.max(0, songIndex), // Unique numeric ID
        title: title,
        trackNumber: Math.max(1, songIndex + 1),
        description: `From ${location.name} in the ${location.saga} Saga`,
        durationSeconds: 210, // 3:30 default
        saga: {
          id: location.id,
          title: `${location.saga} Saga`,
          description: location.description,
          episodeCount: location.songs.length,
          genres: ['Musical Theatre', 'Rock Opera'],
          themes: ['Epic Journey', 'Greek Mythology'],
          inspirations: ['Homer\'s Odyssey'],
          totalDurationSeconds: location.songs.length * 210
        },
        characters: location.characters?.map((char, index) => ({
          id: index + 1,
          name: char.name,
          characterType: char.title,
          description: char.description,
          isProtagonist: char.name === 'Odysseus',
          powers: char.powers || []
        })) || []
      };

      console.log('• Playing song object:', song);
      // Play the song using the audio player context
      playSong(song, [song]); // Single song playlist
      console.log('• Song playback initiated successfully');
    } catch (error) {
      console.error('✗ Error playing song:', error);
    }
  };

  // Handle location press
  const handleLocationPress = (location: MapLocation) => {
    console.log('◦  Location pressed:', location.name);
    setSelectedLocation(location);
    setShowModal(true);
    onLocationSelect?.(location);

    // Auto-play songs when location is focused
    if (location.songs && location.songs.length > 0) {
      const firstSong = location.songs[0];
      console.log('• Auto-playing first song:', firstSong, 'for location:', location.name);
      handleSongPress(firstSong, location);
    }

    // Enhanced press animation with bounce
    Animated.sequence([
      Animated.timing(animatedValue, { 
        toValue: 0.8, 
        duration: 100, 
        useNativeDriver: false 
      }),
      Animated.spring(animatedValue, { 
        toValue: 1.2, 
        tension: 200, 
        friction: 3, 
        useNativeDriver: false 
      }),
      Animated.timing(animatedValue, { 
        toValue: 1, 
        duration: 150, 
        useNativeDriver: false 
      })
    ]).start();
  };

  // Add interactive feedback to buttons and controls
  const handleFilterPress = (saga: string) => {
    // Quick scale animation for filter buttons
    Animated.sequence([
      Animated.timing(animatedValue, { 
        toValue: 0.95, 
        duration: 100, 
        useNativeDriver: false 
      }),
      Animated.timing(animatedValue, { 
        toValue: 1, 
        duration: 100, 
        useNativeDriver: false 
      })
    ]).start();
    
    const firstLocationIndex = EPIC_LOCATIONS.findIndex(loc => loc.saga === saga);
    if (firstLocationIndex !== -1) setCurrentStep(firstLocationIndex);
  };

  const handleControlPress = (direction: 'prev' | 'next') => {
    // Smooth slide animation for step changes
    Animated.timing(animatedValue, { 
      toValue: direction === 'next' ? 1.05 : 0.95, 
      duration: 200, 
      useNativeDriver: false 
    }).start(() => {
      Animated.timing(animatedValue, { 
        toValue: 1, 
        duration: 200, 
        useNativeDriver: false 
      }).start();
    });

    if (direction === 'next') {
      setCurrentStep(Math.min(filteredLocations.length - 1, currentStep + 1));
    } else {
      setCurrentStep(Math.max(0, currentStep - 1));
    }
  };

  // Render location marker
  const renderLocationMarker = (location: MapLocation) => {
    const isSelected = selectedLocation?.id === location.id;
    const isTroy = location.name.toLowerCase().includes('troy');
    const isIthaca = location.name.toLowerCase().includes('ithaca');
    const isSpecial = isTroy || isIthaca || location.type === 'divine_realm';
    
    const baseRadius = isSelected ? 16 : (location.isActive ? 14 : 12);
    const radius = isSpecial ? baseRadius + 2 : baseRadius;
    const opacity = location.isVisited ? 1.0 : 0.7;

    return (
      <React.Fragment key={location.id}>
        {/* Special pulsing effect for Troy and significant locations */}
        {isSpecial && (
          <Circle
            cx={location.x}
            cy={location.y}
            r={25}
            fill={location.color}
            fillOpacity={0.2}
          />
        )}
        
        {/* Active location glow */}
        {location.isActive && (
          <Circle
            cx={location.x}
            cy={location.y}
            r={radius + 10}
            fill={location.color}
            fillOpacity={0.3}
          />
        )}
        
        {/* Selection glow */}
        {isSelected && (
          <Circle
            cx={location.x}
            cy={location.y}
            r={radius + 6}
            fill="#FFD700"
            fillOpacity={0.4}
          />
        )}
        
        {/* Main location marker - wrapped in a group for click detection */}
        <Circle
          cx={location.x}
          cy={location.y}
          r={radius + 8} // Larger click area
          fill="transparent"
          onPress={() => handleLocationPress(location)}
        />
        
        {/* Visual marker */}
        <Circle
          cx={location.x}
          cy={location.y}
          r={radius}
          fill={location.color}
          fillOpacity={opacity}
          stroke={isSelected ? "#FFD700" : "#fff"}
          strokeWidth={isSelected ? 3 : 2}
         
        />

        {/* Location name with special styling for Troy */}
        <SvgText
          x={location.x}
          y={location.y - radius - 12}
          fontSize={isTroy ? 14 : 11}
          fontWeight={isTroy ? "bold" : "600"}
          textAnchor="middle"
          fill={isTroy ? "#CD853F" : "#2C3E50"}
          stroke={isTroy ? "#FFD700" : undefined}
          strokeWidth={isTroy ? 0.5 : undefined}
        >
          {isTroy ? `◦  ${location.name}` : location.name}
        </SvgText>

        {/* Song count indicator */}
        {location.songs.length > 0 && (
          <>
            <Circle
              cx={location.x + radius - 3}
              cy={location.y - radius + 3}
              r={8}
              fill="#FF6B35"
              stroke="#fff"
              strokeWidth={1}
            />
            <SvgText
              x={location.x + radius - 3}
              y={location.y - radius + 7}
              fontSize={10}
              fontWeight="bold"
              textAnchor="middle"
              fill="white"
            >
              {location.songs.length}
            </SvgText>
          </>
        )}

        {/* Special icon for Troy */}
        {isTroy && (
          <SvgText
            x={location.x}
            y={location.y + 4}
            fontSize={16}
            textAnchor="middle"
            fill="#CD853F"
          >
            ◦ 
          </SvgText>
        )}

        {/* Special icon for divine locations */}
        {location.type === 'divine_realm' && (
          <SvgText
            x={location.x}
            y={location.y + 4}
            fontSize={14}
            textAnchor="middle"
            fill="#FFD700"
          >
            •
          </SvgText>
        )}
      </React.Fragment>
    );
  };

  // Saga filter buttons
  const sagaFilters = ['Troy', 'Cyclops', 'Ocean', 'Circe', 'Underworld', 'Thunder', 'Wisdom', 'Vengeance', 'Ithaca'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EPIC: The Musical - Mediterranean Journey</Text>
      
      {/* Saga Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, !selectedSaga && styles.filterButtonActive]}
          onPress={() => setCurrentStep(0)}
        >
          <Text style={[styles.filterText, !selectedSaga && styles.filterTextActive]}>All Sagas</Text>
        </TouchableOpacity>
        
        {sagaFilters.map(saga => (
          <TouchableOpacity
            key={saga}
            style={[
              styles.filterButton,
              selectedSaga === saga && styles.filterButtonActive
            ]}
            onPress={() => handleFilterPress(saga)}
          >
            <Text style={[
              styles.filterText,
              selectedSaga === saga && styles.filterTextActive
            ]}>
              {saga}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <Svg width={mapWidth} height={mapHeight} style={styles.map}>
          <Defs>
            <LinearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#87CEEB" stopOpacity="0.8"/>
              <Stop offset="50%" stopColor="#4A90E2" stopOpacity="0.9"/>
              <Stop offset="100%" stopColor="#2E5BDA" stopOpacity="1.0"/>
            </LinearGradient>
            <RadialGradient id="troyGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#FFD700" stopOpacity="0.8"/>
              <Stop offset="50%" stopColor="#CD853F" stopOpacity="0.4"/>
              <Stop offset="100%" stopColor="#8B4513" stopOpacity="0.1"/>
            </RadialGradient>
            <RadialGradient id="ithacaGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#32CD32" stopOpacity="0.8"/>
              <Stop offset="50%" stopColor="#228B22" stopOpacity="0.4"/>
              <Stop offset="100%" stopColor="#006400" stopOpacity="0.1"/>
            </RadialGradient>
            <RadialGradient id="divineGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#FFD700" stopOpacity="0.9"/>
              <Stop offset="50%" stopColor="#FFA500" stopOpacity="0.5"/>
              <Stop offset="100%" stopColor="#FF8C00" stopOpacity="0.2"/>
            </RadialGradient>
          </Defs>

          {/* Mediterranean Sea */}
          <Path
            d={MEDITERRANEAN_COASTLINE}
            fill="url(#seaGradient)"
            stroke="#2E5BDA"
            strokeWidth={2}
          />

          {/* Journey Path with enhanced styling */}
          {showJourneyPath && journeyPath && (
            <>
              {/* Background path shadow */}
              <Polyline
                points={journeyPath}
                stroke="#1a1a1a"
                strokeWidth={6}
                strokeDasharray="8,4"
                fill="none"
                opacity={0.3}
              />
              {/* Main journey path */}
              <Polyline
                points={journeyPath}
                stroke="#FFD700"
                strokeWidth={4}
                strokeDasharray="8,4"
                fill="none"
                opacity={0.8}
              />
              {/* Glowing overlay */}
              <Polyline
                points={journeyPath}
                stroke="#FFA500"
                strokeWidth={2}
                strokeDasharray="4,2"
                fill="none"
                opacity={0.6}
              />
            </>
          )}

          {/* Location Markers */}
          {filteredLocations.map(renderLocationMarker)}
        </Svg>
      </View>

      {/* Pulsing Animation Overlays Disabled */}
      {/* {mapLocations.map(location => {
        const isTroy = location.name.toLowerCase().includes('troy');
        const isIthacaPalace = location.name.toLowerCase().includes('ithaca palace');
        const shouldPulse = isTroy || isIthacaPalace;
        
        // Only show pulse if the location is in the filtered results (visible on map)
        const isVisible = filteredLocations.some(filteredLoc => filteredLoc.id === location.id);
        
        if (!shouldPulse || !isVisible) return null;
        
        return (
          <Animated.View
            key={`pulse-${location.id}`}
            style={[
              styles.pulseOverlay,
              {
                left: location.x - 30,
                top: location.y - 30,
                transform: [{ scale: pulseScale }],
                opacity: pulseOpacity,
              }
            ]}
          >
            <View
              style={[
                styles.pulseCircle,
                {
                  backgroundColor: location.color,
                }
              ]}
            />
          </Animated.View>
        );
      })} */}

      {/* Progress Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, currentStep === 0 && styles.controlButtonDisabled]}
          onPress={() => handleControlPress('prev')}
          disabled={currentStep === 0}
        >
          <Text style={styles.controlButtonText}>← Previous</Text>
        </TouchableOpacity>
        
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>Step {currentStep + 1} of {filteredLocations.length}</Text>
          <Text style={styles.sagaText}>{filteredLocations[currentStep]?.saga || 'Journey'} Saga</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.controlButton, currentStep >= filteredLocations.length - 1 && styles.controlButtonDisabled]}
          onPress={() => handleControlPress('next')}
          disabled={currentStep >= filteredLocations.length - 1}
        >
          <Text style={styles.controlButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>

      {/* Location Details Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedLocation ? (
              <>
                {/* Header with Back Button */}
                <View style={styles.modalHeader}>
                  <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => setShowModal(false)}
                  >
                    <Text style={styles.backButtonText}>← Back to Map</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.modalTitle}>{selectedLocation.name || 'Unknown Location'}</Text>
                <Text style={[styles.modalSaga, { color: selectedLocation.color || '#3498DB' }]}>
                  {(selectedLocation.saga || 'Unknown').toUpperCase()} SAGA
                </Text>
                
                <Text style={styles.modalSectionTitle}>Songs at this Location:</Text>
                {selectedLocation.songs && selectedLocation.songs.length > 0 ? (
                  selectedLocation.songs.map((song, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.modalSongItem}
                      onPress={() => handleSongPress(song, selectedLocation)}
                    >
                      <Text style={styles.songText}>• {typeof song === 'string' ? song : (song?.title || 'Unknown Song')}</Text>
                      <Text style={styles.playIcon}>▶•</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.noDataText}>No songs for this location</Text>
                )}

                {/* Characters Section */}
                {selectedLocation.characters && selectedLocation.characters.length > 0 && (
                  <>
                    <Text style={styles.modalSectionTitle}>Characters at this Location:</Text>
                    {selectedLocation.characters.map((character, index) => (
                      <View key={index} style={styles.characterCard}>
                        <Text style={styles.characterName}>
                          {character?.name || 'Unknown Character'} {character?.title && `- ${character.title}`}
                        </Text>
                        <Text style={styles.characterDescription}>
                          {character?.description || 'No description available'}
                        </Text>
                        {character?.powers && character.powers.length > 0 && (
                          <Text style={styles.characterPowers}>
                            Powers: {character.powers.join(', ')}
                          </Text>
                        )}
                      </View>
                    ))}
                  </>
                )}

                <Text style={styles.modalDescription}>
                  {selectedLocation.description || 'No description available'}
                </Text>

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: selectedLocation.color || '#3498DB' }]}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.noDataText}>No location data available</Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2C3E50',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  filterContainer: {
    marginBottom: 20,
    maxHeight: 50,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterButtonActive: {
    backgroundColor: '#3498DB',
    borderColor: '#3498DB',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  filterTextActive: {
    color: 'white',
  },
  mapContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 20,
  },
  map: {
    backgroundColor: '#E8F4FD',
    borderRadius: 15,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  controlButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#3498DB',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlButtonDisabled: {
    backgroundColor: '#BDC3C7',
  },
  controlButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  progressInfo: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  sagaText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    width: '90%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2C3E50',
    textAlign: 'center',
  },
  modalSaga: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2C3E50',
  },
  modalSongItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#27AE60',
  },
  modalButton: {
    padding: 15,
    borderRadius: 15,
    marginTop: 25,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pulseOverlay: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  pulseCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  characterCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#4A90E2',
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  characterDescription: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 6,
    lineHeight: 18,
  },
  characterPowers: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  modalDescription: {
    fontSize: 14,
    color: '#2c3e50',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    lineHeight: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  backButton: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  songText: {
    color: '#2c3e50',
    fontSize: 14,
    flex: 1,
  },
  playIcon: {
    color: '#27AE60',
    fontSize: 16,
  },
  noDataText: {
    color: '#7f8c8d',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 10,
  },
});

export default EpicJourneyMap;
