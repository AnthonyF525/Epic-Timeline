import {
  ComparisonType,
  ComparisonTargetType,
  CredibilityLevel,
  EducationalValue,
  AudienceImpact,
  AgeAppropriateness
} from './enums';
import { BaseEntity } from './core';

// ✓ COMPARISON INTERFACE (Your sophisticated system)
export interface Comparison extends BaseEntity {
  title: string;
  description: string;
  
  // Core Comparison Data
  comparisonType: ComparisonType;
  targetType: ComparisonTargetType;
  targetId?: number;
  externalSource: string;
  
  // Epic vs External Analysis
  similarities: string[];
  differences: string[];
  originalElements: string[];
  adaptationChoices: string[];
  
  // Context Information
  culturalContext: {
    timeHeriod?: string;
    culturalOrigin: string[];
    geographicOrigin?: string;
    socialContext: string[];
  };
  
  // Scholarly Information
  scholarlyInfo: {
    academicSources: string[];
    credibilityLevel: CredibilityLevel;
    researchNotes?: string;
    lastVerified?: string;
  };
  
  // Significance Assessment
  significance: {
    importance: 'trivial' | 'interesting' | 'significant' | 'major' | 'fundamental';
    educationalValue: EducationalValue;
    audienceImpact: AudienceImpact;
    storytellingEffect: string[];
  };
  
  // Media and Resources
  mediaElements: {
    imageUrls: string[];
    videoUrls: string[];
    audioUrls: string[];
    documentUrls: string[];
    presentationNotes?: string;
  };
  
  // Educational Aspects
  educationalAspects: {
    learningObjectives: string[];
    discussionQuestions: string[];
    ageAppropriateness: AgeAppropriateness;
    subjectAreas: string[];
  };
  
  // Metadata
  isFeatured?: boolean;
  tags: string[];
  keywords: string[];
  
  // Relationships
  sagaId?: number;
  characterId?: number;
  songId?: number;
  eventId?: number;
  locationId?: number;
}