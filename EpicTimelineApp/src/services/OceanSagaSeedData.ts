/**
 * OceanSagaSeedData - P3 Implementation
 * Comprehensive seed data for Ocean Saga including Poseidon encounters, storm events, and divine confrontations
 * 
 * Based on EPIC: The Musical by Jorge Rivera-Herrans
 * Focus: Poseidon's wrath, divine storms, and Odysseus's struggle against the God of the Sea
 */

import { Song } from '../components/Audio/SongList';
import { Character, ApiEvent } from './EventService';

// Ocean Location Interface
export interface OceanLocation {
  id: number;
  name: string;
  description: string;
  coordinates: { latitude: number; longitude: number };
  locationType: 'Ocean' | 'Divine Realm' | 'Storm Center' | 'Sacred Waters';
  features: string[];
  significance: string;
  currentWeather?: string;
  divinePresence?: string;
}

// Ocean Saga Characters
export const OCEAN_CHARACTERS: Character[] = [
  {
    id: 5,
    name: 'Poseidon',
    description: 'God of the Sea, Earthquakes, and Horses. Father of Polyphemus who seeks vengeance against Odysseus for blinding his son. His divine wrath manifests as devastating storms and sea monsters.',
    characterType: 'God',
    isProtagonist: false,
    aliases: ['Lord of the Sea', 'Earth-Shaker', 'Father of Polyphemus', 'God of Storms', 'Ruler of the Deep'],
    powers: [
      'Storm Creation',
      'Tsunami Generation',
      'Sea Monster Command',
      'Earthquake Induction',
      'Weather Control',
      'Divine Immortality',
      'Trident Mastery',
      'Ocean Manipulation'
    ],
    relationships: [
      { 
        characterId: 6, 
        characterName: 'Polyphemus', 
        relationshipType: 'family', 
        description: 'Son - Cyclops whose blinding sparked Poseidon\'s eternal wrath' 
      },
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'enemy', 
        description: 'Mortal enemy who defied him and must face divine punishment' 
      },
      { 
        characterId: 10, 
        characterName: 'Odysseus Crew', 
        relationshipType: 'victim', 
        description: 'Mortals caught in his vengeance against their captain' 
      }
    ]
  },
  {
    id: 11,
    name: 'Aeolus',
    description: 'God of the Winds who aids Odysseus by providing the wind bag. A playful yet powerful deity who controls all the winds of the world, but expects proper respect and adherence to his gifts.',
    characterType: 'God',
    isProtagonist: false,
    aliases: ['Lord of the Winds', 'Wind Keeper', 'Master of Breezes', 'Divine Weathermaster'],
    powers: [
      'Wind Manipulation',
      'Storm Bag Creation',
      'Weather Prophecy',
      'Flight Control',
      'Divine Sight',
      'Elemental Command'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'ally', 
        description: 'Helpful god who provides magical wind bag for safe passage' 
      },
      { 
        characterId: 5, 
        characterName: 'Poseidon', 
        relationshipType: 'peer', 
        description: 'Fellow god with overlapping dominion over sea weather' 
      }
    ]
  },
  {
    id: 12,
    name: 'Divine Storm Spirits',
    description: 'Supernatural entities that serve Poseidon, manifesting as living storms with consciousness. They embody the god\'s wrath and hunt Odysseus across the seas.',
    characterType: 'Divine Entity',
    isProtagonist: false,
    aliases: ['Storm Servants', 'Tempest Beings', 'Weather Wraiths', 'Sea Spirits'],
    powers: [
      'Storm Embodiment',
      'Lightning Control',
      'Wave Manipulation',
      'Wind Mastery',
      'Ethereal Form',
      'Divine Tracking'
    ],
    relationships: [
      { 
        characterId: 5, 
        characterName: 'Poseidon', 
        relationshipType: 'servant', 
        description: 'Divine servants that manifest his oceanic wrath' 
      },
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'enemy', 
        description: 'Relentlessly pursue and torment the defiant mortal' 
      }
    ]
  }
];

