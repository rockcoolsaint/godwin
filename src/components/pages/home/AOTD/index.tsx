'use client'
import Image from 'next/image'
import { AuctionOfTheDayResponse, AuctionStatus } from 'src/api/auction/types'
import Link from 'src/components/shared/Link'
import { useTranslation } from 'src/hooks'
import { format, parseISO } from 'date-fns'
import SatsSvg from 'src/assets/svg/sats.svg'
import { formatMoney } from 'src/utils/currency'
import { isDateBefore } from 'src/utils/date'
import * as miner from 'src/assets/jpg/ASIC_hashrate_heartbeat.jpg'

interface AOTD {
  auction: AuctionOfTheDayResponse
}

export default function AOTD({ auction: auctionResponse }: AOTD) {
  const { t } = useTranslation()

  if (!auctionResponse || !auctionResponse.auction) {
    return null
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
    <section className="flex w-full items-center justify-center">
      <div className="shadow-level-2 max-w-md rounded-3xl border bg-white px-3 py-6 shadow-md md:px-6 lg:max-w-4xl">
        <h1 className="mb-6 text-center font-chakra text-4xl text-primary">{t('home.auction_of_the_day')}</h1>
        <div className="flex flex-col lg:flex-row">
          <Image
            className="max-h-96 rounded-3xl"
            src={miner}
            alt="auction of the day"
            width={550}
            height={305}
	    layout="responsive"
          />
          <div className="ml-0 mt-4 flex max-h-96 flex-col items-start justify-between lg:ml-9 lg:mt-0">
            {renderAuctionStatusTag()}
            <h1 className="mb-4 text-2xl font-semibold">{auction.title}</h1>
            <div className="flex justify-between">
              <aside>
                <p className="text-sm text-dark-100">Lot Size:</p>
                <p className="text-xs font-normal">48 lots of 21 TH/s</p>
              </aside>
              <aside className="ml-4">
                <p className="text-sm text-dark-100">Total Size:</p>
                <p className="text-xs font-normal">1,000 TH/s block party</p>
              </aside>
            </div>
            <hr className="my-4 block w-full border" />
            <p className="mb-4 rounded bg-tag-blue/[.2] p-1 px-2 text-sm text-tag-blue">
              {auction.bid_count} {renderBidCount()}
            </p>
            <div className="flex w-full justify-between">

              {/* Replace the existing bid amount section with: */}
              <div className="mt-4">
                <p className="text-lg"> {/* Increased text size */}
                  Potential Block Reward: <span className="font-bold">~$300,612</span> (3.125 btc + fees)
                </p>
              </div>
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
