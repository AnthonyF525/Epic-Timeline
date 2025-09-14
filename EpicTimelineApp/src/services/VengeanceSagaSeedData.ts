/**
 * VengeanceSagaSeedData - P3 Implementation
 * Comprehensive seed data for Vengeance Saga including Odysseus's return home and final confrontation with the suitors
 * 
 * Based on EPIC: The Musical by Jorge Rivera-Herrans
 * Focus: Homecoming, disguise, revelation, and divine justice
 */

import { Song } from '../components/Audio/SongList';
import { Character, ApiEvent } from './EventService';

// Vengeance Location Interface
export interface VengeanceLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance: string;
  type: 'royal_palace' | 'harbor_arrival' | 'throne_room' | 'judgment_hall';
  features: string[];
  vengeanceProperties?: string[];
  divinePresence?: string;
  climactic?: boolean;
}

// Vengeance Saga Characters
export const VENGEANCE_CHARACTERS: Character[] = [
  {
    id: 25,
    name: 'Odysseus (Returned King)',
    description: 'The legendary hero finally returned to Ithaca after twenty years, disguised as a beggar but carrying the full weight of his trials and the prophecy of becoming a monster to protect his family.',
    characterType: 'Returned King',
    isProtagonist: true,
    aliases: ['The Beggar', 'Son of Laertes', 'King of Ithaca', 'The Monster', 'Master of Disguise'],
    powers: [
      'Strategic Cunning',
      'Master Disguise',
      'Divine Protection',
      'Legendary Archery',
      'Royal Authority',
      'Ruthless Justice',
      'Tactical Superiority'
    ],
    relationships: [
      { 
        characterId: 26, 
        characterName: 'Penelope', 
        relationshipType: 'spouse', 
        description: 'Beloved wife who has waited faithfully for twenty years' 
      },
      { 
        characterId: 23, 
        characterName: 'Telemachus', 
        relationshipType: 'family', 
        description: 'Son who has grown to manhood in his absence' 
      },
      { 
        characterId: 24, 
        characterName: 'The Suitors', 
        relationshipType: 'enemy', 
        description: 'Parasitic nobles who have invaded his home and must face justice' 
      }
    ]
  },
  {
    id: 26,
    name: 'Penelope',
    description: 'Odysseus\'s faithful wife, who has cleverly delayed the suitors for years while maintaining hope for her husband\'s return. She represents loyalty, wisdom, and the home Odysseus has fought to reach.',
    characterType: 'Queen of Ithaca',
    isProtagonist: false,
    aliases: ['Faithful Wife', 'Queen of Ithaca', 'The Weaver', 'Patient Penelope'],
    powers: [
      'Unwavering Loyalty',
      'Strategic Patience',
      'Clever Deception',
      'Domestic Authority',
      'Emotional Strength',
      'Wisdom and Insight'
    ],
    relationships: [
      { 
        characterId: 25, 
        characterName: 'Odysseus (Returned King)', 
        relationshipType: 'spouse', 
        description: 'Beloved husband for whom she has waited twenty years' 
      },
      { 
        characterId: 23, 
        characterName: 'Telemachus', 
        relationshipType: 'family', 
        description: 'Son she has raised alone while waiting for Odysseus' 
      },
      { 
        characterId: 24, 
        characterName: 'The Suitors', 
        relationshipType: 'unwanted', 
        description: 'Persistent suitors she has cleverly delayed and avoided' 
      }
    ]
  },
  {
    id: 27,
    name: 'Antinous',
    description: 'The leader and most arrogant of the suitors, who has taken advantage of Odysseus\'s absence to consume his wealth and pressure Penelope. He represents the chaos and injustice that divine vengeance must correct.',
    characterType: 'Suitor Leader',
    isProtagonist: false,
    aliases: ['Chief Suitor', 'Palace Invader', 'Arrogant Noble', 'Usurper'],
    powers: [
      'Political Influence',
      'Leadership Authority',
      'Resource Control',
      'Social Manipulation',
      'Entitled Arrogance',
      'Competitive Dominance'
    ],
    relationships: [
      { 
        characterId: 25, 
        characterName: 'Odysseus (Returned King)', 
        relationshipType: 'enemy', 
        description: 'Absent king whose position and wife he seeks to claim' 
      },
      { 
        characterId: 26, 
        characterName: 'Penelope', 
        relationshipType: 'pursuer', 
        description: 'Queen he pressures and courts despite her resistance' 
      },
      { 
        characterId: 24, 
        characterName: 'The Suitors', 
        relationshipType: 'leader', 
        description: 'Fellow suitors he leads in their palace invasion' 
      }
    ]
  }
];

