import Dashboard from '@/components/pages/Dashboard'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Dashboard - Admin Panel",
};

function DashboardPage() {
  return (
    <Dashboard />
  )
}

export default DashboardPage