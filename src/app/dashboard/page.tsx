import Dashboard from '@/components/pages/Dashboard'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dashboard - Admin Panel",
};

function DashboardPage() {
  return (
    <Dashboard />
  )
}

export default DashboardPage