// Vengeance Saga Locations
export const VENGEANCE_LOCATIONS: VengeanceLocation[] = [
  {
    id: 34,
    name: 'The Harbor of Ithaca',
    latitude: 38.5,
    longitude: 20.7,
    description: 'The rocky harbor where Odysseus finally sets foot on his homeland after twenty years of wandering. Here, the great hero returns not in glory, but in disguise.',
    saga: 'Vengeance Saga',
    significance: 'First step on native soil after two decades of exile',
    type: 'harbor_arrival',
    features: [
      'Rocky Shoreline',
      'Hidden Landing',
      'Athena\'s Meeting Point',
      'Disguise Transformation',
      'Secret Return',
      'Homeland Recognition'
    ],
    vengeanceProperties: [
      'Secret Arrival',
      'Strategic Concealment',
      'Divine Assistance',
      'Homeland Connection',
      'Mission Beginning'
    ],
    divinePresence: 'Athena\'s guidance and protection',
    climactic: false
  },
  {
    id: 35,
    name: 'The Great Hall of Odysseus',
    latitude: 38.45,
    longitude: 20.5,
    description: 'The royal hall where the suitors feast daily on Odysseus\'s wealth, unaware that their judgment day approaches. This is where the final confrontation will unfold.',
    saga: 'Vengeance Saga',
    significance: 'Stage for the climactic battle and divine justice',
    type: 'royal_palace',
    features: [
      'Royal Dining Hall',
      'Suitor\'s Feast Tables',
      'The Great Bow',
      'Axe Challenge Setup',
      'Battle Arena',
      'Justice Theater'
    ],
    vengeanceProperties: [
      'Final Confrontation',
      'Divine Justice',
      'Royal Reclamation',
      'Battle Preparation',
      'Heroic Revelation'
    ],
    divinePresence: 'Divine justice and Athena\'s support',
    climactic: true
  },
  {
    id: 36,
    name: 'The Royal Chambers',
    latitude: 38.44,
    longitude: 20.49,
    description: 'The private quarters of Odysseus and Penelope, where the true test of identity and recognition takes place between the long-separated spouses.',
    saga: 'Vengeance Saga',
    significance: 'Site of marital reunion and identity confirmation',
    type: 'throne_room',
    features: [
      'Royal Bedchamber',
      'The Olive Tree Bed',
      'Private Quarters',
      'Recognition Tests',
      'Intimate Reunion',
      'Secret Knowledge'
    ],
    vengeanceProperties: [
      'Identity Revelation',
      'Marital Reunion',
      'Secret Knowledge',
      'Emotional Climax',
      'Personal Victory'
    ],
    divinePresence: 'Blessed reunion under divine favor',
    climactic: true
  },
  {
    id: 37,
    name: 'The Judgment Hall',
    latitude: 38.43,
    longitude: 20.48,
    description: 'The formal space where Odysseus reveals his true identity and pronounces judgment upon the suitors who have violated the sacred laws of hospitality.',
    saga: 'Vengeance Saga',
    significance: 'Site of divine justice and royal judgment',
    type: 'judgment_hall',
    features: [
      'Royal Throne',
      'Judgment Seat',
      'Justice Proclamation',
      'Identity Revelation',
      'Divine Authority',
      'Royal Justice'
    ],
    vengeanceProperties: [
      'Divine Justice',
      'Royal Authority',
      'Judgment Proclamation',
      'Identity Revelation',
      'Final Victory'
    ],
    divinePresence: 'Divine authority and justice',
    climactic: true
  }
];

