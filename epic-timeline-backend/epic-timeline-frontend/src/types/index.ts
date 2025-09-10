// Export all enums
export * from './EnumsIndex.ts';

// Export all entity types
export * from './EntityInterfaceType.ts/index.ts';

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