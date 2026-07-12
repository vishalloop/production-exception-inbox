import type { Exception } from '@/shared/types/exception'
import { toDateKey } from '@/shared/lib/format'
import { Severity } from '@/shared/types/enums'

export interface DayGroup {
  dateKey: string
  dateLabel: string
  exceptions: Exception[]
  counts: {
    total: number
    high: number
    medium: number
    low: number
  }
}

const severityRank: Record<string, number> = {
  [Severity.HIGH]: 0,
  [Severity.MEDIUM]: 1,
  [Severity.LOW]: 2,
}

/**
 * Group exceptions by calendar day (newest first).
 * Within each day, sort by severity then deficit %.
 */
export function groupExceptionsByDate(exceptions: Exception[]): DayGroup[] {
  const map = new Map<string, Exception[]>()

  for (const item of exceptions) {
    const key = toDateKey(item.date)
    const bucket = map.get(key)
    if (bucket) {
      bucket.push(item)
    } else {
      map.set(key, [item])
    }
  }

  const groups: DayGroup[] = []

  for (const [dateKey, items] of map.entries()) {
    const sorted = [...items].sort((a, b) => {
      const sev = (severityRank[a.severity] ?? 9) - (severityRank[b.severity] ?? 9)
      if (sev !== 0) return sev
      return b.deficit_percentage - a.deficit_percentage
    })

    groups.push({
      dateKey,
      dateLabel: new Date(dateKey + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      exceptions: sorted,
      counts: {
        total: sorted.length,
        high: sorted.filter((e) => e.severity === Severity.HIGH).length,
        medium: sorted.filter((e) => e.severity === Severity.MEDIUM).length,
        low: sorted.filter((e) => e.severity === Severity.LOW).length,
      },
    })
  }

  return groups.sort((a, b) => (a.dateKey < b.dateKey ? 1 : -1))
}

/** Unique product codes for filter dropdown. */
export function extractProductCodes(exceptions: Exception[]): string[] {
  return [...new Set(exceptions.map((e) => e.product_code))].sort()
}
