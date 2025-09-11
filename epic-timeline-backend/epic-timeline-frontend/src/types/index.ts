// Export all enums
export * from './EnumsIndex';

// Export all entity types
export * from './EntityInterfaceType';

export * from './Saga';
export * from './Song';
export * from './Location';
export * from './Character';
export * from './Event';
export * from './Comparison';


// Utility types
export type ApiResponse<T> = {
  data: T;
  message?: string;
  status: 'success' | 'error';
};

export type PaginatedResponse<T> = {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
};