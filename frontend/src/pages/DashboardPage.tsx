import { DashboardSummaryCards } from '@/features/dashboard/components/DashboardSummaryCards'
import { ExceptionFilters } from '@/features/exceptions/components/ExceptionFilters'
import { ExceptionTimeline } from '@/features/exceptions/components/ExceptionTimeline'

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-surface-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-surface-500">
          Production shortfalls grouped by day. Filter by product or severity,
          then open any exception for metrics, 7-day trend, and actions.
        </p>
      </div>

      <DashboardSummaryCards />
      <ExceptionFilters />
      <ExceptionTimeline />
    </div>
  )
}
