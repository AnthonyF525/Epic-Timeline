/**
 * UnderworldSagaSeedData - P3 Implementation
 * Comprehensive seed data for Underworld Saga including Hades realm, prophecy events, and encounters with the dead
 * 
 * Based on EPIC: The Musical by Jorge Rivera-Herrans
 * Focus: The realm of Hades (place), prophetic visions, and conversations with the deceased
 */

import { Song } from '../components/Audio/SongList';
import { Character, ApiEvent } from './EventService';

// Underworld Location Interface
export interface UnderworldLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance: string;
  type: 'underworld_entrance' | 'prophecy_chamber' | 'river_crossing' | 'soul_realm';
  features: string[];
  underworldProperties?: string[];
  spiritPresence?: string;
  prophetic?: boolean;
}

// Underworld Saga Characters
export const UNDERWORLD_CHARACTERS: Character[] = [
  {
    id: 16,
    name: 'Tiresias',
    description: 'The blind prophet of Thebes who retains his gift of prophecy even in death. He appears as a shade in the Underworld to deliver crucial prophecies about Odysseus\'s future journey and the trials that await.',
    characterType: 'Prophet Spirit',
    isProtagonist: false,
    aliases: ['The Blind Prophet', 'Seer of Thebes', 'Oracle of the Dead', 'Prophetic Shade'],
    powers: [
      'Divine Prophecy',
      'Future Sight',
      'Death Wisdom',
      'Spirit Communication',
      'Truth Revelation',
      'Fate Knowledge',
      'Underworld Navigation'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'guide', 
        description: 'Mortal hero seeking prophetic guidance for his journey' 
      },
      { 
        characterId: 17, 
        characterName: 'Shades of the Dead', 
        relationshipType: 'peer', 
        description: 'Fellow spirits dwelling in the realm of Hades' 
      }
    ]
  },
  {
    id: 17,
    name: 'Shades of the Dead',
    description: 'The countless souls of the deceased who dwell in the Underworld. They retain memories of their mortal lives and seek to communicate with the living, offering warnings, wisdom, and sometimes demands for justice.',
    characterType: 'Deceased Spirits',
    isProtagonist: false,
    aliases: ['The Dead', 'Departed Souls', 'Underworld Inhabitants', 'Ghostly Shades'],
    powers: [
      'Memory Retention',
      'Spiritual Communication',
      'Prophetic Warnings',
      'Emotional Manifestation',
      'Truth Compulsion',
      'Collective Wisdom'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'guide', 
        description: 'Living hero they attempt to warn and advise' 
      },
      { 
        characterId: 16, 
        characterName: 'Tiresias', 
        relationshipType: 'peer', 
        description: 'Fellow spirit with prophetic authority' 
      },
      { 
        characterId: 9, 
        characterName: 'Polites', 
        relationshipType: 'member', 
        description: 'Beloved friend among the deceased crew members' 
      }
    ]
  },
  {
    id: 18,
    name: 'Anticlea',
    description: 'Odysseus\'s beloved mother who died of grief while waiting for her son\'s return from Troy. Her shade appears in the Underworld, bringing both comfort and heartbreak as she reveals the cost of his long absence.',
    characterType: 'Deceased Family',
    isProtagonist: false,
    aliases: ['Mother of Odysseus', 'Queen of Ithaca', 'Grieving Mother', 'Departed Matriarch'],
    powers: [
      'Maternal Love',
      'Emotional Truth',
      'Family Memory',
      'Grief Manifestation',
      'Protective Spirit',
      'Wisdom of Loss'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'family', 
        description: 'Beloved son whose absence caused her death from grief' 
      },
      { 
        characterId: 17, 
        characterName: 'Shades of the Dead', 
        relationshipType: 'member', 
        description: 'One of the many souls dwelling in the Underworld' 
      }
    ]
  }
];

