import { useMemo } from 'react'
import { useAppSelector } from '@/app/hooks'
import { useGetExceptionsQuery } from '@/features/exceptions/api/exceptionsApi'
import { groupExceptionsByDate } from '@/features/exceptions/utils/groupByDate'
import { Spinner } from '@/shared/components/ui/Spinner'
import { ErrorState } from '@/shared/components/ui/ErrorState'
import { EmptyState } from '@/shared/components/ui/EmptyState'
import { DayGroup } from './DayGroup'
import type { Severity, ExceptionStatus } from '@/shared/types/enums'

export function ExceptionTimeline() {
  const filters = useAppSelector((s) => s.exceptionsUi.filters)

  const queryArgs = useMemo(
    () => ({
      page: 1,
      limit: 200,
      product_code: filters.product_code || undefined,
      severity: (filters.severity || undefined) as Severity | undefined,
      status: (filters.status || undefined) as ExceptionStatus | undefined,
    }),
    [filters],
  )

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetExceptionsQuery(queryArgs)

  const groups = useMemo(
    () => groupExceptionsByDate(data?.data ?? []),
    [data?.data],
  )

  if (isLoading) {
    return <Spinner label="Loading exceptions…" />
  }

  if (isError) {
    return (
      <ErrorState
        message={
          (error && 'message' in error && typeof error.message === 'string'
            ? error.message
            : 'Failed to load exceptions') as string
        }
        onRetry={() => void refetch()}
      />
    )
  }

  if (groups.length === 0) {
    return (
      <EmptyState
        title="No exceptions found"
        description="Try adjusting product or severity filters, or check back after the next production cycle."
      />
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 px-0.5">
        <p className="text-sm text-surface-500">
          Showing{' '}
          <span className="font-semibold text-surface-800">
            {data?.pagination.total ?? groups.reduce((n, g) => n + g.counts.total, 0)}
          </span>{' '}
          exception{(data?.pagination.total ?? 0) === 1 ? '' : 's'} across{' '}
          <span className="font-semibold text-surface-800">{groups.length}</span>{' '}
          day{groups.length === 1 ? '' : 's'}
        </p>
        {isFetching && (
          <span className="text-xs font-medium text-surface-400">Updating…</span>
        )}
      </div>

      <div className="space-y-3">
        {groups.map((group, index) => (
          <DayGroup
            key={group.dateKey}
            group={group}
            defaultExpanded={index < 3}
          />
        ))}
      </div>
    </div>
  )
}
