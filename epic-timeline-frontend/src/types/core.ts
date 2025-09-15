import {
  CharacterType,
  NarrativeImportance,
  CulturalSignificance,
  ComparisonType,
  ComparisonTargetType,
  CredibilityLevel,
  EducationalValue,
  AudienceImpact,
  AgeAppropriateness,
  MusicalStyle,
  VocalStyle,
  LocationType
} from './enums';

// ✓ BASE ENTITY INTERFACE
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  version?: number;
}

// ✓ SAGA INTERFACE
export interface Saga extends BaseEntity {
  title: string;
  description: string;
  orderInEpic: number;
  isComplete: boolean;
  isCanon: boolean;
  releaseDate?: string;
  themes: string[];
  musicalStyles: MusicalStyle[];
  narrativeImportance: NarrativeImportance;
  culturalSignificance: CulturalSignificance;
  estimatedDuration?: number; // in minutes
  songCount?: number;
  characterCount?: number;
  keyEvents: string[];
  educationalTopics: string[];
  homerReferences?: string[];
  modernAdaptations?: string[];
  
  // Relationships
  songs?: Song[];
  characters?: Character[];
  events?: Event[];
  locations?: Location[];
}

// ✓ CHARACTER INTERFACE
export interface Character extends BaseEntity {
  name: string;
  description: string;
  characterType: CharacterType;
  isImmortal: boolean;
  isProtagonist: boolean;
  isAntagonist: boolean;
  isTitleCharacter: boolean;
  hasSpokenLines: boolean;
  culturalSignificance: CulturalSignificance;
  
  // Epic Timeline Specific
  appearanceInSagas: string[];
  epicAdaptations?: string[];
  homerDifferences?: string[];
  personalityTraits: string[];
  abilities: string[];
  relationships: CharacterRelationship[];
  roles: string[];
  
  // Physical/Visual
  physicalDescription?: string;
  symbolism?: string[];
  iconography?: string[];
  
  // Narrative
  characterArc?: string;
  developmentNotes?: string;
  voiceActor?: string;
  
  // Relationships
  songs?: Song[];
  events?: Event[];
  locations?: Location[];
}

// ✓ CHARACTER RELATIONSHIP INTERFACE
export interface CharacterRelationship {
  relatedCharacterId: number;
  relatedCharacterName: string;
  relationshipType: string; // 'father', 'enemy', 'ally', 'mentor', etc.
  description?: string;
  contextSagas: string[];
}

// ✓ SONG INTERFACE
export interface Song extends BaseEntity {
  title: string;
  description: string;
  sagaId: number;
  sagaTitle: string;
  trackNumber: number;
  duration: number; // in seconds
  
  // Musical Properties
  musicalStyle: MusicalStyle;
  vocalStyle: VocalStyle;
  keySignature?: string;
  tempo?: number;
  instrumentalElements: string[];
  
  // Narrative Properties
  narrativeImportance: NarrativeImportance;
  narrativeFunction: string;
  emotionalTone: string[];
  themes: string[];
  characterFocus: string[];
  
  // Educational
  learningObjectives?: string[];
  historicalContext?: string[];
  literaryDevices: string[];
  
  // Homer Comparison
  homerEquivalent?: string;
  epicChanges?: string[];
  culturalAdaptations?: string[];
  
  // Production
  composer?: string;
  lyricist?: string;
  performanceNotes?: string;
  
  // Relationships
  characters?: Character[];
  events?: Event[];
  locations?: Location[];
}

// ✓ LOCATION INTERFACE
export interface Location extends BaseEntity {
  name: string;
  description: string;
  locationType: LocationType;
  isEpicLocation: boolean;
  
  // Geographic
  coordinates?: {
    x: number;
    y: number;
    z?: number; // for multi-dimensional locations
  };
  region?: string;
  parentLocation?: string;
  
  // Cultural/Historical
  historicalSignificance?: string;
  culturalContext: string[];
  mythologicalImportance: CulturalSignificance;
  
  // Homer Comparison
  homerDescription?: string;
  epicAdaptations?: string[];
  geographicChanges?: string[];
  
  // Visual/Atmospheric
  visualDescription?: string;
  atmosphere?: string[];
  symbolism?: string[];
  
  // Relationships
  sagas?: Saga[];
  characters?: Character[];
  songs?: Song[];
  events?: Event[];
}

// ✓ EVENT INTERFACE
export interface Event extends BaseEntity {
  title: string;
  description: string;
  sagaId: number;
  sagaTitle: string;
  orderInSaga: number;
  
  // Timing
  estimatedTimestamp?: string; // within the narrative
  duration?: number; // in narrative minutes
  
  // Narrative Properties
  narrativeImportance: NarrativeImportance;
  eventType: string; // 'battle', 'dialogue', 'revelation', etc.
  emotionalImpact: string[];
  consequences: string[];
  
  // Participants
  primaryCharacters: string[];
  secondaryCharacters: string[];
  locationName?: string;
  songTitles: string[];
  
  // Educational
  historicalBasis?: string[];
  mythologicalSignificance?: string;
  literaryAnalysis?: string[];
  
  // Homer Comparison
  homerVersion?: string;
  epicChanges?: string[];
  adaptationReason?: string;
  
  // Relationships
  saga?: Saga;
  characters?: Character[];
  songs?: Song[];
  location?: Location;
}