import Image from 'next/image'
import { AuctionOfTheDayResponse } from 'src/api/auction/types'
import Link from 'src/components/shared/Link'
import { useTranslation } from 'src/hooks'
import { format, parseISO } from 'date-fns'
import SatsSvg from 'src/assets/svg/sats.svg'
import Container from 'src/core/components/Container'
import { formatMoney } from 'src/utils/currency'
import { isDateBefore } from 'src/utils/date'
import * as miner from 'src/assets/jpg/mining.jpeg'

interface AuctionOfTheDay {
  auction: AuctionOfTheDayResponse
}

export default function AuctionOfTheDay({ auction: auctionResponse }: AuctionOfTheDay) {
  const { t } = useTranslation()

  if (!auctionResponse || !auctionResponse.auction) {
    return (
      <Container className="flex items-center justify-center py-20">
        <span className="text-red-500">Could not load auction of the day</span>
      </Container>
    )
  }

  const { auction } = auctionResponse

  const start_iso = parseISO(auction.start_at)
  const end_iso = parseISO(auction.end_at)

  const start = format(start_iso, 'do MMMM, yyyy h:mmaa')
  const end = format(end_iso, 'do MMMM, yyyy h:mmaa')

  const isAuctionEnded = isDateBefore(auction.end_at)

  function renderAuctionStatusTag() {
    if (isAuctionEnded) {
      return <p className="mb-4 rounded bg-tag-red/[.2] p-2 text-base font-semibold text-tag-red">{t('home.bid_closed')}</p>
    }

    return <p className="mb-4 rounded bg-tag-green/[.2] p-2 text-base font-semibold text-tag-green">{t('home.bid_open')}</p>
  }

  return (
    <section className="mt-28 flex w-full items-center justify-center">
      <div className="shadow-level-2 rounded-3xl border px-3 py-14 shadow-md md:px-12">
        <h1 className="mb-9 text-center text-4xl text-primary">{t('home.auction_of_the_day')}</h1>
        <div className="flex flex-col md:flex-row">
          <Image className="rounded-3xl" src={auction.auction_meta.site_photo || miner} alt="auction of the day" width={550} height={415} />
          <div className="ml-0 mt-4 flex flex-col items-start md:ml-9 md:mt-0">
            {renderAuctionStatusTag()}
            <h1 className="mb-6 text-2xl font-semibold">{auction.title}</h1>
            <div className="flex justify-between">
              <aside>
                <p className="text-base text-dark-100">{t('home.bid_start_date')}:</p>
                <p className="text-base font-medium">{start}</p>
              </aside>
              <aside className="ml-4 md:ml-1 lg:ml-8">
                <p className="text-base text-dark-100">{t('home.bid_end_date')}:</p>
                <p className="text-base font-medium">{end}</p>
              </aside>
            </div>
            <hr className="my-5 block w-full border" />
            <p className="mb-4 rounded bg-tag-blue/[.2] p-2 px-5 text-base font-semibold text-tag-blue">
              {auction.bid_count} {auction.bid_count > 1 ? 'bids' : 'bid'}
            </p>
            <div className="mt-4 flex w-full justify-between">
              <aside>
                <p className="mb-1 text-base text-dark-100">{t('home.start_bid_amount')}:</p>
                <p className="flex items-center text-base font-semibold">
                  {formatMoney(auction.starting_bid)} <SatsSvg className="ml-2" />
                </p>
              </aside>
              <aside className="md:mr-9">
                <p className="mb-1 text-base text-dark-100">{t('home.auction_end_amount')}:</p>
                <p className="flex items-center text-base font-semibold">
                  {formatMoney(auction.current_bid)} <SatsSvg className="ml-2" />
                </p>
              </aside>
            </div>
            <Link
              className="mt-8 flex w-full items-center justify-center rounded-lg bg-gradient p-3 text-base text-white hover:bg-gradient-hover"
              href={'/auctions/' + auction.slug}
            >
              {t('home.view_details')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