// Underworld Saga Locations
export const UNDERWORLD_LOCATIONS: UnderworldLocation[] = [
  {
    id: 22,
    name: 'The Gates of Hades',
    latitude: 38.4,
    longitude: 21.8,
    description: 'The imposing entrance to the realm of the dead, where the living must perform sacred rituals to gain access to the Underworld and communicate with the deceased.',
    saga: 'Underworld Saga',
    significance: 'Portal between the world of the living and the dead',
    type: 'underworld_entrance',
    features: [
      'Sacrificial Altars',
      'Blood Offering Pits',
      'Spirit Summoning Circles',
      'Ancient Gate Stones',
      'Ritual Preparation Areas',
      'Divine Boundary Markers'
    ],
    underworldProperties: [
      'Living-Dead Barrier',
      'Ritual Magic Amplification',
      'Spirit Manifestation',
      'Divine Protection Threshold',
      'Sacrifice Acceptance'
    ],
    spiritPresence: 'Threshold guardians and wandering shades',
    prophetic: true
  },
  {
    id: 23,
    name: 'The River of Blood',
    latitude: 38.35,
    longitude: 21.75,
    description: 'A mystical river formed by sacrificial blood that attracts the spirits of the dead. The shades gather here to drink and gain temporary strength to communicate with the living.',
    saga: 'Underworld Saga',
    significance: 'Sacred space where the dead gain voice to speak',
    type: 'river_crossing',
    features: [
      'Flowing Blood Stream',
      'Spirit Gathering Points',
      'Sacrificial Stones',
      'Communication Pools',
      'Memory Wells',
      'Prophetic Waters'
    ],
    underworldProperties: [
      'Spirit Empowerment',
      'Memory Restoration',
      'Communication Enhancement',
      'Truth Compulsion',
      'Prophetic Revelation'
    ],
    spiritPresence: 'Countless thirsty shades seeking voice',
    prophetic: true
  },
  {
    id: 24,
    name: 'The Prophecy Chamber',
    latitude: 38.3,
    longitude: 21.7,
    description: 'A sacred space deep in the Underworld where Tiresias delivers his prophetic visions. Here, the future unfolds in terrible clarity, revealing the trials and choices that await.',
    saga: 'Underworld Saga',
    significance: 'Heart of prophetic revelation and future sight',
    type: 'prophecy_chamber',
    features: [
      'Oracle\'s Throne',
      'Vision Pools',
      'Prophetic Flames',
      'Future Mirrors',
      'Fate Threads',
      'Time Crystals'
    ],
    underworldProperties: [
      'Future Sight Enhancement',
      'Prophetic Clarity',
      'Fate Revelation',
      'Time Perception',
      'Divine Truth Access'
    ],
    spiritPresence: 'Tiresias and other prophetic spirits',
    prophetic: true
  },
  {
    id: 25,
    name: 'The Fields of Asphodel',
    latitude: 38.25,
    longitude: 21.65,
    description: 'The vast neutral realm where ordinary souls dwell in the Underworld. Here, the spirits of common people exist in a gray twilight, retaining their memories but lacking the vibrancy of life.',
    saga: 'Underworld Saga',
    significance: 'Home to the majority of deceased souls',
    type: 'soul_realm',
    features: [
      'Endless Gray Plains',
      'Wandering Shade Paths',
      'Memory Gardens',
      'Twilight Groves',
      'Soul Congregations',
      'Peaceful Resting Areas'
    ],
    underworldProperties: [
      'Soul Preservation',
      'Memory Maintenance',
      'Peaceful Existence',
      'Spiritual Neutrality',
      'Eternal Twilight'
    ],
    spiritPresence: 'Countless ordinary souls in peaceful afterlife',
    prophetic: false
  }
];

