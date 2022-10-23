export type PaginatedResult<T> = {
  totalElements: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
  content: T[];
};
