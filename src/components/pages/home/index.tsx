'use client'
import { Auction, AuctionOfTheDayResponse } from 'src/api/auction/types'
import rig from 'src/assets/png/rig.png'
import placard from 'src/assets/png/placard.png'
import Details from 'src/components/pages/home/Details'
import { useTranslation } from 'src/hooks'
import AuctionOfTheDay from './AuctionOfTheDay'
import Testimonials from 'src/components/pages/home/Testimonial'
import { LocalStorageKeys } from 'src/constants/localStorage'
import { useAccountContext } from 'src/providers/AccountProvider'
import { isDateBefore } from 'src/utils/date'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Gradient from 'src/components/shared/Gradient'
import Mining from './Mining'
import InstantHashrate from './InstantHashrate'
import AuctionSchedule from './AuctionSchedule'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import { TableSkeletonLoader } from 'src/components/shared/TableSkeletonLoader'
import DemoAlert from 'src/components/demo/Alert'
import { HomepageCalculator } from './Calculator'
import clsx from 'clsx'
import { ErrorBoundary } from 'react-error-boundary'
import Hero from './Hero'

interface Props {
  auctions: Auction[]
  auctionOfTheDay: AuctionOfTheDayResponse
  isDemo?: boolean
  code?: string
}

export default function Home({ auctionOfTheDay, isDemo, code }: Props) {
  const { t } = useTranslation()
  const { account } = useAccountContext()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
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
      <DemoAlert className={clsx(!isLoggedIn ? '' : '')} msg={<div>Product in beta, please report bugs using the intercom below</div>} />
      {!isLoggedIn && (
        <section className="mx-auto mt-8 flex max-w-[1824px] flex-col items-center justify-center sm:mt-14 md:px-2 lg:px-4">
          <Gradient />
          <Hero />

          <div className="relative mt-8 flex w-full max-w-5xl items-center justify-center sm:mt-16 sm:w-5/6 md:w-10/12 lg:w-3/5 xl:w-3/5 xl:max-w-3xl">
            <HomepageCalculator />
          </div>
        </section>
      )}
      <div className={clsx(isLoggedIn ? 'sm:mt-24' : 'sm:mt-72')}></div>
      <div className="elegant-gradient">
        <ErrorBoundary fallback={<div className="p-8">⚠️ Oops! Something went wrong while rendering auction schedule</div>}>
          {loading ? <TableSkeletonLoader title="Auction Market" /> : <AuctionSchedule auctionsData={auctionData} showLink={true} />}
        </ErrorBoundary>
      </div>

      {!isLoggedIn && (
        <section className="elegant-gradient mt-10">
          <Mining />
        </section>
      )}
      <InstantHashrate />

      <AuctionOfTheDay auction={auctionOfTheDay} />

      {!isDemo && !isLoggedIn && (
        <>
          <section className="mt-28 flex w-full flex-col items-center justify-center bg-[#F1F6FE] px-5 py-28 sm:mt-0 md:px-0">
            <h1 className="mb-10 text-center text-7xl text-primary sm:mb-20">{t('home.start_mining_today')}</h1>
            <div className="flex flex-col items-center justify-center md:flex-row">
              <Details
                title={t('home.title_mining')}
                imageSrc={rig}
                description={t('home.details_mining_description')}
                link="https://braiins.com/blog/why-mine-bitcoin-braiins-mining"
              />
              <Details
                className="md:ml-14"
                title={t('home.title_bid')}
                imageSrc={placard}
                description={t('home.details_bidding_description')}
                link="https://blog.rigly.io/how-to-bid-on-hashrate/"
              />
            </div>
          </section>
          <Testimonials />
        </>
      )}
    </div>
  )
}
