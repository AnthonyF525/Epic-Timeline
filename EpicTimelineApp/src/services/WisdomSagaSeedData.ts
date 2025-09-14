/**
 * WisdomSagaSeedData - P3 Implementation
 * Comprehensive seed data for Wisdom Saga including Athena's guidance, divine wisdom, and strategic planning
 * 
 * Based on EPIC: The Musical by Jorge Rivera-Herrans
 * Focus: Athena's return, divine wisdom, strategic preparation for homecoming
 */

import { Song } from '../components/Audio/SongList';
import { Character, ApiEvent } from './EventService';

// Wisdom Location Interface
export interface WisdomLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance: string;
  type: 'divine_realm' | 'mortal_island' | 'strategic_planning' | 'wisdom_chamber';
  features: string[];
  wisdomProperties?: string[];
  divinePresence?: string;
  strategic?: boolean;
}

// Wisdom Saga Characters
export const WISDOM_CHARACTERS: Character[] = [
  {
    id: 22,
    name: 'Athena',
    description: 'The goddess of wisdom and strategic warfare who returns to guide Odysseus after their long estrangement. She offers divine counsel and strategic planning for his homecoming to Ithaca.',
    characterType: 'Goddess of Wisdom',
    isProtagonist: false,
    aliases: ['Pallas Athena', 'Grey-Eyed Goddess', 'Goddess of Strategy', 'Divine Mentor', 'Wise Counselor'],
    powers: [
      'Divine Wisdom',
      'Strategic Planning',
      'Battle Tactics',
      'Divine Protection',
      'Counsel Giving',
      'Future Sight',
      'Divine Intervention'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'mentor', 
        description: 'Mortal hero she guides with divine wisdom and strategy' 
      },
      { 
        characterId: 23, 
        characterName: 'Telemachus', 
        relationshipType: 'guide', 
        description: 'Odysseus\'s son whom she helps in his own journey' 
      }
    ]
  },
  {
    id: 23,
    name: 'Telemachus',
    description: 'Odysseus\'s son, now grown to manhood in his father\'s absence. He seeks to prove himself worthy and to learn about his legendary father while dealing with the suitors plaguing his home.',
    characterType: 'Prince of Ithaca',
    isProtagonist: false,
    aliases: ['Son of Odysseus', 'Prince of Ithaca', 'Young Hero', 'Heir of Laertes'],
    powers: [
      'Royal Authority',
      'Growing Courage',
      'Inherited Cunning',
      'Leadership Potential',
      'Filial Determination',
      'Strategic Learning'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'family', 
        description: 'Legendary father he has never truly known' 
      },
      { 
        characterId: 22, 
        characterName: 'Athena', 
        relationshipType: 'guided', 
        description: 'Divine goddess who offers guidance and wisdom' 
      },
      { 
        characterId: 24, 
        characterName: 'The Suitors', 
        relationshipType: 'enemy', 
        description: 'Unwelcome guests who threaten his family and home' 
      }
    ]
  },
  {
    id: 24,
    name: 'The Suitors',
    description: 'The arrogant nobles who have invaded Odysseus\'s palace, consuming his wealth while competing for Penelope\'s hand in marriage. They represent the chaos and disorder that has taken hold in the hero\'s absence.',
    characterType: 'Antagonist Nobles',
    isProtagonist: false,
    aliases: ['Palace Invaders', 'Penelope\'s Suitors', 'Ithaca Nobles', 'Unwelcome Guests'],
    powers: [
      'Political Influence',
      'Collective Strength',
      'Resource Control',
      'Social Pressure',
      'Competitive Rivalry',
      'Entitled Arrogance'
    ],
    relationships: [
      { 
        characterId: 23, 
        characterName: 'Telemachus', 
        relationshipType: 'threat', 
        description: 'Young prince they view as obstacle to their goals' 
      },
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'usurper', 
        description: 'Absent king whose position and wife they seek to claim' 
      }
    ]
  }
];