// Ocean Saga Locations
export const OCEAN_LOCATIONS: OceanLocation[] = [
  {
    id: 14,
    name: 'The Wine-Dark Sea',
    description: 'The vast and treacherous Mediterranean waters where Odysseus faces Poseidon\'s wrath. Dark waters that shift from calm to storm in moments, reflecting the god\'s temperament.',
    coordinates: { latitude: 37.5, longitude: 15.0 },
    locationType: 'Ocean',
    features: [
      'Divine Storm Manifestation',
      'Unpredictable Currents',
      'Sacred Waters',
      'Monster Depths',
      'Wind Patterns',
      'Navigation Hazards'
    ],
    significance: 'Primary battleground between Odysseus and Poseidon',
    currentWeather: 'Storm-wracked and dangerous',
    divinePresence: 'Poseidon\'s active domain'
  },
  {
    id: 15,
    name: 'Poseidon\'s Storm Center',
    description: 'The eye of Poseidon\'s divine hurricane, where the god manifests his full power. A swirling vortex of supernatural storm energy that defies natural law.',
    coordinates: { latitude: 36.0, longitude: 14.5 },
    locationType: 'Divine Realm',
    features: [
      'Divine Lightning',
      'Supernatural Waves',
      'Godly Manifestation Point',
      'Reality Distortion',
      'Temporal Anomalies',
      'Pure Divine Energy'
    ],
    significance: 'Where Poseidon directly confronts Odysseus',
    currentWeather: 'Supernatural storm of divine origin',
    divinePresence: 'Poseidon\'s physical manifestation'
  },
  {
    id: 16,
    name: 'Aeolus\'s Floating Island',
    description: 'The mystical floating island home of Aeolus, God of the Winds. Suspended above the clouds, it serves as the distribution center for all the world\'s winds.',
    coordinates: { latitude: 40.0, longitude: 18.0 },
    locationType: 'Divine Realm',
    features: [
      'Floating Architecture',
      'Wind Streams',
      'Sky Harbors',
      'Divine Workshops',
      'Weather Observation Deck',
      'Wind Storage Chambers'
    ],
    significance: 'Source of the wind bag that nearly saves Odysseus',
    currentWeather: 'Perpetually clear with controlled winds',
    divinePresence: 'Aeolus\'s domain of wind mastery'
  },
  {
    id: 17,
    name: 'The Cursed Passage',
    description: 'A narrow strait where Poseidon\'s storms are most concentrated. The waters here seem to actively hunt ships, with waves that move against natural patterns.',
    coordinates: { latitude: 38.2, longitude: 16.8 },
    locationType: 'Storm Center',
    features: [
      'Concentrated Divine Wrath',
      'Hunting Waves',
      'Ship-Seeking Currents',
      'Lightning Strikes',
      'Whirlpool Formation',
      'Sound Amplification'
    ],
    significance: 'Where many of Odysseus\'s ships are lost to Poseidon\'s fury',
    currentWeather: 'Permanently stormy and hostile',
    divinePresence: 'Intense divine hostility'
  }
];

