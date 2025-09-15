/**
 * EPIC: The Musical Character Data Helper
 * Provides complete character data for characters from Jorge Rivera-Herrans' EPIC: The Musical
 */

import { Character } from '../services/EventService';

export const EPIC_CHARACTERS: {[key: string]: Character} = {
  'Odysseus': {
    id: 1,
    name: 'Odysseus',
    description: 'King of Ithaca and the protagonist of EPIC: The Musical. A clever strategist cursed to wander the seas for 20 years after the Trojan War. Known for his wit, determination, and the lengths he\'ll go to protect his family.',
    characterType: 'King',
    isProtagonist: true,
    aliases: ['The King of Ithaca', 'Captain', 'Nobody'],
    powers: ['Strategic Genius', 'Silver Tongue', 'Archery Master', 'Naval Command'],
    relationships: [
      { characterId: 2, characterName: 'Penelope', relationshipType: 'spouse', description: 'Beloved wife, Queen of Ithaca' },
      { characterId: 3, characterName: 'Telemachus', relationshipType: 'family', description: 'Son, Prince of Ithaca' },
      { characterId: 4, characterName: 'Athena', relationshipType: 'patron', description: 'Divine mentor and guide' },
      { characterId: 5, characterName: 'Poseidon', relationshipType: 'enemy', description: 'God who curses his journey home' }
    ]
  },
  'Penelope': {
    id: 2,
    name: 'Penelope',
    description: 'Queen of Ithaca and Odysseus\' faithful wife. Renowned for her loyalty, cleverness, and strength while waiting 20 years for her husband\'s return, fending off suitors.',
    characterType: 'Queen',
    isProtagonist: true,
    aliases: ['Queen of Ithaca', 'Faithful Penelope'],
    powers: ['Tactical Weaving', 'Political Cunning', 'Unwavering Loyalty'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'spouse', description: 'Beloved husband, King of Ithaca' },
      { characterId: 3, characterName: 'Telemachus', relationshipType: 'family', description: 'Son, whom she raised alone' }
    ]
  },
  'Telemachus': {
    id: 3,
    name: 'Telemachus',
    description: 'Prince of Ithaca and son of Odysseus and Penelope. Young and eager to prove himself, growing up without his father during the 20-year journey.',
    characterType: 'Prince',
    isProtagonist: false,
    aliases: ['Prince of Ithaca', 'Young Prince'],
    powers: ['Royal Heritage', 'Growing Wisdom', 'Archery Potential'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'family', description: 'Father, the legendary king' },
      { characterId: 2, characterName: 'Penelope', relationshipType: 'family', description: 'Mother, Queen of Ithaca' },
      { characterId: 4, characterName: 'Athena', relationshipType: 'mentor', description: 'Divine guide helping him mature' }
    ]
  },
  'Athena': {
    id: 4,
    name: 'Athena',
    description: 'Goddess of wisdom and warfare, divine patron of Odysseus. She guides and protects him throughout his journey, believing in his potential for growth and change.',
    characterType: 'Goddess',
    isProtagonist: false,
    aliases: ['Pallas Athena', 'Goddess of Wisdom', 'Warrior of the Mind'],
    powers: ['Divine Wisdom', 'Strategic Warfare', 'Shape-shifting', 'Prophetic Sight'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'patron', description: 'Her chosen champion' },
      { characterId: 3, characterName: 'Telemachus', relationshipType: 'mentor', description: 'Guides the young prince' }
    ]
  },
  'Poseidon': {
    id: 5,
    name: 'Poseidon',
    description: 'God of the seas and earthquakes. Odysseus\' greatest divine enemy who curses his journey home after the blinding of his son Polyphemus.',
    characterType: 'God',
    isProtagonist: false,
    aliases: ['Earth-Shaker', 'Lord of the Seas', 'God of Earthquakes'],
    powers: ['Ocean Control', 'Storm Creation', 'Earthquake Generation', 'Divine Wrath'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'enemy', description: 'Curses him for blinding Polyphemus' },
      { characterId: 6, characterName: 'Polyphemus', relationshipType: 'family', description: 'Father of the cyclops' }
    ]
  },
  'Polyphemus': {
    id: 6,
    name: 'Polyphemus',
    description: 'The cyclops son of Poseidon. A massive, one-eyed giant who traps Odysseus and his crew in his cave, leading to the curse that extends their journey.',
    characterType: 'Cyclops',
    isProtagonist: false,
    aliases: ['The Cyclops', 'Son of Poseidon', 'One-Eye'],
    powers: ['Immense Strength', 'Stone Throwing', 'Shepherd Skills'],
    relationships: [
      { characterId: 5, characterName: 'Poseidon', relationshipType: 'family', description: 'Divine father' },
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'enemy', description: 'The man who blinded him' }
    ]
  },
  'Circe': {
    id: 7,
    name: 'Circe',
    description: 'The enchantress of Aeaea, a powerful witch who initially threatens Odysseus\' crew but becomes an ally, helping them on their journey.',
    characterType: 'Sorceress',
    isProtagonist: false,
    aliases: ['Witch of Aeaea', 'The Enchantress'],
    powers: ['Transformation Magic', 'Potion Brewing', 'Prophecy', 'Divine Knowledge'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'ally', description: 'Helps him on his journey' }
    ]
  },
  'Eurylochus': {
    id: 8,
    name: 'Eurylochus',
    description: 'Odysseus\' second-in-command and brother-in-law. A loyal but sometimes questioning voice among the crew who challenges difficult decisions.',
    characterType: 'Sailor',
    isProtagonist: false,
    aliases: ['Second-in-Command', 'Brother-in-Law'],
    powers: ['Military Leadership', 'Crew Loyalty', 'Combat Skills'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'crew', description: 'Loyal second-in-command and family' }
    ]
  },
  'Polites': {
    id: 9,
    name: 'Polites',
    description: 'Odysseus\' best friend and voice of optimism in the crew. Known for his cheerful demeanor and attempts to see the good in situations.',
    characterType: 'Sailor',
    isProtagonist: false,
    aliases: ['Best Friend', 'Voice of Optimism'],
    powers: ['Inspiring Optimism', 'Crew Morale', 'Friendship'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'friend', description: 'Best friend and loyal companion' }
    ]
  },
  'Antinous': {
    id: 10,
    name: 'Antinous',
    description: 'The leader of the suitors vying for Penelope\'s hand in marriage. Arrogant and aggressive, he represents the greatest threat to Odysseus\' household and kingdom.',
    characterType: 'Suitor Leader',
    isProtagonist: false,
    aliases: ['Leader of Suitors', 'Chief Suitor'],
    powers: ['Political Influence', 'Swordsmanship', 'Charismatic Leadership'],
    relationships: [
      { characterId: 2, characterName: 'Penelope', relationshipType: 'suitor', description: 'Unwanted pursuer of the queen' },
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'enemy', description: 'Rival for the throne of Ithaca' }
    ]
  },
  'Aeolus': {
    id: 11,
    name: 'Aeolus',
    description: 'The divine keeper of the winds, who gives Odysseus a bag containing all the winds except the west wind to help him sail home quickly.',
    characterType: 'Wind God',
    isProtagonist: false,
    aliases: ['Lord of the Winds', 'Wind Keeper'],
    powers: ['Wind Control', 'Divine Gifts', 'Storm Mastery'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'benefactor', description: 'Provides divine assistance for the journey home' }
    ]
  },
  'Hermes': {
    id: 12,
    name: 'Hermes',
    description: 'The messenger god and divine trickster. In EPIC, he serves as a guide and mentor, helping Odysseus with wisdom and divine tools.',
    characterType: 'Messenger God',
    isProtagonist: false,
    aliases: ['Divine Messenger', 'God of Travelers', 'The Trickster'],
    powers: ['Divine Speed', 'Shape-shifting', 'Divine Wisdom', 'Magical Items'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'mentor', description: 'Divine guide and teacher' },
      { characterId: 7, characterName: 'Circe', relationshipType: 'relative', description: 'Divine family connection' }
    ]
  },
  'Tiresias': {
    id: 13,
    name: 'Tiresias',
    description: 'The blind prophet of Thebes who retains his prophetic powers even in death. In the Underworld, he reveals crucial prophecies about Odysseus\' future.',
    characterType: 'Prophet Spirit',
    isProtagonist: false,
    aliases: ['The Blind Prophet', 'Seer of Thebes'],
    powers: ['Divine Prophecy', 'Future Sight', 'Underworld Wisdom'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'oracle', description: 'Provides crucial prophecy about the journey home' }
    ]
  },
  'Anticlea': {
    id: 14,
    name: 'Anticlea',
    description: 'Odysseus\' mother, who appears as a spirit in the Underworld. Her presence represents the personal cost of Odysseus\' long journey.',
    characterType: 'Mother Spirit',
    isProtagonist: false,
    aliases: ['Mother of Odysseus'],
    powers: ['Maternal Love', 'Spiritual Presence'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'family', description: 'Beloved son who she died waiting for' }
    ]
  },
  'Calypso': {
    id: 15,
    name: 'Calypso',
    description: 'The immortal nymph who holds Odysseus captive on her island for seven years, offering him immortality in exchange for staying with her.',
    characterType: 'Immortal Nymph',
    isProtagonist: false,
    aliases: ['Island Nymph', 'The Captivating Goddess'],
    powers: ['Immortality', 'Divine Beauty', 'Island Magic', 'Time Manipulation'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'captor', description: 'Holds him captive while offering love and immortality' }
    ]
  },
  'Scylla': {
    id: 18,
    name: 'Scylla',
    description: 'The six-headed sea monster that guards the narrow strait. Once a beautiful nymph, now a terrifying creature that demands sacrifice from all who pass.',
    characterType: 'Sea Monster',
    isProtagonist: false,
    aliases: ['Six-Headed Monster', 'Guardian of the Strait'],
    powers: ['Multiple Heads', 'Lightning Speed', 'Territorial Control'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'adversary', description: 'Forces him to sacrifice six men to pass' }
    ]
  },
  'Zeus': {
    id: 16,
    name: 'Zeus',
    description: 'The king of the gods and ruler of Mount Olympus. In EPIC, Zeus appears as the ultimate divine judge who tests Odysseus with impossible choices and delivers devastating consequences.',
    characterType: 'King of Gods',
    isProtagonist: false,
    aliases: ['Lord of Thunder', 'King of Olympus', 'Sky Father', 'Thunder Bringer'],
    powers: ['Divine Thunder', 'Lightning Mastery', 'Divine Judgment', 'Weather Control', 'Absolute Authority'],
    relationships: [
      { characterId: 1, characterName: 'Odysseus', relationshipType: 'judge', description: 'Mortal hero who faces divine judgment' },
      { characterId: 4, characterName: 'Athena', relationshipType: 'family', description: 'Daughter and fellow Olympian' }
    ]
  }
};

/**
 * Get a complete EPIC character by name
 */
export function getEpicCharacter(name: string): Character | null {
  return EPIC_CHARACTERS[name] || null;
}

/**
 * Get all EPIC character names
 */
export function getEpicCharacterNames(): string[] {
  return Object.keys(EPIC_CHARACTERS);
}

/**
 * Check if a character is from EPIC: The Musical
 */
export function isEpicCharacter(name: string): boolean {
  return name in EPIC_CHARACTERS;
}
