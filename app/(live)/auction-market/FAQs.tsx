'use client'

import { useAccountContext } from 'src/providers/AccountProvider'

export default function FAQs() {
  const { account } = useAccountContext()
  const isLoggedIn = Boolean(account?.email)

  if (isLoggedIn) {
    return null
  }

  return (
    <div className="mt-10 flex flex-col gap-3">
      <div className="text-center font-chakra text-lg font-bold text-blue-700 lg:text-3xl">Why Auctions?</div>
      <div className="text-center font-chakra text-medium">
        3 reasons why auctions are the best fit for selling hashrate on Rigly:
      </div>
      <Section title="Hashrate Is a Scarce Resource">
        Auctions help ensure limited hashrate is allocated to those who value it most.
      </Section>
      <Section title="High Demand Among Buyers">
        Auctions offer a fair way for buyers to bid for scarce hashrate. 
      </Section>
      <Section title="Fair and Balanced">
        Auctions balance supply and demand, ensuring a fair marketplace that benefits both buyers and sellers. 
      </Section>
      </div>
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
