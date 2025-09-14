/**
 * TroySagaSeedData - P3 Implementation
 * Comprehensive seed data for Troy Saga including the end of the Trojan War, moral dilemmas, and the beginning of Odysseus's journey
 * 
 * Based on EPIC: The Musical by Jorge Rivera-Herrans
 * Focus: War's end, moral choices, divine guidance, and the start of the epic journey home
 */

import { Song } from '../components/Audio/SongList';
import { Character, ApiEvent } from './EventService';

// Troy Location Interface
export interface TroyLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance: string;
  type: 'city_ruins' | 'palace_chambers' | 'harbor_departure' | 'battlefield' | 'divine_realm';
  features: string[];
  troyProperties?: string[];
  warContext?: string;
  strategicValue?: string;
}

// Troy Saga Characters
export const TROY_CHARACTERS: Character[] = [
  {
    id: 1,
    name: 'Odysseus',
    description: 'The clever King of Ithaca, architect of the Trojan Horse strategy and protagonist of the epic journey. At Troy\'s end, he faces his first moral test that will define his character throughout the odyssey.',
    characterType: 'King',
    isProtagonist: true,
    aliases: ['King of Ithaca', 'Son of Laertes', 'The Strategist', 'Hero of Troy'],
    powers: [
      'Strategic Genius',
      'Leadership',
      'Divine Favor (Athena)',
      'Cunning Intelligence',
      'Warrior Skills',
      'Diplomatic Wisdom',
      'Problem Solving'
    ],
    relationships: [
      { 
        characterId: 2, 
        characterName: 'Athena', 
        relationshipType: 'mentor', 
        description: 'Divine patron goddess who guides and challenges him' 
      },
      { 
        characterId: 8, 
        characterName: 'Eurylochus', 
        relationshipType: 'friend', 
        description: 'Loyal second-in-command and brother-in-law' 
      },
      { 
        characterId: 9, 
        characterName: 'Polites', 
        relationshipType: 'friend', 
        description: 'Optimistic best friend and moral compass' 
      },
      { 
        characterId: 19, 
        characterName: 'Infant Prince of Troy', 
        relationshipType: 'victim', 
        description: 'Innocent child whose fate tests Odysseus\'s moral boundaries' 
      }
    ]
  },
  {
    id: 2,
    name: 'Athena',
    description: 'Goddess of wisdom and warfare, Odysseus\'s divine patron who guided him to victory at Troy. She appears to test and guide him through moral dilemmas while offering divine wisdom and strategic counsel.',
    characterType: 'Goddess',
    isProtagonist: false,
    aliases: ['Goddess of Wisdom', 'Grey-Eyed Athena', 'Divine Strategist', 'Patron of Heroes'],
    powers: [
      'Divine Wisdom',
      'Strategic Warfare',
      'Shape-shifting',
      'Prophecy',
      'Divine Protection',
      'Immortal Knowledge',
      'Battle Prowess'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'mentor', 
        description: 'Mortal hero she guides and challenges to grow' 
      },
      { 
        characterId: 20, 
        characterName: 'Zeus', 
        relationshipType: 'family', 
        description: 'Father god whose will she sometimes questions' 
      }
    ]
  },
  {
    id: 8,
    name: 'Eurylochus',
    description: 'Odysseus\'s second-in-command and brother-in-law, a pragmatic warrior who values crew safety above all else. His practical nature often conflicts with Odysseus\'s more idealistic or strategic choices.',
    characterType: 'Sailor',
    isProtagonist: false,
    aliases: ['Second-in-Command', 'Brother-in-Law', 'Voice of Caution', 'Practical Warrior'],
    powers: [
      'Military Leadership',
      'Combat Skills',
      'Crew Loyalty',
      'Practical Wisdom',
      'Protective Instincts',
      'Honest Counsel'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'friend', 
        description: 'King and brother-in-law whose decisions he questions when they endanger the crew' 
      },
      { 
        characterId: 10, 
        characterName: 'Odysseus Crew', 
        relationshipType: 'leader', 
        description: 'Fellow sailors whose welfare is his primary concern' 
      }
    ]
  },
  {
    id: 9,
    name: 'Polites',
    description: 'Odysseus\'s best friend and the heart of the crew, known for his optimistic outlook and belief in showing mercy and kindness. He represents the moral compass that Odysseus struggles to maintain.',
    characterType: 'Sailor',
    isProtagonist: false,
    aliases: ['The Optimist', 'Heart of the Crew', 'Best Friend', 'Voice of Mercy'],
    powers: [
      'Emotional Support',
      'Moral Guidance',
      'Crew Morale',
      'Compassionate Wisdom',
      'Loyalty',
      'Peaceful Resolution'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'friend', 
        description: 'Best friend and moral compass whose optimism balances Odysseus\'s strategic mind' 
      },
      { 
        characterId: 10, 
        characterName: 'Odysseus Crew', 
        relationshipType: 'peer', 
        description: 'Beloved crew member who maintains morale and hope' 
      }
    ]
  },
  {
    id: 10,
    name: 'Odysseus Crew',
    description: 'The 600 loyal sailors from Ithaca who followed Odysseus to Troy and now seek to return home. They represent the collective hope and burden of leadership that weighs on Odysseus throughout his journey.',
    characterType: 'Sailors',
    isProtagonist: false,
    aliases: ['Men of Ithaca', 'The 600', 'Loyal Sailors', 'Warriors of the Fleet'],
    powers: [
      'Collective Strength',
      'Naval Skills',
      'Combat Experience',
      'Loyalty to Odysseus',
      'Survival Instincts',
      'Brotherhood'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'follower', 
        description: 'King and commander whose leadership they trust despite growing hardships' 
      },
      { 
        characterId: 8, 
        characterName: 'Eurylochus', 
        relationshipType: 'follower', 
        description: 'Second-in-command who advocates for their safety and welfare' 
      }
    ]
  },
  {
    id: 19,
    name: 'Infant Prince of Troy',
    description: 'The innocent baby son of Hector, heir to the Trojan throne. His fate represents the moral crossroads that will define Odysseus\'s character - the choice between mercy and the harsh necessities of war.',
    characterType: 'Royal Infant',
    isProtagonist: false,
    aliases: ['Astyanax', 'Son of Hector', 'Heir of Troy', 'The Innocent'],
    powers: [
      'Innocent Purity',
      'Future Threat (Prophesied)',
      'Moral Test',
      'Symbol of Hope/Vengeance'
    ],
    relationships: [
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'victim', 
        description: 'The king who must decide his fate based on prophecy' 
      },
      { 
        characterId: 2, 
        characterName: 'Athena', 
        relationshipType: 'subject', 
        description: 'Goddess who presents the moral dilemma of his fate' 
      }
    ]
  },
  {
    id: 20,
    name: 'Zeus',
    description: 'King of the gods who influences mortal affairs from Olympus. His divine will and prophecies shape the moral choices that heroes must face, including the fate of Troy\'s survivors.',
    characterType: 'God',
    isProtagonist: false,
    aliases: ['King of the Gods', 'Thunder Bearer', 'Divine Ruler', 'Father of Gods'],
    powers: [
      'Divine Authority',
      'Prophecy Control',
      'Weather Manipulation',
      'Immortal Knowledge',
      'Universal Judgment',
      'Lightning Powers'
    ],
    relationships: [
      { 
        characterId: 2, 
        characterName: 'Athena', 
        relationshipType: 'family', 
        description: 'Daughter goddess who sometimes questions his divine will' 
      },
      { 
        characterId: 1, 
        characterName: 'Odysseus', 
        relationshipType: 'judge', 
        description: 'Mortal hero whose actions he observes and judges' 
      }
    ]
  }
];

