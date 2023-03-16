import HomeCollection from 'src/components/HomeCollection'
import { Auction, AuctionOfTheDayResponse } from 'src/api/auction/types'
import asic from 'src/assets/png/asic.png'
import bid from 'src/assets/png/how_to_bid.png'
import Details from 'src/components/pages/home/Details'
import { useTranslation } from 'src/hooks/useTranslation'
import AuctionOfTheDay from './AuctionOfTheDay'

interface Props {
  auctions: Auction[]
  auctionOfTheDay: AuctionOfTheDayResponse
}

export default function Home({ auctions, auctionOfTheDay }: Props) {
  const { t } = useTranslation()

  return (
    <div>
      <AuctionOfTheDay auction={auctionOfTheDay} />
      <HomeCollection auctions={auctions} />
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
