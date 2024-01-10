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
import Warp from 'src/assets/svg/warp.svg'

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
      {isLoggedIn && (
        <section className="mx-auto mt-8 flex max-w-[1824px] flex-col items-center justify-center sm:mt-14">
          <Gradient />
          <Hero />
          <div className="mt-20" />
          <RealMachines />
        </section>
      )}
      {!isLoggedIn && (
        <section className="mx-auto mt-8 flex max-w-[1824px] flex-col items-center justify-center sm:mt-14">
          <Gradient />
          <Hero>
            <>
              <div className="mb-20 mt-6 flex w-full flex-col items-center justify-center font-chakra font-bold sm:flex-row lg:mt-12">
                <button
                  type="submit"
                  className="mb-5 flex w-11/12 items-center justify-center rounded-full bg-hero-gradient px-5 py-4 text-sm text-white outline-none hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gradient-disabled sm:mb-0 lg:h-20 lg:w-9/12 lg:text-3xl xl:w-6/12"
                >
                  Try it out
                </button>
                <button
                  type="submit"
                  className="flex w-11/12 items-center justify-center rounded-full bg-gradient px-5 py-4 text-sm text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled sm:ml-16 lg:h-20 lg:w-9/12 lg:text-3xl xl:w-6/12"
                >
                  Buy Hashrate
                </button>
              </div>
              <Warp />
              <div className="mt-8 w-7/12 bg-clip-text text-center font-chakra text-2xl font-extrabold leading-10 text-navy md:w-10/12 md:text-center lg:w-11/12 lg:text-center lg:text-5xl xl:text-7xl 2xl:w-4/5">
                Trustless bitcoin mining for <span className="text-primary">everyone</span>
              </div>
            </>
          </Hero>
          <Learn />
          <RealMachines />
          <JoinPool data={auctionData} />
        </section>
      )}

      <AuctionOfTheDay auction={auctionOfTheDay} auctionsData={auctionData} />

      {!isDemo && !isLoggedIn && (
        <>
          <Testimonials />
        </>
      )}
    </div>
  )
}