// Troy Saga Locations
export const TROY_LOCATIONS: TroyLocation[] = [
  {
    id: 1,
    name: 'Troy (Ruins)',
    latitude: 39.9575,
    longitude: 26.2387,
    description: 'The once-mighty city of Troy, now fallen after ten years of siege. The burning ruins stand as testament to the cost of war and the end of an era, while survivors face uncertain fates.',
    saga: 'Troy Saga',
    significance: 'The fallen city that marks the end of the Trojan War',
    type: 'city_ruins',
    features: [
      'Burning Buildings',
      'Fallen Walls',
      'Royal Palace Ruins',
      'Temple Remains',
      'Trojan Horse Monument',
      'Survivor Camps'
    ],
    troyProperties: [
      'War Aftermath',
      'Moral Crossroads',
      'Divine Judgment',
      'Strategic Victory',
      'Cultural Destruction'
    ],
    warContext: 'Final day of the ten-year siege',
    strategicValue: 'Conquered stronghold controlling the Hellespont'
  },
  {
    id: 2,
    name: 'Trojan Palace Chambers',
    latitude: 39.9580,
    longitude: 26.2390,
    description: 'The inner chambers of Troy\'s royal palace where the infant prince is found. These sacred spaces now serve as the setting for impossible moral choices that will define the future.',
    saga: 'Troy Saga',
    significance: 'Site of the moral dilemma that shapes Odysseus\'s character',
    type: 'palace_chambers',
    features: [
      'Royal Nursery',
      'Marble Halls',
      'Sacred Altars',
      'Royal Portraits',
      'Hidden Passages',
      'Divine Shrines'
    ],
    troyProperties: [
      'Moral Testing Ground',
      'Innocent Sanctuary',
      'Divine Presence',
      'Prophetic Significance',
      'Royal Heritage'
    ],
    warContext: 'Final refuge of Trojan royalty',
    strategicValue: 'Symbol of Trojan legitimacy and future threat'
  },
  {
    id: 3,
    name: 'Troy Harbor',
    latitude: 39.9550,
    longitude: 26.2350,
    description: 'The harbor where the Greek fleet prepares to depart for home after their long campaign. Ships are loaded with treasure and soldiers eager to return, but the gods have other plans for some.',
    saga: 'Troy Saga',
    significance: 'Departure point for the epic journey home',
    type: 'harbor_departure',
    features: [
      'Greek Fleet',
      'Loading Docks',
      'Treasure Ships',
      'Victory Celebrations',
      'Naval Preparations',
      'Sacred Offerings'
    ],
    troyProperties: [
      'Journey Beginning',
      'Victory Celebration',
      'Divine Blessing Needed',
      'Strategic Departure',
      'Fleet Assembly'
    ],
    warContext: 'Post-victory naval preparations',
    strategicValue: 'Strategic departure point for the return voyage'
  }
];

