/**
 * IthacaSagaSeedData - P3 Implementation
 * Comprehensive seed data for Ithaca Saga - the violent reckoning and tender reunion
 * 
 * Based on EPIC: The Musical by Jorge Rivera-Herrans
 * Focus: Suitor slaughter, Telemachus as warrior, family reunion, and journey's end
 */

import { Song } from '../components/Audio/SongList';
import { Character, ApiEvent } from './EventService';

// Ithaca Location Interface
export interface IthacaLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  saga: string;
  significance: string;
  type: 'palace_throne_room' | 'palace_armory' | 'royal_bedroom' | 'palace_halls' | 'quick_thought';
  features: string[];
  ithacaProperties?: string[];
  violence?: boolean;
  intimate?: boolean;
}

// Ithaca Saga Characters
export const ITHACA_CHARACTERS: Character[] = [
  {
    id: 27,
    name: 'Odysseus (The Monster)',
    description: 'The king returned home as a ruthless monster, exactly as Tiresias prophesied. No longer the man who left Troy, he systematically slaughters the suitors who threatened his family, showing no mercy to those who would harm Penelope and Telemachus.',
    characterType: 'Monster King',
    isProtagonist: true,
    aliases: ['The Monster', 'King of Ithaca', 'The Returned Warrior', 'Merciless Slaughterer'],
    powers: [
      'Ruthless Efficiency',
      'Strategic Hunting',
      'Master Archer',
      'Palace Knowledge',
      'Merciless Justice',
      'Stealth Combat',
      'Prophetic Fulfillment'
    ],
    relationships: [
      { 
        characterId: 26, 
        characterName: 'Penelope', 
        relationshipType: 'spouse', 
        description: 'Beloved wife who still loves him despite his transformation into a monster' 
      },
      { 
        characterId: 23, 
        characterName: 'Telemachus', 
        relationshipType: 'family', 
        description: 'Son who fights alongside him as Athena\'s new Warrior of the Mind' 
      },
      { 
        characterId: 28, 
        characterName: 'The Suitors', 
        relationshipType: 'enemy', 
        description: 'Parasitic invaders who must die for threatening his family' 
      }
    ]
  },
  {
    id: 28,
    name: 'The Suitors',
    description: 'Arrogant nobles led by Antinous who have invaded Odysseus\'s palace, plotting to kill Telemachus and assault Penelope. They represent entitled corruption that must face the monster\'s wrath.',
    characterType: 'Palace Invaders',
    isProtagonist: false,
    aliases: ['Antinous\'s Gang', 'Palace Parasites', 'Would-be Kings', 'Eurymachus\'s Crew', 'Amphinomus\'s Men', 'Melanthius\'s Allies'],
    powers: [
      'Numerical Advantage',
      'Political Scheming',
      'Violent Plotting',
      'Palace Familiarity',
      'Collective Arrogance',
      'Desperate Fighting'
    ],
    relationships: [
      { 
        characterId: 27, 
        characterName: 'Odysseus (The Monster)', 
        relationshipType: 'enemy', 
        description: 'The returned king who systematically hunts and kills them' 
      },
      { 
        characterId: 26, 
        characterName: 'Penelope', 
        relationshipType: 'unwanted', 
        description: 'Queen they seek to force into marriage and assault' 
      },
      { 
        characterId: 23, 
        characterName: 'Telemachus', 
        relationshipType: 'enemy', 
        description: 'Prince they plot to ambush and murder' 
      }
    ]
  },
  {
    id: 29,
    name: 'Telemachus (Warrior of the Mind)',
    description: 'The prince has grown into Athena\'s new Warrior of the Mind, armed and deadly, fighting alongside his father to reclaim their palace. No longer in his father\'s shadow, he proves himself in brutal combat.',
    characterType: 'Divine Warrior Prince',
    isProtagonist: false,
    aliases: ['Warrior of the Mind', 'Prince of Ithaca', 'Athena\'s Champion', 'Armed Prince'],
    powers: [
      'Athena\'s Blessing',
      'Strategic Combat',
      'Spear Mastery',
      'Divine Wisdom',
      'Warrior Training',
      'Palace Knowledge',
      'Tactical Coordination'
    ],
    relationships: [
      { 
        characterId: 27, 
        characterName: 'Odysseus (The Monster)', 
        relationshipType: 'family', 
        description: 'Father he reunites with after twenty years, fighting alongside as equals' 
      },
      { 
        characterId: 22, 
        characterName: 'Athena', 
        relationshipType: 'divine mentor', 
        description: 'Goddess who made him her new Warrior of the Mind' 
      },
      { 
        characterId: 28, 
        characterName: 'The Suitors', 
        relationshipType: 'enemy', 
        description: 'Invaders who plotted his murder and now face his spear' 
      }
    ]
  }
];

