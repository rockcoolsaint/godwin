import FeaturedAuctions from 'src/components/pages/home/FeaturedAuctions'
import { Auction, AuctionOfTheDayResponse } from 'src/api/auction/types'
import asic from 'src/assets/png/asic.png'
import bid from 'src/assets/png/how_to_bid.png'
import Details from 'src/components/pages/home/Details'
import { useTranslation } from 'src/hooks/useTranslation'
import AuctionOfTheDay from './AuctionOfTheDay'
import Link from 'src/components/shared/Link'
import hero_image from 'src/assets/png/hero.png'
import Image from 'next/image'

interface Props {
  auctions: Auction[]
  auctionOfTheDay: AuctionOfTheDayResponse
}

export default function Home({ auctions, auctionOfTheDay }: Props) {
  const { t } = useTranslation()

  return (
    <div>
      <section className="mt-20 flex items-center px-5 md:px-40">
        <div className="flex flex-col items-start justify-start">
          <h1 className="gradient-text text-8xl text-gradient">Start mining smarter</h1>
          <p className="my-6 text-4xl font-semibold">Mining for the future</p>
          <Link className=" rounded-lg bg-gradient p-4 px-5 text-base capitalize text-white hover:bg-gradient-hover" href="/collections">
            start mining now
          </Link>
        </div>
        <Image className="hidden md:block" width={660} height={440} src={hero_image} alt="hero image" />
      </section>
      <AuctionOfTheDay auction={auctionOfTheDay} />
      <FeaturedAuctions auctions={auctions} />
      <section className="flex w-full flex-col items-center justify-center bg-[#F1F6FE] px-5 py-40 md:px-0">
        <h1 className="mb-20 text-center text-7xl text-primary">{t('home.start_mining_today')}</h1>
        <div className="flex flex-col items-center justify-center md:flex-row">
          <Details title={t('home.title_mining')} imageSrc={asic} description={t('home.details_description')} />
          <Details className="md:ml-14" title={t('home.title_bid')} imageSrc={bid} description={t('home.details_description')} />
        </div>
      </section>
    </div>
  )
}
