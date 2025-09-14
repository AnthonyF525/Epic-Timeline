import { Saga, Character, Song, Event, Location, Comparison } from './core';
import { Comparison as ComparisonEntity } from './comparison';

// ✅ API RESPONSE WRAPPERS
export interface ApiResponse<T> {
  data: T;
  _epicMeta: {
    requestId: string;
    timestamp: string;
    endpoint: string;
    status: number;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// ✅ STATISTICS INTERFACES
export interface SagaStats {
  totalSagas: number;
  completedSagas: number;
  canonicalSagas: number;
  totalDuration: number; // in minutes
  averageDuration: number;
  mostPopularThemes: string[];
  narrativeImportanceDistribution: Record<string, number>;
  culturalSignificanceDistribution: Record<string, number>;
}

export interface CharacterStats {
  totalCharacters: number;
  characterTypeDistribution: Record<CharacterType, number>;
  immortalCount: number;
  protagonistCount: number;
  charactersWithSpokenLines: number;
  mostFrequentTraits: string[];
  culturalSignificanceDistribution: Record<string, number>;
  averageAppearancesPerCharacter: number;
}

export interface SongStats {
  totalSongs: number;
  totalDuration: number; // in seconds
  averageDuration: number;
  musicalStyleDistribution: Record<MusicalStyle, number>;
  vocalStyleDistribution: Record<VocalStyle, number>;
  narrativeImportanceDistribution: Record<string, number>;
  mostPopularThemes: string[];
  songsWithHomerEquivalent: number;
}

export interface ComparisonStats {
  totalComparisons: number;
  comparisonTypeDistribution: Record<string, number>;
  targetTypeDistribution: Record<string, number>;
  credibilityLevelDistribution: Record<string, number>;
  educationalValueDistribution: Record<string, number>;
  featuredComparisons: number;
  averageSourcesPerComparison: number;
}

export interface EpicTimelineStats {
  sagas: SagaStats;
  characters: CharacterStats;
  songs: SongStats;
  comparisons: ComparisonStats;
  lastUpdated: string;
  dataVersion: string;
}