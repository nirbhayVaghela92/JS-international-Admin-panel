import Users from '@/components/pages/Users'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Users",
};

function UsersPage() {
  return (
    <Users />
  )
}

export default UsersPage