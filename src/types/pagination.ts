export interface ListRequest {
  page: number;
  limit: number;
  q?: string;
}

export interface ListResponse<T> {
  items: T[];
  total: number;
}
