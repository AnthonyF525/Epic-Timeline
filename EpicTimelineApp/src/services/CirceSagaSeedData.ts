/**
 * CirceSagaSeedData - P3 Implementation
 * Comprehensive seed data for Circe Saga including Circe's island, magic themes, and transformation events
 * 
 * Based on EPIC: The Musical by Jorge Rivera-Herrans
 * Focus: Circe's magical island, divine transformation magic, and crew survival
 */

import { Song } from '../components/Audio/SongList';
import { Character, ApiEvent } from './EventService';

// Circe Location Interface
export interface CirceLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance: string;
  type: 'magical_island' | 'divine_palace' | 'enchanted_grove' | 'sacred_spring';
  features: string[];
  magicalProperties?: string[];
  divinePresence?: string;
  transformation?: string;
}

// Circe Saga Characters
export const CIRCE_CHARACTERS: Character[] = [
  {
    id: 13,
    name: 'Circe',
    description: 'Divine sorceress and daughter of Helios, master of transformation magic who rules her own mystical island. She can turn mortals into animals with her powerful spells, but also offers wisdom and aid to those who prove themselves worthy.',
    characterType: 'Goddess',
    isProtagonist: false,
    aliases: ['Divine Sorceress', 'Daughter of Helios', 'Mistress of Transformation', 'The Enchantress', 'Lady of the Isle'],
    powers: [
      'Transformation Magic',
      'Potion Brewing',
      'Divine Sight',
      'Animal Communication',
      'Prophecy',
      'Healing Magic',
      'Illusion Creation',
      'Time Manipulation'
    ],
    relationships: [
      { 
        characterId: 4, 
        characterName: 'Helios', 
        relationshipType: 'family', 
        description: 'Father - Titan god of the sun who grants her divine power' 
      },
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'ally', 
        description: 'Mortal who resists her magic and earns her respect and aid' 
      },
      { 
        characterId: 8, 
        characterName: 'Eurylochus', 
        relationshipType: 'victim', 
        description: 'Crew member transformed by her magic but later restored' 
      }
    ]
  },
  {
    id: 14,
    name: 'Transformed Crew',
    description: 'Members of Odysseus\'s crew who were transformed into various animals by Circe\'s magic. They retain their human consciousness while trapped in animal forms, experiencing the horror of transformation.',
    characterType: 'Transformed Humans',
    isProtagonist: false,
    aliases: ['Animal Crew', 'Enchanted Sailors', 'Circe\'s Victims', 'Beast Men'],
    powers: [
      'Animal Instincts',
      'Enhanced Senses',
      'Human Intelligence Retained',
      'Magical Resistance (limited)',
      'Pack Coordination'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'crew', 
        description: 'Captain who must rescue them from magical transformation' 
      },
      { 
        characterId: 13, 
        characterName: 'Circe', 
        relationshipType: 'victim', 
        description: 'Sorceress who transformed them as a test of character' 
      },
      { 
        characterId: 8, 
        characterName: 'Eurylochus', 
        relationshipType: 'crew', 
        description: 'Fellow crew member who escaped initial transformation' 
      }
    ]
  },
  {
    id: 15,
    name: 'Hermes',
    description: 'Messenger god and guide who appears to aid Odysseus with divine wisdom and magical protection. He provides the moly herb that grants resistance to Circe\'s transformation magic.',
    characterType: 'God',
    isProtagonist: false,
    aliases: ['Divine Messenger', 'Guide of Souls', 'Trickster God', 'Herald of the Gods'],
    powers: [
      'Divine Speed',
      'Magical Knowledge',
      'Herb Mastery',
      'Divine Protection',
      'Prophecy',
      'Shape-shifting',
      'Dimensional Travel'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'ally', 
        description: 'Mortal hero he aids with divine wisdom and protection' 
      },
      { 
        characterId: 13, 
        characterName: 'Circe', 
        relationshipType: 'peer', 
        description: 'Fellow divine being with overlapping magical domains' 
      }
    ]
  }
];

