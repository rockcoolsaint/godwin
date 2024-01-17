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
import { MiningCalculator } from './JoinPool/Calculator'
import Link from 'src/components/shared/Link'
import { format } from 'date-fns'

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
      <div className="flex items-center justify-center gap-x-6 bg-indigo-600 px-6 py-2.5 sm:px-3.5">
        <p className="text-sm leading-6 text-white">
          <a href="#">
            <strong className="font-semibold">{format(Date.now(), 'MMM dd')}</strong>
            <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
              <circle cx={1} cy={1} r={1} />
            </svg>
            We are currently experiencing an outage, your mining may be offline
          </a>
        </p>
      </div>
      {isLoggedIn && (
        <>
          <section className="mx-auto mt-8 flex max-w-[1824px] flex-col items-center justify-center sm:mt-14">
            <Gradient />
            <Hero />
            <div className="mt-20" />
            <RealMachines />
          </section>
          <section className="flex w-full flex-col items-center justify-center px-4 py-28 md:px-0">
            <AuctionOfTheDay auction={auctionOfTheDay} auctionsData={auctionData} />
            <Link href="/collections/active" className="mt-10 rounded-xl bg-navy p-2 font-epilogue text-sm font-bold text-white lg:p-4">
              Explore Auctions
            </Link>
          </section>

          <section className="flex w-full flex-col items-center bg-gradient-to-r from-[#1A3263] to-[#5C3FAF] lg:p-20">
            <MiningCalculator />
          </section>
          <section className="auction-of-the-day-gradient flex w-full flex-col items-center justify-center px-4 pb-20 md:px-0">
            <h1 className="mt-20 font-chakra text-4xl text-navy lg:text-5xl 2xl:text-7xl">Support</h1>
            <p className="text-center text-xs text-navy md:w-6/12 md:text-xl lg:w-7/12 lg:text-3xl 2xl:w-6/12">
              Whether you&apos;re brand new to mining, or a seasoned bitcoiner, our support team is here to answer your questions
            </p>

            <div className="mx-auto mt-14 flex flex-col justify-center md:items-center md:px-10 lg:flex-row xl:px-20">
              <div className="mb-12 flex w-full flex-col items-start rounded-xl border border-gray-400 bg-white p-8 md:mb-0 md:w-8/12 xl:w-4/12 xl:px-8 2xl:w-3/12 2xl:px-12">
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

              <div className="mb-12 flex w-full flex-col items-start rounded-xl border border-gray-400 bg-white p-8 sm:mx-20 md:mx-0 md:my-8 md:w-8/12 lg:mx-8 lg:my-0 xl:w-4/12 xl:px-8 2xl:w-3/12 2xl:px-16">
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

              <div className="mb-12 flex w-full flex-col items-start rounded-xl border border-gray-400 bg-white p-8 md:mb-0 md:w-8/12 md:px-6 xl:w-4/12 xl:px-8 2xl:w-3/12 2xl:px-16">
                <div className="">
                  <h2 className="mb-5 w-10/12 text-xl font-semibold text-navy xl:text-3xl">Want to sell your hashrate</h2>
                  <p className="mb-5 text-lg text-black xl:text-xl">
                    Rigly&apos;s marketplace allows miners to sell their hash in a forward agreement and focus on optimizing operations.
                  </p>
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
          <section className="mx-auto mt-8 flex max-w-[1824px] flex-col items-center justify-center sm:mt-14">
            <Gradient />
            <Hero>
              <>
                <div className="mb-20 mt-6 flex w-full flex-col items-center justify-center font-chakra font-bold sm:flex-row lg:mt-12">
                  <Link
                    href="#try-mining"
                    className="mb-5 flex w-11/12 items-center justify-center rounded-full bg-hero-gradient px-5 py-4 text-sm text-white outline-none hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gradient-disabled sm:mb-0 lg:h-20 lg:w-9/12 lg:text-3xl xl:w-6/12"
                  >
                    Try it out
                  </Link>
                  <Link
                    href="#auction-market"
                    className="flex w-11/12 items-center justify-center rounded-full bg-gradient px-5 py-4 text-sm text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled sm:ml-16 lg:h-20 lg:w-9/12 lg:text-3xl xl:w-6/12"
                  >
                    Buy Hashrate
                  </Link>
                </div>
                <Warp />
                <div className="mt-8 w-7/12 bg-clip-text text-center font-chakra text-2xl font-extrabold leading-10 text-navy md:w-10/12 md:text-center lg:w-11/12 lg:text-center lg:text-5xl xl:text-7xl 2xl:w-4/5">
                  Trustless bitcoin mining for <span className="text-primary">everyone</span>
                </div>
              </>
            </Hero>
            <Learn />
            <RealMachines />
            <div id="try-mining" />
            <JoinPool data={auctionData} />
          </section>
          <section
            id="auction-market"
            className="auction-of-the-day-gradient flex w-full flex-col items-center justify-center px-4 py-28 md:px-0"
          >
            <AuctionOfTheDay auction={auctionOfTheDay} auctionsData={auctionData}>
              <>
                <h1 className="mt-36 font-chakra text-4xl text-navy lg:text-5xl 2xl:text-7xl">Support</h1>
                <p className="text-center text-xs text-navy md:w-6/12 md:text-xl lg:w-7/12 lg:text-3xl 2xl:w-6/12">
                  Whether you&apos;re brand new to mining, or a seasoned bitcoiner, our support team is here to answer your questions
                </p>

                <div className="mx-auto mt-14 flex flex-col justify-center md:items-center md:px-10 lg:flex-row xl:px-20">
                  <div className="mb-12 flex w-full flex-col items-start rounded-xl border border-gray-400 bg-white p-8 md:mb-0 md:w-8/12 xl:w-4/12 xl:px-8 2xl:w-3/12 2xl:px-12">
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

                  <div className="mb-12 flex w-full flex-col items-start rounded-xl border border-gray-400 bg-white p-8 sm:mx-20 md:mx-0 md:my-8 md:w-8/12 lg:mx-8 lg:my-0 xl:w-4/12 xl:px-8 2xl:w-3/12 2xl:px-16">
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

                  <div className="mb-12 flex w-full flex-col items-start rounded-xl border border-gray-400 bg-white p-8 md:mb-0 md:w-8/12 md:px-6 xl:w-4/12 xl:px-8 2xl:w-3/12 2xl:px-16">
                    <div className="">
                      <h2 className="mb-5 w-10/12 text-xl font-semibold text-navy xl:text-3xl">Want to sell your hashrate</h2>
                      <p className="mb-5 text-lg text-black xl:text-xl">
                        Rigly&apos;s marketplace allows miners to sell their hash in a forward agreement and focus on optimizing operations.
                      </p>
                    </div>
                    <div className="">
                      <Link
                        href="https://rigly.io/selling-on-rigly"
                        className="flex rounded-lg bg-navy px-8 py-4 font-epilogue text-lg text-white hover:opacity-90"
                        target="_blank"
                      >
                        Read the article
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            </AuctionOfTheDay>
          </section>
        </>
      )}
      {!isDemo && !isLoggedIn && (
        <>
          <Testimonials />
        </>
      )}
    </div>
  )
}
