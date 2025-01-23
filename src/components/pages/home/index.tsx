         
'use client'
import { Auction, AuctionOfTheDayResponse } from 'src/api/auction/types'
import { LocalStorageKeys } from 'src/constants/localStorage'
import { useAccountContext } from 'src/providers/AccountProvider'
import { useEffect, useState } from 'react'
import Gradient from 'src/components/shared/Gradient'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import Hero from './Hero'
import Link from 'src/components/shared/Link'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import { getAuctionOfTheDay } from 'src/api/auction/getAuctionOfTheDay'

const TrustlessMining = dynamic(() => import('./TrustlessMining'), {
  ssr: true
})



const Learn = dynamic(() => import('./Learn'), {
  ssr: false,
})

const AOTD = dynamic(() => import('./AOTD'), {
  ssr: false,
})

const RealMachines = dynamic(() => import('./RealMachines'), {
  ssr: false,
})

const UpcomingAuctions = dynamic(() => import('./UpcomingAuctions'), {
  ssr: false,
})

interface Props {
  isDemo?: boolean
  code?: string
}

const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

const formatDateWithSuffix = (date: Date) => {
  const day = format(date, 'd');
  const month = format(date, 'MMMM');
  const dayNumber = parseInt(day, 10);
  const suffix = getOrdinalSuffix(dayNumber);
  return `${month} ${dayNumber}${suffix}`;
};

// Common button style class
const buttonClass = "w-full flex items-center justify-center rounded-lg bg-navy px-8 py-4 font-epilogue text-lg text-white hover:opacity-90";

export default function Home({ isDemo, code }: Props) {
  const { account } = useAccountContext()
  const [_, setLoading] = useState(false)
  const [auctionData, setAuctionData] = useState<Auction[]>([])
  const [auctionOfTheDay, setAuctionOfTheDay] = useState<AuctionOfTheDayResponse | null>(null)
  const isLoggedIn = Boolean(account?.email)

  useEffect(() => {
    const prepareCollections = async () => {
      setLoading(true)
      try {
        const res = await getAllAuctions({
          limit: 1_000,
          group_by: 'auction_status',
          auction_status: 'active',
        })
        const resAuctionOfTheDay = await getAuctionOfTheDay({ isDemo: false })
        setAuctionOfTheDay(resAuctionOfTheDay)
        setAuctionData(res.results)
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }
    prepareCollections()
  }, [])

  if (code) {
    localStorage.setItem(LocalStorageKeys.Referral.plebtern, code)
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-x-6 bg-[#f08222] px-6 py-2.5 sm:px-3.5">
        <p className="text-sm leading-6 text-white">
          <a href="https://solo.ckpool.org/users/3Gk1GfP3bHA6M2ZzK5mHdqbWN1iNsqAenH">
            <strong className="font-semibold">{formatDateWithSuffix(new Date())}</strong>
            <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
              <circle cx={1} cy={1} r={1} />
            </svg>
            The party don't stop till we get a block!
          </a>
        </p>
      </div>

        <>
          <section className="mx-auto mt-8 flex flex-col items-center justify-center sm:mt-14">
            <Gradient />
            <Hero>
              <>
                <div className="mb-20 mt-6 flex w-full justify-center font-chakra font-bold">
                <Link
                href="/learn/upendo"
                className="lg:h-15 flex w-11/12 items-center justify-center rounded-full bg-[#f08222] px-5 py-4 text-lg text-white outline-none hover:bg-[#d97420] disabled:cursor-not-allowed disabled:opacity-50 lg:w-8/12 lg:text-2xl xl:w-4/12"
              >
                Join the party
              </Link>
              </div>
              </>
            </Hero>
            <TrustlessMining />
            <section className="-mt-6 flex w-full flex-col items-center justify-center border border-solid border-gray-300 py-12 sm:px-4 sm:py-28 md:px-0">
            {auctionOfTheDay && <AOTD auction={auctionOfTheDay} />}
            {auctionData.length > 0 && auctionOfTheDay && (
              <>
                <div className="w-full max-w-7xl overflow-auto sm:mt-28">
                  <UpcomingAuctions auction={auctionOfTheDay} auctionsData={auctionData} />
                </div>
                <Link href="/auction-market" className="mt-10 rounded-xl bg-navy p-2 font-epilogue text-sm font-bold text-white lg:p-4">
                  Explore All Auctions
                </Link>
              </>
            )}
          </section>
          <RealMachines />

          </section>

        </>

    </div>
  )
}