// Troy Saga Songs
export const TROY_SONGS: Song[] = [
  {
    id: 1,
    title: 'The Horse and the Infant',
    trackNumber: 1,
    description: 'The fall of Troy through the Trojan Horse strategy, followed by the discovery of the infant prince and the prophecy that he will seek revenge if allowed to live',
    durationSeconds: 193, // 3:13
    themes: ['War and Victory', 'Moral Dilemma', 'Prophecy and Fate', 'Innocent vs Necessity'],
    saga: {
      id: 1,
      title: 'Troy Saga',
      description: 'The end of the Trojan War and the beginning of the journey home',
      releaseDate: '2022-12-25',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'War Drama'],
      themes: ['War', 'Morality', 'Leadership', 'Divine Will'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Trojan War Cycle'],
      totalDurationSeconds: 945 // Total duration of all Troy Saga songs
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 19, name: 'Infant Prince of Troy', characterType: 'Royal Infant', isProtagonist: false },
      { id: 20, name: 'Zeus', characterType: 'God', isProtagonist: false }
    ],
    perspective: 'Odysseus facing the moral dilemma of the infant\'s fate',
    narrativeContext: 'Victory at Troy leads to an impossible moral choice'
  },
  {
    id: 2,
    title: 'Just a Man',
    trackNumber: 2,
    description: 'Odysseus struggles with the weight of leadership and the impossible choice between mercy and the safety of his people, ultimately making the heartbreaking decision',
    durationSeconds: 201, // 3:21
    themes: ['Leadership Burden', 'Moral Conflict', 'Human Limitation', 'Sacrifice for the Greater Good'],
    saga: {
      id: 1,
      title: 'Troy Saga',
      description: 'The end of the Trojan War and the beginning of the journey home',
      releaseDate: '2022-12-25',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'War Drama'],
      themes: ['War', 'Morality', 'Leadership', 'Divine Will'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Trojan War Cycle'],
      totalDurationSeconds: 945
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 19, name: 'Infant Prince of Troy', characterType: 'Royal Infant', isProtagonist: false }
    ],
    perspective: 'Odysseus\'s internal struggle with an impossible moral choice',
    narrativeContext: 'A king confronts the brutal necessities of leadership'
  },
  {
    id: 3,
    title: 'Full Speed Ahead',
    trackNumber: 3,
    description: 'The Greek fleet sets sail from Troy with high spirits and optimism for the journey home, unaware of the trials that await them on the wine-dark sea',
    durationSeconds: 186, // 3:06
    themes: ['Journey Beginning', 'Optimism and Hope', 'Camaraderie', 'Naval Adventure'],
    saga: {
      id: 1,
      title: 'Troy Saga',
      description: 'The end of the Trojan War and the beginning of the journey home',
      releaseDate: '2022-12-25',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'War Drama'],
      themes: ['War', 'Morality', 'Leadership', 'Divine Will'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Trojan War Cycle'],
      totalDurationSeconds: 945
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 9, name: 'Polites', characterType: 'Sailor', isProtagonist: false },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    perspective: 'The crew\'s excitement and hope for the journey home',
    narrativeContext: 'Departure from Troy with high morale and expectations'
  },
  {
    id: 4,
    title: 'Open Arms',
    trackNumber: 4,
    description: 'Polites encourages kindness and openness as they encounter new lands and peoples, advocating for mercy and friendship over suspicion and violence',
    durationSeconds: 180, // 3:00
    themes: ['Mercy and Kindness', 'Trust vs Suspicion', 'Moral Philosophy', 'Friendship'],
    saga: {
      id: 1,
      title: 'Troy Saga',
      description: 'The end of the Trojan War and the beginning of the journey home',
      releaseDate: '2022-12-25',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'War Drama'],
      themes: ['War', 'Morality', 'Leadership', 'Divine Will'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Trojan War Cycle'],
      totalDurationSeconds: 945
    },
    characters: [
      { id: 9, name: 'Polites', characterType: 'Sailor', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    perspective: 'Polites advocating for mercy and open-hearted approaches',
    narrativeContext: 'Moral guidance for approaching unknown peoples and situations'
  },
  {
    id: 5,
    title: 'Warrior of the Mind',
    trackNumber: 5,
    description: 'Athena reveals herself to Odysseus and explains their divine partnership, celebrating his strategic mind while setting expectations for the challenges ahead',
    durationSeconds: 185, // 3:05
    themes: ['Divine Mentorship', 'Wisdom and Strategy', 'Hero\'s Calling', 'Intellectual Partnership'],
    saga: {
      id: 1,
      title: 'Troy Saga',
      description: 'The end of the Trojan War and the beginning of the journey home',
      releaseDate: '2022-12-25',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'War Drama'],
      themes: ['War', 'Morality', 'Leadership', 'Divine Will'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Trojan War Cycle'],
      totalDurationSeconds: 945
    },
    characters: [
      { id: 2, name: 'Athena', characterType: 'Goddess', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    perspective: 'Athena establishing her relationship with Odysseus',
    narrativeContext: 'Divine revelation and partnership for the journey ahead'
  }
];

// Troy Saga Events
export const TROY_EVENTS: ApiEvent[] = [
  {
    id: 1,
    title: 'The Fall of Troy',
    description: 'After ten years of siege, Troy falls to the Greeks through Odysseus\'s Trojan Horse strategy. The city burns as Greek soldiers emerge from their wooden hiding place to claim victory.',
    sequenceOrder: 1,
    eventTimestamp: '1184-04-24T06:00:00Z',
    location: {
      id: 1,
      name: 'Troy (Ruins)',
      latitude: 39.9575,
      longitude: 26.2387,
      description: 'The once-mighty city of Troy, now fallen after ten years of siege',
      saga: 'Troy Saga',
      significance: 'The fallen city that marks the end of the Trojan War'
    },
    saga: {
      id: 1,
      title: 'Troy Saga',
      description: 'The end of the Trojan War and the beginning of the journey home'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 1, title: 'The Horse and the Infant', trackNumber: 1, durationSeconds: 193 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 2,
    title: 'Discovery of the Infant Prince',
    description: 'In the royal chambers of Troy, Odysseus discovers the infant son of Hector, heir to the Trojan throne. The innocent child represents both hope and future threat.',
    sequenceOrder: 2,
    eventTimestamp: '1184-04-24T08:00:00Z',
    location: {
      id: 2,
      name: 'Trojan Palace Chambers',
      latitude: 39.9580,
      longitude: 26.2390,
      description: 'The inner chambers of Troy\'s royal palace where moral choices are made',
      saga: 'Troy Saga',
      significance: 'Site of the moral dilemma that shapes Odysseus\'s character'
    },
    saga: {
      id: 1,
      title: 'Troy Saga',
      description: 'The end of the Trojan War and the beginning of the journey home'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 19, name: 'Infant Prince of Troy', characterType: 'Royal Infant', isProtagonist: false }
    ],
    songs: [
      { id: 1, title: 'The Horse and the Infant', trackNumber: 1, durationSeconds: 193 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 3,
    title: 'The Prophecy of Revenge',
    description: 'Divine prophecy reveals that the infant prince, if allowed to live, will grow up to seek vengeance for Troy\'s destruction. This creates an impossible moral dilemma for Odysseus.',
    sequenceOrder: 3,
    eventTimestamp: '1184-04-24T09:00:00Z',
    location: {
      id: 2,
      name: 'Trojan Palace Chambers',
      latitude: 39.9580,
      longitude: 26.2390,
      description: 'The inner chambers of Troy\'s royal palace where moral choices are made',
      saga: 'Troy Saga',
      significance: 'Site of the moral dilemma that shapes Odysseus\'s character'
    },
    saga: {
      id: 1,
      title: 'Troy Saga',
      description: 'The end of the Trojan War and the beginning of the journey home'
    },
    characters: [
      { id: 20, name: 'Zeus', characterType: 'God', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 19, name: 'Infant Prince of Troy', characterType: 'Royal Infant', isProtagonist: false }
    ],
    songs: [
      { id: 1, title: 'The Horse and the Infant', trackNumber: 1, durationSeconds: 193 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 4,
    title: 'The Impossible Choice',
    description: 'Odysseus wrestles with the weight of leadership and the impossible choice between mercy for an innocent child and protecting his people from future vengeance.',
    sequenceOrder: 4,
    eventTimestamp: '1184-04-24T10:00:00Z',
    location: {
      id: 2,
      name: 'Trojan Palace Chambers',
      latitude: 39.9580,
      longitude: 26.2390,
      description: 'The inner chambers of Troy\'s royal palace where moral choices are made',
      saga: 'Troy Saga',
      significance: 'Site of the moral dilemma that shapes Odysseus\'s character'
    },
    saga: {
      id: 1,
      title: 'Troy Saga',
      description: 'The end of the Trojan War and the beginning of the journey home'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 19, name: 'Infant Prince of Troy', characterType: 'Royal Infant', isProtagonist: false }
    ],
    songs: [
      { id: 2, title: 'Just a Man', trackNumber: 2, durationSeconds: 201 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 5,
    title: 'The Heartbreaking Decision',
    description: 'After agonizing internal struggle, Odysseus makes the brutal choice to eliminate the future threat, forever changing his character and accepting the burden of leadership.',
    sequenceOrder: 5,
    eventTimestamp: '1184-04-24T11:00:00Z',
    location: {
      id: 2,
      name: 'Trojan Palace Chambers',
      latitude: 39.9580,
      longitude: 26.2390,
      description: 'The inner chambers of Troy\'s royal palace where moral choices are made',
      saga: 'Troy Saga',
      significance: 'Site of the moral dilemma that shapes Odysseus\'s character'
    },
    saga: {
      id: 1,
      title: 'Troy Saga',
      description: 'The end of the Trojan War and the beginning of the journey home'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 19, name: 'Infant Prince of Troy', characterType: 'Royal Infant', isProtagonist: false }
    ],
    songs: [
      { id: 2, title: 'Just a Man', trackNumber: 2, durationSeconds: 201 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 6,
    title: 'Departure from Troy',
    description: 'The Greek fleet prepares to leave Troy behind, with high spirits and optimism for the journey home. The 600 men under Odysseus\'s command are eager to see their families again.',
    sequenceOrder: 6,
    eventTimestamp: '1184-04-24T16:00:00Z',
    location: {
      id: 3,
      name: 'Troy Harbor',
      latitude: 39.9550,
      longitude: 26.2350,
      description: 'The harbor where the Greek fleet prepares to depart for home',
      saga: 'Troy Saga',
      significance: 'Departure point for the epic journey home'
    },
    saga: {
      id: 1,
      title: 'Troy Saga',
      description: 'The end of the Trojan War and the beginning of the journey home'
    },
    characters: [
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 8, name: 'Eurylochus', characterType: 'Sailor', isProtagonist: false },
      { id: 9, name: 'Polites', characterType: 'Sailor', isProtagonist: false },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 3, title: 'Full Speed Ahead', trackNumber: 3, durationSeconds: 186 }
    ],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 7,
    title: 'Polites\' Philosophy of Mercy',
    description: 'As they sail away from Troy, Polites advocates for approaching new encounters with open arms and kindness, setting up the moral framework that will be tested throughout the journey.',
    sequenceOrder: 7,
    eventTimestamp: '1184-04-25T08:00:00Z',
    location: {
      id: 3,
      name: 'Troy Harbor',
      latitude: 39.9550,
      longitude: 26.2350,
      description: 'The harbor where the Greek fleet prepares to depart for home',
      saga: 'Troy Saga',
      significance: 'Departure point for the epic journey home'
    },
    saga: {
      id: 1,
      title: 'Troy Saga',
      description: 'The end of the Trojan War and the beginning of the journey home'
    },
    characters: [
      { id: 9, name: 'Polites', characterType: 'Sailor', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true },
      { id: 10, name: 'Odysseus Crew', characterType: 'Sailors', isProtagonist: false }
    ],
    songs: [
      { id: 4, title: 'Open Arms', trackNumber: 4, durationSeconds: 180 }
    ],
    eventContext: {
      importance: 'major'
    }
  },
  {
    id: 8,
    title: 'Athena\'s Divine Revelation',
    description: 'The goddess Athena reveals herself to Odysseus, establishing their partnership and explaining her investment in his success as a warrior of the mind rather than brute force.',
    sequenceOrder: 8,
    eventTimestamp: '1184-04-25T12:00:00Z',
    location: {
      id: 3,
      name: 'Troy Harbor',
      latitude: 39.9550,
      longitude: 26.2350,
      description: 'The harbor where the Greek fleet prepares to depart for home',
      saga: 'Troy Saga',
      significance: 'Departure point for the epic journey home'
    },
    saga: {
      id: 1,
      title: 'Troy Saga',
      description: 'The end of the Trojan War and the beginning of the journey home'
    },
    characters: [
      { id: 2, name: 'Athena', characterType: 'Goddess', isProtagonist: false },
      { id: 1, name: 'Odysseus', characterType: 'King', isProtagonist: true }
    ],
    songs: [
      { id: 5, title: 'Warrior of the Mind', trackNumber: 5, durationSeconds: 185 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  }
];

// Troy Saga Metadata
export const TROY_SAGA_METADATA = {
  sagaId: 'troy',
  sagaName: 'Troy Saga',
  totalSongs: 5,
  totalEvents: 8,
  totalCharacters: 6,
  totalLocations: 3,
  releaseDate: '2022-12-25',
  significance: 'The beginning of the epic journey - war\'s end, moral foundations, and the establishment of divine-hero relationships that will define the odyssey'
};

// Complete Troy Saga Seed Data
export const TROY_SAGA_SEED_DATA = {
  characters: TROY_CHARACTERS,
  locations: TROY_LOCATIONS,
  songs: TROY_SONGS,
  events: TROY_EVENTS,
  metadata: TROY_SAGA_METADATA
};

export default TROY_SAGA_SEED_DATA;
