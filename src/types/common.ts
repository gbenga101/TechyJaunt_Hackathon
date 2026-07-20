/**
 * Generic entity identifier.
 */
export type ID = string;

/**
 * Common timestamp fields returned by the backend.
 */
export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

/**
 * Pagination metadata.
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Generic paginated response.
 */
export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}