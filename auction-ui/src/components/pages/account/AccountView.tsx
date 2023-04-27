import React from 'react'
import Container from 'src/core/components/Container'
import AccountSidebar from './AccountSidebar'

export default function AccountView({ children }: { children: React.ReactNode }) {
  return (
    <Container className="pt-8">
      <h1>Account settings</h1>
      <div className="mb-8 mt-4 flex flex-col items-start justify-start gap-8 lg:flex-row">
        <AccountSidebar />
        <div className="w-full rounded-xl border border-blue-100">{children}</div>
      </div>
    </Container>
  )
}
