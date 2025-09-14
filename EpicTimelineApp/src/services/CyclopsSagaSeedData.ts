/**
 * CyclopsSagaSeedData - P3 Implementation
 * Comprehensive seed data for Cyclops Saga including songs, locations, characters, and events
 * 
 * Based on EPIC: The Musical by Jorge Rivera-Herrans
 * Focus: Odysseus and his crew's encounter with Polyphemus the Cyclops
 */

import { Song } from '../components/Audio/SongList';
import { Character, ApiEvent } from './EventService';

// Cyclops Saga Characters
export const CYCLOPS_CHARACTERS: Character[] = [
  {
    id: 6,
    name: 'Polyphemus',
    description: 'The one-eyed cyclops son of Poseidon who traps Odysseus and his crew in his cave. A massive, brutal giant who delights in eating his captives and shows no mercy to trespassers.',
    characterType: 'Cyclops',
    isProtagonist: false,
    aliases: ['The Cyclops', 'Son of Poseidon', 'One-Eye', 'Shepherd of the Isle'],
    powers: [
      'Immense Physical Strength',
      'Stone Throwing Mastery', 
      'Cave Knowledge',
      'Shepherd Skills',
      'Divine Heritage (Son of Poseidon)',
      'Intimidating Roar'
    ],
    relationships: [
      { 
        characterId: 5, 
        characterName: 'Poseidon', 
        relationshipType: 'family', 
        description: 'Father - God of the Sea who will avenge his son' 
      },
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'enemy', 
        description: 'Mortal enemy who blinded him and escaped his cave' 
      },
      { 
        characterId: 9, 
        characterName: 'Polites', 
        relationshipType: 'victim', 
        description: 'Killed and eaten by Polyphemus' 
      }
    ]
  },
  {
    id: 9,
    name: 'Polites',
    description: 'Odysseus\' closest friend and most optimistic crew member. Known for his kindness, open heart, and belief in greeting the world with open arms. His tragic death at the hands of Polyphemus marks a turning point in Odysseus\' journey.',
    characterType: 'Sailor',
    isProtagonist: false,
    aliases: ['Best Friend', 'Optimistic Sailor', 'Kind Heart'],
    powers: [
      'Unwavering Optimism',
      'Crew Morale Boost',
      'Diplomatic Speech',
      'Loyal Friendship',
      'Combat Skills',
      'Navigation Knowledge'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'friend', 
        description: 'Best friend and trusted companion who taught Odysseus mercy' 
      },
      { 
        characterId: 8, 
        characterName: 'Eurylochus', 
        relationshipType: 'crew', 
        description: 'Fellow crew member and brother in arms' 
      },
      { 
        characterId: 6, 
        characterName: 'Polyphemus', 
        relationshipType: 'victim', 
        description: 'Killed by the Cyclops for showing kindness' 
      }
    ]
  },
  {
    id: 10,
    name: 'Odysseus Crew',
    description: 'The loyal sailors who follow Odysseus on his journey home. Brave warriors who survived the Trojan War but face new perils in their quest to return to Ithaca.',
    characterType: 'Sailors',
    isProtagonist: false,
    aliases: ['The 600 Men', 'Ithaca Sailors', 'War Veterans', 'Brothers in Arms'],
    powers: [
      'Naval Combat',
      'Rowing Mastery',
      'Survival Skills',
      'Tactical Formation',
      'Weapon Proficiency',
      'Loyalty to Captain'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'crew', 
        description: 'Captain and leader they follow through all dangers' 
      },
      { 
        characterId: 8, 
        characterName: 'Eurylochus', 
        relationshipType: 'crew', 
        description: 'Second-in-command they respect and trust' 
      }
    ]
  }
];

// Cyclops Saga Locations
export interface CyclopsLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance: string;
  type: 'island' | 'cave' | 'shore' | 'mountain';
  features: string[];
}

