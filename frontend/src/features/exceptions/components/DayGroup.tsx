import type { DayGroup as DayGroupType } from '@/features/exceptions/utils/groupByDate'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { toggleDayCollapsed } from '@/features/exceptions/slices/exceptionsUiSlice'
import { cn } from '@/shared/lib/cn'
import { Badge } from '@/shared/components/ui/Badge'
import { ExceptionRow } from './ExceptionRow'

interface DayGroupProps {
  group: DayGroupType
  defaultExpanded?: boolean
}

export function DayGroup({ group, defaultExpanded = true }: DayGroupProps) {
  const dispatch = useAppDispatch()
  const collapsedMap = useAppSelector((s) => s.exceptionsUi.collapsedDays)

  // undefined => use defaultExpanded (first days open)
  const isCollapsed =
    group.dateKey in collapsedMap
      ? collapsedMap[group.dateKey]
      : !defaultExpanded

  return (
    <section className="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() =>
          dispatch(
            toggleDayCollapsed({
              day: group.dateKey,
              currentlyCollapsed: isCollapsed,
            }),
          )
        }
        className="flex w-full items-center justify-between gap-3 bg-surface-50/80 px-4 py-3.5 text-left transition-colors hover:bg-surface-100"
        aria-expanded={!isCollapsed}
      >
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              'flex size-7 shrink-0 items-center justify-center rounded-md bg-white text-surface-600 shadow-sm ring-1 ring-surface-200 transition-transform',
              !isCollapsed && 'rotate-90',
            )}
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-surface-900 sm:text-base">
              {group.dateLabel}
            </h3>
            <p className="text-xs text-surface-500">
              {group.counts.total} exception{group.counts.total === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {group.counts.high > 0 && (
            <Badge variant="high" size="sm">
              {group.counts.high} high
            </Badge>
          )}
          {group.counts.medium > 0 && (
            <Badge variant="medium" size="sm">
              {group.counts.medium} med
            </Badge>
          )}
          {group.counts.low > 0 && (
            <Badge variant="low" size="sm">
              {group.counts.low} low
            </Badge>
          )}
        </div>
      </button>

      {!isCollapsed && (
        <div className="divide-y divide-surface-100">
          {group.exceptions.map((exception) => (
            <ExceptionRow key={exception.id} exception={exception} />
          ))}
        </div>
      )}
    </section>
  )
}
