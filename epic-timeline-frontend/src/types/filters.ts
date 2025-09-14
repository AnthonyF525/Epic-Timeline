import {
  CharacterType,
  NarrativeImportance,
  CulturalSignificance,
  ComparisonType,
  MusicalStyle,
  VocalStyle,
  EducationalValue,
  AgeAppropriateness
} from './enums';

// ✅ FILTER INTERFACES
export interface SagaFilter {
  themes?: string[];
  musicalStyles?: MusicalStyle[];
  narrativeImportance?: NarrativeImportance;
  culturalSignificance?: CulturalSignificance;
  isComplete?: boolean;
  isCanon?: boolean;
  minRating?: number;
  maxRating?: number;
  hasHomerReference?: boolean;
}

export interface CharacterFilter {
  characterTypes?: CharacterType[];
  isImmortal?: boolean;
  isProtagonist?: boolean;
  isAntagonist?: boolean;
  isTitleCharacter?: boolean;
  hasSpokenLines?: boolean;
  culturalSignificance?: CulturalSignificance;
  appearanceInSagas?: string[];
  traits?: string[];
  abilities?: string[];
  roles?: string[];
}

export interface SongFilter {
  sagaIds?: number[];
  characterFocus?: string[];
  themes?: string[];
  musicalStyles?: MusicalStyle[];
  vocalStyles?: VocalStyle[];
  narrativeImportance?: NarrativeImportance;
  minDuration?: number;
  maxDuration?: number;
  hasHomerEquivalent?: boolean;
}

export interface ComparisonFilter {
  comparisonType?: ComparisonType;
  targetType?: ComparisonTargetType;
  externalSource?: string;
  culturalOrigin?: string[];
  educationalValue?: EducationalValue;
  ageAppropriateness?: AgeAppropriateness;
  isFeatured?: boolean;
  sagaId?: number;
  characterId?: number;
  songId?: number;
}