// Wisdom Saga Locations
export const WISDOM_LOCATIONS: WisdomLocation[] = [
  {
    id: 30,
    name: 'Athena\'s Divine Realm',
    latitude: 40.0,
    longitude: 22.0,
    description: 'The celestial domain of Athena where divine wisdom flows freely and strategic plans are formed. Here, the goddess contemplates her return to guide Odysseus.',
    saga: 'Wisdom Saga',
    significance: 'Source of divine wisdom and strategic guidance',
    type: 'divine_realm',
    features: [
      'Wisdom Chambers',
      'Strategic Planning Halls',
      'Divine Observatory',
      'Tactical Maps',
      'Future Vision Pools',
      'Council of Wisdom'
    ],
    wisdomProperties: [
      'Divine Knowledge',
      'Strategic Insight',
      'Tactical Planning',
      'Future Perception',
      'Wisdom Dispensing'
    ],
    divinePresence: 'Athena in her full divine wisdom',
    strategic: true
  },
  {
    id: 31,
    name: 'Calypso\'s Isle',
    latitude: 35.0,
    longitude: 23.0,
    description: 'The enchanted island where Odysseus has been held captive by the nymph Calypso. A place of beauty and imprisonment where divine intervention finally brings freedom.',
    saga: 'Wisdom Saga',
    significance: 'Prison and liberation point for Odysseus',
    type: 'mortal_island',
    features: [
      'Enchanted Shores',
      'Calypso\'s Palace',
      'Divine Gardens',
      'Liberation Beach',
      'Freedom Waters',
      'Departure Point'
    ],
    wisdomProperties: [
      'Divine Intervention',
      'Freedom Granting',
      'Captivity Breaking',
      'New Beginning',
      'Strategic Release'
    ],
    divinePresence: 'Calypso and divine messengers',
    strategic: true
  },
  {
    id: 32,
    name: 'The Palace of Ithaca',
    latitude: 38.5,
    longitude: 20.5,
    description: 'Odysseus\'s royal palace, now overrun by suitors who consume his wealth and court his wife. The seat of power that awaits its rightful king\'s return.',
    saga: 'Wisdom Saga',
    significance: 'Home and kingdom awaiting restoration',
    type: 'strategic_planning',
    features: [
      'Royal Throne Room',
      'Great Hall',
      'Suitor\'s Feast Area',
      'Strategic Chambers',
      'Secret Passages',
      'Penelope\'s Quarters'
    ],
    wisdomProperties: [
      'Royal Authority',
      'Strategic Planning',
      'Kingdom Management',
      'Political Maneuvering',
      'Justice Preparation'
    ],
    divinePresence: 'Athena\'s subtle guidance',
    strategic: true
  },
  {
    id: 33,
    name: 'The Wisdom Planning Chamber',
    latitude: 38.45,
    longitude: 20.45,
    description: 'A sacred space where Athena and Odysseus plan their strategy for reclaiming Ithaca. Here, divine wisdom meets mortal cunning to forge the perfect plan.',
    saga: 'Wisdom Saga',
    significance: 'Meeting place of divine and mortal strategic minds',
    type: 'wisdom_chamber',
    features: [
      'Strategic Maps',
      'Battle Plans',
      'Tactical Discussions',
      'Wisdom Exchange',
      'Divine Counsel',
      'Planning Tables'
    ],
    wisdomProperties: [
      'Strategic Collaboration',
      'Divine-Mortal Alliance',
      'Tactical Excellence',
      'Wisdom Sharing',
      'Perfect Planning'
    ],
    divinePresence: 'Athena and Odysseus in council',
    strategic: true
  }
];

