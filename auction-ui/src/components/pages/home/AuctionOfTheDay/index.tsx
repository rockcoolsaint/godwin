import Image from 'next/image'
import { AuctionOfTheDayResponse } from 'src/api/auction/types'
import Link from 'src/components/shared/Link'
import { useTranslation } from 'src/hooks'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import SatsSvg from 'src/assets/svg/sats.svg'
import Container from 'src/core/components/Container'

interface AuctionOfTheDay {
  auction: AuctionOfTheDayResponse
}

export default function AuctionOfTheDay({ auction: auctionResponse }: AuctionOfTheDay) {
  const { t } = useTranslation()

  if (!auctionResponse || !auctionResponse.auction) {
    return <Container>Could not load auction of the day</Container>
  }

  const { auction } = auctionResponse

  console.log(auction)

  const start = format(parseISO(auction.start_at), 'do MMMM, yyyy hh:mm aaa')
  const end = format(parseISO(auction.end_at), 'do MMMM, yyyy hh:mm aaa')

  return (
    <section className="mt-28 flex w-full items-center justify-center px-5 md:px-0">
      <div className="shadow-level-2 rounded-3xl border px-3 py-14 shadow-md md:px-12">
        <h1 className="mb-9 text-center text-4xl">{t('home.auction_of_the_day')}</h1>
        <div className="flex flex-col md:flex-row">
          <Image className="rounded-3xl" src="https://via.placeholder.com/352x230" alt="auction of the day" width={550} height={415} />
          <div className="ml-0 mt-4 flex flex-col items-start md:mt-0 md:ml-9">
            <p className="mb-4 rounded bg-tag-red/[.2] p-2 text-base font-semibold text-tag-red">{t('home.bid_closed')}</p>
            <h1 className="mb-6 text-2xl font-semibold">{auction.title}</h1>
            <div className="flex justify-between">
              <aside>
                <p className="text-base text-dark-100">{t('home.bid_start_date')}:</p>
                <p className="text-base font-semibold">{start}</p>
              </aside>
              <aside className="md:ml-9">
                <p className="text-base text-dark-100">{t('home.bid_end_date')}:</p>
                <p className="text-base font-semibold">{end}</p>
              </aside>
            </div>
            <hr className="my-5 block w-full border" />
            <p className="mb-4 rounded bg-tag-blue/[.2] p-2 px-5 text-base font-semibold text-tag-blue">{auction.bid_count} bid</p>
            <div className="mt-4 flex w-full justify-between">
              <aside>
                <p className="mb-1 text-base text-dark-100">Start Bid Amount:</p>
                <p className="flex items-center text-base font-semibold">
                  {auction.starting_bid} <SatsSvg className="ml-2" />
                </p>
              </aside>
              <aside className="md:mr-9">
                <p className="mb-1 text-base text-dark-100">Auction Ended Amount:</p>
                <p className="flex items-center text-base font-semibold">
                  {auction.current_bid} <SatsSvg className="ml-2" />
                </p>
              </aside>
            </div>
            <Link
              className="mt-8 flex w-full items-center justify-center rounded-lg bg-gradient p-3 text-base text-white hover:bg-gradient-hover"
              href={'/auctions/' + auction.slug}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
