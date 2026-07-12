import type { Exception } from '@/shared/types/exception'
import { cn } from '@/shared/lib/cn'
import { formatNumber, formatPercent } from '@/shared/lib/format'
import { SeverityBadge } from './SeverityBadge'
import { StatusBadge } from './StatusBadge'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectException } from '@/features/exceptions/slices/exceptionsUiSlice'

interface ExceptionRowProps {
  exception: Exception
}

export function ExceptionRow({ exception }: ExceptionRowProps) {
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector((s) => s.exceptionsUi.selectedExceptionId)
  const isSelected = selectedId === exception.id

  return (
    <button
      type="button"
      onClick={() => dispatch(selectException(exception.id))}
      className={cn(
        'group grid w-full grid-cols-1 gap-3 border-b border-surface-100 px-4 py-3.5 text-left transition-colors last:border-b-0',
        'hover:bg-surface-50 focus-visible:bg-surface-50 focus-visible:outline-none',
        'sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_auto_auto]',
        'sm:items-center',
        isSelected && 'bg-surface-100/80 hover:bg-surface-100',
      )}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-semibold text-surface-900">
            {exception.product_code}
          </span>
          <SeverityBadge severity={exception.severity} />
          <StatusBadge status={exception.status} />
        </div>
        <p className="mt-1 text-xs text-surface-500">
          Plant <span className="font-medium text-surface-700">{exception.plant}</span>
          <span className="mx-1.5 text-surface-300">·</span>
          ID #{exception.id}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
        <Metric label="Planned" value={formatNumber(exception.planned_units)} />
        <Metric label="Actual" value={formatNumber(exception.actual_units)} />
        <Metric
          label="Deficit"
          value={formatNumber(exception.deficit_units)}
          accent
        />
      </div>

      <div className="flex items-center gap-3 sm:justify-end">
        <div className="text-right">
          <p className="text-[11px] font-medium uppercase tracking-wide text-surface-400">
            Gap
          </p>
          <p className="text-sm font-bold text-red-600">
            {formatPercent(exception.deficit_percentage)}
          </p>
        </div>
        <svg
          className={cn(
            'size-4 shrink-0 text-surface-400 transition-transform',
            isSelected && 'text-surface-700',
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  )
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-surface-400">
        {label}
      </p>
      <p
        className={cn(
          'font-semibold tabular-nums',
          accent ? 'text-red-600' : 'text-surface-800',
        )}
      >
        {value}
      </p>
    </div>
  )
}
