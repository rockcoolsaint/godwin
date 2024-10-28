         
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

const Testimonials = dynamic(() => import('src/components/pages/home/Testimonial'), {
  ssr: false,
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
      <div className="flex items-center justify-center gap-x-6 bg-indigo-600 px-6 py-2.5 sm:px-3.5">
        <p className="text-sm leading-6 text-white">
          <a href="https://rigly.io/auction-market">
            <strong className="font-semibold">{formatDateWithSuffix(new Date())}</strong>
            <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
              <circle cx={1} cy={1} r={1} />
            </svg>
            Check out our new mining auctions!
          </a>
        </p>
      </div>
      {isLoggedIn && (
        <>
          <section className="mx-auto mt-8 flex flex-col items-center justify-center sm:mt-14">
            <Gradient />
            <Hero />
            <div className="mt-20" />
            <RealMachines />
          </section>
          <section className="-mt-6 flex w-full flex-col items-center justify-center border border-solid border-gray-300 py-12 sm:px-4 sm:py-28 md:px-0">
            {auctionOfTheDay && <AOTD auction={auctionOfTheDay} />}
            {auctionData.length > 0 && auctionOfTheDay && (
              <>
                <div className="w-full max-w-7xl overflow-auto sm:mt-28">
                  <UpcomingAuctions auction={auctionOfTheDay} auctionsData={auctionData} />
                </div>
                <Link href="/auction-market" className="mt-10 rounded-xl bg-navy p-2 font-epilogue text-sm font-bold text-white lg:p-4">
                  Explore Auctions
                </Link>
              </>
            )}
          </section>
          <section className="auction-of-the-day-gradient flex w-full flex-col items-center justify-center px-4 pb-20 md:px-0">
            <h1 className="mt-20 font-chakra text-4xl text-navy lg:text-5xl 2xl:text-7xl">Support</h1>
            <p className="mt-2 text-center text-xs text-navy md:w-6/12 md:text-xl lg:w-7/12 lg:text-3xl 2xl:w-6/12">
              Whether you&apos;re brand new to mining, or a seasoned bitcoiner, our support team is here to answer your questions
            </p>

            <div className="mx-auto mt-14 flex flex-col justify-center md:items-center md:px-10 lg:flex-row xl:px-20">
              <div className="mb-12 flex w-full flex-col items-start rounded-xl border border-gray-400 bg-white p-8 sm:min-h-[320px] md:mb-0 md:w-8/12 xl:w-4/12 xl:px-8 2xl:w-3/12 2xl:px-12">
                <div className="">
                  <h2 className="mb-5 w-10/12 text-xl font-semibold text-navy xl:text-3xl">Learn how Bitcoin mining works</h2>
                  <p className="mb-5 text-lg text-black xl:text-xl">
                    There are lots of reasons why someone chooses to mine bitcoin. Read more in this essay from Braiins.
                  </p>
                </div>
                <div className="">
                  <Link
                    href="https://braiins.com/blog/why-mine-bitcoin-braiins-mining"
                    className="flex rounded-lg bg-navy px-8 py-4 font-epilogue text-lg text-white hover:opacity-90"
                    target="_blank"
                  >
                    Read the article
                  </Link>
                </div>
              </div>

              <div className="mb-12 flex w-full flex-col items-start rounded-xl border border-gray-400 bg-white p-8 sm:mx-20 sm:min-h-[320px] md:mx-0 md:my-8 md:w-8/12 lg:mx-8 lg:my-0 xl:w-4/12 xl:px-8 2xl:w-3/12 2xl:px-12">
                <h2 className="mb-5 w-10/12 text-xl font-semibold text-navy xl:text-3xl">How to bid on auctions</h2>
                <p className="mb-5 text-lg text-black xl:text-xl">
                  The Rigly experience is quick and seamless, giving you the opportunity to start mining right away.
                </p>

                <div className="">
                  <Link
                    href="https://blog.rigly.io/how-to-bid-on-hashrate/"
                    className="flex rounded-lg bg-navy px-8 py-4 font-epilogue text-lg text-white hover:opacity-90"
                    target="_blank"
                  >
                    Read the article
                  </Link>
                </div>
              </div>

              <div className="mb-12 flex w-full flex-col items-start rounded-xl border border-gray-400 bg-white p-8 sm:min-h-[320px] md:mb-0 md:w-8/12 md:px-6 xl:w-4/12 xl:px-8 2xl:w-3/12 2xl:px-16">
                <div className="">
                  <h2 className="mb-5 w-10/12 text-xl font-semibold text-navy xl:text-3xl">Want to sell your hashrate?</h2>
                  <p className="mb-5 text-lg text-black xl:text-xl">Earn more for your hashrate on the Rigly marketplace.</p>
                </div>
                <div className="">
                  <Link
                    href="#"
                    className="flex rounded-lg bg-navy px-8 py-4 font-epilogue text-lg text-white hover:opacity-90"
                    target="_blank"
                  >
                    Read the article
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      {!isLoggedIn && (
        <>
          <section className="mx-auto mt-8 flex flex-col items-center justify-center sm:mt-14">
            <Gradient />
            <Hero>
              <>
                <div className="mb-20 mt-6 flex w-full flex-col items-center justify-center font-chakra font-bold sm:flex-row sm:px-10 lg:mt-12 lg:px-0">
                  <Link
                    href="#try-mining"
                    className="lg:h-15 mb-5 flex w-11/12 items-center justify-center rounded-full bg-hero-gradient px-5 py-4 text-lg text-white outline-none hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gradient-disabled sm:mb-0 lg:w-8/12 lg:text-2xl xl:w-4/12"
                  >
                    Try it out
                  </Link>
                  <Link
                    href="#auction-market"
                    className="lg:h-15 flex w-11/12 items-center justify-center rounded-full bg-gradient px-5 py-4 text-lg text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled sm:ml-16 lg:w-8/12 lg:text-2xl xl:w-4/12"
                  >
                    Place your bid
                  </Link>
                </div>
              </>
            </Hero>
            <RealMachines />
            <section id="auction-market" className="flex w-full flex-col items-center justify-center px-4 py-28 md:px-0">
              {auctionOfTheDay && <AOTD auction={auctionOfTheDay} />}
              {auctionData?.length > 0 && auctionOfTheDay && (
                <div className="w-full max-w-7xl overflow-auto sm:mt-24">
                  <UpcomingAuctions auction={auctionOfTheDay} auctionsData={auctionData} />
                </div>
              )}
            </section>
            <Learn />
            
            <div className="container mx-auto px-4 py-8">
              <h1 className="mt-36 text-center font-chakra text-4xl text-navy lg:text-5xl 2xl:text-7xl">Join our marketplace</h1>
              <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Left side box (Buyers) */}
                <div className="flex flex-col justify-between rounded-lg bg-white p-6 text-center shadow-md" style={{ height: '100%' }}>
                  <div>
                    <h3 className="mb-4 text-xl font-bold">Buyers</h3>
                    <p className="mb-4 text-gray-600">
                      Take a test drive. Buy 3 hours of hashrate and try it out.
                    </p>
                    <p className="mb-4 text-gray-600">
                      If you're new to mining, we'll create a Braiins pool account for you.
                    </p>
                  </div>
                  <div className="flex flex-row space-x-4">
                    <Link
                      href="/test-drive"
                      className={`${buttonClass} flex-1`}
                      target="_blank"
                      id="test-drive"
                    >
                      I need a pool account
                    </Link>
                    <Link
                      href="/direct-sale"
                      className={`${buttonClass} flex-1`}
                      target="_blank"
                      id="direct-sale"
                    >
                      I have a pool account
                    </Link>
                  </div>
                </div>

                {/* Right side box (Sellers) */}
                <div className="flex flex-col justify-between rounded-lg bg-white p-6 text-center shadow-md" style={{ height: '100%' }}>
                  <div>
                    <h3 className="mb-4 text-xl font-bold">Sellers</h3>
                    <p className="mb-4 text-gray-600">List your hashrate. Get upfront payment and grow faster.</p>
                  </div>
                  <Link
                    href="/learn/rigly"
                    className={buttonClass}
                    target="_blank"
                    id="seller-info"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}


          <Testimonials />
    </div>
  )
}
