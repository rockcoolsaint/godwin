'use client'

import { useAccountContext } from 'src/providers/AccountProvider'

export default function FAQs() {
  const { account } = useAccountContext()
  const isLoggedIn = Boolean(account?.email)

  if (isLoggedIn) {
    return null
  }

  return (
<div></div>
  )
}

interface SectionProps {
  title: string
  children: React.ReactNode
}

const Section = ({ title, children }: SectionProps) => (
  <div className="flex flex-col gap-2">
    <div className="text-center text-med font-chakra font-bold text-navy lg:text-xl">{title}</div>
    <div className="text-center font-chakra text-medium">{children}</div>
  </div>
)