// Ithaca Saga Locations
export const ITHACA_LOCATIONS: IthacaLocation[] = [
  {
    id: 29,
    name: 'The Palace Throne Room',
    latitude: 38.4333,
    longitude: 20.7167,
    description: 'The grand throne room where Penelope set the bow challenge for the suitors. Here, Antinous plotted murder and assault before being shot through the throat by the returned king. Blood now stains the floors.',
    saga: 'Ithaca Saga',
    significance: 'Site of the bow challenge and first suitor death',
    type: 'palace_throne_room',
    features: [
      'Odysseus\'s Mighty Bow',
      'Twelve Axe Heads',
      'Royal Throne',
      'Challenge Arena',
      'Blood-Stained Floor',
      'Antinous\'s Death Site'
    ],
    ithacaProperties: [
      'Bow Challenge Site',
      'First Kill Location',
      'Royal Authority',
      'Justice Beginning',
      'Tiresias Prophecy Fulfillment'
    ],
    violence: true,
    intimate: false
  },
  {
    id: 30,
    name: 'The Palace Halls',
    latitude: 38.4250,
    longitude: 20.7100,
    description: 'The corridors and halls of the palace where the monster hunts. Suitors are dragged into shadows and slaughtered one by one as they scatter in terror, the walls painted red with their blood.',
    saga: 'Ithaca Saga',
    significance: 'Hunting ground where the monster systematically kills the suitors',
    type: 'palace_halls',
    features: [
      'Dark Corridors',
      'Hidden Alcoves',
      'Bloodied Walls',
      'Scattered Bodies',
      'Terror Shadows',
      'Hunting Grounds'
    ],
    ithacaProperties: [
      'Systematic Slaughter',
      'Monster\'s Domain',
      'Fear and Terror',
      'Justice Execution',
      'Palace Reclamation'
    ],
    violence: true,
    intimate: false
  },
  {
    id: 31,
    name: 'The Palace Armory',
    latitude: 38.4200,
    longitude: 20.7200,
    description: 'The weapons room where Telemachus, armed as Athena\'s Warrior of the Mind, kills Amphinomus with a spear thrust. Here, father and son fight side by side as Melanthius meets his brutal end.',
    saga: 'Ithaca Saga',
    significance: 'Battle site where Telemachus proves himself as warrior',
    type: 'palace_armory',
    features: [
      'Weapon Racks',
      'Spears and Swords',
      'Combat Arena',
      'Father-Son Battle Site',
      'Melanthius\'s Death Place',
      'Amphinomus\'s Death Site'
    ],
    ithacaProperties: [
      'Father-Son Unity',
      'Warrior Proving Ground',
      'Tactical Combat',
      'Divine Warrior Training',
      'Family Justice'
    ],
    violence: true,
    intimate: false
  },
  {
    id: 32,
    name: 'The Royal Bedroom',
    latitude: 38.4300,
    longitude: 20.7050,
    description: 'The intimate chamber where Odysseus and Penelope reunite at their wedding bed carved from the olive tree. Here, love proves stronger than the monster\'s transformation, and the journey finally ends.',
    saga: 'Ithaca Saga',
    significance: 'Site of ultimate reunion and journey\'s true end',
    type: 'royal_bedroom',
    features: [
      'Olive Tree Wedding Bed',
      'Carved Bedframe',
      'Private Sanctuary',
      'Love\'s Proving Ground',
      'Journey\'s End',
      'Marriage Renewal'
    ],
    ithacaProperties: [
      'Marriage Test',
      'Love\'s Triumph',
      'Identity Proof',
      'Intimate Reunion',
      'Story\'s True End'
    ],
    violence: false,
    intimate: true
  }
];

