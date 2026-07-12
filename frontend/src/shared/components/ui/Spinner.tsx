import { cn } from '@/shared/lib/cn'

interface SpinnerProps {
  className?: string
  label?: string
}

export function Spinner({ className, label = 'Loading…' }: SpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-12', className)}>
      <span className="size-8 animate-spin rounded-full border-[3px] border-surface-200 border-t-surface-800" />
      <p className="text-sm text-surface-500">{label}</p>
    </div>
  )
}
