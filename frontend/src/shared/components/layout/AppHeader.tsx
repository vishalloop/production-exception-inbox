import { NavLink } from 'react-router-dom'
import { cn } from '@/shared/lib/cn'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
    isActive
      ? 'bg-surface-900 text-white'
      : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900',
  )

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-surface-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-surface-900 text-xs font-bold text-white">
            PX
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-surface-900">
              Production Exceptions
            </p>
            <p className="hidden text-[11px] text-surface-500 sm:block">
              Ops monitoring console
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
