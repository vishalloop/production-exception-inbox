import type { ReactNode } from 'react'
import { AppHeader } from './AppHeader'
import { ExceptionDetailPanel } from '@/features/exceptions/components/ExceptionDetailPanel'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-surface-50">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
      <ExceptionDetailPanel />
    </div>
  )
}
