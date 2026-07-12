import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectException } from '@/features/exceptions/slices/exceptionsUiSlice'
import { useGetExceptionByIdQuery } from '@/features/exceptions/api/exceptionsApi'
import { Spinner } from '@/shared/components/ui/Spinner'
import { ErrorState } from '@/shared/components/ui/ErrorState'
import { Button } from '@/shared/components/ui/Button'
import {
  formatDate,
  formatNumber,
  formatPercent,
  formatRelativeTime,
} from '@/shared/lib/format'
import { SeverityBadge } from './SeverityBadge'
import { StatusBadge } from './StatusBadge'
import { ExceptionTrendChart } from './ExceptionTrendChart'
import { StatusActions } from './StatusActions'
import { cn } from '@/shared/lib/cn'

export function ExceptionDetailPanel() {
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector((s) => s.exceptionsUi.selectedExceptionId)
  const isOpen = selectedId !== null

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetExceptionByIdQuery(selectedId as number, {
      skip: selectedId === null,
    })

  const close = () => dispatch(selectException(null))

  return (
    <>
      {/* Backdrop (mobile / always clickable to close) */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-surface-950/40 transition-opacity',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={close}
        aria-hidden={!isOpen}
      />

      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-white shadow-2xl transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-hidden={!isOpen}
        role="dialog"
        aria-label="Exception detail"
      >
        <header className="flex items-start justify-between gap-3 border-b border-surface-200 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-surface-400">
              Exception detail
            </p>
            {data?.exception ? (
              <h2 className="mt-1 truncate text-lg font-bold text-surface-900">
                {data.exception.product_code}
              </h2>
            ) : (
              <h2 className="mt-1 text-lg font-bold text-surface-900">
                {selectedId ? `#${selectedId}` : '—'}
              </h2>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={close} aria-label="Close panel">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {!isOpen && null}

          {isOpen && isLoading && <Spinner label="Loading exception…" />}

          {isOpen && isError && (
            <ErrorState
              message={
                error && 'message' in error
                  ? String(error.message)
                  : 'Failed to load exception detail'
              }
              onRetry={() => void refetch()}
            />
          )}

          {isOpen && data && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <SeverityBadge severity={data.exception.severity} size="md" />
                <StatusBadge status={data.exception.status} size="md" />
                {isFetching && (
                  <span className="text-xs text-surface-400">Syncing…</span>
                )}
              </div>

              <dl className="grid grid-cols-2 gap-3">
                <InfoTile label="Date" value={formatDate(data.exception.date)} />
                <InfoTile label="Plant" value={data.exception.plant} />
                <InfoTile label="Product" value={data.exception.product_code} />
                <InfoTile
                  label="Updated"
                  value={formatRelativeTime(data.exception.updated_at)}
                />
              </dl>

              <section>
                <h3 className="mb-3 text-sm font-semibold text-surface-900">
                  Production numbers
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <MetricCard
                    label="Planned units"
                    value={formatNumber(data.exception.planned_units)}
                  />
                  <MetricCard
                    label="Actual units"
                    value={formatNumber(data.exception.actual_units)}
                  />
                  <MetricCard
                    label="Deficit units"
                    value={formatNumber(data.exception.deficit_units)}
                    tone="danger"
                  />
                  <MetricCard
                    label="Deficit %"
                    value={formatPercent(data.exception.deficit_percentage)}
                    tone="danger"
                  />
                </div>
              </section>

              <section>
                <div className="mb-3 flex items-end justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-surface-900">
                      7-day trend
                    </h3>
                    <p className="text-xs text-surface-500">
                      Planned vs actual for this product & plant
                    </p>
                  </div>
                </div>
                <ExceptionTrendChart trend={data.trend} />
              </section>

              <section className="rounded-xl border border-surface-200 bg-surface-50 p-4">
                <h3 className="mb-3 text-sm font-semibold text-surface-900">
                  Actions
                </h3>
                <StatusActions exception={data.exception} />
              </section>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2.5">
      <dt className="text-[11px] font-medium uppercase tracking-wide text-surface-400">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold text-surface-900">{value}</dd>
    </div>
  )
}

function MetricCard({
  label,
  value,
  tone = 'default',
}: {
  label: string
  value: string
  tone?: 'default' | 'danger'
}) {
  return (
    <div className="rounded-xl border border-surface-200 bg-white px-3.5 py-3 shadow-sm">
      <p className="text-[11px] font-medium uppercase tracking-wide text-surface-400">
        {label}
      </p>
      <p
        className={cn(
          'mt-1 text-xl font-bold tabular-nums',
          tone === 'danger' ? 'text-red-600' : 'text-surface-900',
        )}
      >
        {value}
      </p>
    </div>
  )
}