// Circe Saga Locations
export const CIRCE_LOCATIONS: CirceLocation[] = [
  {
    id: 18,
    name: 'Aeaea Island',
    latitude: 41.9,
    longitude: 12.5,
    description: 'Circe\'s mystical island home, a place where magic flows freely and reality bends to the will of the divine sorceress. Lush forests hide enchanted groves and magical springs.',
    saga: 'Circe Saga',
    significance: 'Circe\'s domain where she tests and transforms visitors',
    type: 'magical_island',
    features: [
      'Enchanted Forests',
      'Magical Springs',
      'Divine Herb Gardens',
      'Transformation Circles',
      'Sacred Groves',
      'Crystal Caves'
    ],
    magicalProperties: [
      'Reality Alteration',
      'Time Dilation',
      'Spontaneous Herb Growth',
      'Animal Communication',
      'Memory Enhancement',
      'Emotional Amplification'
    ],
    divinePresence: 'Circe\'s complete magical dominion',
    transformation: 'Island itself responds to Circe\'s will'
  },
  {
    id: 19,
    name: 'Circe\'s Palace',
    latitude: 41.9,
    longitude: 12.5,
    description: 'A magnificent divine palace at the heart of Aeaea, where Circe practices her magic and hosts visitors. The architecture shifts and changes based on her mood and intentions.',
    saga: 'Circe Saga',
    significance: 'Center of Circe\'s power and the site of major transformations',
    type: 'divine_palace',
    features: [
      'Transformation Chambers',
      'Potion Laboratories',
      'Scrying Pools',
      'Divine Throne Room',
      'Magical Libraries',
      'Healing Gardens'
    ],
    magicalProperties: [
      'Architectural Shape-shifting',
      'Magical Ingredient Storage',
      'Divine Energy Concentration',
      'Prophecy Enhancement',
      'Time Suspension'
    ],
    divinePresence: 'Circe\'s primary residence and power source',
    transformation: 'Rooms reconfigure based on magical needs'
  },
  {
    id: 20,
    name: 'The Moly Grove',
    latitude: 41.85,
    longitude: 12.48,
    description: 'A sacred grove where the magical moly herb grows, protected by divine power. This herb grants resistance to transformation magic and is key to surviving Circe\'s tests.',
    saga: 'Circe Saga',
    significance: 'Source of magical protection against transformation',
    type: 'enchanted_grove',
    features: [
      'Moly Herb Patches',
      'Divine Protection Barriers',
      'Hermes\' Sacred Altar',
      'Magical Resistance Fields',
      'Ancient Runes',
      'Crystal Formations'
    ],
    magicalProperties: [
      'Anti-Magic Field Generation',
      'Divine Herb Cultivation',
      'Magical Immunity Granting',
      'Spell Resistance Enhancement'
    ],
    divinePresence: 'Hermes\' protective influence',
    transformation: 'Grants power to resist magical change'
  },
  {
    id: 21,
    name: 'The Transformation Circle',
    latitude: 41.88,
    longitude: 12.52,
    description: 'A mystical clearing where Circe performs her most powerful transformation rituals. Ancient stones mark the boundaries of this sacred space where mortals become beasts.',
    saga: 'Circe Saga',
    significance: 'Primary site of Circe\'s transformation magic',
    type: 'sacred_spring',
    features: [
      'Ancient Stone Circle',
      'Magical Amplification Stones',
      'Transformation Pools',
      'Ritual Platforms',
      'Energy Convergence Points',
      'Scrying Crystals'
    ],
    magicalProperties: [
      'Transformation Amplification',
      'Shape-shifting Mastery',
      'Soul-Body Separation',
      'Consciousness Preservation',
      'Magical Binding Creation'
    ],
    divinePresence: 'Concentrated transformation magic',
    transformation: 'Epicenter of all magical changes on the island'
  }
];

