import type { ExceptionStatus, Severity } from './enums'

export interface Exception {
  id: number
  date: string
  plant: string
  product_code: string
  planned_units: number
  actual_units: number
  deficit_units: number
  deficit_percentage: number
  severity: Severity
  status: ExceptionStatus
  created_at: string
  updated_at: string
}

export interface TrendPoint {
  date: string
  planned_units: number
  actual_units: number
}

export interface ExceptionDetail {
  exception: Exception
  trend: TrendPoint[]
}

export interface ExceptionListParams {
  page?: number
  limit?: number
  product_code?: string
  severity?: Severity
  status?: ExceptionStatus
}

export interface DashboardSummary {
  total: number
  high: number
  medium: number
  low: number
  open: number
  acknowledged: number
  resolved: number
}