// Ocean Saga Songs
export const OCEAN_SONGS: Song[] = [
  {
    id: 13,
    title: 'Storm',
    trackNumber: 1,
    description: 'Odysseus and his crew face Poseidon\'s initial divine storm as punishment for blinding Polyphemus',
    durationSeconds: 186, // 3:06
    themes: ['Divine Wrath', 'Crew Loyalty', 'Leadership Under Pressure', 'Survival'],
    saga: {
      id: 3,
      title: 'Ocean Saga',
      description: 'Poseidon\'s divine wrath and the cost of defying the gods',
      releaseDate: '2024-12-25',
      episodeCount: 4,
      genres: ['Epic', 'Musical Theatre', 'Orchestral'],
      themes: ['Divine Justice', 'Ruthlessness vs Mercy', 'Consequences'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Naval History'],
      totalDurationSeconds: 795 // Total duration of all Ocean Saga songs
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 5, name: 'Poseidon', characterType: 'God', isProtagonist: false },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false }
    ],
    perspective: 'Odysseus and crew facing divine wrath',
    narrativeContext: 'Introduction to Poseidon\'s pursuit and divine power'
  },
  {
    id: 14,
    title: 'Luck Runs Out',
    trackNumber: 2,
    description: 'Eurylochus confronts Odysseus about their doomed journey and questions his leadership',
    durationSeconds: 201, // 3:21
    themes: ['Questioning Leadership', 'Crew Tension', 'Trust Crisis', 'Desperation'],
    saga: {
      id: 3,
      title: 'Ocean Saga',
      description: 'Poseidon\'s divine wrath and the cost of defying the gods',
      releaseDate: '2024-12-25',
      episodeCount: 4,
      genres: ['Epic', 'Musical Theatre', 'Orchestral'],
      themes: ['Divine Justice', 'Ruthlessness vs Mercy', 'Consequences'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Naval History'],
      totalDurationSeconds: 795
    },
    characters: [
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    perspective: 'Eurylochus confronting Odysseus',
    narrativeContext: 'First major crack in crew unity and trust'
  },
  {
    id: 15,
    title: 'Keep Your Friends Close',
    trackNumber: 3,
    description: 'Aeolus offers the wind bag gift, but crew distrust leads to tragic betrayal',
    durationSeconds: 193, // 3:13
    themes: ['Divine Intervention', 'Hope', 'Temptation', 'Wind Magic'],
    saga: {
      id: 3,
      title: 'Ocean Saga',
      description: 'Poseidon\'s divine wrath and the cost of defying the gods',
      releaseDate: '2024-12-25',
      episodeCount: 4,
      genres: ['Epic', 'Musical Theatre', 'Orchestral'],
      themes: ['Divine Justice', 'Ruthlessness vs Mercy', 'Consequences'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Naval History'],
      totalDurationSeconds: 795
    },
    characters: [
      { id: 11, name: 'Aeolus', characterType: 'God', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    perspective: 'Aeolus offering divine aid and crew betrayal',
    narrativeContext: 'The gift that could have saved them, ruined by distrust'
  },
  {
    id: 16,
    title: 'Ruthlessness',
    trackNumber: 4,
    description: 'Poseidon teaches Odysseus the price of mercy through overwhelming divine violence',
    durationSeconds: 215, // 3:35
    themes: ['Divine Justice', 'Ruthless Power', 'Consequence', 'Godly Wrath'],
    saga: {
      id: 3,
      title: 'Ocean Saga',
      description: 'Poseidon\'s divine wrath and the cost of defying the gods',
      releaseDate: '2024-12-25',
      episodeCount: 4,
      genres: ['Epic', 'Musical Theatre', 'Orchestral'],
      themes: ['Divine Justice', 'Ruthlessness vs Mercy', 'Consequences'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Naval History'],
      totalDurationSeconds: 795
    },
    characters: [
      { id: 5, name: 'Poseidon', characterType: 'God', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    perspective: 'Poseidon teaching ruthlessness',
    narrativeContext: 'Poseidon\'s philosophy of ruthlessness vs Odysseus\'s mercy'
  }
];

// Ocean Saga Events
export const OCEAN_EVENTS: ApiEvent[] = [
  {
    id: 41,
    title: 'Poseidon\'s First Storm',
    description: 'Poseidon manifests his divine wrath for the first time, creating a supernatural storm to punish Odysseus for blinding Polyphemus. The god\'s power is overwhelming.',
    sequenceOrder: 1,
    eventTimestamp: '1184-05-15T09:00:00Z',
    location: {
      id: 14,
      name: 'The Wine-Dark Sea',
      latitude: 37.5,
      longitude: 15.0,
      description: 'The vast and treacherous Mediterranean waters where Odysseus faces Poseidon\'s wrath',
      saga: 'Ocean Saga',
      significance: 'Primary battleground between Odysseus and Poseidon'
    },
    saga: {
      id: 3,
      title: 'Ocean Saga',
      description: 'Poseidon\'s divine wrath and the cost of defying the gods'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 5, name: 'Poseidon', characterType: 'God', isProtagonist: false },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 13, title: 'Storm', trackNumber: 1, durationSeconds: 186 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 42,
    title: 'Crew\'s Crisis of Faith',
    description: 'As storms continue to plague them, Eurylochus leads the crew in questioning Odysseus\'s leadership and the wisdom of their journey home.',
    sequenceOrder: 2,
    eventTimestamp: '1184-05-15T12:30:00Z',
    location: {
      id: 14,
      name: 'The Wine-Dark Sea',
      latitude: 37.5,
      longitude: 15.0,
      description: 'The vast and treacherous Mediterranean waters where Odysseus faces Poseidon\'s wrath',
      saga: 'Ocean Saga',
      significance: 'Primary battleground between Odysseus and Poseidon'
    },
    saga: {
      id: 3,
      title: 'Ocean Saga',
      description: 'Poseidon\'s divine wrath and the cost of defying the gods'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 14, title: 'Luck Runs Out', trackNumber: 2, durationSeconds: 201 }
    ],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 43,
    title: 'Encounter with Aeolus',
    description: 'The God of the Winds appears to offer divine aid, providing Odysseus with a magical bag containing all the winds that could carry them safely home.',
    sequenceOrder: 3,
    eventTimestamp: '1184-05-16T08:00:00Z',
    location: {
      id: 16,
      name: 'Aeolus\'s Floating Island',
      latitude: 40.0,
      longitude: 18.0,
      description: 'The mystical floating island home of Aeolus, God of the Winds',
      saga: 'Ocean Saga',
      significance: 'Source of the wind bag that nearly saves Odysseus'
    },
    saga: {
      id: 3,
      title: 'Ocean Saga',
      description: 'Poseidon\'s divine wrath and the cost of defying the gods'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 11, name: 'Aeolus', characterType: 'God', isProtagonist: false },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 15, title: 'Keep Your Friends Close', trackNumber: 3, durationSeconds: 193 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 44,
    title: 'The Bag is Opened',
    description: 'While Odysseus sleeps within sight of Ithaca, the crew\'s suspicion and greed lead them to open Aeolus\'s wind bag, believing it contains treasure.',
    sequenceOrder: 4,
    eventTimestamp: '1184-05-25T03:00:00Z',
    location: {
      id: 14,
      name: 'The Wine-Dark Sea',
      latitude: 37.5,
      longitude: 15.0,
      description: 'The vast and treacherous Mediterranean waters where Odysseus faces Poseidon\'s wrath',
      saga: 'Ocean Saga',
      significance: 'Primary battleground between Odysseus and Poseidon'
    },
    saga: {
      id: 3,
      title: 'Ocean Saga',
      description: 'Poseidon\'s divine wrath and the cost of defying the gods'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 15, title: 'Keep Your Friends Close', trackNumber: 3, durationSeconds: 193 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 45,
    title: 'Poseidon\'s Direct Confrontation',
    description: 'Enraged by Odysseus\'s continued defiance and the crew\'s survival, Poseidon manifests directly to teach the mortal the true meaning of ruthlessness.',
    sequenceOrder: 5,
    eventTimestamp: '1184-05-25T14:00:00Z',
    location: {
      id: 15,
      name: 'Poseidon\'s Storm Center',
      latitude: 36.0,
      longitude: 14.5,
      description: 'The eye of Poseidon\'s divine hurricane, where the god manifests his full power',
      saga: 'Ocean Saga',
      significance: 'Where Poseidon directly confronts Odysseus'
    },
    saga: {
      id: 3,
      title: 'Ocean Saga',
      description: 'Poseidon\'s divine wrath and the cost of defying the gods'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 5, name: 'Poseidon', characterType: 'God', isProtagonist: false }
    ],
    songs: [
      { id: 16, title: 'Ruthlessness', trackNumber: 4, durationSeconds: 215 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 46,
    title: 'Fleet Decimation',
    description: 'Poseidon\'s divine wrath destroys most of Odysseus\'s remaining ships, killing hundreds of men as punishment for their captain\'s defiance.',
    sequenceOrder: 6,
    eventTimestamp: '1184-05-25T15:30:00Z',
    location: {
      id: 17,
      name: 'The Cursed Passage',
      latitude: 38.2,
      longitude: 16.8,
      description: 'A narrow strait where Poseidon\'s storms are most concentrated',
      saga: 'Ocean Saga',
      significance: 'Where many of Odysseus\'s ships are lost to Poseidon\'s fury'
    },
    saga: {
      id: 3,
      title: 'Ocean Saga',
      description: 'Poseidon\'s divine wrath and the cost of defying the gods'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 5, name: 'Poseidon', characterType: 'God', isProtagonist: false },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 16, title: 'Ruthlessness', trackNumber: 4, durationSeconds: 215 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 47,
    title: 'Surviving Crew\'s Despair',
    description: 'The remaining crew members, traumatized by divine punishment and massive losses, struggle with despair and question whether they\'ll ever see home again.',
    sequenceOrder: 7,
    eventTimestamp: '1184-05-26T08:00:00Z',
    location: {
      id: 14,
      name: 'The Wine-Dark Sea',
      latitude: 37.5,
      longitude: 15.0,
      description: 'The vast and treacherous Mediterranean waters where Odysseus faces Poseidon\'s wrath',
      saga: 'Ocean Saga',
      significance: 'Primary battleground between Odysseus and Poseidon'
    },
    saga: {
      id: 3,
      title: 'Ocean Saga',
      description: 'Poseidon\'s divine wrath and the cost of defying the gods'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    songs: [],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 48,
    title: 'Divine Pursuit Begins',
    description: 'Poseidon establishes his eternal hunt, sending storms and sea monsters to continuously pursue Odysseus across all the world\'s oceans.',
    sequenceOrder: 8,
    eventTimestamp: '1184-05-26T12:00:00Z',
    location: {
      id: 14,
      name: 'The Wine-Dark Sea',
      latitude: 37.5,
      longitude: 15.0,
      description: 'The vast and treacherous Mediterranean waters where Odysseus faces Poseidon\'s wrath',
      saga: 'Ocean Saga',
      significance: 'Primary battleground between Odysseus and Poseidon'
    },
    saga: {
      id: 3,
      title: 'Ocean Saga',
      description: 'Poseidon\'s divine wrath and the cost of defying the gods'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 5, name: 'Poseidon', characterType: 'God', isProtagonist: false },
      { id: 12, name: 'Divine Storm Spirits', characterType: 'Divine Entity', isProtagonist: false }
    ],
    songs: [],
    eventContext: {
      importance: 'legendary'
    }
  }
];

// Ocean Saga Metadata
export const OCEAN_SAGA_METADATA = {
  sagaId: 'ocean',
  sagaName: 'Ocean Saga',
  totalSongs: 4,
  totalEvents: 8,
  totalCharacters: 3,
  totalLocations: 4,
  releaseDate: '2024-12-25',
  significance: 'Poseidon\'s divine wrath and the cost of defying the gods - establishes the central conflict of divine justice versus mortal mercy'
};

// Complete Ocean Saga Seed Data
export const OCEAN_SAGA_SEED_DATA = {
  characters: OCEAN_CHARACTERS,
  locations: OCEAN_LOCATIONS,
  songs: OCEAN_SONGS,
  events: OCEAN_EVENTS,
  metadata: OCEAN_SAGA_METADATA
};

export default OCEAN_SAGA_SEED_DATA;
