'use client'

import Image from 'next/image'
import { Auction, AuctionStatus } from 'src/api/auction/types'
import Link from 'src/components/shared/Link'
import SatsSvg from 'src/assets/svg/sats.svg'
import { useTranslation } from 'src/hooks'
import { formatDate } from 'src/utils/date'
import { formatMoney } from 'src/utils/currency'
import { imageUrl } from 'utils'

interface ProductProps {
  auction: Auction
}

const AuctionCard = ({ auction }: ProductProps) => {
  const { t } = useTranslation()

  const { auction_meta } = auction

  const renderAuctionMeta = () => {
    return <span>{`${auction_meta.days_of_mining} days | ${auction_meta.hashrate} `}</span>
  }

  return (
    <Link href={'/auctions/' + auction.slug} className="mb-4 rounded-xl border border-gray-100">
      <div className=" px-5 pt-5">
        <Image
          className="mb-4 block w-full overflow-hidden rounded-xl"
          width={352}
          height={230}
          src={imageUrl(auction.auction_meta.site_photo, '352x230')}
          alt={auction.title + ' Image'}
        />
        <h3 className="mb-3 text-center text-2xl">{auction.title}</h3>
        <p className="text-center text-sm text-dark-100">{renderAuctionMeta()}</p>

        <div className="mt-6 flex justify-between">
          <div className="flex flex-col items-start">
            <h5 className="mb-2 text-sm text-dark-100">{t('home.bid_end_date')}:</h5>
            <strong className="text-left">{formatDate(auction.end_at)}</strong>
          </div>
          <div className="flex flex-col items-end">
            <h5 className="mb-2 text-sm text-dark-100">{t('home.number_of_bids')}</h5>
            <strong className="text-right">{auction.bid_count}</strong>
          </div>
        </div>
      </div>
      {auction.status !== AuctionStatus.Scheduled && (
        <div className="mt-5 flex items-center justify-between border-t border-[#EBEFF0] p-5">
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
            <>
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
            </>
          )}
        </div>
      )}
    </Link>
  )
}

export default AuctionCard
