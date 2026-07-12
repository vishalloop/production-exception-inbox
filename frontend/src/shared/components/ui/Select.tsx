import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export function Select({ label, className, id, children, ...props }: SelectProps) {
  const selectId = id ?? props.name

  return (
    <label className="flex flex-col gap-1.5 text-sm">
      {label && (
        <span className="font-medium text-surface-600">{label}</span>
      )}
      <select
        id={selectId}
        className={cn(
          'h-9 rounded-lg border border-surface-300 bg-white px-3 text-sm text-surface-900',
          'shadow-sm transition-colors',
          'focus:border-surface-500 focus:outline-none focus:ring-2 focus:ring-surface-200',
          'disabled:cursor-not-allowed disabled:bg-surface-100',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  )
}
