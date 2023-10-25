import Image from 'next/image'
import { AuctionOfTheDayResponse, AuctionStatus } from 'src/api/auction/types'
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

  const start = format(start_iso, 'do MMM, yy h:mmaa')
  const end = format(end_iso, 'do MMM, yy h:mmaa')

  const isAuctionEnded = isDateBefore(auction.end_at)

  function renderAuctionStatusTag() {
    if (isAuctionEnded) {
      return <p className="mb-4 rounded bg-tag-red/[.2] p-2 text-base font-semibold text-tag-red">{t('home.bid_closed')}</p>
    }

    if (auction.status === AuctionStatus.Scheduled) {
      return (
        <p className="text-tag-yellow mb-4 rounded bg-yellow-50  p-2 py-1 text-base font-semibold text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
          Upcoming auction
        </p>
      )
    }

    return <p className="mb-4 rounded bg-tag-green/[.2] p-1 px-2 text-sm font-normal text-tag-green">{t('home.bid_open')}</p>
  }

  const renderBidCount = () => {
    if (auction.bid_count === 1) {
      return 'bid'
    }

    return 'bids'
  }

  return (
    <section className="flex w-full items-center justify-center py-28">
      <div className="shadow-level-2 max-w-md rounded-3xl border px-3 py-6 shadow-md md:px-6 lg:max-w-4xl">
        <h1 className="mb-6 text-center text-4xl text-primary">{t('home.auction_of_the_day')}</h1>
        <div className="flex flex-col lg:flex-row">
          <Image
            className="max-h-96 rounded-3xl"
            src={auction.auction_meta.site_photo || miner}
            alt="auction of the day"
            width={550}
            height={305}
          />
          <div className="ml-0 mt-4 flex max-h-96 flex-col items-start justify-between lg:ml-9 lg:mt-0">
            {renderAuctionStatusTag()}
            <h1 className="mb-4 text-2xl font-semibold">{auction.title}</h1>
            <div className="flex justify-between">
              <aside>
                <p className="text-sm text-dark-100">{t('home.bid_start_date')}:</p>
                <p className="text-xs font-normal">{start}</p>
              </aside>
              <aside className="ml-4">
                <p className="text-sm text-dark-100">{t('home.bid_end_date')}:</p>
                <p className="text-xs font-normal">{end}</p>
              </aside>
            </div>
            <hr className="my-4 block w-full border" />
            <p className="mb-4 rounded bg-tag-blue/[.2] p-1 px-2 text-sm text-tag-blue">
              {auction.bid_count} {renderBidCount()}
            </p>
            <div className="flex w-full justify-between">
              <aside>
                <p className="mb-1 text-sm text-dark-100">{t('home.start_bid_amount')}:</p>
                <p className="flex items-center text-xs font-medium">
                  {formatMoney(auction.starting_bid)} <SatsSvg className="ml-2" />
                </p>
              </aside>
              {auction.bid_count > 0 && (
                <aside className="md:mr-9">
                  <p className="mb-1 text-sm text-dark-100">Current bid:</p>
                  <p className="flex items-center text-xs font-medium">
                    {formatMoney(auction.current_bid)} <SatsSvg className="ml-2" />
                  </p>
                </aside>
              )}
            </div>
            <Link
              className="mt-4 flex w-full items-center justify-center rounded-lg bg-gradient p-3 text-base text-white hover:bg-gradient-hover"
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
