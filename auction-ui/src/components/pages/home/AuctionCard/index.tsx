'use client'

import Image from 'next/image'
import { Auction, AuctionStatus } from 'src/api/auction/types'
import Link from 'src/components/shared/Link'
import SatsSvg from 'src/assets/svg/sats.svg'
import { useTranslation } from 'src/hooks'
import { formatDate } from 'src/utils/date'
import { formatMoney } from 'src/utils/currency'
import * as miner from 'src/assets/jpg/mining.jpeg'
import { calculateAuctionHashPrice } from 'utils'

interface ProductProps {
  auction: Auction
}

const AuctionCard = ({ auction }: ProductProps) => {
  const { t } = useTranslation()

  const { auction_meta } = auction

  const renderAuctionMeta = () => {
    return (
      <span>{`${auction_meta.days_of_mining} ${auction_meta.days_of_mining > 1 ? 'days' : 'day'}  | ${auction_meta.hashrate}TH/s `}</span>
    )
  }

  return (
    <Link href={'/auctions/' + auction.slug} className="mb-4 rounded-xl border border-gray-100">
      <div className=" px-5 pt-5">
        <Image
          className="mb-4 block w-full overflow-hidden rounded-xl sm:h-64"
          width={352}
          height={230}
          src={auction.auction_meta.site_photo || miner}
          alt={auction.title + ' Image'}
        />
        <h3 className="mb-3 text-center text-2xl">{auction.title}</h3>
        <p className="text-center text-sm text-dark-100">{renderAuctionMeta()}</p>

        <div className="mt-6 flex justify-between">
          <div className="flex flex-col items-start">
            <h5 className="mb-2 text-sm text-dark-100">{t('home.bid_end_date')}:</h5>
            <p className="text-left font-medium">{formatDate(auction.end_at)}</p>
          </div>
          <div className="flex flex-col items-end">
            <h5 className="mb-2 text-sm text-dark-100">{t('home.number_of_bids')}</h5>
            <p className="text-right font-medium">{auction.bid_count}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#EBEFF0] p-5">
        {auction.status === AuctionStatus.Scheduled && (
          <>
            <div>
              <span className="text-sm font-medium text-yellow-700">Upcoming auction</span>
              <span className="flex items-center text-base">
                Min. bid: {formatMoney(auction.current_bid)} <SatsSvg className="ml-1" />
              </span>
            </div>
          </>
        )}
        {auction.status === AuctionStatus.Active && (
          <>
            <div>
              <span className="text-sm font-medium text-dark-100">{t('home.current_bid')}</span>
              <span className="flex items-center text-base">
                {formatMoney(auction.current_bid)} <SatsSvg className="ml-1" />
              </span>
            </div>
            <span className="rounded-xl bg-gradient px-8 py-3 text-white hover:bg-gradient-hover">
              <span className="text-base font-medium">{t('home.place_bid')}</span>
            </span>
          </>
        )}
        {auction.status === AuctionStatus.Completed && (
          <div className="flex w-full justify-between">
            <div>
              {auction.bid_count > 0 && (
                <div>
                  <span className="text-sm font-medium text-red-500">{t('home.auction_ended')}</span>
                  <span className="flex items-center text-sm">
                    {t('home.winning_bid')}: {formatMoney(auction.current_bid)} <SatsSvg className="ml-1" />
                  </span>
                </div>
              )}
              {auction.bid_count === 0 && (
                <div>
                  <span className="text-sm font-medium text-red-500">{t('home.auction_ended')}</span>
                  <span className="flex items-center text-sm">{t('home.no_bids')}</span>
                </div>
              )}
            </div>
            <div>
              <span className="text-sm font-medium text-red-500">Hash price</span>
              <span className="flex items-center text-sm">
                {formatMoney(calculateAuctionHashPrice(auction.current_bid, auction.auction_meta.hashrate))} TH/s/day
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default AuctionCard