// Wisdom Saga Songs
export const WISDOM_SONGS: Song[] = [
  {
    id: 30,
    title: 'Legendary',
    trackNumber: 1,
    description: 'Telemachus seeks to understand his legendary father and prove himself worthy, while learning about the great deeds and burden of the Odysseus legacy',
    durationSeconds: 210, // 3:30
    themes: ['Legacy and Heritage', 'Coming of Age', 'Father-Son Relationship', 'Proving Worthiness'],
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming',
      releaseDate: '2025-08-30',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Divine Guidance'],
      themes: ['Wisdom', 'Strategy', 'Homecoming', 'Divine Guidance'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Mentorship'],
      totalDurationSeconds: 1050 // Total duration of all Wisdom Saga songs
    },
    characters: [
      { id: 23, name: 'Telemachus', characterType: 'Prince of Ithaca', isProtagonist: false },
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false }
    ],
    perspective: 'Telemachus learning about his father\'s legend',
    narrativeContext: 'Young prince discovering his heritage and purpose'
  },
  {
    id: 31,
    title: 'Little Wolf',
    trackNumber: 2,
    description: 'Athena guides Telemachus, calling him "little wolf" as she helps him develop courage and strategic thinking to face the challenges in his father\'s kingdom',
    durationSeconds: 195, // 3:15
    themes: ['Mentorship and Guidance', 'Courage Development', 'Strategic Learning', 'Divine Teaching'],
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming',
      releaseDate: '2025-08-30',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Divine Guidance'],
      themes: ['Wisdom', 'Strategy', 'Homecoming', 'Divine Guidance'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Mentorship'],
      totalDurationSeconds: 1050
    },
    characters: [
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false },
      { id: 23, name: 'Telemachus', characterType: 'Prince of Ithaca', isProtagonist: false }
    ],
    perspective: 'Athena mentoring and guiding Telemachus',
    narrativeContext: 'Divine wisdom training the young prince'
  },
  {
    id: 32,
    title: 'We\'ll Be Fine',
    trackNumber: 3,
    description: 'Athena reassures Telemachus of their plan\'s success while building his confidence and strategic understanding for the challenges ahead',
    durationSeconds: 180, // 3:00
    themes: ['Confidence Building', 'Strategic Assurance', 'Divine Support', 'Future Planning'],
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming',
      releaseDate: '2025-08-30',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Divine Guidance'],
      themes: ['Wisdom', 'Strategy', 'Homecoming', 'Divine Guidance'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Mentorship'],
      totalDurationSeconds: 1050
    },
    characters: [
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false },
      { id: 23, name: 'Telemachus', characterType: 'Prince of Ithaca', isProtagonist: false }
    ],
    perspective: 'Athena providing reassurance and strategic confidence',
    narrativeContext: 'Building courage and certainty for the upcoming challenges'
  },
  {
    id: 33,
    title: 'Love in Paradise',
    trackNumber: 4,
    description: 'Odysseus\'s time with Calypso is revealed as imprisonment disguised as paradise, showing the conflict between comfort and freedom, love and duty',
    durationSeconds: 240, // 4:00
    themes: ['Captivity vs Freedom', 'Duty vs Comfort', 'True Love', 'Divine Intervention'],
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming',
      releaseDate: '2025-08-30',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Divine Guidance'],
      themes: ['Wisdom', 'Strategy', 'Homecoming', 'Divine Guidance'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Mentorship'],
      totalDurationSeconds: 1050
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 15, name: 'Calypso', characterType: 'Divine Nymph', isProtagonist: false }
    ],
    perspective: 'Odysseus trapped in paradise, longing for home',
    narrativeContext: 'The revelation of Odysseus\'s captivity and divine intervention'
  },
  {
    id: 34,
    title: 'God Games',
    trackNumber: 5,
    description: 'Athena engages in divine politics and strategic manipulation to secure Odysseus\'s release, playing the complex game of divine wills and competing interests',
    durationSeconds: 225, // 3:45
    themes: ['Divine Politics', 'Strategic Manipulation', 'Divine Justice', 'Competing Interests'],
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming',
      releaseDate: '2025-08-30',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Divine Guidance'],
      themes: ['Wisdom', 'Strategy', 'Homecoming', 'Divine Guidance'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Mentorship'],
      totalDurationSeconds: 1050
    },
    characters: [
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false },
      { id: 19, name: 'Zeus', characterType: 'King of Gods', isProtagonist: false }
    ],
    perspective: 'Athena navigating divine politics to help Odysseus',
    narrativeContext: 'Strategic divine intervention and political maneuvering'
  }
];

