import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  resetFilters,
  setProductFilter,
  setSeverityFilter,
  setStatusFilter,
} from '@/features/exceptions/slices/exceptionsUiSlice'
import { Select } from '@/shared/components/ui/Select'
import { Button } from '@/shared/components/ui/Button'
import { SEVERITY_OPTIONS, STATUS_OPTIONS, type Severity, type ExceptionStatus } from '@/shared/types/enums'
import { useGetExceptionsQuery } from '@/features/exceptions/api/exceptionsApi'
import { extractProductCodes } from '@/features/exceptions/utils/groupByDate'

export function ExceptionFilters() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((s) => s.exceptionsUi.filters)

  // Unfiltered list (broad) to populate product options
  const { data: allData } = useGetExceptionsQuery({ limit: 200, page: 1 })

  const productCodes = useMemo(
    () => extractProductCodes(allData?.data ?? []),
    [allData?.data],
  )

  const hasActiveFilters =
    Boolean(filters.product_code) ||
    Boolean(filters.severity) ||
    Boolean(filters.status)

  return (
    <div className="rounded-xl border border-surface-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-surface-900">Filters</h2>
          <p className="text-xs text-surface-500">
            Apply across the full exception timeline
          </p>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(resetFilters())}
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Select
          label="Product"
          value={filters.product_code}
          onChange={(e) => dispatch(setProductFilter(e.target.value))}
        >
          <option value="">All products</option>
          {productCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </Select>

        <Select
          label="Severity"
          value={filters.severity}
          onChange={(e) =>
            dispatch(setSeverityFilter(e.target.value as Severity | ''))
          }
        >
          <option value="">All severities</option>
          {SEVERITY_OPTIONS.map((sev) => (
            <option key={sev} value={sev}>
              {sev}
            </option>
          ))}
        </Select>

        <Select
          label="Status"
          value={filters.status}
          onChange={(e) =>
            dispatch(setStatusFilter(e.target.value as ExceptionStatus | ''))
          }
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}
