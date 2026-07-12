import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/shared/components/layout/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
