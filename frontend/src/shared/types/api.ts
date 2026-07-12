export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  error?: object
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedData<T> {
  data: T[]
  pagination: Pagination
}