// Underworld Saga Songs (Tracks 18-20)
export const UNDERWORLD_SONGS: Song[] = [
  {
    id: 18,
    title: 'The Underworld',
    trackNumber: 18,
    description: 'Odysseus descends into the realm of Hades to seek prophetic guidance, performing dark rituals to summon the spirits of the dead',
    durationSeconds: 201, // 3:21
    themes: ['Death and Afterlife', 'Sacrifice and Ritual', 'Seeking Wisdom', 'Supernatural Encounters'],
    saga: {
      id: 5,
      title: 'Underworld Saga',
      description: 'Journey to the realm of Hades for prophetic wisdom',
      releaseDate: '2023-04-30',
      episodeCount: 3,
      genres: ['Epic', 'Musical Theatre', 'Dark Fantasy'],
      themes: ['Death', 'Prophecy', 'Family', 'Sacrifice'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Afterlife Beliefs'],
      totalDurationSeconds: 582 // Total duration of 3 Underworld Saga songs
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 17, name: 'Shades of the Dead', characterType: 'Deceased Spirits', isProtagonist: false }
    ],
    perspective: 'Odysseus entering the realm of the dead',
    narrativeContext: 'Dark ritual to communicate with deceased spirits'
  },
  {
    id: 19,
    title: 'No Longer You',
    trackNumber: 19,
    description: 'The prophet Tiresias delivers devastating prophecies about Odysseus\'s future, revealing the trials and transformations that await him',
    durationSeconds: 195, // 3:15
    themes: ['Prophetic Revelation', 'Future Trials', 'Character Transformation', 'Divine Will'],
    saga: {
      id: 5,
      title: 'Underworld Saga',
      description: 'Journey to the realm of Hades for prophetic wisdom',
      releaseDate: '2023-04-30',
      episodeCount: 3,
      genres: ['Epic', 'Musical Theatre', 'Dark Fantasy'],
      themes: ['Death', 'Prophecy', 'Family', 'Sacrifice'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Afterlife Beliefs'],
      totalDurationSeconds: 582
    },
    characters: [
      { id: 16, name: 'Tiresias', characterType: 'Prophet Spirit', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    perspective: 'Tiresias revealing prophetic visions',
    narrativeContext: 'Devastating prophecies about Odysseus\'s future transformation'
  },
  {
    id: 20,
    title: 'Monster',
    trackNumber: 20,
    description: 'Odysseus confronts the prophecy of his own transformation, understanding that survival may require becoming the very thing he once despised',
    durationSeconds: 186, // 3:06
    themes: ['Internal Transformation', 'Moral Conflict', 'Survival vs Honor', 'Prophetic Acceptance'],
    saga: {
      id: 5,
      title: 'Underworld Saga',
      description: 'Journey to the realm of Hades for prophetic wisdom',
      releaseDate: '2023-04-30',
      episodeCount: 3,
      genres: ['Epic', 'Musical Theatre', 'Dark Fantasy'],
      themes: ['Death', 'Prophecy', 'Family', 'Sacrifice'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Afterlife Beliefs'],
      totalDurationSeconds: 582
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 17, name: 'Shades of the Dead', characterType: 'Deceased Spirits', isProtagonist: false }
    ],
    perspective: 'Odysseus accepting his prophetic destiny',
    narrativeContext: 'Hero\'s internal struggle with becoming a monster for survival'
  }
];

// Underworld Saga Events
export const UNDERWORLD_EVENTS: ApiEvent[] = [
  {
    id: 58,
    title: 'Descent to the Underworld',
    description: 'Following Circe\'s guidance, Odysseus and his crew travel to the edge of the world to find the entrance to Hades, preparing for the dangerous ritual to communicate with the dead.',
    sequenceOrder: 1,
    eventTimestamp: '1184-06-10T10:00:00Z',
    location: {
      id: 22,
      name: 'The Gates of Hades',
      latitude: 38.4,
      longitude: 21.8,
      description: 'The imposing entrance to the realm of the dead',
      saga: 'Underworld Saga',
      significance: 'Portal between the world of the living and the dead'
    },
    saga: {
      id: 5,
      title: 'Underworld Saga',
      description: 'Journey to the realm of Hades for prophetic wisdom'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 21, title: 'The Underworld', trackNumber: 1, durationSeconds: 201 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 59,
    title: 'The Blood Sacrifice Ritual',
    description: 'Odysseus performs the sacred ritual of blood sacrifice, creating a river of blood that attracts the spirits of the dead and allows them to gain voice and substance.',
    sequenceOrder: 2,
    eventTimestamp: '1184-06-10T14:00:00Z',
    location: {
      id: 23,
      name: 'The River of Blood',
      latitude: 38.35,
      longitude: 21.75,
      description: 'A mystical river formed by sacrificial blood that attracts spirits',
      saga: 'Underworld Saga',
      significance: 'Sacred space where the dead gain voice to speak'
    },
    saga: {
      id: 5,
      title: 'Underworld Saga',
      description: 'Journey to the realm of Hades for prophetic wisdom'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 17, name: 'Shades of the Dead', characterType: 'Deceased Spirits', isProtagonist: false }
    ],
    songs: [
      { id: 21, title: 'The Underworld', trackNumber: 1, durationSeconds: 201 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 60,
    title: 'Spirits Gather to the Blood',
    description: 'The sacrificial blood draws countless spirits of the dead, including fallen comrades and unknown souls, all seeking to drink and gain the power to communicate with the living.',
    sequenceOrder: 3,
    eventTimestamp: '1184-06-10T15:00:00Z',
    location: {
      id: 23,
      name: 'The River of Blood',
      latitude: 38.35,
      longitude: 21.75,
      description: 'A mystical river formed by sacrificial blood that attracts spirits',
      saga: 'Underworld Saga',
      significance: 'Sacred space where the dead gain voice to speak'
    },
    saga: {
      id: 5,
      title: 'Underworld Saga',
      description: 'Journey to the realm of Hades for prophetic wisdom'
    },
    characters: [
      { id: 17, name: 'Shades of the Dead', characterType: 'Deceased Spirits', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 9, name: 'Polites', characterType: 'Sailor', isProtagonist: false }
    ],
    songs: [
      { id: 21, title: 'The Underworld', trackNumber: 1, durationSeconds: 201 }
    ],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 61,
    title: 'Tiresias Appears',
    description: 'The blind prophet Tiresias emerges from among the dead, his spirit empowered by the blood sacrifice to deliver crucial prophecies about Odysseus\'s future.',
    sequenceOrder: 4,
    eventTimestamp: '1184-06-10T16:00:00Z',
    location: {
      id: 24,
      name: 'The Prophecy Chamber',
      latitude: 38.3,
      longitude: 21.7,
      description: 'A sacred space where Tiresias delivers prophetic visions',
      saga: 'Underworld Saga',
      significance: 'Heart of prophetic revelation and future sight'
    },
    saga: {
      id: 5,
      title: 'Underworld Saga',
      description: 'Journey to the realm of Hades for prophetic wisdom'
    },
    characters: [
      { id: 16, name: 'Tiresias', characterType: 'Prophet Spirit', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    songs: [
      { id: 22, title: 'No Longer You', trackNumber: 2, durationSeconds: 195 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 62,
    title: 'The Devastating Prophecy',
    description: 'Tiresias delivers his prophetic vision, revealing that Odysseus will face impossible choices and must transform into something darker to survive and protect his family.',
    sequenceOrder: 5,
    eventTimestamp: '1184-06-10T16:30:00Z',
    location: {
      id: 24,
      name: 'The Prophecy Chamber',
      latitude: 38.3,
      longitude: 21.7,
      description: 'A sacred space where Tiresias delivers prophetic visions',
      saga: 'Underworld Saga',
      significance: 'Heart of prophetic revelation and future sight'
    },
    saga: {
      id: 5,
      title: 'Underworld Saga',
      description: 'Journey to the realm of Hades for prophetic wisdom'
    },
    characters: [
      { id: 16, name: 'Tiresias', characterType: 'Prophet Spirit', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    songs: [
      { id: 22, title: 'No Longer You', trackNumber: 2, durationSeconds: 195 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 63,
    title: 'Odysseus Accepts His Fate',
    description: 'Confronted with the prophecy of his transformation, Odysseus struggles with the revelation that he must become a monster to save those he loves, ultimately accepting this dark destiny.',
    sequenceOrder: 6,
    eventTimestamp: '1184-06-10T17:00:00Z',
    location: {
      id: 24,
      name: 'The Prophecy Chamber',
      latitude: 38.3,
      longitude: 21.7,
      description: 'A sacred space where Tiresias delivers prophetic visions',
      saga: 'Underworld Saga',
      significance: 'Heart of prophetic revelation and future sight'
    },
    saga: {
      id: 5,
      title: 'Underworld Saga',
      description: 'Journey to the realm of Hades for prophetic wisdom'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 16, name: 'Tiresias', characterType: 'Prophet Spirit', isProtagonist: false }
    ],
    songs: [
      { id: 23, title: 'Monster', trackNumber: 3, durationSeconds: 186 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 64,
    title: 'Encounter with Anticlea',
    description: 'Odysseus\'s deceased mother Anticlea appears among the spirits, revealing that she died of grief waiting for his return, devastating the hero with the personal cost of his journey.',
    sequenceOrder: 7,
    eventTimestamp: '1184-06-10T18:00:00Z',
    location: {
      id: 25,
      name: 'The Fields of Asphodel',
      latitude: 38.25,
      longitude: 21.65,
      description: 'The vast neutral realm where ordinary souls dwell',
      saga: 'Underworld Saga',
      significance: 'Home to the majority of deceased souls'
    },
    saga: {
      id: 5,
      title: 'Underworld Saga',
      description: 'Journey to the realm of Hades for prophetic wisdom'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 18, name: 'Anticlea', characterType: 'Deceased Family', isProtagonist: false }
    ],
    songs: [
      { id: 24, title: 'Suffering', trackNumber: 4, durationSeconds: 186 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 65,
    title: 'The Weight of Suffering',
    description: 'Overwhelmed by the revelation of his mother\'s death and the prophecy of his transformation, Odysseus confronts the devastating emotional cost of his heroic journey.',
    sequenceOrder: 8,
    eventTimestamp: '1184-06-10T18:30:00Z',
    location: {
      id: 25,
      name: 'The Fields of Asphodel',
      latitude: 38.25,
      longitude: 21.65,
      description: 'The vast neutral realm where ordinary souls dwell',
      saga: 'Underworld Saga',
      significance: 'Home to the majority of deceased souls'
    },
    saga: {
      id: 5,
      title: 'Underworld Saga',
      description: 'Journey to the realm of Hades for prophetic wisdom'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 18, name: 'Anticlea', characterType: 'Deceased Family', isProtagonist: false },
      { id: 17, name: 'Shades of the Dead', characterType: 'Deceased Spirits', isProtagonist: false }
    ],
    songs: [
      { id: 24, title: 'Suffering', trackNumber: 4, durationSeconds: 186 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 66,
    title: 'Departure from the Underworld',
    description: 'Armed with prophetic knowledge and forever changed by his encounters with the dead, Odysseus leaves the Underworld carrying the weight of destiny and the pain of loss.',
    sequenceOrder: 9,
    eventTimestamp: '1184-06-10T20:00:00Z',
    location: {
      id: 22,
      name: 'The Gates of Hades',
      latitude: 38.4,
      longitude: 21.8,
      description: 'The imposing entrance to the realm of the dead',
      saga: 'Underworld Saga',
      significance: 'Portal between the world of the living and the dead'
    },
    saga: {
      id: 5,
      title: 'Underworld Saga',
      description: 'Journey to the realm of Hades for prophetic wisdom'
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
  }
];

// Underworld Saga Metadata
export const UNDERWORLD_SAGA_METADATA = {
  sagaId: 'underworld',
  sagaName: 'Underworld Saga',
  totalSongs: 3,
  totalEvents: 9,
  totalCharacters: 3,
  totalLocations: 4,
  releaseDate: '2023-04-30',
  significance: 'Prophetic revelation and transformation - where Odysseus learns his destiny and confronts the devastating cost of heroism through encounters with the dead'
};

// Complete Underworld Saga Seed Data
export const UNDERWORLD_SAGA_SEED_DATA = {
  characters: UNDERWORLD_CHARACTERS,
  locations: UNDERWORLD_LOCATIONS,
  songs: UNDERWORLD_SONGS,
  events: UNDERWORLD_EVENTS,
  metadata: UNDERWORLD_SAGA_METADATA
};

export default UNDERWORLD_SAGA_SEED_DATA;
