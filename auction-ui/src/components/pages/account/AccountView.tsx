import React from 'react'
import Container from 'src/core/components/Container'
import AccountSidebar from './AccountSidebar'

export default function AccountView({ children }: { children: React.ReactNode }) {
  return (
    <Container className="pt-8">
      <h1>Account settings</h1>
      <div className="mt-4 mb-8 flex items-start justify-start gap-8">
        <AccountSidebar />
        <div className="w-full rounded-xl border border-blue-100">{children}</div>
      </div>
    </Container>
  )
}