// Circe Saga Songs
export const CIRCE_SONGS: Song[] = [
  {
    id: 17,
    title: 'Puppeteer',
    trackNumber: 1,
    description: 'Circe reveals her power and intentions as she manipulates those who enter her domain, demonstrating her control over transformation magic',
    durationSeconds: 189, // 3:09
    themes: ['Divine Control', 'Transformation Magic', 'Power Dynamics', 'Testing Mortals'],
    saga: {
      id: 4,
      title: 'Circe Saga',
      description: 'Circe\'s magical island and the tests of transformation',
      releaseDate: '2025-02-14',
      episodeCount: 4,
      genres: ['Epic', 'Musical Theatre', 'Magical'],
      themes: ['Transformation', 'Divine Magic', 'Character Testing'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Transformation Stories'],
      totalDurationSeconds: 756 // Total duration of all Circe Saga songs
    },
    characters: [
      { id: 13, name: 'Circe', characterType: 'Goddess', isProtagonist: false },
      { id: 14, name: 'Transformed Crew', characterType: 'Transformed Humans', isProtagonist: false }
    ],
    perspective: 'Circe demonstrating her magical dominion',
    narrativeContext: 'Introduction to Circe\'s power and the nature of her tests'
  },
  {
    id: 18,
    title: 'Wouldn\'t You Like',
    trackNumber: 2,
    description: 'Hermes appears to guide Odysseus, offering divine wisdom and the moly herb to protect against Circe\'s transformation magic',
    durationSeconds: 186, // 3:06
    themes: ['Divine Guidance', 'Magical Protection', 'Divine Intervention', 'Heroic Aid'],
    saga: {
      id: 4,
      title: 'Circe Saga',
      description: 'Circe\'s magical island and the tests of transformation',
      releaseDate: '2025-02-14',
      episodeCount: 4,
      genres: ['Epic', 'Musical Theatre', 'Magical'],
      themes: ['Transformation', 'Divine Magic', 'Character Testing'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Transformation Stories'],
      totalDurationSeconds: 756
    },
    characters: [
      { id: 15, name: 'Hermes', characterType: 'God', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    perspective: 'Hermes offering divine assistance to Odysseus',
    narrativeContext: 'Divine intervention providing tools to resist transformation'
  },
  {
    id: 19,
    title: 'Done For',
    trackNumber: 3,
    description: 'The crew faces the reality of their transformation while Odysseus prepares to confront Circe and demand their restoration',
    durationSeconds: 192, // 3:12
    themes: ['Transformation Horror', 'Crew Desperation', 'Heroic Determination', 'Magical Consequences'],
    saga: {
      id: 4,
      title: 'Circe Saga',
      description: 'Circe\'s magical island and the tests of transformation',
      releaseDate: '2025-02-14',
      episodeCount: 4,
      genres: ['Epic', 'Musical Theatre', 'Magical'],
      themes: ['Transformation', 'Divine Magic', 'Character Testing'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Transformation Stories'],
      totalDurationSeconds: 756
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 14, name: 'Transformed Crew', characterType: 'Transformed Humans', isProtagonist: false },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false }
    ],
    perspective: 'Crew experiencing transformation and Odysseus\'s resolve',
    narrativeContext: 'The horror of magical transformation and heroic response'
  },
  {
    id: 20,
    title: 'There Are Other Ways',
    trackNumber: 4,
    description: 'Circe and Odysseus reach an understanding, leading to the restoration of his crew and divine guidance for their journey',
    durationSeconds: 189, // 3:09
    themes: ['Divine Wisdom', 'Mutual Respect', 'Magical Restoration', 'Character Growth'],
    saga: {
      id: 4,
      title: 'Circe Saga',
      description: 'Circe\'s magical island and the tests of transformation',
      releaseDate: '2025-02-14',
      episodeCount: 4,
      genres: ['Epic', 'Musical Theatre', 'Magical'],
      themes: ['Transformation', 'Divine Magic', 'Character Testing'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Transformation Stories'],
      totalDurationSeconds: 756
    },
    characters: [
      { id: 13, name: 'Circe', characterType: 'Goddess', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    perspective: 'Circe and Odysseus finding mutual understanding',
    narrativeContext: 'Resolution through wisdom rather than force'
  }
];

// Circe Saga Events
export const CIRCE_EVENTS: ApiEvent[] = [
  {
    id: 49,
    title: 'Arrival at Aeaea Island',
    description: 'Odysseus and his remaining crew discover Circe\'s mystical island, drawn by the scent of magical herbs and the promise of food and shelter after their ordeals.',
    sequenceOrder: 1,
    eventTimestamp: '1184-06-01T10:00:00Z',
    location: {
      id: 18,
      name: 'Aeaea Island',
      latitude: 41.9,
      longitude: 12.5,
      description: 'Circe\'s mystical island home where magic flows freely',
      saga: 'Circe Saga',
      significance: 'Circe\'s domain where she tests and transforms visitors'
    },
    saga: {
      id: 4,
      title: 'Circe Saga',
      description: 'Circe\'s magical island and the tests of transformation'
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
    id: 50,
    title: 'First Encounter with Circe',
    description: 'The crew meets Circe, who welcomes them with apparent hospitality but reveals her true nature as a powerful sorceress who controls transformation magic.',
    sequenceOrder: 2,
    eventTimestamp: '1184-06-01T14:00:00Z',
    location: {
      id: 19,
      name: 'Circe\'s Palace',
      latitude: 41.9,
      longitude: 12.5,
      description: 'A magnificent divine palace where Circe practices her magic',
      saga: 'Circe Saga',
      significance: 'Center of Circe\'s power and the site of major transformations'
    },
    saga: {
      id: 4,
      title: 'Circe Saga',
      description: 'Circe\'s magical island and the tests of transformation'
    },
    characters: [
      { id: 13, name: 'Circe', characterType: 'Goddess', isProtagonist: false },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 17, title: 'Puppeteer', trackNumber: 1, durationSeconds: 189 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 51,
    title: 'The Great Transformation',
    description: 'Circe uses her magic to transform most of Odysseus\'s crew into various animals, testing their character and demonstrating her divine power over mortals.',
    sequenceOrder: 3,
    eventTimestamp: '1184-06-01T16:00:00Z',
    location: {
      id: 21,
      name: 'The Transformation Circle',
      latitude: 41.88,
      longitude: 12.52,
      description: 'A mystical clearing where Circe performs transformation rituals',
      saga: 'Circe Saga',
      significance: 'Primary site of Circe\'s transformation magic'
    },
    saga: {
      id: 4,
      title: 'Circe Saga',
      description: 'Circe\'s magical island and the tests of transformation'
    },
    characters: [
      { id: 13, name: 'Circe', characterType: 'Goddess', isProtagonist: false },
      { id: 14, name: 'Transformed Crew', characterType: 'Transformed Humans', isProtagonist: false }
    ],
    songs: [
      { id: 17, title: 'Puppeteer', trackNumber: 1, durationSeconds: 189 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 52,
    title: 'Eurylochus Escapes',
    description: 'Eurylochus manages to escape Circe\'s initial transformation and flees back to the ship to warn Odysseus about the sorceress\'s power and the crew\'s fate.',
    sequenceOrder: 4,
    eventTimestamp: '1184-06-01T17:30:00Z',
    location: {
      id: 18,
      name: 'Aeaea Island',
      latitude: 41.9,
      longitude: 12.5,
      description: 'Circe\'s mystical island home where magic flows freely',
      saga: 'Circe Saga',
      significance: 'Circe\'s domain where she tests and transforms visitors'
    },
    saga: {
      id: 4,
      title: 'Circe Saga',
      description: 'Circe\'s magical island and the tests of transformation'
    },
    characters: [
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    songs: [],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 53,
    title: 'Hermes\' Divine Intervention',
    description: 'The messenger god Hermes appears to Odysseus, providing him with the magical moly herb and wisdom needed to resist Circe\'s transformation magic.',
    sequenceOrder: 5,
    eventTimestamp: '1184-06-02T08:00:00Z',
    location: {
      id: 20,
      name: 'The Moly Grove',
      latitude: 41.85,
      longitude: 12.48,
      description: 'A sacred grove where the magical moly herb grows',
      saga: 'Circe Saga',
      significance: 'Source of magical protection against transformation'
    },
    saga: {
      id: 4,
      title: 'Circe Saga',
      description: 'Circe\'s magical island and the tests of transformation'
    },
    characters: [
      { id: 15, name: 'Hermes', characterType: 'God', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    songs: [
      { id: 18, title: 'Wouldn\'t You Like', trackNumber: 2, durationSeconds: 186 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 54,
    title: 'Odysseus Confronts Circe',
    description: 'Armed with divine protection, Odysseus confronts Circe directly, proving his resistance to her magic and demanding the restoration of his transformed crew.',
    sequenceOrder: 6,
    eventTimestamp: '1184-06-02T12:00:00Z',
    location: {
      id: 19,
      name: 'Circe\'s Palace',
      latitude: 41.9,
      longitude: 12.5,
      description: 'A magnificent divine palace where Circe practices her magic',
      saga: 'Circe Saga',
      significance: 'Center of Circe\'s power and the site of major transformations'
    },
    saga: {
      id: 4,
      title: 'Circe Saga',
      description: 'Circe\'s magical island and the tests of transformation'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 13, name: 'Circe', characterType: 'Goddess', isProtagonist: false }
    ],
    songs: [
      { id: 19, title: 'Done For', trackNumber: 3, durationSeconds: 192 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 55,
    title: 'The Crew\'s Restoration',
    description: 'Impressed by Odysseus\'s courage and wisdom, Circe agrees to restore his transformed crew to human form, demonstrating her respect for his character.',
    sequenceOrder: 7,
    eventTimestamp: '1184-06-02T15:00:00Z',
    location: {
      id: 21,
      name: 'The Transformation Circle',
      latitude: 41.88,
      longitude: 12.52,
      description: 'A mystical clearing where Circe performs transformation rituals',
      saga: 'Circe Saga',
      significance: 'Primary site of Circe\'s transformation magic'
    },
    saga: {
      id: 4,
      title: 'Circe Saga',
      description: 'Circe\'s magical island and the tests of transformation'
    },
    characters: [
      { id: 13, name: 'Circe', characterType: 'Goddess', isProtagonist: false },
      { id: 14, name: 'Transformed Crew', characterType: 'Transformed Humans', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    songs: [
      { id: 20, title: 'There Are Other Ways', trackNumber: 4, durationSeconds: 189 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 56,
    title: 'Circe\'s Wisdom and Guidance',
    description: 'Having passed her tests, Odysseus receives divine wisdom from Circe about the dangers ahead, including prophecies about the Underworld and the journey home.',
    sequenceOrder: 8,
    eventTimestamp: '1184-06-02T18:00:00Z',
    location: {
      id: 19,
      name: 'Circe\'s Palace',
      latitude: 41.9,
      longitude: 12.5,
      description: 'A magnificent divine palace where Circe practices her magic',
      saga: 'Circe Saga',
      significance: 'Center of Circe\'s power and the site of major transformations'
    },
    saga: {
      id: 4,
      title: 'Circe Saga',
      description: 'Circe\'s magical island and the tests of transformation'
    },
    characters: [
      { id: 13, name: 'Circe', characterType: 'Goddess', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    songs: [
      { id: 20, title: 'There Are Other Ways', trackNumber: 4, durationSeconds: 189 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 57,
    title: 'Departure from Aeaea',
    description: 'With his crew restored and armed with divine wisdom, Odysseus prepares to leave Circe\'s island, forever changed by the experience of divine magic and transformation.',
    sequenceOrder: 9,
    eventTimestamp: '1184-06-03T10:00:00Z',
    location: {
      id: 18,
      name: 'Aeaea Island',
      latitude: 41.9,
      longitude: 12.5,
      description: 'Circe\'s mystical island home where magic flows freely',
      saga: 'Circe Saga',
      significance: 'Circe\'s domain where she tests and transforms visitors'
    },
    saga: {
      id: 4,
      title: 'Circe Saga',
      description: 'Circe\'s magical island and the tests of transformation'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false },
      { id: 13, name: 'Circe', characterType: 'Goddess', isProtagonist: false }
    ],
    songs: [],
    eventContext: {
      importance: 'major'
    }
  }
];

// Circe Saga Metadata
export const CIRCE_SAGA_METADATA = {
  sagaId: 'circe',
  sagaName: 'Circe Saga',
  totalSongs: 4,
  totalEvents: 9,
  totalCharacters: 3,
  totalLocations: 4,
  releaseDate: '2025-02-14',
  significance: 'Transformation magic and divine testing - where Odysseus learns wisdom through magical trials and proves his character to a powerful sorceress'
};

// Complete Circe Saga Seed Data
export const CIRCE_SAGA_SEED_DATA = {
  characters: CIRCE_CHARACTERS,
  locations: CIRCE_LOCATIONS,
  songs: CIRCE_SONGS,
  events: CIRCE_EVENTS,
  metadata: CIRCE_SAGA_METADATA
};

export default CIRCE_SAGA_SEED_DATA;
