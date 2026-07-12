import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type BadgeVariant =
  | 'default'
  | 'high'
  | 'medium'
  | 'low'
  | 'open'
  | 'acknowledged'
  | 'resolved'
  | 'neutral'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
  size?: 'sm' | 'md'
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-100 text-surface-700 ring-surface-200',
  high: 'bg-red-50 text-red-700 ring-red-200',
  medium: 'bg-amber-50 text-amber-800 ring-amber-200',
  low: 'bg-blue-50 text-blue-700 ring-blue-200',
  open: 'bg-red-50 text-red-700 ring-red-200',
  acknowledged: 'bg-amber-50 text-amber-800 ring-amber-200',
  resolved: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  neutral: 'bg-surface-100 text-surface-600 ring-surface-200',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-2.5 py-1 text-xs',
}

export function Badge({
  children,
  variant = 'default',
  className,
  size = 'md',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wide ring-1 ring-inset',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  )
}
