import { Badge } from '@/shared/components/ui/Badge'
import type { ExceptionStatus } from '@/shared/types/enums'

const variantMap = {
  OPEN: 'open',
  ACKNOWLEDGED: 'acknowledged',
  RESOLVED: 'resolved',
} as const

const labels = {
  OPEN: 'Open',
  ACKNOWLEDGED: 'Acknowledged',
  RESOLVED: 'Resolved',
} as const

interface StatusBadgeProps {
  status: ExceptionStatus
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  return (
    <Badge variant={variantMap[status]} size={size}>
      {labels[status]}
    </Badge>
  )
}
