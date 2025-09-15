/**
 * ThunderSagaSeedData - P3 Implementation
 * Comprehensive seed data for Thunder Saga including divine confrontation, crew betrayal, and Zeus's judgment
 * 
 * Based on EPIC: The Musical by Jorge Rivera-Herrans
 * Focus: Zeus's divine wrath, the crew's betrayal, and the ulti  {
    id: 21,
    title: 'Suffering',
    trackNumber: 21, sacrifice
 */

import { Song } from '../components/Audio/SongList';
import { Character, ApiEvent } from './EventService';

// Thunder Location Interface
export interface ThunderLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance: string;
  type: 'siren_waters' | 'monster_lair' | 'sacred_island' | 'open_sea';
  features: string[];
  thunderProperties?: string[];
  divinePresence?: string;
  judgmental?: boolean;
}

// Thunder Saga Characters
export const THUNDER_CHARACTERS: Character[] = [
  {
    id: 19,
    name: 'Zeus',
    description: 'The king of the gods and ruler of the sky, Zeus appears in his full divine majesty to judge Odysseus and his crew for their sacrilege against Helios. His power over thunder and lightning makes him the ultimate arbiter of divine justice.',
    characterType: 'King of Gods',
    isProtagonist: false,
    aliases: ['Lord of Thunder', 'King of Olympus', 'Sky Father', 'Divine Judge', 'Thunder Bringer'],
    powers: [
      'Divine Thunder',
      'Lightning Mastery',
      'Divine Judgment',
      'Weather Control',
      'Absolute Authority',
      'Cosmic Justice',
      'Divine Punishment'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'judge', 
        description: 'Mortal hero who must face divine judgment for his crew\'s sacrilege' 
      },
      { 
        characterId: 14, 
        characterName: 'Helios', 
        relationshipType: 'peer', 
        description: 'Fellow god whose sacred cattle were slaughtered by Odysseus\'s crew' 
      },
      { 
        characterId: 20, 
        characterName: 'The Crew\'s Desperation', 
        relationshipType: 'judge', 
        description: 'Starving mortals whose actions he must punish' 
      }
    ]
  },
  {
    id: 20,
    name: 'The Crew\'s Desperation',
    description: 'Odysseus\'s remaining crew members, driven to desperation by starvation and hopelessness. Their betrayal of their captain and slaughter of Helios\'s sacred cattle represents the breaking point of mortal endurance.',
    characterType: 'Desperate Sailors',
    isProtagonist: false,
    aliases: ['Starving Crew', 'Betraying Sailors', 'Desperate Men', 'Doomed Companions'],
    powers: [
      'Mortal Desperation',
      'Collective Rebellion',
      'Survival Instinct',
      'Mutual Support',
      'Shared Guilt',
      'Final Defiance'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'betrayal', 
        description: 'Captain they abandon in their desperate hunger' 
      },
      { 
        characterId: 8, 
        characterName: 'Eurylochus', 
        relationshipType: 'leader', 
        description: 'Second-in-command who leads them in betrayal' 
      },
      { 
        characterId: 19, 
        characterName: 'Zeus', 
        relationshipType: 'condemned', 
        description: 'Divine judge who condemns them for sacrilege' 
      }
    ]
  },
  {
    id: 22,
    name: 'Scylla',
    description: 'The six-headed sea monster that guards the narrow strait opposite Charybdis. Once a beautiful nymph transformed by jealous gods into a terrifying creature, Scylla represents the inescapable price of passage through dangerous waters.',
    characterType: 'Sea Monster',
    isProtagonist: false,
    aliases: ['Six-Headed Monster', 'Guardian of the Strait', 'The Devourer', 'Terror of the Passage'],
    powers: [
      'Multiple Heads',
      'Lightning Speed',
      'Precise Strikes',
      'Territorial Control',
      'Inevitable Hunger',
      'Strategic Positioning'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'adversary', 
        description: 'Hero who must sacrifice men to pass her lair' 
      },
      { 
        characterId: 20, 
        characterName: 'The Crew\'s Desperation', 
        relationshipType: 'predator', 
        description: 'Six sailors who become her victims' 
      }
    ]
  },
  {
    id: 21,
    name: 'Helios (The Sun God)',
    description: 'The radiant god of the sun whose sacred cattle were slaughtered by Odysseus\'s crew. Though not directly present, his divine anger and demand for justice drives Zeus to act against the mortals who committed sacrilege.',
    characterType: 'Sun God',
    isProtagonist: false,
    aliases: ['Sun Bearer', 'Cattle Owner', 'Solar Divine', 'Light Bringer', 'Sacred Herdsman'],
    powers: [
      'Solar Radiance',
      'Divine Ownership',
      'Sacred Protection',
      'Divine Retribution',
      'Cosmic Justice',
      'Light Mastery',
      'Divine Anger'
    ],
    relationships: [
      { 
        characterId: 19, 
        characterName: 'Zeus', 
        relationshipType: 'peer', 
        description: 'Fellow god who enforces justice for the slaughter of sacred cattle' 
      },
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'wronged', 
        description: 'Leader whose crew violated his sacred property' 
      },
      { 
        characterId: 20, 
        characterName: 'The Crew\'s Desperation', 
        relationshipType: 'victim', 
        description: 'Mortals who slaughtered his sacred cattle' 
      }
    ]
  }
];

