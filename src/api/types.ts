export interface BaseResponse {
  status?: string;
  message?: string;
}

export interface GenericResponse<T> extends BaseResponse {
  data: T;
}

export interface GenericPaginatedResponse<T> extends BaseResponse {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
