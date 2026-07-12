import { Badge } from '@/shared/components/ui/Badge'
import type { Severity } from '@/shared/types/enums'

const variantMap = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const

interface SeverityBadgeProps {
  severity: Severity
  size?: 'sm' | 'md'
}

export function SeverityBadge({ severity, size = 'sm' }: SeverityBadgeProps) {
  return (
    <Badge variant={variantMap[severity]} size={size}>
      <span
        className={
          severity === 'HIGH'
            ? 'size-1.5 rounded-full bg-red-500'
            : severity === 'MEDIUM'
              ? 'size-1.5 rounded-full bg-amber-500'
              : 'size-1.5 rounded-full bg-blue-500'
        }
      />
      {severity}
    </Badge>
  )
}
