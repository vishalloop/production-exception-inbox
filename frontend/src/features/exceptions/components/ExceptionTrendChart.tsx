import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import type { TrendPoint } from '@/shared/types/exception'
import { formatNumber } from '@/shared/lib/format'

interface ExceptionTrendChartProps {
  trend: TrendPoint[]
}

export function ExceptionTrendChart({ trend }: ExceptionTrendChartProps) {
  const chartData = trend.map((point) => {
    const d = new Date(point.date)
    return {
      ...point,
      label: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      shortDate: d.toISOString().slice(0, 10),
    }
  })

  if (chartData.length === 0) {
    return (
      <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-surface-200 bg-surface-50 text-sm text-surface-500">
        No 7-day trend data available for this product/plant.
      </div>
    )
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            width={48}
            tickFormatter={(v: number) => formatNumber(v)}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
              fontSize: 12,
            }}
            formatter={(value, name) => [
              formatNumber(Number(value ?? 0)),
              name === 'planned_units' ? 'Planned' : 'Actual',
            ]}
            labelFormatter={(_, payload) => {
              const row = payload?.[0]?.payload as { shortDate?: string } | undefined
              return row?.shortDate ?? ''
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            formatter={(value) =>
              value === 'planned_units' ? 'Planned' : 'Actual'
            }
          />
          <Area
            type="monotone"
            dataKey="actual_units"
            stroke="#2563eb"
            strokeWidth={2}
            fill="url(#actualFill)"
            dot={{ r: 3, fill: '#2563eb' }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="planned_units"
            stroke="#0f172a"
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={{ r: 3, fill: '#0f172a' }}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
