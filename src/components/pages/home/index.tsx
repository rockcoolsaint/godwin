'use client'
import { Auction, AuctionOfTheDayResponse } from 'src/api/auction/types'
import AuctionOfTheDay from './AuctionOfTheDay'
import Testimonials from 'src/components/pages/home/Testimonial'
import { LocalStorageKeys } from 'src/constants/localStorage'
import { useAccountContext } from 'src/providers/AccountProvider'
import { isDateBefore } from 'src/utils/date'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Gradient from 'src/components/shared/Gradient'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import Hero from './Hero'
import Learn from './Learn'
import RealMachines from './RealMachines'
import JoinPool from './JoinPool'

interface Props {
  auctions: Auction[]
  auctionOfTheDay: AuctionOfTheDayResponse
  isDemo?: boolean
  code?: string
}

export default function Home({ auctionOfTheDay, isDemo, code }: Props) {
  const { account } = useAccountContext()
  const router = useRouter()
  const [_, setLoading] = useState(false)
  const [auctionData, setAuctionData] = useState<Auction[]>([])

  useEffect(() => {
    const prepareCollections = async () => {
      setLoading(true)
      try {
        const res = await getAllAuctions({
          limit: 1_000,
          auction_type: 'forward_date',
          group_by: 'auction_status',
          auction_status: 'active',
        })
        setAuctionData(res.results)
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }
    prepareCollections()
  }, [])

  useEffect(() => {
    if (account?.demo_expiration) {
      const isExpired = isDateBefore(account.demo_expiration)
      if (isExpired) router.push('/')
    }

    if (account?.email) {
      window.Intercom('boot', {
        user_id: account.id,
        email: account.email,
        // keep name undefined instead of an empty string so that intercom auto assigns a name
        name,
      })
    } else {
      window.Intercom('shutdown')
    }
  }, [account, router])

  if (code) {
    localStorage.setItem(LocalStorageKeys.Referral.plebtern, code)
  }

  const isLoggedIn = Boolean(account?.email)

  return (
    <div>
      {/* <DemoAlert className={clsx(!isLoggedIn ? '' : '')} msg={<div>Product in beta, please report bugs using the intercom below</div>} /> */}
      {!isLoggedIn && (
        <section className="mx-auto mt-8 flex max-w-[1824px] flex-col items-center justify-center sm:mt-14">
          <Gradient />
          <Hero />
          <Learn />
          <RealMachines />
          <JoinPool data={auctionData} />
        </section>
      )}

      <AuctionOfTheDay auction={auctionOfTheDay} />

      {!isDemo && !isLoggedIn && (
        <>
          <Testimonials />
        </>
      )}
    </div>
  )
}
