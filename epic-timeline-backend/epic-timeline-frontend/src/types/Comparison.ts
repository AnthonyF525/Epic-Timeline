import { ComparisonType } from './EnumsIndex';


export enum ComparisonTargetType {
  CHARACTER = 'CHARACTER',
  EVENT = 'EVENT', 
  LOCATION = 'LOCATION',
  SONG = 'SONG',
  SAGA = 'SAGA',
  GENERAL = 'GENERAL'
}

export const ComparisonTargetTypeDisplay: Record<ComparisonTargetType, string> = {
  [ComparisonTargetType.CHARACTER]: 'Character',
  [ComparisonTargetType.EVENT]: 'Event',
  [ComparisonTargetType.LOCATION]: 'Location',
  [ComparisonTargetType.SONG]: 'Song',
  [ComparisonTargetType.SAGA]: 'Saga',
  [ComparisonTargetType.GENERAL]: 'General'
};


export const ComparisonTargetTypeColors: Record<ComparisonTargetType, string> = {
  [ComparisonTargetType.CHARACTER]: '#8b5cf6',  // Purple
  [ComparisonTargetType.EVENT]: '#f59e0b',      // Amber
  [ComparisonTargetType.LOCATION]: '#10b981',   // Green
  [ComparisonTargetType.SONG]: '#3b82f6',       // Blue
  [ComparisonTargetType.SAGA]: '#ef4444',       // Red
  [ComparisonTargetType.GENERAL]: '#6b7280'     // Gray
};


export interface Comparison {
  id: number;
  title: string;
  description: string;
  
  
  comparisonType: ComparisonType;
  
  
  targetType: ComparisonTargetType;
  
  
  characterId?: number;
  eventId?: number;
  locationId?: number;
  songId?: number;
  sagaId?: number;
  
  
  externalSource?: string;        // "Hamilton Musical", "Actual History", "Norse Mythology"
  externalUrl?: string;
  externalTitle?: string;         // "Wait for It", "Battle of Marathon", "Ragnarok"
  
  
  similarities: string[];         // Points of similarity
  differences: string[];          // Points of difference
  inspirationElements: string[];  // What Epic Timeline borrowed
  originalElements: string[];     // What Epic Timeline added/changed
  
  
  culturalContext: {
    timeHeriod?: string;          // "Ancient Greece", "American Revolution", "Modern Era"
    culturalOrigin: string[];     // ["Greek", "American", "Nordic"]
    geographicOrigin?: string;    // "Mediterranean", "New York", "Scandinavia"
    socialContext: string[];      // ["Aristocracy", "Revolution", "War"]
  };
  
  
  scholarlyInfo: {
    academicSources: string[];    // Research papers, books, scholars
    credibilityLevel: 'speculative' | 'likely' | 'documented' | 'definitive';
    researchNotes?: string;
    lastVerified?: string;        // ISO date
  };
  
  
  significance: {
    importance: 'trivial' | 'interesting' | 'significant' | 'major' | 'fundamental';
    educationalValue: 'low' | 'medium' | 'high' | 'exceptional';
    audienceImpact: 'niche' | 'moderate' | 'broad' | 'universal';
    storytellingEffect: string[]; // How this comparison enhances the story
  };
  
  
  mediaElements: {
    imageUrls: string[];          // Comparison images
    videoUrls: string[];          // YouTube, etc.
    audioUrls: string[];          // Audio comparisons
    documentUrls: string[];       // PDFs, articles
    presentationNotes?: string;   // How to present this comparison
  };
  
  
  educationalAspects: {
    learningObjectives: string[]; // What audience should learn
    discussionQuestions: string[]; // For educational use
    ageAppropriateness: 'children' | 'teens' | 'adults' | 'all_ages';
    subjectAreas: string[];       // "History", "Literature", "Music", "Mythology"
  };
  
  
  userEngagement: {
    tags: string[];               // User-generated tags
    userRating?: number;          // 1-5 stars
    userComments?: string[];      // Community discussions
    verificationStatus: 'unverified' | 'community_verified' | 'expert_verified';
  };
  
  
  createdBy?: string;
  createdDate?: string;
  lastUpdated?: string;
  isPublic: boolean;
  isFeatured: boolean;
}


export interface ComparisonWithRelations extends Comparison {
  character?: any;     // Will be Character when properly imported
  event?: any;         // Will be Event when properly imported
  location?: any;      // Will be Location when properly imported
  song?: any;          // Will be Song when properly imported
  saga?: any;          // Will be Saga when properly imported
}


export type ComparisonForCreation = Omit<Comparison, 'id' | 'createdDate' | 'lastUpdated'> & {
  similarities: string[];
  differences: string[];
  inspirationElements: string[];
  originalElements: string[];
};


export type ComparisonFilter = {
  comparisonType?: ComparisonType;
  targetType?: ComparisonTargetType;
  characterId?: number;
  eventId?: number;
  locationId?: number;
  songId?: number;
  sagaId?: number;
  culturalOrigin?: string;
  timeHeriod?: string;
  importance?: Comparison['significance']['importance'];
  educationalValue?: Comparison['significance']['educationalValue'];
  credibilityLevel?: Comparison['scholarlyInfo']['credibilityLevel'];
  ageAppropriateness?: Comparison['educationalAspects']['ageAppropriateness'];
  subjectArea?: string;
  isPublic?: boolean;
  isFeatured?: boolean;
  hasMedia?: boolean;
  searchTerm?: string;
  createdAfter?: string;
  createdBefore?: string;
};


export type ComparisonStats = {
  totalComparisons: number;
  byComparisonType: Record<ComparisonType, number>;
  byTargetType: Record<ComparisonTargetType, number>;
  byImportance: Record<Comparison['significance']['importance'], number>;
  byCredibility: Record<Comparison['scholarlyInfo']['credibilityLevel'], number>;
  byEducationalValue: Record<Comparison['significance']['educationalValue'], number>;
  featuredComparisons: number;
  publicComparisons: number;
  mostComparedEntities: {
    characters: { id: number; comparisonCount: number }[];
    events: { id: number; comparisonCount: number }[];
    locations: { id: number; comparisonCount: number }[];
    songs: { id: number; comparisonCount: number }[];
  };
  averageRating: number;
  topCulturalOrigins: Record<string, number>;
  recentActivity: {
    createdThisWeek: number;
    updatedThisWeek: number;
  };
};


export interface ComparisonRecommendation {
  comparisonId: number;
  recommendationReason: 'similar_topic' | 'same_character' | 'same_type' | 'user_interest' | 'featured';
  relevanceScore: number; 
  recommendedFor?: string; 
}


export interface ComparisonLearningPath {
  pathId: number;
  pathTitle: string;
  description: string;
  targetAudience: string;
  comparisonIds: number[];
  sequence: number[];      
  learningGoals: string[];
  estimatedDuration: string;
}


export interface ComparisonVerification {
  comparisonId: number;
  verifierId?: string;
  verificationDate: string;
  verificationStatus: 'pending' | 'verified' | 'disputed' | 'rejected';
  verificationNotes?: string;
  sources: string[];
  expertEndorsements?: string[];
}


export type { ComparisonType };