export const CYCLOPS_LOCATIONS: CyclopsLocation[] = [
  {
    id: 2,
    name: 'Cyclops Island',
    latitude: 37.0625,
    longitude: 22.9492,
    description: 'A mysterious island inhabited by the Cyclops, covered in rolling hills perfect for sheep herding. The island appears peaceful from the sea but hides deadly dangers within.',
    saga: 'Cyclops Saga',
    significance: 'Primary setting where Odysseus encounters Polyphemus',
    type: 'island',
    features: [
      'Rolling Green Hills',
      'Natural Harbors',
      'Sheep Grazing Lands',
      'Rocky Shorelines',
      'Cave Entrances',
      'Fresh Water Springs'
    ]
  },
  {
    id: 21,
    name: 'Polyphemus Cave',
    latitude: 37.0650,
    longitude: 22.9520,
    description: 'The massive cave dwelling of Polyphemus the Cyclops. Filled with sheep, cheese wheels, and the bones of previous victims. The entrance can be sealed with a boulder too heavy for mortals to move.',
    saga: 'Cyclops Saga',
    significance: 'Prison where Odysseus and his crew are trapped',
    type: 'cave',
    features: [
      'Massive Boulder Door',
      'Sheep Pens',
      'Cheese Storage',
      'Fire Pit',
      'Giant Living Quarters',
      'Bone Collections'
    ]
  },
  {
    id: 22,
    name: 'Wine Dark Shore',
    latitude: 37.0600,
    longitude: 22.9450,
    description: 'The beach where Odysseus and his crew first land on the Cyclops Island. Dark volcanic sand meets wine-dark waters, giving an ominous feeling to their arrival.',
    saga: 'Cyclops Saga',
    significance: 'Landing point and eventual escape route',
    type: 'shore',
    features: [
      'Dark Volcanic Sand',
      'Wine-Dark Waters',
      'Natural Harbor',
      'Ship Mooring Points',
      'Driftwood',
      'Seashells and Rocks'
    ]
  },
  {
    id: 23,
    name: 'Sheep Meadows',
    latitude: 37.0675,
    longitude: 22.9500,
    description: 'Vast green meadows where Polyphemus herds his divine sheep. The grass is unnaturally lush and the sheep unusually large, indicating the magical nature of the island.',
    saga: 'Cyclops Saga',
    significance: 'Where the crew first encounters the Cyclops sheep',
    type: 'mountain',
    features: [
      'Lush Green Grass',
      'Divine Sheep Flocks',
      'Shepherd Paths',
      'Grazing Areas',
      'Natural Springs',
      'Wildflowers'
    ]
  }
];

