'use client'
import FeaturedAuctions from 'src/components/pages/home/FeaturedAuctions'
import { Auction, AuctionOfTheDayResponse } from 'src/api/auction/types'
import asic from 'src/assets/png/asic.png'
import bid from 'src/assets/png/how_to_bid.png'
import Details from 'src/components/pages/home/Details'
import { useTranslation } from 'src/hooks'
import AuctionOfTheDay from './AuctionOfTheDay'
import Link from 'src/components/shared/Link'
import hero_image from 'src/assets/png/auctioneer.png'
import Image from 'next/image'
import Testimonials from 'src/components/pages/home/Testimonial'

interface Props {
  auctions: Auction[]
  auctionOfTheDay: AuctionOfTheDayResponse
}

export default function Home({ auctions, auctionOfTheDay }: Props) {
  const { t } = useTranslation()

  return (
    <div>
      <section className="md:px-25 mx-auto mt-20 flex max-w-[1824px] items-center px-5 md:flex-col md:items-center md:justify-between lg:flex-row lg:px-40">
        <div className="mr-4 flex flex-col items-center justify-start md:mb-12 md:mr-0 lg:mb-0 lg:w-3/5 lg:items-start">
          <h1 className="gradient-text text-center text-8xl leading-[7rem] text-gradient sm:text-left md:text-center lg:text-left ">
            Start mining smarter
          </h1>
          <p className="my-6 text-4xl font-semibold lg:w-3/4">Buy bitcoin mining at an open market price</p>
          <Link className=" rounded-lg bg-gradient p-4 px-5 text-base capitalize text-white hover:bg-gradient-hover " href="/collections">
            start mining now
          </Link>
        </div>
        <Image className="hidden max-w-[60%] md:block" width={660} height={440} src={hero_image} alt="hero image" />
      </section>
      <AuctionOfTheDay auction={auctionOfTheDay} />
      <FeaturedAuctions auctions={auctions} />
      <section className="flex w-full flex-col items-center justify-center bg-[#F1F6FE] px-5 py-40 md:px-0">
        <h1 className="mb-20 text-center text-7xl text-primary">{t('home.start_mining_today')}</h1>
        <div className="flex flex-col items-center justify-center md:flex-row">
          <Details
            title={t('home.title_mining')}
            imageSrc={asic}
            description={t('home.details_description')}
            link="https://braiins.com/blog/why-mine-bitcoin-braiins-mining"
          />
          <Details
            className="md:ml-14"
            title={t('home.title_bid')}
            imageSrc={bid}
            description={t('home.details_description')}
            link="https://blog.rigly.io/how-to-bid-on-hashrate/"
          />
        </div>
      </section>
      <Testimonials />
    </div>
  )
}
