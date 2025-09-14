// CharacterType enum and utilities
export enum CharacterType {
  MORTAL = 'MORTAL',
  GOD = 'GOD',
  MONSTER = 'MONSTER'
}

export const CharacterTypeDisplay: Record<CharacterType, string> = {
  [CharacterType.MORTAL]: 'Mortal',
  [CharacterType.GOD]: 'God',
  [CharacterType.MONSTER]: 'Monster'
};

// ComparisonType enum and utilities
export enum ComparisonType {
  MUSICAL_INSPIRATION = 'MUSICAL_INSPIRATION',
  HISTORICAL_EVENT = 'HISTORICAL_EVENT',
  MYTHOLOGICAL_SOURCE = 'MYTHOLOGICAL_SOURCE',
  LITERARY_REFERENCE = 'LITERARY_REFERENCE'
}

export const ComparisonTypeDisplay: Record<ComparisonType, string> = {
  [ComparisonType.MUSICAL_INSPIRATION]: 'Musical Inspiration',
  [ComparisonType.HISTORICAL_EVENT]: 'Historical Event',
  [ComparisonType.MYTHOLOGICAL_SOURCE]: 'Mythological Source',
  [ComparisonType.LITERARY_REFERENCE]: 'Literary Reference'
};

export const ComparisonTypeColors: Record<ComparisonType, string> = {
  [ComparisonType.MUSICAL_INSPIRATION]: '#9333ea',
  [ComparisonType.HISTORICAL_EVENT]: '#dc2626',
  [ComparisonType.MYTHOLOGICAL_SOURCE]: '#059669',
  [ComparisonType.LITERARY_REFERENCE]: '#2563eb'
};

export const CharacterTypeColors: Record<CharacterType, string> = {
  [CharacterType.MORTAL]: '#6366f1',   // Blue
  [CharacterType.GOD]: '#fbbf24',      // Gold  
  [CharacterType.MONSTER]: '#dc2626'   // Red
};
// Type exports
export type CharacterTypeKey = keyof typeof CharacterType;
export type ComparisonTypeKey = keyof typeof ComparisonType;