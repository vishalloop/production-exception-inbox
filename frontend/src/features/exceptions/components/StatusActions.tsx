import { useUpdateExceptionStatusMutation } from '@/features/exceptions/api/exceptionsApi'
import { Button } from '@/shared/components/ui/Button'
import { ExceptionStatus, type ExceptionStatus as Status } from '@/shared/types/enums'
import type { Exception } from '@/shared/types/exception'

interface StatusActionsProps {
  exception: Exception
}

export function StatusActions({ exception }: StatusActionsProps) {
  const [updateStatus, { isLoading, error, reset }] =
    useUpdateExceptionStatusMutation()

  const current = exception.status
  const isResolved = current === ExceptionStatus.RESOLVED

  const handle = async (status: Status) => {
    reset()
    try {
      await updateStatus({ id: exception.id, status }).unwrap()
    } catch {
      // error rendered below
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {current === ExceptionStatus.OPEN && (
          <Button
            variant="warning"
            size="sm"
            isLoading={isLoading}
            onClick={() => void handle(ExceptionStatus.ACKNOWLEDGED)}
          >
            Acknowledge
          </Button>
        )}

        {!isResolved && (
          <Button
            variant="success"
            size="sm"
            isLoading={isLoading}
            onClick={() => void handle(ExceptionStatus.RESOLVED)}
          >
            Resolve
          </Button>
        )}

        {isResolved && (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
            This exception is resolved and cannot be reopened.
          </p>
        )}
      </div>

      {error && 'message' in error && (
        <p className="text-sm text-red-600" role="alert">
          {String(error.message)}
        </p>
      )}
    </div>
  )
}
