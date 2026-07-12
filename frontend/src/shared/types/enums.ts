export const ExceptionStatus = {
  OPEN: 'OPEN',
  ACKNOWLEDGED: 'ACKNOWLEDGED',
  RESOLVED: 'RESOLVED',
} as const

export type ExceptionStatus = (typeof ExceptionStatus)[keyof typeof ExceptionStatus]

export const Severity = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const

export type Severity = (typeof Severity)[keyof typeof Severity]

export const SEVERITY_OPTIONS: Severity[] = [
  Severity.HIGH,
  Severity.MEDIUM,
  Severity.LOW,
]

export const STATUS_OPTIONS: ExceptionStatus[] = [
  ExceptionStatus.OPEN,
  ExceptionStatus.ACKNOWLEDGED,
  ExceptionStatus.RESOLVED,
]