// Thunder Saga Locations
export const THUNDER_LOCATIONS: ThunderLocation[] = [
  {
    id: 26,
    name: 'The Siren Waters',
    latitude: 38.0,
    longitude: 23.5,
    description: 'The treacherous waters where the Sirens sing their deadly song, luring sailors to their doom with promises of knowledge and glory.',
    saga: 'Thunder Saga',
    significance: 'Waters of temptation and deadly allure',
    type: 'siren_waters',
    features: [
      'Siren Song Range',
      'Shipwreck Graveyards',
      'Enchanted Waters',
      'Deadly Rocks',
      'Musical Currents',
      'Temptation Zones'
    ],
    thunderProperties: [
      'Sonic Enchantment',
      'Mental Manipulation',
      'Deadly Attraction',
      'Shipwreck Creation',
      'Knowledge Temptation'
    ],
    divinePresence: 'Sirens with their deadly song',
    judgmental: false
  },
  {
    id: 27,
    name: 'Scylla\'s Lair',
    latitude: 37.5,
    longitude: 23.0,
    description: 'The narrow strait where the six-headed monster Scylla dwells, a passage that demands sacrifice from any who dare to pass.',
    saga: 'Thunder Saga',
    significance: 'Site of necessary sacrifice and strategic loss',
    type: 'monster_lair',
    features: [
      'Six Monster Heads',
      'Narrow Strait',
      'Cave Entrances',
      'Bone Piles',
      'Hunting Grounds',
      'Strategic Passage'
    ],
    thunderProperties: [
      'Monster Territory',
      'Sacrificial Demands',
      'Strategic Necessity',
      'Calculated Loss',
      'Leadership Testing'
    ],
    divinePresence: 'Scylla the six-headed monster',
    judgmental: true
  },
  {
    id: 28,
    name: 'The Isle of Helios',
    latitude: 36.5,
    longitude: 25.4,
    description: 'The sacred island where Helios keeps his immortal cattle. Despite warnings, the crew\'s desperation leads them to slaughter the sacred beasts, triggering divine wrath.',
    saga: 'Thunder Saga',
    significance: 'Site of the crew\'s ultimate betrayal and sacrilege',
    type: 'sacred_island',
    features: [
      'Sacred Cattle Herds',
      'Divine Pastures',
      'Forbidden Groves',
      'Slaughter Grounds',
      'Blood-Stained Altars',
      'Divine Warning Signs'
    ],
    thunderProperties: [
      'Sacred Violation',
      'Divine Transgression',
      'Forbidden Territory',
      'Sacrificial Defilement',
      'Holy Desecration'
    ],
    divinePresence: 'Helios\'s sacred cattle and divine protection',
    judgmental: true
  },
  {
    id: 29,
    name: 'The Open Sea of Judgment',
    latitude: 36.0,
    longitude: 24.8,
    description: 'The vast open waters where Zeus confronts Odysseus and his crew, delivering his divine ultimatum amid thunder and lightning.',
    saga: 'Thunder Saga',
    significance: 'Theater of divine judgment and ultimate choice',
    type: 'open_sea',
    features: [
      'Thunderous Clouds',
      'Lightning Strikes',
      'Raging Tempests',
      'Divine Manifestation',
      'Open Waters',
      'Zeus\'s Voice'
    ],
    thunderProperties: [
      'Divine Thunder',
      'Lightning Mastery',
      'Storm Control',
      'Weather Dominion',
      'Ultimate Judgment'
    ],
    divinePresence: 'Zeus delivering divine judgment',
    judgmental: true
  }
];

