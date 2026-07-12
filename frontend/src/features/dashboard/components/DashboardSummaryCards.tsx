import { useGetDashboardSummaryQuery } from '@/features/exceptions/api/exceptionsApi'
import { cn } from '@/shared/lib/cn'
import { formatNumber } from '@/shared/lib/format'

export function DashboardSummaryCards() {
  const { data, isLoading, isError } = useGetDashboardSummaryQuery()

  if (isError) {
    return null
  }

  const cards = [
    {
      key: 'total',
      label: 'Total exceptions',
      value: data?.total,
      accent: 'bg-surface-900 text-white',
      hint: 'All severities',
    },
    {
      key: 'high',
      label: 'High severity',
      value: data?.high,
      accent: 'bg-red-50 text-red-700 ring-1 ring-red-100',
      hint: 'Needs urgent attention',
    },
    {
      key: 'medium',
      label: 'Medium severity',
      value: data?.medium,
      accent: 'bg-amber-50 text-amber-800 ring-1 ring-amber-100',
      hint: 'Monitor closely',
    },
    {
      key: 'low',
      label: 'Low severity',
      value: data?.low,
      accent: 'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
      hint: 'Lower priority',
    },
    {
      key: 'open',
      label: 'Open',
      value: data?.open,
      accent: 'bg-white text-surface-900 ring-1 ring-surface-200',
      hint: 'Awaiting action',
    },
    {
      key: 'resolved',
      label: 'Resolved',
      value: data?.resolved,
      accent: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
      hint: 'Closed out',
    },
  ] as const

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <div
          key={card.key}
          className={cn(
            'rounded-xl px-4 py-3.5 shadow-sm transition-shadow hover:shadow-md',
            card.accent,
          )}
        >
          <p
            className={cn(
              'text-[11px] font-semibold uppercase tracking-wide opacity-80',
              card.key === 'total' ? 'text-white/80' : '',
            )}
          >
            {card.label}
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums">
            {isLoading || card.value === undefined ? '—' : formatNumber(card.value)}
          </p>
          <p
            className={cn(
              'mt-1 text-[11px]',
              card.key === 'total' ? 'text-white/70' : 'text-current/70',
            )}
          >
            {card.hint}
          </p>
        </div>
      ))}
    </div>
  )
}
