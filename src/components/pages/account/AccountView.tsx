import React from 'react'

export default function AccountView({ children }: { children: React.ReactNode }) {
  return <div className="w-full rounded-xl border border-orange-200">{children}</div>
}