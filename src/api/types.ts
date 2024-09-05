export interface BaseResponse {
  status?: string;
  message?: string;
}

export interface GenericResponse<T> extends BaseResponse {
  data: T;
}

export interface PaginationMeta {
  page: number;
  per_page: number;
  offset?: number;
  total_entries_size?: number;
  current_entries_size?: number;
  total_pages: number;
}

export interface GenericPaginatedResponse<T> extends BaseResponse {
  data: T[];
  pagination: PaginationMeta;
}

export interface GenericCursorPaginatedResponse<T> extends BaseResponse {
  data: T[];
  pagination_info: {
    current_entries_size: number;
    next_cursor: string | null;
    prev_cursor: string | null;
  };
}
