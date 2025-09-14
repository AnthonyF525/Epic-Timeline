// ✅ Export all enums
export * from './enums';

// ✅ Export all core types
export * from './core';

// ✅ Export comparison system
export * from './comparison';

// ✅ Export filters and responses
export * from './filters';
export * from './responses';

// ✅ Export array update utilities
export * from '../utils/arrayUpdates';

// ✅ Convenience re-exports for main entities
export type {
  Saga,
  Character,
  Song,
  Event,
  Location,
  CharacterRelationship
} from './core';

export type {
  Comparison
} from './comparison';

export type {
  SagaFilter,
  CharacterFilter,
  SongFilter,
  ComparisonFilter
} from './filters';

export type {
  ApiResponse,
  PaginatedResponse,
  SagaStats,
  CharacterStats,
  SongStats,
  ComparisonStats,
  EpicTimelineStats
} from './responses';

// ✅ Array update types
export type {
  ArrayUpdatePayload,
  BatchArrayUpdate
} from '../utils/arrayUpdates';

export {
  ArrayOperation,
  ArrayUpdateUtils,
  EpicArrayHelpers
} from '../utils/arrayUpdates';