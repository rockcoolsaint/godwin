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
      <div className="text-left font-chakra text-sm">
        At Rigly, we’ve chosen a unique approach to selling Bitcoin mining hashrate: auctions. This method is’t just a business choice; it’s
        a response to the intrinsic nature of Bitcoin mining and the marketplace dynamics. Here’s why auctions are the best fit for selling
        hashrate on Rigly:
      </div>
      <Section title="Hashrate Is a Scarce Resource">
        Bitcoin mining depends on the availability of mining farms, which are not only limited in number but also in the amount of hashrate
        they can produce at any given time. Among these, only a select few choose to sell their hashrate through Rigly. This scarcity of
        hashrate makes it a valuable commodity, much like a rare gem in a sea of stones. Auctions are an effective way to manage such a
        scarce resource, ensuring that it is available to those who value it most.
      </Section>
      <Section title="High Demand Among Buyers">
        The desire to mine Bitcoin is driven by several factors, chief among them the opportunity to earn new Bitcoin directly from the
        protocol. This is a powerful incentive, and as a result, the demand for hashrate significantly exceeds the supply available. With
        more buyers than there is available hashrate, an auction becomes the most fair and efficient method to distribute this limited
        resource: everyone gets a fair chance to bid for the hashrate they need.
      </Section>
      <Section title="Max Returns for Miners">
        For miners, the decision to sell hashrate rather than mine for themselves is driven by economics. By auctioning their hashrate,
        miners can often earn more than they would through mining themselves. This is because the auction format allows buyers to bid
        competitively, pushing the price to its highest possible point. The miner benefits from the highest bid, which often includes a
        premium over the regular spot hashprice. For the buyer, winning the auction means securing a coveted resource in a competitive
        market, and for the miner, it translates to maximum earnings. It’s truly a win-win situation.
      </Section>
      <Section title="Fair and Balanced">
        The auction model at Rigly isn’t just about buying and selling; it’s about creating a dynamic marketplace that respects the value of
        hashrate, balances supply and demand, and maximizes the benefits for both buyers and sellers. This approach not only fosters
        fairness but also encourages a healthy competitive spirit that is essential for a thriving market.
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
    <div className="text-med font-chakra font-bold text-navy lg:text-xl">{title}</div>
    <div className="text-left font-chakra text-sm">{children}</div>
  </div>
)
