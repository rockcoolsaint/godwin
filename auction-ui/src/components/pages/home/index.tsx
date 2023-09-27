'use client'
import { Auction, AuctionOfTheDayResponse } from 'src/api/auction/types'
import rig from 'src/assets/png/rig.png'
import placard from 'src/assets/png/placard.png'
import Details from 'src/components/pages/home/Details'
import { useTranslation } from 'src/hooks'
import AuctionOfTheDay from './AuctionOfTheDay'
import Link from 'src/components/shared/Link'
import hero_image from 'src/assets/png/auctioneer.png'
import Image from 'next/image'
import Testimonials from 'src/components/pages/home/Testimonial'
import { LocalStorageKeys } from 'src/constants/localStorage'
import { useAccountContext } from 'src/providers/AccountProvider'
import { isDateBefore } from 'src/utils/date'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ModalVideo from 'react-modal-video'
import { BoltIcon, PlayCircleIcon, LockClosedIcon, UserGroupIcon } from '@heroicons/react/20/solid'
import Gradient from 'src/components/shared/Gradient'
import Mining from './Mining'
import InstantHashrate from './InstantHashrate'
import { useSearchParams } from 'next/navigation'
import AuctionSchedule from './AuctionSchedule'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import FeaturedAuctions from './FeaturedAuctions'

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
  const [videoOpen, setVideoOpen] = useState(false)
  const [_, setLoading] = useState(false)
  const [auctionData, setAuctionData] = useState<Auction[]>([])
  const searchParam = useSearchParams()

  const trainSchedule = searchParam.get('train-schedule') || ''

  useEffect(() => {
    const prepareCollections = async () => {
      setLoading(true)
      try {
        const res = await getAllAuctions({ limit: 100_000, auction_type: 'forward_date', group_by: 'auction_status' })
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

  return (
    <div>
      <section className="md:px-25 mx-auto mt-10 flex max-w-[1824px] flex-col items-center px-5 sm:mt-20 md:flex-col md:items-center md:justify-between lg:flex-row lg:px-40">
        <Gradient />
        <div className="mr-4 flex flex-col items-center justify-start md:mb-12 md:mr-0 lg:mb-0 lg:w-3/5 lg:items-start">
          <div className="gradient-text animate__zoomIn animate__animated text-center text-4xl font-extrabold !leading-[1.3] text-gradient sm:text-6xl md:text-center lg:text-left">
            Bitcoin only Hashrate Market
          </div>
          <p className="animate__animated animate__backInLeft my-2 flex w-full max-w-fit items-start justify-center text-center text-sm font-normal text-dark-200 sm:items-center sm:text-left sm:text-xl md:justify-start lg:w-3/4 lg:justify-start ">
            <BoltIcon className="mr-2 h-5 w-5 text-yellow-400" /> <span>Hashrate delivered P2P over stratum</span>
          </p>
          <p className="animate__animated animate__slideInLeft animate__slow my-2 flex w-full max-w-fit items-start justify-center text-center text-sm font-normal text-dark-200 sm:items-center sm:text-left sm:text-xl md:justify-start lg:w-3/4">
            <LockClosedIcon className="mr-2 h-5 w-5 text-black" />
            <span>Payments held in multisig = no rug pulls</span>
          </p>
          <p className="animate__animated animate__fadeInLeftBig animate__slower my-2 flex w-full max-w-fit items-start justify-center text-center text-sm font-normal text-dark-200 sm:items-center sm:text-left sm:text-xl md:justify-start lg:w-3/4">
            <UserGroupIcon className="mr-2 h-5 w-5 text-primary/[0.9]" /> <span>Pricing set by an open market</span>
          </p>
          {!account?.email ? (
            <a
              className="animate__animated animate__shakeX animate__slow animate__repeat-1 mt-2 block rounded-lg bg-gradient p-4 px-5 text-base capitalize text-white hover:bg-gradient-hover"
              href="#test-mine"
            >
              start hashing
            </a>
          ) : (
            <Link
              className="animate__animated animate__shakeX animate__slow animate__repeat-1 mt-2 block rounded-lg bg-gradient p-4 px-5 text-base capitalize text-white hover:bg-gradient-hover"
              href="/collections"
            >
              start hashing
            </Link>
          )}
        </div>
        <div className="relative mt-16 flex items-center justify-center rounded-lg border border-dark-100/50 md:mt-0">
          <Image className=" max-w-[60%] md:block" width={660} height={440} src={hero_image} alt="hero image" />
          <PlayCircleIcon className="absolute h-20 w-20 hover:cursor-pointer hover:opacity-50" onClick={() => setVideoOpen(true)} />
        </div>

        <ModalVideo
          channel="vimeo"
          vimeo={{ mute: 0, autoplay: true }}
          isOpen={videoOpen}
          videoId="843070054"
          onClose={() => setVideoOpen(false)}
        />
      </section>
      {!account?.email && (
        <section className="elegant-gradient mt-10">
          <Mining />
        </section>
      )}
      <InstantHashrate />

      <section className="elegant-gradient pt-28 sm:mt-28 sm:pt-0 lg:mt-0">
        {auctionData.length > 0 && <AuctionSchedule auctionsData={auctionData} />}
      </section>

      <AuctionOfTheDay auction={auctionOfTheDay} />

      {!isDemo && (
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