// Ithaca Saga Songs
export const ITHACA_SONGS: Song[] = [
  {
    id: 37,
    title: 'The Challenge',
    trackNumber: 1,
    description: 'Penelope sets the bow challenge for the suitors, while Antinous plots murder and assault. The challenge becomes the catalyst for the monster\'s return and terrible justice.',
    durationSeconds: 285, // 4:45
    themes: ['Challenge and Plotting', 'Bow Trial', 'Suitor Corruption', 'Justice Catalyst'],
    saga: {
      id: 9,
      title: 'Ithaca Saga',
      description: 'The violent reckoning and tender reunion',
      releaseDate: '2025-12-31',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Dark Justice'],
      themes: ['Justice', 'Family', 'Violence', 'Reunion'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Justice and Revenge'],
      totalDurationSeconds: 1320 // Total duration of all Ithaca Saga songs
    },
    characters: [
      { id: 26, name: 'Penelope', characterType: 'Queen of Ithaca', isProtagonist: false },
      { id: 28, name: 'The Suitors', characterType: 'Palace Invaders', isProtagonist: false }
    ],
    perspective: 'The challenge that sets the stage for justice',
    narrativeContext: 'Bow challenge and suitor plotting leading to the monster\'s return'
  },
  {
    id: 38,
    title: 'Hold Them Down',
    trackNumber: 2,
    description: 'The suitors plot to ambush Telemachus and assault Penelope, but the monster has returned. Antinous is shot through the throat as the systematic slaughter begins.',
    durationSeconds: 315, // 5:15
    themes: ['Suitor Plotting', 'Monster\'s Return', 'First Kill', 'Justice Begins'],
    saga: {
      id: 9,
      title: 'Ithaca Saga',
      description: 'The violent reckoning and tender reunion',
      releaseDate: '2025-12-31',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Dark Justice'],
      themes: ['Justice', 'Family', 'Violence', 'Reunion'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Justice and Revenge'],
      totalDurationSeconds: 1320
    },
    characters: [
      { id: 28, name: 'The Suitors', characterType: 'Palace Invaders', isProtagonist: false },
      { id: 27, name: 'Odysseus (The Monster)', characterType: 'Monster King', isProtagonist: true }
    ],
    perspective: 'The suitors\' plotting and the monster\'s violent justice',
    narrativeContext: 'Suitor plotting interrupted by the monster\'s deadly return'
  },
  {
    id: 39,
    title: 'Odysseus',
    trackNumber: 3,
    description: 'The monster systematically hunts the suitors through the palace halls, showing no mercy as he fulfills Tiresias\'s prophecy of transformation into something darker.',
    durationSeconds: 270, // 4:30
    themes: ['Monster Hunting', 'Systematic Slaughter', 'No Mercy', 'Prophecy Fulfillment'],
    saga: {
      id: 9,
      title: 'Ithaca Saga',
      description: 'The violent reckoning and tender reunion',
      releaseDate: '2025-12-31',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Dark Justice'],
      themes: ['Justice', 'Family', 'Violence', 'Reunion'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Justice and Revenge'],
      totalDurationSeconds: 1320
    },
    characters: [
      { id: 27, name: 'Odysseus (The Monster)', characterType: 'Monster King', isProtagonist: true },
      { id: 28, name: 'The Suitors', characterType: 'Palace Invaders', isProtagonist: false }
    ],
    perspective: 'The monster methodically hunting and killing the suitors',
    narrativeContext: 'Relentless pursuit and slaughter throughout the palace'
  },
  {
    id: 40,
    title: 'I Can\'t Help But Wonder',
    trackNumber: 4,
    description: 'Telemachus and Odysseus fight side by side in the armory. The prince proves himself as Athena\'s Warrior of the Mind while father and son reunite in battle and tender embrace.',
    durationSeconds: 255, // 4:15
    themes: ['Father-Son Bond', 'Warrior Proving', 'Battle Unity', 'Family Reunion'],
    saga: {
      id: 9,
      title: 'Ithaca Saga',
      description: 'The violent reckoning and tender reunion',
      releaseDate: '2025-12-31',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Dark Justice'],
      themes: ['Justice', 'Family', 'Violence', 'Reunion'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Justice and Revenge'],
      totalDurationSeconds: 1320
    },
    characters: [
      { id: 29, name: 'Telemachus (Warrior of the Mind)', characterType: 'Divine Warrior Prince', isProtagonist: false },
      { id: 27, name: 'Odysseus (The Monster)', characterType: 'Monster King', isProtagonist: true }
    ],
    perspective: 'Father and son fighting together and reuniting after twenty years',
    narrativeContext: 'Battle cooperation and emotional reunion in the armory'
  },
  {
    id: 41,
    title: 'Would You Fall in Love with Me Again',
    trackNumber: 5,
    description: 'Odysseus reunites with Penelope in their bedroom, testing whether she still loves the monster he has become. The wedding bed proves their identity and enduring love as the journey ends.',
    durationSeconds: 195, // 3:15
    themes: ['Marriage Test', 'Enduring Love', 'Identity Proof', 'Journey\'s End'],
    saga: {
      id: 9,
      title: 'Ithaca Saga',
      description: 'The violent reckoning and tender reunion',
      releaseDate: '2025-12-31',
      episodeCount: 5,
      genres: ['Epic', 'Musical Theatre', 'Dark Justice'],
      themes: ['Justice', 'Family', 'Violence', 'Reunion'],
      inspirations: ['The Odyssey by Homer', 'Greek Mythology', 'Justice and Revenge'],
      totalDurationSeconds: 1320
    },
    characters: [
      { id: 27, name: 'Odysseus (The Monster)', characterType: 'Monster King', isProtagonist: true },
      { id: 26, name: 'Penelope', characterType: 'Queen of Ithaca', isProtagonist: false }
    ],
    perspective: 'Intimate reunion testing love\'s endurance through transformation',
    narrativeContext: 'The final tender reunion proving love survives the monster\'s transformation'
  }
];

// Ithaca Saga Events
export const ITHACA_EVENTS: ApiEvent[] = [
  {
    id: 89,
    title: 'The Bow Challenge',
    description: 'Penelope presents the suitors with Odysseus\'s mighty bow, challenging them to string it and shoot through twelve axe heads. The impossible task reveals their unworthiness as none can match the true king\'s strength.',
    sequenceOrder: 1,
    eventTimestamp: '1184-12-01T10:00:00Z',
    location: {
      id: 29,
      name: 'The Palace Throne Room',
      latitude: 38.4333,
      longitude: 20.7167,
      description: 'The grand throne room where Penelope set the bow challenge',
      saga: 'Ithaca Saga',
      significance: 'Site of the bow challenge and first suitor death'
    },
    saga: {
      id: 9,
      title: 'Ithaca Saga',
      description: 'The violent reckoning and tender reunion'
    },
    characters: [
      { id: 26, name: 'Penelope', characterType: 'Queen of Ithaca', isProtagonist: false },
      { id: 28, name: 'The Suitors', characterType: 'Palace Invaders', isProtagonist: false }
    ],
    songs: [
      { id: 37, title: 'The Challenge', trackNumber: 1, durationSeconds: 285 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 90,
    title: 'The Suitors\' Plot',
    description: 'Frustrated by the impossible bow challenge, Antinous rallies the suitors to seize power by force. They plot to ambush and murder Telemachus, then assault Penelope. The monster has heard everything.',
    sequenceOrder: 2,
    eventTimestamp: '1184-12-01T14:00:00Z',
    location: {
      id: 29,
      name: 'The Palace Throne Room',
      latitude: 38.4333,
      longitude: 20.7167,
      description: 'The grand throne room where the suitors plot violence',
      saga: 'Ithaca Saga',
      significance: 'Site of the bow challenge and first suitor death'
    },
    saga: {
      id: 9,
      title: 'Ithaca Saga',
      description: 'The violent reckoning and tender reunion'
    },
    characters: [
      { id: 28, name: 'The Suitors', characterType: 'Palace Invaders', isProtagonist: false }
    ],
    songs: [
      { id: 38, title: 'Hold Them Down', trackNumber: 2, durationSeconds: 315 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 91,
    title: 'Antinous Dies',
    description: 'As Antinous details his plan to dismember Telemachus and assault Penelope, an arrow suddenly pierces his throat. The king is home, and he has heard everything. Justice begins with blood.',
    sequenceOrder: 3,
    eventTimestamp: '1184-12-01T14:30:00Z',
    location: {
      id: 29,
      name: 'The Palace Throne Room',
      latitude: 38.4333,
      longitude: 20.7167,
      description: 'The grand throne room where the first suitor dies',
      saga: 'Ithaca Saga',
      significance: 'Site of the bow challenge and first suitor death'
    },
    saga: {
      id: 9,
      title: 'Ithaca Saga',
      description: 'The violent reckoning and tender reunion'
    },
    characters: [
      { id: 27, name: 'Odysseus (The Monster)', characterType: 'Monster King', isProtagonist: true },
      { id: 28, name: 'The Suitors', characterType: 'Palace Invaders', isProtagonist: false }
    ],
    songs: [
      { id: 38, title: 'Hold Them Down', trackNumber: 2, durationSeconds: 315 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 92,
    title: 'The Monster Hunts',
    description: 'The suitors scatter in terror as the monster systematically hunts them through the palace halls. They are dragged into shadows and slaughtered one by one, the walls painted red with their blood.',
    sequenceOrder: 4,
    eventTimestamp: '1184-12-01T15:00:00Z',
    location: {
      id: 30,
      name: 'The Palace Halls',
      latitude: 38.4250,
      longitude: 20.7100,
      description: 'The corridors where the monster hunts the suitors',
      saga: 'Ithaca Saga',
      significance: 'Hunting ground where the monster systematically kills the suitors'
    },
    saga: {
      id: 9,
      title: 'Ithaca Saga',
      description: 'The violent reckoning and tender reunion'
    },
    characters: [
      { id: 27, name: 'Odysseus (The Monster)', characterType: 'Monster King', isProtagonist: true },
      { id: 28, name: 'The Suitors', characterType: 'Palace Invaders', isProtagonist: false }
    ],
    songs: [
      { id: 39, title: 'Odysseus', trackNumber: 3, durationSeconds: 270 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 93,
    title: 'Father and Son Battle',
    description: 'In the armory, Telemachus proves himself as Athena\'s Warrior of the Mind, killing Amphinomus with a spear thrust. Father and son fight side by side as Odysseus brutally executes Melanthius.',
    sequenceOrder: 5,
    eventTimestamp: '1184-12-01T16:00:00Z',
    location: {
      id: 31,
      name: 'The Palace Armory',
      latitude: 38.4200,
      longitude: 20.7200,
      description: 'The weapons room where father and son fight together',
      saga: 'Ithaca Saga',
      significance: 'Battle site where Telemachus proves himself as warrior'
    },
    saga: {
      id: 9,
      title: 'Ithaca Saga',
      description: 'The violent reckoning and tender reunion'
    },
    characters: [
      { id: 29, name: 'Telemachus (Warrior of the Mind)', characterType: 'Divine Warrior Prince', isProtagonist: false },
      { id: 27, name: 'Odysseus (The Monster)', characterType: 'Monster King', isProtagonist: true },
      { id: 28, name: 'The Suitors', characterType: 'Palace Invaders', isProtagonist: false }
    ],
    songs: [
      { id: 40, title: 'I Can\'t Help But Wonder', trackNumber: 4, durationSeconds: 255 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 94,
    title: 'Father and Son Reunion',
    description: 'After twenty years apart, Odysseus and Telemachus embrace as father and son. The prince realizes he no longer lives in his father\'s shadow, and Odysseus promises they will never be apart again.',
    sequenceOrder: 6,
    eventTimestamp: '1184-12-01T17:00:00Z',
    location: {
      id: 31,
      name: 'The Palace Armory',
      latitude: 38.4200,
      longitude: 20.7200,
      description: 'The weapons room where father and son reunite',
      saga: 'Ithaca Saga',
      significance: 'Battle site where Telemachus proves himself as warrior'
    },
    saga: {
      id: 9,
      title: 'Ithaca Saga',
      description: 'The violent reckoning and tender reunion'
    },
    characters: [
      { id: 27, name: 'Odysseus (The Monster)', characterType: 'Monster King', isProtagonist: true },
      { id: 29, name: 'Telemachus (Warrior of the Mind)', characterType: 'Divine Warrior Prince', isProtagonist: false }
    ],
    songs: [
      { id: 40, title: 'I Can\'t Help But Wonder', trackNumber: 4, durationSeconds: 255 }
    ],
    eventContext: {
      importance: 'pivotal'
    }
  },
  {
    id: 95,
    title: 'The Wedding Bed Test',
    description: 'Odysseus reunites with Penelope in their bedroom, fearing she cannot love the monster he has become. When she asks him to move their wedding bed, he reveals it was carved from the olive tree, proving his identity.',
    sequenceOrder: 7,
    eventTimestamp: '1184-12-01T20:00:00Z',
    location: {
      id: 32,
      name: 'The Royal Bedroom',
      latitude: 38.4300,
      longitude: 20.7050,
      description: 'The intimate chamber where Odysseus and Penelope reunite',
      saga: 'Ithaca Saga',
      significance: 'Site of ultimate reunion and journey\'s true end'
    },
    saga: {
      id: 9,
      title: 'Ithaca Saga',
      description: 'The violent reckoning and tender reunion'
    },
    characters: [
      { id: 27, name: 'Odysseus (The Monster)', characterType: 'Monster King', isProtagonist: true },
      { id: 26, name: 'Penelope', characterType: 'Queen of Ithaca', isProtagonist: false }
    ],
    songs: [
      { id: 41, title: 'Would You Fall in Love with Me Again', trackNumber: 5, durationSeconds: 195 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  },
  {
    id: 96,
    title: 'Love Endures',
    description: 'Penelope assures Odysseus that he is still the kind and gentle man she remembered, and that she will always love him. The king and queen of Ithaca embrace where their story began, and the journey ends.',
    sequenceOrder: 8,
    eventTimestamp: '1184-12-01T21:00:00Z',
    location: {
      id: 32,
      name: 'The Royal Bedroom',
      latitude: 38.4300,
      longitude: 20.7050,
      description: 'The intimate chamber where love conquers transformation',
      saga: 'Ithaca Saga',
      significance: 'Site of ultimate reunion and journey\'s true end'
    },
    saga: {
      id: 9,
      title: 'Ithaca Saga',
      description: 'The violent reckoning and tender reunion'
    },
    characters: [
      { id: 27, name: 'Odysseus (The Monster)', characterType: 'Monster King', isProtagonist: true },
      { id: 26, name: 'Penelope', characterType: 'Queen of Ithaca', isProtagonist: false }
    ],
    songs: [
      { id: 41, title: 'Would You Fall in Love with Me Again', trackNumber: 5, durationSeconds: 195 }
    ],
    eventContext: {
      importance: 'legendary'
    }
  }
];

// Ithaca Saga Metadata
export const ITHACA_SAGA_METADATA = {
  sagaId: 'ithaca',
  sagaName: 'Ithaca Saga',
  totalSongs: 5,
  totalEvents: 8,
  totalCharacters: 3,
  totalLocations: 4,
  releaseDate: '2025-12-31',
  significance: 'The violent reckoning and tender reunion - where Odysseus fulfills Tiresias\'s prophecy by becoming a monster to protect his family, systematically slaughtering the suitors before reuniting with Penelope in love that transcends transformation'
};

// Complete Ithaca Saga Seed Data
export const ITHACA_SAGA_SEED_DATA = {
  characters: ITHACA_CHARACTERS,
  locations: ITHACA_LOCATIONS,
  songs: ITHACA_SONGS,
  events: ITHACA_EVENTS,
  metadata: ITHACA_SAGA_METADATA
};

export default ITHACA_SAGA_SEED_DATA;