// Cyclops Saga Songs
export const CYCLOPS_SONGS: Song[] = [
  {
    id: 201,
    title: 'Polyphemus',
    trackNumber: 6,
    description: 'Odysseus and his crew discover the cave of Polyphemus and make a terrible mistake by taking his food and wine, awakening the wrathful Cyclops.',
    durationSeconds: 200, // 3:20
    themes: ['Discovery', 'Hubris', 'First Contact', 'Danger'],
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'Odysseus encounters the terrifying Cyclops Polyphemus',
      releaseDate: '2023-12-25',
      episodeCount: 4,
      genres: ['Epic Musical', 'Rock Opera', 'Mythological'],
      themes: ['Cleverness vs Strength', 'Survival', 'Divine Punishment'],
      inspirations: ['Homer\'s Odyssey', 'Greek Mythology'],
      totalDurationSeconds: 936 // Total of all 4 songs
    },
    characters: [
      {
        id: 1,
        name: 'Odysseus',
        characterType: 'King',
        description: 'Leader exploring the mysterious cave',
        isProtagonist: true
      },
      {
        id: 6,
        name: 'Polyphemus',
        characterType: 'Cyclops',
        description: 'The giant awakening to find intruders',
        isProtagonist: false
      },
      {
        id: 10,
        name: 'Odysseus Crew',
        characterType: 'Sailors',
        description: 'Warriors discovering the Cyclops lair',
        isProtagonist: false
      }
    ],
    audioUrl: 'https://example.com/audio/polyphemus.mp3',
    youtubeUrl: 'https://youtube.com/watch?v=polyphemus',
    isReleased: true,
    perspective: 'Odysseus (curious explorer)',
    narrativeContext: 'The crew discovers Polyphemus\'s cave and makes the fateful decision to take his food and wine, setting up the deadly confrontation to come.'
  },
  {
    id: 202,
    title: 'Survive',
    trackNumber: 7,
    description: 'Trapped in the cave with the monstrous Cyclops, Odysseus must use all his cunning to keep his men alive as Polyphemus begins hunting them.',
    durationSeconds: 252, // 4:12
    themes: ['Survival', 'Strategy', 'Fear', 'Leadership'],
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'Odysseus encounters the terrifying Cyclops Polyphemus',
      releaseDate: '2023-12-25',
      episodeCount: 4,
      genres: ['Epic Musical', 'Rock Opera', 'Mythological'],
      themes: ['Cleverness vs Strength', 'Survival', 'Divine Punishment'],
      inspirations: ['Homer\'s Odyssey', 'Greek Mythology'],
      totalDurationSeconds: 936
    },
    characters: [
      {
        id: 1,
        name: 'Odysseus',
        characterType: 'King',
        description: 'Strategist fighting for his crew\'s survival',
        isProtagonist: true
      },
      {
        id: 6,
        name: 'Polyphemus',
        characterType: 'Cyclops',
        description: 'Monstrous hunter stalking his prey',
        isProtagonist: false
      },
      {
        id: 9,
        name: 'Polites',
        characterType: 'Sailor',
        description: 'Optimistic friend facing mortal danger',
        isProtagonist: false
      },
      {
        id: 10,
        name: 'Odysseus Crew',
        characterType: 'Sailors',
        description: 'Trapped warriors fighting for their lives',
        isProtagonist: false
      }
    ],
    audioUrl: 'https://example.com/audio/survive.mp3',
    youtubeUrl: 'https://youtube.com/watch?v=survive',
    isReleased: true,
    perspective: 'Odysseus & Crew (desperate survivors)',
    narrativeContext: 'The deadly game of cat and mouse begins as Polyphemus hunts the trapped sailors, killing and eating some while Odysseus desperately tries to save his remaining men.'
  },
  {
    id: 203,
    title: 'Remember Them',
    trackNumber: 8,
    description: 'After losing Polites and other crew members to the Cyclops, Odysseus vows to remember the fallen and channels his grief into determination for escape.',
    durationSeconds: 228, // 3:48
    themes: ['Loss', 'Memory', 'Grief', 'Determination', 'Sacrifice'],
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'Odysseus encounters the terrifying Cyclops Polyphemus',
      releaseDate: '2023-12-25',
      episodeCount: 4,
      genres: ['Epic Musical', 'Rock Opera', 'Mythological'],
      themes: ['Cleverness vs Strength', 'Survival', 'Divine Punishment'],
      inspirations: ['Homer\'s Odyssey', 'Greek Mythology'],
      totalDurationSeconds: 936
    },
    characters: [
      {
        id: 1,
        name: 'Odysseus',
        characterType: 'King',
        description: 'Grieving leader honoring his fallen friends',
        isProtagonist: true
      },
      {
        id: 9,
        name: 'Polites',
        characterType: 'Sailor',
        description: 'Best friend whose death changes everything',
        isProtagonist: false
      },
      {
        id: 10,
        name: 'Odysseus Crew',
        characterType: 'Sailors',
        description: 'Fallen and surviving warriors',
        isProtagonist: false
      }
    ],
    audioUrl: 'https://example.com/audio/remember-them.mp3',
    youtubeUrl: 'https://youtube.com/watch?v=remember-them',
    isReleased: true,
    perspective: 'Odysseus (grieving leader)',
    narrativeContext: 'A turning point where Odysseus mourns the death of Polites and other crew members, transforming his approach from mercy to ruthless pragmatism.'
  },
  {
    id: 204,
    title: 'My Goodbye',
    trackNumber: 9,
    description: 'Athena, disappointed by Odysseus\'s newfound ruthlessness and his decision to reveal his name to Polyphemus, withdraws her divine protection and guidance.',
    durationSeconds: 275, // 4:35
    themes: ['Divine Disappointment', 'Pride', 'Consequences', 'Abandonment'],
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'Odysseus encounters the terrifying Cyclops Polyphemus',
      releaseDate: '2023-12-25',
      episodeCount: 4,
      genres: ['Epic Musical', 'Rock Opera', 'Mythological'],
      themes: ['Cleverness vs Strength', 'Survival', 'Divine Punishment'],
      inspirations: ['Homer\'s Odyssey', 'Greek Mythology'],
      totalDurationSeconds: 936
    },
    characters: [
      {
        id: 4,
        name: 'Athena',
        characterType: 'Goddess',
        description: 'Disappointed divine mentor withdrawing support',
        isProtagonist: false
      },
      {
        id: 1,
        name: 'Odysseus',
        characterType: 'King',
        description: 'Prideful king making a fatal mistake',
        isProtagonist: true
      }
    ],
    audioUrl: 'https://example.com/audio/my-goodbye.mp3',
    youtubeUrl: 'https://youtube.com/watch?v=my-goodbye',
    isReleased: true,
    perspective: 'Athena (disappointed goddess)',
    narrativeContext: 'The devastating moment when Athena abandons Odysseus after he reveals his true name to Polyphemus, ensuring Poseidon\'s wrath will follow them.'
  }
];