// Thunder Saga Songs (Tracks 21-25)
export const THUNDER_SONGS: Song[] = [
  {
    id: 21,
    title: 'Suffering',
    trackNumber: 21,
    description: 'The crew\'s desperation reaches its breaking point as they face starvation on Helios\'s island, leading to growing tensions and betrayal',
    durationSeconds: 186, // 3:06
    themes: ['Desperation and Starvation', 'Crew Tension', 'Breaking Point', 'Growing Mutiny'],
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice',
      releaseDate: '2023-12-25',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Divine Drama'],
      themes: ['Divine Justice', 'Betrayal', 'Sacrifice', 'Thunder'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Punishment'],
      totalDurationSeconds: 945 // Total duration of all Thunder Saga songs
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    perspective: 'The crew\'s growing desperation on Helios\'s island',
    narrativeContext: 'Starvation and tension leading to betrayal'
  },
  {
    id: 22,
    title: 'Different Beast',
    trackNumber: 22,
    description: 'Odysseus confronts the crew\'s ultimate betrayal and realizes he must become something darker to survive, embracing a more ruthless approach',
    durationSeconds: 195, // 3:15
    themes: ['Transformation', 'Betrayal Response', 'Character Evolution', 'Strategic Adaptation'],
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice',
      releaseDate: '2023-12-25',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Divine Drama'],
      themes: ['Divine Justice', 'Betrayal', 'Sacrifice', 'Thunder'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Punishment'],
      totalDurationSeconds: 945
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false }
    ],
    perspective: 'Odysseus responding to his crew\'s betrayal',
    narrativeContext: 'Hero\'s transformation after sacred transgression'
  },
  {
    id: 23,
    title: 'Scylla',
    trackNumber: 23,
    description: 'Odysseus faces the six-headed monster Scylla, making the calculated decision to sacrifice six of his men to save the rest of the crew',
    durationSeconds: 204, // 3:24
    themes: ['Strategic Sacrifice', 'Leadership Burden', 'Monster Encounter', 'Calculated Loss'],
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice',
      releaseDate: '2023-12-25',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Divine Drama'],
      themes: ['Divine Justice', 'Betrayal', 'Sacrifice', 'Thunder'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Punishment'],
      totalDurationSeconds: 945
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    perspective: 'Odysseus making strategic sacrifices for survival',
    narrativeContext: 'Encounter with Scylla and the choice to sacrifice men'
  },
  {
    id: 24,
    title: 'Mutiny',
    trackNumber: 24,
    description: 'The crew defies Odysseus and slaughters Helios\'s sacred cattle, sealing their fate and bringing divine wrath upon the expedition',
    durationSeconds: 177, // 2:57
    themes: ['Crew Rebellion', 'Sacred Transgression', 'Divine Blasphemy', 'Fatal Disobedience'],
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice',
      releaseDate: '2023-12-25',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Divine Drama'],
      themes: ['Divine Justice', 'Betrayal', 'Sacrifice', 'Thunder'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Punishment'],
      totalDurationSeconds: 945
    },
    characters: [
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    perspective: 'The crew\'s final act of rebellion',
    narrativeContext: 'Sacred cattle slaughter and divine transgression'
  },
  {
    id: 25,
    title: 'Thunder Bringer',
    trackNumber: 25,
    description: 'Zeus appears in his divine majesty to deliver judgment, forcing Odysseus to choose between his crew\'s life and his own in the ultimate test of leadership and survival',
    durationSeconds: 183, // 3:03
    themes: ['Divine Judgment', 'Ultimate Choice', 'Thunder and Lightning', 'Cosmic Justice'],
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice',
      releaseDate: '2023-12-25',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Divine Drama'],
      themes: ['Divine Justice', 'Betrayal', 'Sacrifice', 'Thunder'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Divine Punishment'],
      totalDurationSeconds: 945
    },
    characters: [
      { id: 19, name: 'Zeus', characterType: 'King of Gods', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    perspective: 'Zeus delivering divine judgment and ultimatum',
    narrativeContext: 'The ultimate choice between crew and self-preservation'
  }
];

// Thunder Saga Events
export const THUNDER_EVENTS: ApiEvent[] = [
  {
    id: 67,
    title: 'Passage Through Siren Waters',
    description: 'Odysseus and his crew navigate the treacherous waters where the Sirens sing, using strategy and determination to resist their deadly song.',
    sequenceOrder: 1,
    eventTimestamp: '1184-06-15T08:00:00Z',
    location: {
      id: 26,
      name: 'The Siren Waters',
      latitude: 38.0,
      longitude: 23.5,
      description: 'The treacherous waters where the Sirens sing their deadly song',
      saga: 'Thunder Saga',
      significance: 'Waters of temptation and deadly allure'
    },
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 20, name: 'The Crew\'s Desperation', characterType: 'Desperate Sailors', isProtagonist: false }
    ],
    songs: [],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 68,
    title: 'Encounter with Scylla',
    description: 'Odysseus makes the devastating choice to sail past Scylla, knowingly sacrificing six of his men to the six-headed monster to save the rest of the crew.',
    sequenceOrder: 2,
    eventTimestamp: '1184-06-15T12:00:00Z',
    location: {
      id: 27,
      name: 'Scylla\'s Lair',
      latitude: 37.5,
      longitude: 23.0,
      description: 'The narrow strait where the six-headed monster Scylla dwells',
      saga: 'Thunder Saga',
      significance: 'Site of necessary sacrifice and strategic loss'
    },
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 20, name: 'The Crew\'s Desperation', characterType: 'Desperate Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 27, title: 'Scylla', trackNumber: 3, durationSeconds: 204 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 69,
    title: 'Arrival at Helios\'s Isle',
    description: 'Despite Odysseus\'s warnings about the sacred nature of the island, the crew lands on Helios\'s isle, where the sun god\'s immortal cattle graze in divine protection.',
    sequenceOrder: 3,
    eventTimestamp: '1184-06-20T08:00:00Z',
    location: {
      id: 28,
      name: 'The Isle of Helios',
      latitude: 36.5,
      longitude: 25.4,
      description: 'The sacred island where Helios keeps his immortal cattle',
      saga: 'Thunder Saga',
      significance: 'Site of the crew\'s ultimate betrayal and sacrilege'
    },
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 20, name: 'The Crew\'s Desperation', characterType: 'Desperate Sailors', isProtagonist: false }
    ],
    songs: [],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 70,
    title: 'The Crew\'s Growing Desperation',
    description: 'Trapped on the island with dwindling supplies, the crew\'s hunger and desperation grow as they eye the forbidden cattle, despite Odysseus\'s strict warnings about divine retribution.',
    sequenceOrder: 4,
    eventTimestamp: '1184-06-22T12:00:00Z',
    location: {
      id: 28,
      name: 'The Isle of Helios',
      latitude: 36.5,
      longitude: 25.4,
      description: 'The sacred island where Helios keeps his immortal cattle',
      saga: 'Thunder Saga',
      significance: 'Site of the crew\'s ultimate betrayal and sacrilege'
    },
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice'
    },
    characters: [
      { id: 20, name: 'The Crew\'s Desperation', characterType: 'Desperate Sailors', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false }
    ],
    songs: [
      { id: 25, title: 'Suffering', trackNumber: 1, durationSeconds: 186 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 71,
    title: 'The Sacred Betrayal',
    description: 'While Odysseus sleeps, the crew commits the ultimate betrayal by slaughtering Helios\'s sacred cattle, crossing a line that will bring divine wrath upon them all.',
    sequenceOrder: 5,
    eventTimestamp: '1184-06-25T03:00:00Z',
    location: {
      id: 28,
      name: 'The Isle of Helios',
      latitude: 36.5,
      longitude: 25.4,
      description: 'The sacred island where Helios keeps his immortal cattle',
      saga: 'Thunder Saga',
      significance: 'Site of the crew\'s ultimate betrayal and sacrilege'
    },
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice'
    },
    characters: [
      { id: 20, name: 'The Crew\'s Desperation', characterType: 'Desperate Sailors', isProtagonist: false },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 21, name: 'Helios (The Sun God)', characterType: 'Sun God', isProtagonist: false }
    ],
    songs: [
      { id: 28, title: 'Mutiny', trackNumber: 4, durationSeconds: 177 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 72,
    title: 'Odysseus Discovers the Betrayal',
    description: 'Awakening to find his crew has slaughtered the sacred cattle, Odysseus realizes the magnitude of their transgression and the inevitable divine punishment that will follow.',
    sequenceOrder: 6,
    eventTimestamp: '1184-06-25T07:00:00Z',
    location: {
      id: 28,
      name: 'The Isle of Helios',
      latitude: 36.5,
      longitude: 25.4,
      description: 'The sacred island where Helios keeps his immortal cattle',
      saga: 'Thunder Saga',
      significance: 'Site of the crew\'s ultimate betrayal and sacrilege'
    },
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 20, name: 'The Crew\'s Desperation', characterType: 'Desperate Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 26, title: 'Different Beast', trackNumber: 2, durationSeconds: 195 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 73,
    title: 'The Divine Storm Gathers',
    description: 'As word of the sacrilege reaches the gods, dark clouds gather and thunder begins to rumble as Zeus prepares to deliver divine justice for the violation of sacred law.',
    sequenceOrder: 7,
    eventTimestamp: '1184-06-25T10:00:00Z',
    location: {
      id: 29,
      name: 'The Open Sea of Judgment',
      latitude: 36.0,
      longitude: 24.8,
      description: 'The vast open waters where Zeus confronts Odysseus and his crew',
      saga: 'Thunder Saga',
      significance: 'Theater of divine judgment and ultimate choice'
    },
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice'
    },
    characters: [
      { id: 19, name: 'Zeus', characterType: 'King of Gods', isProtagonist: false },
      { id: 21, name: 'Helios (The Sun God)', characterType: 'Sun God', isProtagonist: false }
    ],
    songs: [],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 74,
    title: 'Zeus\'s Divine Confrontation',
    description: 'The king of the gods manifests in his full divine majesty, appearing before Odysseus and his crew with thunder and lightning to deliver judgment for their sacrilege.',
    sequenceOrder: 8,
    eventTimestamp: '1184-06-25T14:00:00Z',
    location: {
      id: 29,
      name: 'The Open Sea of Judgment',
      latitude: 36.0,
      longitude: 24.8,
      description: 'The vast open waters where Zeus confronts Odysseus and his crew',
      saga: 'Thunder Saga',
      significance: 'Theater of divine judgment and ultimate choice'
    },
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice'
    },
    characters: [
      { id: 19, name: 'Zeus', characterType: 'King of Gods', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 20, name: 'The Crew\'s Desperation', characterType: 'Desperate Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 29, title: 'Thunder Bringer', trackNumber: 5, durationSeconds: 183 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 73,
    title: 'The Divine Ultimatum',
    description: 'Zeus presents Odysseus with an impossible choice: either he dies, or his crew dies for their sacrilege. The hero must choose between his own life and the lives of his men.',
    sequenceOrder: 7,
    eventTimestamp: '1184-06-25T15:00:00Z',
    location: {
      id: 29,
      name: 'The Doomed Ship',
      latitude: 35.5,
      longitude: 24.2,
      description: 'Odysseus\'s vessel, now the stage for the ultimate choice',
      saga: 'Thunder Saga',
      significance: 'Site of the ultimate choice and final sacrifice'
    },
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice'
    },
    characters: [
      { id: 19, name: 'Zeus', characterType: 'King of Gods', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 20, name: 'The Crew\'s Desperation', characterType: 'Desperate Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 29, title: 'Thunder Bringer', trackNumber: 5, durationSeconds: 183 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 74,
    title: 'Odysseus\'s Ultimate Choice',
    description: 'Faced with Zeus\'s ultimatum, Odysseus makes the devastating choice to sacrifice his crew to save himself, embracing his transformation into the monster he was prophesied to become.',
    sequenceOrder: 8,
    eventTimestamp: '1184-06-25T15:30:00Z',
    location: {
      id: 29,
      name: 'The Doomed Ship',
      latitude: 35.5,
      longitude: 24.2,
      description: 'Odysseus\'s vessel, now the stage for the ultimate choice',
      saga: 'Thunder Saga',
      significance: 'Site of the ultimate choice and final sacrifice'
    },
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 19, name: 'Zeus', characterType: 'King of Gods', isProtagonist: false },
      { id: 20, name: 'The Crew\'s Desperation', characterType: 'Desperate Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 29, title: 'Thunder Bringer', trackNumber: 5, durationSeconds: 183 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 75,
    title: 'Divine Lightning Strikes',
    description: 'Zeus unleashes his divine lightning upon the ship, destroying it and killing the entire crew while sparing Odysseus, who survives alone to face the consequences of his choice.',
    sequenceOrder: 9,
    eventTimestamp: '1184-06-25T16:00:00Z',
    location: {
      id: 27,
      name: 'The Storm-Wracked Seas',
      latitude: 36.0,
      longitude: 24.8,
      description: 'The turbulent waters where Zeus manifests his divine wrath',
      saga: 'Thunder Saga',
      significance: 'Theater of divine judgment and cosmic justice'
    },
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice'
    },
    characters: [
      { id: 19, name: 'Zeus', characterType: 'King of Gods', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 20, name: 'The Crew\'s Desperation', characterType: 'Desperate Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 29, title: 'Thunder Bringer', trackNumber: 5, durationSeconds: 183 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 76,
    title: 'Odysseus Alone',
    description: 'Left alone in the wreckage of his ship with all his crew dead, Odysseus floats in the storm-tossed seas, having survived divine judgment but lost everything and everyone he led.',
    sequenceOrder: 10,
    eventTimestamp: '1184-06-25T18:00:00Z',
    location: {
      id: 27,
      name: 'The Storm-Wracked Seas',
      latitude: 36.0,
      longitude: 24.8,
      description: 'The turbulent waters where Zeus manifests his divine wrath',
      saga: 'Thunder Saga',
      significance: 'Theater of divine judgment and cosmic justice'
    },
    saga: {
      id: 6,
      title: 'Thunder Saga',
      description: 'Divine judgment and the ultimate sacrifice'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    songs: [],
    eventContext: {
      importance: 'pivotal'
    }
  }
];

// Thunder Saga Metadata
export const THUNDER_SAGA_METADATA = {
  sagaId: 'thunder',
  sagaName: 'Thunder Saga',
  totalSongs: 5,
  totalEvents: 10,
  totalCharacters: 3,
  totalLocations: 4,
  releaseDate: '2025-06-30',
  significance: 'Divine judgment and ultimate sacrifice - where Zeus forces Odysseus to choose between his crew and himself, completing his transformation into the monster of prophecy'
};

// Complete Thunder Saga Seed Data
export const THUNDER_SAGA_SEED_DATA = {
  characters: THUNDER_CHARACTERS,
  locations: THUNDER_LOCATIONS,
  songs: THUNDER_SONGS,
  events: THUNDER_EVENTS,
  metadata: THUNDER_SAGA_METADATA
};

export default THUNDER_SAGA_SEED_DATA;
