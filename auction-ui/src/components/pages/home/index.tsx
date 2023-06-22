'use client'
import FeaturedAuctions from 'src/components/pages/home/FeaturedAuctions'
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
import { useEffect } from 'react'

interface Props {
  auctions: Auction[]
  auctionOfTheDay: AuctionOfTheDayResponse
  isDemo?: boolean
  code?: string
}

export default function Home({ auctions, auctionOfTheDay, isDemo, code }: Props) {
  const { t } = useTranslation()
  const { account } = useAccountContext()
  const router = useRouter()

  useEffect(() => {
    if (account?.demo_expiration) {
      const isExpired = isDateBefore(account.demo_expiration)
      if (isExpired) router.push('/')
    }
  }, [account?.demo_expiration, router])

  if (code) {
    localStorage.setItem(LocalStorageKeys.Referral.plebtern, code)
  }

  return (
    <div>
      <section className="md:px-25 mx-auto mt-20 flex max-w-[1824px] items-center px-5 md:flex-col md:items-center md:justify-between lg:flex-row lg:px-40">
        <div className="mr-4 flex flex-col items-center justify-start md:mb-12 md:mr-0 lg:mb-0 lg:w-3/5 lg:items-start">
          <h1 className="gradient-text text-center text-7xl text-gradient sm:text-left sm:text-8xl md:text-center lg:text-left ">
            Start mining smarter
          </h1>
          <p className="my-6 text-center text-3xl font-normal sm:text-left sm:text-4xl lg:w-3/4">
            Buy your hashrate at an open market price
          </p>
          <Link className=" rounded-lg bg-gradient p-4 px-5 text-base capitalize text-white hover:bg-gradient-hover " href="/collections">
            start mining now
          </Link>
        </div>
        <Image className="hidden max-w-[60%] md:block" width={660} height={440} src={hero_image} alt="hero image" />
      </section>
      <AuctionOfTheDay auction={auctionOfTheDay} />
      {!isDemo && (
        <>
          <FeaturedAuctions auctions={auctions} />
          <section className="flex w-full flex-col items-center justify-center bg-[#F1F6FE] px-5 py-28 md:px-0">
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