// Cyclops Saga Events
export const CYCLOPS_EVENTS: ApiEvent[] = [
  {
    id: 201,
    title: 'Landing on the Cyclops Island',
    description: 'Odysseus and his crew, sailing home from Troy, spot a mysterious island with lush green meadows and decide to investigate. They land on the wine-dark shore, drawn by the promise of food and fresh water.',
    sequenceOrder: 1,
    eventTimestamp: '1184-08-15T10:00:00Z',
    location: {
      id: 22,
      name: 'Wine Dark Shore',
      latitude: 37.0600,
      longitude: 22.9450,
      description: 'The beach where Odysseus first lands on Cyclops Island',
      saga: 'Cyclops Saga',
      significance: 'Landing point for the adventure'
    },
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'The encounter with Polyphemus the Cyclops'
    },
    characters: [
      {
        id: 1,
        name: 'Odysseus',
        description: 'Captain leading the exploration',
        characterType: 'King',
        isProtagonist: true
      },
      {
        id: 10,
        name: 'Odysseus Crew',
        description: 'Sailors following their captain to the island',
        characterType: 'Sailors',
        isProtagonist: false
      }
    ],
    songs: [
      {
        id: 201,
        title: 'Polyphemus',
        trackNumber: 6,
        durationSeconds: 200
      }
    ],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 202,
    title: 'Discovery of the Cyclops Cave',
    description: 'Exploring the island, Odysseus and twelve of his men discover a massive cave filled with cheese wheels, sheep, and signs of a giant inhabitant. Despite warnings, they decide to wait and meet the cave\'s owner.',
    sequenceOrder: 2,
    eventTimestamp: '1184-08-15T14:30:00Z',
    location: {
      id: 21,
      name: 'Polyphemus Cave',
      latitude: 37.0650,
      longitude: 22.9520,
      description: 'The dwelling of Polyphemus filled with sheep and provisions',
      saga: 'Cyclops Saga',
      significance: 'The trap that changes everything'
    },
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'The encounter with Polyphemus the Cyclops'
    },
    characters: [
      {
        id: 1,
        name: 'Odysseus',
        description: 'Curious leader making a fateful decision',
        characterType: 'King',
        isProtagonist: true
      },
      {
        id: 9,
        name: 'Polites',
        description: 'Optimistic friend advocating for peaceful contact',
        characterType: 'Sailor',
        isProtagonist: false
      }
    ],
    songs: [
      {
        id: 201,
        title: 'Polyphemus',
        trackNumber: 6,
        durationSeconds: 200
      }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 203,
    title: 'Polyphemus Returns Home',
    description: 'The massive Cyclops Polyphemus returns to his cave with his flock of sheep, trapping Odysseus and his men inside by sealing the entrance with a boulder no mortal could move.',
    sequenceOrder: 3,
    eventTimestamp: '1184-08-15T18:00:00Z',
    location: {
      id: 21,
      name: 'Polyphemus Cave',
      latitude: 37.0650,
      longitude: 22.9520,
      description: 'The Cyclops\' home becomes a prison',
      saga: 'Cyclops Saga',
      significance: 'The point of no return'
    },
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'The encounter with Polyphemus the Cyclops'
    },
    characters: [
      {
        id: 6,
        name: 'Polyphemus',
        description: 'The giant shepherd discovering intruders in his home',
        characterType: 'Cyclops',
        isProtagonist: false
      },
      {
        id: 1,
        name: 'Odysseus',
        description: 'Trapped leader realizing the magnitude of danger',
        characterType: 'King',
        isProtagonist: true
      }
    ],
    songs: [
      {
        id: 202,
        title: 'Survive',
        trackNumber: 7,
        durationSeconds: 252
      }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 204,
    title: 'The Death of Polites',
    description: 'Despite Polites\' attempts at peaceful communication, the savage Polyphemus kills and eats him along with other crew members, shattering Odysseus\' faith in mercy and diplomacy.',
    sequenceOrder: 4,
    eventTimestamp: '1184-08-15T19:30:00Z',
    location: {
      id: 21,
      name: 'Polyphemus Cave',
      latitude: 37.0650,
      longitude: 22.9520,
      description: 'Scene of brutal violence and loss',
      saga: 'Cyclops Saga',
      significance: 'The moment that changes Odysseus forever'
    },
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'The encounter with Polyphemus the Cyclops'
    },
    characters: [
      {
        id: 9,
        name: 'Polites',
        description: 'Optimistic sailor whose death marks a turning point',
        characterType: 'Sailor',
        isProtagonist: false
      },
      {
        id: 6,
        name: 'Polyphemus',
        description: 'Brutal Cyclops showing no mercy to intruders',
        characterType: 'Cyclops',
        isProtagonist: false
      },
      {
        id: 1,
        name: 'Odysseus',
        description: 'Leader watching his best friend die',
        characterType: 'King',
        isProtagonist: true
      }
    ],
    songs: [
      {
        id: 202,
        title: 'Survive',
        trackNumber: 7,
        durationSeconds: 252
      },
      {
        id: 203,
        title: 'Remember Them',
        trackNumber: 8,
        durationSeconds: 228
      }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 205,
    title: 'The Wine and the Plan',
    description: 'Odysseus offers Polyphemus strong wine to make him drunk, while secretly planning to blind the Cyclops with a sharpened stake. The plan requires precise timing and courage.',
    sequenceOrder: 5,
    eventTimestamp: '1184-08-16T20:00:00Z',
    location: {
      id: 21,
      name: 'Polyphemus Cave',
      latitude: 37.0650,
      longitude: 22.9520,
      description: 'The scene of Odysseus\' clever stratagem',
      saga: 'Cyclops Saga',
      significance: 'The turning point of the battle'
    },
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'The encounter with Polyphemus the Cyclops'
    },
    characters: [
      {
        id: 1,
        name: 'Odysseus',
        description: 'Cunning strategist executing a desperate plan',
        characterType: 'King',
        isProtagonist: true
      },
      {
        id: 6,
        name: 'Polyphemus',
        description: 'Cyclops being deceived by wine and cunning',
        characterType: 'Cyclops',
        isProtagonist: false
      },
      {
        id: 10,
        name: 'Odysseus Crew',
        description: 'Surviving sailors assisting in the plan',
        characterType: 'Sailors',
        isProtagonist: false
      }
    ],
    songs: [
      {
        id: 202,
        title: 'Survive',
        trackNumber: 7,
        durationSeconds: 252
      }
    ],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 206,
    title: 'Blinding of Polyphemus',
    description: 'Odysseus and his remaining men blind the sleeping Cyclops with a burning stake, causing Polyphemus to cry out in agony and rage, but the other Cyclopes dismiss his cries when he says "Nobody" hurt him.',
    sequenceOrder: 6,
    eventTimestamp: '1184-08-16T22:00:00Z',
    location: {
      id: 21,
      name: 'Polyphemus Cave',
      latitude: 37.0650,
      longitude: 22.9520,
      description: 'The scene of the legendary blinding',
      saga: 'Cyclops Saga',
      significance: 'The act that seals their fate'
    },
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'The encounter with Polyphemus the Cyclops'
    },
    characters: [
      {
        id: 1,
        name: 'Odysseus',
        description: 'Hero executing the blinding with his men',
        characterType: 'King',
        isProtagonist: true
      },
      {
        id: 6,
        name: 'Polyphemus',
        description: 'Cyclops suffering the loss of his sight',
        characterType: 'Cyclops',
        isProtagonist: false
      }
    ],
    songs: [
      {
        id: 202,
        title: 'Survive',
        trackNumber: 7,
        durationSeconds: 252
      }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 207,
    title: 'Escape Under the Sheep',
    description: 'Odysseus devises a clever escape plan: his men tie themselves under the bellies of Polyphemus\' sheep. The blind Cyclops feels the tops of the sheep but doesn\'t discover the men hiding underneath.',
    sequenceOrder: 7,
    eventTimestamp: '1184-08-17T06:00:00Z',
    location: {
      id: 21,
      name: 'Polyphemus Cave',
      latitude: 37.0650,
      longitude: 22.9520,
      description: 'The scene of the ingenious escape',
      saga: 'Cyclops Saga',
      significance: 'Proof of Odysseus\' legendary cunning'
    },
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'The encounter with Polyphemus the Cyclops'
    },
    characters: [
      {
        id: 1,
        name: 'Odysseus',
        description: 'Mastermind of the sheep escape plan',
        characterType: 'King',
        isProtagonist: true
      },
      {
        id: 10,
        name: 'Odysseus Crew',
        description: 'Survivors escaping under divine sheep',
        characterType: 'Sailors',
        isProtagonist: false
      },
      {
        id: 6,
        name: 'Polyphemus',
        description: 'Blind Cyclops being outsmarted',
        characterType: 'Cyclops',
        isProtagonist: false
      }
    ],
    songs: [
      {
        id: 202,
        title: 'Survive',
        trackNumber: 7,
        durationSeconds: 252
      }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 208,
    title: 'The Fatal Boast',
    description: 'Safe on his ship, Odysseus\' pride gets the better of him. He reveals his true name to Polyphemus, abandoning the clever "Nobody" ruse and ensuring that Poseidon will know who to punish.',
    sequenceOrder: 8,
    eventTimestamp: '1184-08-17T08:00:00Z',
    location: {
      id: 22,
      name: 'Wine Dark Shore',
      latitude: 37.0600,
      longitude: 22.9450,
      description: 'The shore where pride seals their doom',
      saga: 'Cyclops Saga',
      significance: 'The mistake that extends their journey by decades'
    },
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'The encounter with Polyphemus the Cyclops'
    },
    characters: [
      {
        id: 1,
        name: 'Odysseus',
        description: 'Prideful king making a devastating mistake',
        characterType: 'King',
        isProtagonist: true
      },
      {
        id: 6,
        name: 'Polyphemus',
        description: 'Cyclops learning his tormentor\'s true identity',
        characterType: 'Cyclops',
        isProtagonist: false
      }
    ],
    songs: [
      {
        id: 203,
        title: 'Remember Them',
        trackNumber: 8,
        durationSeconds: 228
      }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 209,
    title: 'Athena\'s Disappointment',
    description: 'Athena, witnessing Odysseus\' prideful boast and his transformation from merciful hero to ruthless survivor, withdraws her divine protection and guidance, leaving him to face his journey alone.',
    sequenceOrder: 9,
    eventTimestamp: '1184-08-17T09:00:00Z',
    location: {
      id: 22,
      name: 'Wine Dark Shore',
      latitude: 37.0600,
      longitude: 22.9450,
      description: 'Where divine support is lost',
      saga: 'Cyclops Saga',
      significance: 'The moment Odysseus loses his divine mentor'
    },
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'The encounter with Polyphemus the Cyclops'
    },
    characters: [
      {
        id: 4,
        name: 'Athena',
        description: 'Disappointed goddess withdrawing her support',
        characterType: 'Goddess',
        isProtagonist: false
      },
      {
        id: 1,
        name: 'Odysseus',
        description: 'Hero losing his divine mentor through pride',
        characterType: 'King',
        isProtagonist: true
      }
    ],
    songs: [
      {
        id: 204,
        title: 'My Goodbye',
        trackNumber: 9,
        durationSeconds: 275
      }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 210,
    title: 'Polyphemus\' Curse',
    description: 'The blinded Cyclops calls upon his father Poseidon to curse Odysseus, ensuring that his journey home will be long, painful, and filled with loss. This curse sets the foundation for all future suffering.',
    sequenceOrder: 10,
    eventTimestamp: '1184-08-17T10:00:00Z',
    location: {
      id: 2,
      name: 'Cyclops Island',
      latitude: 37.0625,
      longitude: 22.9492,
      description: 'The island where the curse is born',
      saga: 'Cyclops Saga',
      significance: 'The curse that drives the rest of the journey'
    },
    saga: {
      id: 2,
      title: 'The Cyclops Saga',
      description: 'The encounter with Polyphemus the Cyclops'
    },
    characters: [
      {
        id: 6,
        name: 'Polyphemus',
        description: 'Cyclops calling for divine vengeance from his father',
        characterType: 'Cyclops',
        isProtagonist: false
      },
      {
        id: 5,
        name: 'Poseidon',
        description: 'God of the sea who will answer his son\'s call',
        characterType: 'God',
        isProtagonist: false
      }
    ],
    songs: [
      {
        id: 204,
        title: 'My Goodbye',
        trackNumber: 9,
        durationSeconds: 275
      }
    ],
    eventContext: {
      importance: 'legendary'
    }
  }
];

// Export comprehensive Cyclops Saga data
export const CYCLOPS_SAGA_SEED_DATA = {
  characters: CYCLOPS_CHARACTERS,
  locations: CYCLOPS_LOCATIONS,
  songs: CYCLOPS_SONGS,
  events: CYCLOPS_EVENTS,
  metadata: {
    sagaId: 'cyclops',
    sagaName: 'The Cyclops Saga',
    totalSongs: 4,
    totalEvents: 10,
    totalCharacters: 3,
    totalLocations: 4,
    releaseDate: '2023-12-25',
    significance: 'The saga that transforms Odysseus from merciful hero to ruthless survivor'
  }
};