// Vengeance Saga Songs
export const VENGEANCE_SONGS: Song[] = [
  {
    id: 35,
    title: 'Not Sorry for Loving You',
    trackNumber: 1,
    description: 'Calypso\'s final farewell as she releases Odysseus, expressing her genuine love while accepting that he must return to his true home and family',
    durationSeconds: 210, // 3:30
    themes: ['Bittersweet Farewell', 'Unrequited Love', 'Divine Acceptance', 'Freedom and Release'],
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice',
      releaseDate: '2025-10-30',
      episodeCount: 6,
      genres: ['Epic', 'Musical Theatre', 'Divine Justice'],
      themes: ['Homecoming', 'Justice', 'Recognition', 'Vengeance'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Justice'],
      totalDurationSeconds: 1320 // Total duration of all Vengeance Saga songs
    },
    characters: [
      { id: 15, name: 'Calypso', characterType: 'Divine Nymph', isProtagonist: false },
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true }
    ],
    perspective: 'Calypso\'s farewell and acceptance',
    narrativeContext: 'Divine love accepting mortal duty and destiny'
  },
  {
    id: 36,
    title: 'Dangerous',
    trackNumber: 2,
    description: 'Odysseus embraces his transformation into the prophesied monster, accepting the dangerous path he must take to reclaim his kingdom and protect his family',
    durationSeconds: 195, // 3:15
    themes: ['Transformation Acceptance', 'Strategic Danger', 'Prophetic Fulfillment', 'Protective Ruthlessness'],
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice',
      releaseDate: '2025-10-30',
      episodeCount: 6,
      genres: ['Epic', 'Musical Theatre', 'Divine Justice'],
      themes: ['Homecoming', 'Justice', 'Recognition', 'Vengeance'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Justice'],
      totalDurationSeconds: 1320
    },
    characters: [
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true },
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false }
    ],
    perspective: 'Odysseus embracing his dangerous transformation',
    narrativeContext: 'Hero accepting the monster he must become for justice'
  },
  {
    id: 37,
    title: 'Charybdis',
    trackNumber: 3,
    description: 'Odysseus faces the deadly whirlpool monster Charybdis in his final trial before reaching home, using all his cunning and determination to survive',
    durationSeconds: 180, // 3:00
    themes: ['Final Trial', 'Monster Encounter', 'Survival Determination', 'Homecoming Approach'],
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice',
      releaseDate: '2025-10-30',
      episodeCount: 6,
      genres: ['Epic', 'Musical Theatre', 'Divine Justice'],
      themes: ['Homecoming', 'Justice', 'Recognition', 'Vengeance'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Justice'],
      totalDurationSeconds: 1320
    },
    characters: [
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true }
    ],
    perspective: 'Odysseus facing his final monster before home',
    narrativeContext: 'Last great trial before reaching Ithaca'
  },
  {
    id: 38,
    title: 'Get in the Water',
    trackNumber: 4,
    description: 'Poseidon\'s final confrontation with Odysseus, demanding submission and acknowledgment before allowing the hero to reach his homeland',
    durationSeconds: 240, // 4:00
    themes: ['Divine Confrontation', 'Final Challenge', 'Submission vs Pride', 'Divine Forgiveness'],
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice',
      releaseDate: '2025-10-30',
      episodeCount: 6,
      genres: ['Epic', 'Musical Theatre', 'Divine Justice'],
      themes: ['Homecoming', 'Justice', 'Recognition', 'Vengeance'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Justice'],
      totalDurationSeconds: 1320
    },
    characters: [
      { id: 11, name: 'Poseidon', characterType: 'God of the Sea', isProtagonist: false },
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true }
    ],
    perspective: 'Poseidon\'s final demand for submission',
    narrativeContext: 'Divine test of humility before homecoming'
  },
  {
    id: 39,
    title: '600 Strike',
    trackNumber: 5,
    description: 'Odysseus unleashes his full fury against Poseidon, using the power of all his lost men to finally defeat the god who has tormented him',
    durationSeconds: 225, // 3:45
    themes: ['Divine Battle', 'Collective Power', 'Final Victory', 'Justice Achieved'],
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice',
      releaseDate: '2025-10-30',
      episodeCount: 6,
      genres: ['Epic', 'Musical Theatre', 'Divine Justice'],
      themes: ['Homecoming', 'Justice', 'Recognition', 'Vengeance'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Justice'],
      totalDurationSeconds: 1320
    },
    characters: [
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true },
      { id: 11, name: 'Poseidon', characterType: 'God of the Sea', isProtagonist: false }
    ],
    perspective: 'Odysseus\'s ultimate victory over divine opposition',
    narrativeContext: 'Final battle using the power of lost comrades'
  },
  {
    id: 40,
    title: 'I Can\'t Help But Wonder',
    trackNumber: 6,
    description: 'Odysseus finally reaches Ithaca and reflects on his journey, wondering about the cost of his choices and the home he will find after twenty years',
    durationSeconds: 270, // 4:30
    themes: ['Homecoming Reflection', 'Journey\'s End', 'Cost of Heroism', 'Uncertain Return'],
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice',
      releaseDate: '2025-10-30',
      episodeCount: 6,
      genres: ['Epic', 'Musical Theatre', 'Divine Justice'],
      themes: ['Homecoming', 'Justice', 'Recognition', 'Vengeance'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Justice'],
      totalDurationSeconds: 1320
    },
    characters: [
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true }
    ],
    perspective: 'Odysseus contemplating his homecoming',
    narrativeContext: 'Hero\'s reflection upon finally reaching Ithaca'
  }
];

