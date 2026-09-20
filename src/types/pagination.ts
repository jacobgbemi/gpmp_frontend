/**
 * Standard DRF PageNumberPagination envelope (see the backend's
 * common/pagination.py — StandardResultsSetPagination). Every list
 * endpoint in the API returns this shape.
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}