// Wisdom Saga Events
export const WISDOM_EVENTS: ApiEvent[] = [
  {
    id: 77,
    title: 'Athena\'s Return to Action',
    description: 'After years of absence, the goddess Athena decides to intervene once again in Odysseus\'s fate, planning strategic moves to secure his freedom and homecoming.',
    sequenceOrder: 1,
    eventTimestamp: '1184-07-01T08:00:00Z',
    location: {
      id: 30,
      name: 'Athena\'s Divine Realm',
      latitude: 40.0,
      longitude: 22.0,
      description: 'The celestial domain of Athena where divine wisdom flows freely',
      saga: 'Wisdom Saga',
      significance: 'Source of divine wisdom and strategic guidance'
    },
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming'
    },
    characters: [
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false }
    ],
    songs: [],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 78,
    title: 'Telemachus Seeks His Legacy',
    description: 'Prince Telemachus, now grown to manhood, seeks to understand his legendary father and prove himself worthy of the family name while dealing with the chaos in his kingdom.',
    sequenceOrder: 2,
    eventTimestamp: '1184-07-02T10:00:00Z',
    location: {
      id: 32,
      name: 'The Palace of Ithaca',
      latitude: 38.5,
      longitude: 20.5,
      description: 'Odysseus\'s royal palace, now overrun by suitors',
      saga: 'Wisdom Saga',
      significance: 'Home and kingdom awaiting restoration'
    },
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming'
    },
    characters: [
      { id: 23, name: 'Telemachus', characterType: 'Prince of Ithaca', isProtagonist: false },
      { id: 24, name: 'The Suitors', characterType: 'Antagonist Nobles', isProtagonist: false }
    ],
    songs: [
      { id: 30, title: 'Legendary', trackNumber: 1, durationSeconds: 210 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 79,
    title: 'Athena Guides the Little Wolf',
    description: 'Athena appears to Telemachus, calling him "little wolf" as she begins to guide and train him in wisdom and strategy, preparing him for the challenges ahead.',
    sequenceOrder: 3,
    eventTimestamp: '1184-07-02T14:00:00Z',
    location: {
      id: 33,
      name: 'The Wisdom Planning Chamber',
      latitude: 38.45,
      longitude: 20.45,
      description: 'A sacred space where divine wisdom meets mortal cunning',
      saga: 'Wisdom Saga',
      significance: 'Meeting place of divine and mortal strategic minds'
    },
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming'
    },
    characters: [
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false },
      { id: 23, name: 'Telemachus', characterType: 'Prince of Ithaca', isProtagonist: false }
    ],
    songs: [
      { id: 31, title: 'Little Wolf', trackNumber: 2, durationSeconds: 195 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 80,
    title: 'Strategic Planning and Assurance',
    description: 'Athena works with Telemachus to develop their strategic plan, providing divine assurance that their carefully laid plans will succeed in restoring order to Ithaca.',
    sequenceOrder: 4,
    eventTimestamp: '1184-07-02T16:00:00Z',
    location: {
      id: 33,
      name: 'The Wisdom Planning Chamber',
      latitude: 38.45,
      longitude: 20.45,
      description: 'A sacred space where divine wisdom meets mortal cunning',
      saga: 'Wisdom Saga',
      significance: 'Meeting place of divine and mortal strategic minds'
    },
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming'
    },
    characters: [
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false },
      { id: 23, name: 'Telemachus', characterType: 'Prince of Ithaca', isProtagonist: false }
    ],
    songs: [
      { id: 32, title: 'We\'ll Be Fine', trackNumber: 3, durationSeconds: 180 }
    ],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 81,
    title: 'Odysseus\'s Captivity Revealed',
    description: 'The true nature of Odysseus\'s situation with Calypso is revealed - not paradise but imprisonment, as the hero longs for home despite the nymph\'s love and the island\'s beauty.',
    sequenceOrder: 5,
    eventTimestamp: '1184-07-03T09:00:00Z',
    location: {
      id: 31,
      name: 'Calypso\'s Isle',
      latitude: 35.0,
      longitude: 23.0,
      description: 'The enchanted island where Odysseus has been held captive',
      saga: 'Wisdom Saga',
      significance: 'Prison and liberation point for Odysseus'
    },
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 15, name: 'Calypso', characterType: 'Divine Nymph', isProtagonist: false }
    ],
    songs: [
      { id: 33, title: 'Love in Paradise', trackNumber: 4, durationSeconds: 240 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 82,
    title: 'The Divine Game Begins',
    description: 'Athena initiates her plan to free Odysseus by engaging in divine politics, strategically manipulating the complex relationships and competing interests among the gods.',
    sequenceOrder: 6,
    eventTimestamp: '1184-07-03T12:00:00Z',
    location: {
      id: 30,
      name: 'Athena\'s Divine Realm',
      latitude: 40.0,
      longitude: 22.0,
      description: 'The celestial domain of Athena where divine wisdom flows freely',
      saga: 'Wisdom Saga',
      significance: 'Source of divine wisdom and strategic guidance'
    },
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming'
    },
    characters: [
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false },
      { id: 19, name: 'Zeus', characterType: 'King of Gods', isProtagonist: false }
    ],
    songs: [
      { id: 34, title: 'God Games', trackNumber: 5, durationSeconds: 225 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 83,
    title: 'Divine Politics and Manipulation',
    description: 'Athena skillfully navigates the complex web of divine politics, using her wisdom and strategic thinking to outmaneuver other gods and secure support for Odysseus\'s release.',
    sequenceOrder: 7,
    eventTimestamp: '1184-07-03T15:00:00Z',
    location: {
      id: 30,
      name: 'Athena\'s Divine Realm',
      latitude: 40.0,
      longitude: 22.0,
      description: 'The celestial domain of Athena where divine wisdom flows freely',
      saga: 'Wisdom Saga',
      significance: 'Source of divine wisdom and strategic guidance'
    },
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming'
    },
    characters: [
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false },
      { id: 19, name: 'Zeus', characterType: 'King of Gods', isProtagonist: false }
    ],
    songs: [
      { id: 34, title: 'God Games', trackNumber: 5, durationSeconds: 225 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 84,
    title: 'Victory in the God Games',
    description: 'Athena successfully wins the divine political game, securing the agreement needed to free Odysseus from Calypso\'s island and set him on his path home to Ithaca.',
    sequenceOrder: 8,
    eventTimestamp: '1184-07-03T18:00:00Z',
    location: {
      id: 30,
      name: 'Athena\'s Divine Realm',
      latitude: 40.0,
      longitude: 22.0,
      description: 'The celestial domain of Athena where divine wisdom flows freely',
      saga: 'Wisdom Saga',
      significance: 'Source of divine wisdom and strategic guidance'
    },
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming'
    },
    characters: [
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false },
      { id: 19, name: 'Zeus', characterType: 'King of Gods', isProtagonist: false }
    ],
    songs: [
      { id: 34, title: 'God Games', trackNumber: 5, durationSeconds: 225 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 85,
    title: 'Freedom Secured',
    description: 'With Athena\'s victory in the divine political arena, Odysseus\'s freedom is finally secured, setting the stage for his long-awaited journey home to Ithaca and reunion with his family.',
    sequenceOrder: 9,
    eventTimestamp: '1184-07-04T08:00:00Z',
    location: {
      id: 31,
      name: 'Calypso\'s Isle',
      latitude: 35.0,
      longitude: 23.0,
      description: 'The enchanted island where Odysseus has been held captive',
      saga: 'Wisdom Saga',
      significance: 'Prison and liberation point for Odysseus'
    },
    saga: {
      id: 7,
      title: 'Wisdom Saga',
      description: 'Divine wisdom and strategic planning for homecoming'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 15, name: 'Calypso', characterType: 'Divine Nymph', isProtagonist: false },
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false }
    ],
    songs: [],
    eventContext: {
      importance: 'legendary'
    }
  }
];

// Wisdom Saga Metadata
export const WISDOM_SAGA_METADATA = {
  sagaId: 'wisdom',
  sagaName: 'Wisdom Saga',
  totalSongs: 5,
  totalEvents: 9,
  totalCharacters: 3,
  totalLocations: 4,
  releaseDate: '2025-08-30',
  significance: 'Divine wisdom and strategic planning - where Athena returns to guide both Telemachus and secure Odysseus\'s freedom through divine politics and strategic intervention'
};

// Complete Wisdom Saga Seed Data
export const WISDOM_SAGA_SEED_DATA = {
  characters: WISDOM_CHARACTERS,
  locations: WISDOM_LOCATIONS,
  songs: WISDOM_SONGS,
  events: WISDOM_EVENTS,
  metadata: WISDOM_SAGA_METADATA
};

export default WISDOM_SAGA_SEED_DATA;