// Vengeance Saga Events
export const VENGEANCE_EVENTS: ApiEvent[] = [
  {
    id: 86,
    title: 'Calypso\'s Farewell',
    description: 'Calypso releases Odysseus with a bittersweet farewell, expressing her genuine love while accepting that he must return to his true destiny with Penelope and Telemachus.',
    sequenceOrder: 1,
    eventTimestamp: '1184-07-05T08:00:00Z',
    location: {
      id: 31,
      name: 'Calypso\'s Isle',
      latitude: 35.0,
      longitude: 23.0,
      description: 'The enchanted island where Odysseus has been held captive',
      saga: 'Vengeance Saga',
      significance: 'Final departure point before homecoming'
    },
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice'
    },
    characters: [
      { id: 15, name: 'Calypso', characterType: 'Divine Nymph', isProtagonist: false },
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true }
    ],
    songs: [
      { id: 35, title: 'Not Sorry for Loving You', trackNumber: 1, durationSeconds: 210 }
    ],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 87,
    title: 'Embracing the Monster',
    description: 'Odysseus fully accepts the prophecy that he must become a monster to protect his family, embracing the dangerous path that Tiresias foretold as his destiny.',
    sequenceOrder: 2,
    eventTimestamp: '1184-07-05T12:00:00Z',
    location: {
      id: 34,
      name: 'The Harbor of Ithaca',
      latitude: 38.5,
      longitude: 20.7,
      description: 'The rocky harbor where Odysseus finally returns home',
      saga: 'Vengeance Saga',
      significance: 'First step on native soil after two decades'
    },
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice'
    },
    characters: [
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true },
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false }
    ],
    songs: [
      { id: 36, title: 'Dangerous', trackNumber: 2, durationSeconds: 195 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 88,
    title: 'Charybdis Encounter',
    description: 'In his final trial before reaching home, Odysseus faces the deadly whirlpool monster Charybdis, using all his cunning and determination to survive this last great challenge.',
    sequenceOrder: 3,
    eventTimestamp: '1184-07-06T10:00:00Z',
    location: {
      id: 34,
      name: 'The Harbor of Ithaca',
      latitude: 38.5,
      longitude: 20.7,
      description: 'The rocky harbor approaches to Ithaca',
      saga: 'Vengeance Saga',
      significance: 'Final trial before reaching homeland'
    },
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice'
    },
    characters: [
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true }
    ],
    songs: [
      { id: 37, title: 'Charybdis', trackNumber: 3, durationSeconds: 180 }
    ],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 89,
    title: 'Poseidon\'s Final Challenge',
    description: 'Poseidon confronts Odysseus one last time, demanding submission and acknowledgment before allowing the hero to reach his homeland after years of divine punishment.',
    sequenceOrder: 4,
    eventTimestamp: '1184-07-06T14:00:00Z',
    location: {
      id: 34,
      name: 'The Harbor of Ithaca',
      latitude: 38.5,
      longitude: 20.7,
      description: 'The waters near Ithaca where final confrontation occurs',
      saga: 'Vengeance Saga',
      significance: 'Site of final divine confrontation'
    },
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice'
    },
    characters: [
      { id: 11, name: 'Poseidon', characterType: 'God of the Sea', isProtagonist: false },
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true }
    ],
    songs: [
      { id: 38, title: 'Get in the Water', trackNumber: 4, durationSeconds: 240 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 90,
    title: 'The 600 Strike Victory',
    description: 'Odysseus unleashes his ultimate attack against Poseidon, channeling the power and memory of his 600 lost men to finally defeat the god who has tormented his journey.',
    sequenceOrder: 5,
    eventTimestamp: '1184-07-06T16:00:00Z',
    location: {
      id: 34,
      name: 'The Harbor of Ithaca',
      latitude: 38.5,
      longitude: 20.7,
      description: 'The waters where divine battle reaches climax',
      saga: 'Vengeance Saga',
      significance: 'Site of ultimate victory over divine opposition'
    },
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice'
    },
    characters: [
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true },
      { id: 11, name: 'Poseidon', characterType: 'God of the Sea', isProtagonist: false }
    ],
    songs: [
      { id: 39, title: '600 Strike', trackNumber: 5, durationSeconds: 225 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 91,
    title: 'Homecoming Reflection',
    description: 'Finally reaching Ithaca after twenty years, Odysseus reflects on his long journey, the cost of his choices, and wonders what kind of home and family await him.',
    sequenceOrder: 6,
    eventTimestamp: '1184-07-06T18:00:00Z',
    location: {
      id: 34,
      name: 'The Harbor of Ithaca',
      latitude: 38.5,
      longitude: 20.7,
      description: 'The shores of home after twenty years of wandering',
      saga: 'Vengeance Saga',
      significance: 'Moment of return and reflection'
    },
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice'
    },
    characters: [
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true }
    ],
    songs: [
      { id: 40, title: 'I Can\'t Help But Wonder', trackNumber: 6, durationSeconds: 270 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 92,
    title: 'Arrival at the Palace',
    description: 'Disguised as a beggar, Odysseus arrives at his own palace to find it overrun with suitors feasting on his wealth, setting the stage for the coming confrontation.',
    sequenceOrder: 7,
    eventTimestamp: '1184-07-07T10:00:00Z',
    location: {
      id: 35,
      name: 'The Great Hall of Odysseus',
      latitude: 38.45,
      longitude: 20.5,
      description: 'The royal hall where suitors feast, unaware of their approaching judgment',
      saga: 'Vengeance Saga',
      significance: 'Stage for the climactic confrontation'
    },
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice'
    },
    characters: [
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true },
      { id: 24, name: 'The Suitors', characterType: 'Antagonist Nobles', isProtagonist: false },
      { id: 27, name: 'Antinous', characterType: 'Suitor Leader', isProtagonist: false }
    ],
    songs: [],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 93,
    title: 'Recognition and Reunion',
    description: 'After proving his identity through secret knowledge only he and Penelope share, Odysseus is finally reunited with his faithful wife after twenty years of separation.',
    sequenceOrder: 8,
    eventTimestamp: '1184-07-07T16:00:00Z',
    location: {
      id: 36,
      name: 'The Royal Chambers',
      latitude: 38.44,
      longitude: 20.49,
      description: 'Private quarters where true recognition and reunion occur',
      saga: 'Vengeance Saga',
      significance: 'Site of marital reunion and identity confirmation'
    },
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice'
    },
    characters: [
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true },
      { id: 26, name: 'Penelope', characterType: 'Queen of Ithaca', isProtagonist: false },
      { id: 23, name: 'Telemachus', characterType: 'Prince of Ithaca', isProtagonist: false }
    ],
    songs: [],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 94,
    title: 'Divine Justice Delivered',
    description: 'Odysseus reveals his true identity and, with divine support, delivers final justice upon the suitors who have violated the sacred laws of hospitality and threatened his family.',
    sequenceOrder: 9,
    eventTimestamp: '1184-07-07T20:00:00Z',
    location: {
      id: 37,
      name: 'The Judgment Hall',
      latitude: 38.43,
      longitude: 20.48,
      description: 'Formal space where divine justice and royal judgment are pronounced',
      saga: 'Vengeance Saga',
      significance: 'Site of divine justice and final victory'
    },
    saga: {
      id: 8,
      title: 'Vengeance Saga',
      description: 'Homecoming and divine justice'
    },
    characters: [
      { id: 25, name: 'Odysseus (Returned King)', characterType: 'Returned King', isProtagonist: true },
      { id: 24, name: 'The Suitors', characterType: 'Antagonist Nobles', isProtagonist: false },
      { id: 27, name: 'Antinous', characterType: 'Suitor Leader', isProtagonist: false },
      { id: 22, name: 'Athena', characterType: 'Goddess of Wisdom', isProtagonist: false }
    ],
    songs: [],
    eventContext: {
      importance: 'legendary'
    }
  }
];

// Vengeance Saga Metadata
export const VENGEANCE_SAGA_METADATA = {
  sagaId: 'vengeance',
  sagaName: 'Vengeance Saga',
  totalSongs: 6,
  totalEvents: 9,
  totalCharacters: 3,
  totalLocations: 4,
  releaseDate: '2025-10-30',
  significance: 'Homecoming and divine justice - where Odysseus finally returns to Ithaca to reclaim his throne, reunite with his family, and deliver justice to those who have wronged his household'
};

// Complete Vengeance Saga Seed Data
export const VENGEANCE_SAGA_SEED_DATA = {
  characters: VENGEANCE_CHARACTERS,
  locations: VENGEANCE_LOCATIONS,
  songs: VENGEANCE_SONGS,
  events: VENGEANCE_EVENTS,
  metadata: VENGEANCE_SAGA_METADATA
};

export default VENGEANCE_SAGA_SEED_DATA;
