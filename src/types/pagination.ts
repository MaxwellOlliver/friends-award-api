export interface ListRequest {
  page: number;
  limit: number;
  q?: string;
}

export interface ListResponse<T> {
  data: T[];
  total: number;
}
