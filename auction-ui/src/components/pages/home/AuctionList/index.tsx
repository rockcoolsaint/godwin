import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { Auction, AuctionStatus } from 'src/api/auction/types'
import * as miner from 'src/assets/jpg/mining.jpeg'
import Link from 'src/components/shared/Link'
import { formatDate } from 'src/utils/date'
import { formatMoney } from 'src/utils/currency'
import SatsSvg from 'src/assets/svg/sats.svg'
import { useTranslation } from 'src/hooks'

interface ProductProps {
  auction: Auction
}

export default function AuctionList({ auction }: ProductProps) {
  const { auction_meta } = auction
  const { t } = useTranslation()
  const renderAuctionMeta = () => {
    return (
      <span>{`${auction_meta.days_of_mining} ${auction_meta.days_of_mining > 1 ? 'days' : 'day'}  | ${auction_meta.hashrate}TH/s `}</span>
    )
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      <Link
        href={'/auctions/' + auction.slug}
        className="relative flex justify-between gap-x-6 px-2 py-5 hover:cursor-pointer hover:bg-gray-50"
      >
        <div className="flex gap-x-4">
          <Image
            width={352}
            height={230}
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={auction.auction_meta.site_photo || miner}
            alt={auction.title + ' Image'}
          />
          <div className="min-w-0 flex-auto">
            <p className="text-lg font-semibold leading-6 text-gray-900">
              <span className="absolute inset-x-0 -top-px bottom-0" />
              {auction.title}
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              <span>End date: &nbsp;</span> <span className=" text-black"> {formatDate(auction.end_at)}</span>
            </p>
          </div>
        </div>
        <div className="flex w-auto items-center justify-between gap-x-4 sm:w-3/12">
          {auction.status === AuctionStatus.Active && (
            <>
              <div className="hidden flex-1 sm:flex sm:flex-col">
                <p className="text-sm leading-6 text-gray-900">{renderAuctionMeta()}</p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Active</p>
                </div>
              </div>
              <div className="hidden w-6/12 sm:flex sm:flex-col">
                <p className="text-sm leading-6 text-gray-900">
                  {auction.bid_count} {auction.bid_count > 1 ? 'bids' : 'bid'}
                </p>
                <div className="mt-1 flex items-center">
                  <p className="flex justify-center text-xs leading-5 text-gray-500">
                    Min. bid amount - {formatMoney(auction.current_bid)} <SatsSvg className="ml-1 text-gray-300 opacity-60" />
                  </p>
                </div>
              </div>
            </>
          )}
          {auction.status === AuctionStatus.Scheduled && (
            <>
              <div className="hidden flex-1 sm:flex sm:flex-col">
                <p className="text-sm leading-6 text-gray-900">{renderAuctionMeta()}</p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-yellow-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Scheduled</p>
                </div>
              </div>
              <div className="hidden w-6/12 sm:flex sm:flex-col">
                <p className="text-sm leading-6 text-gray-900">
                  {auction.bid_count} {auction.bid_count > 1 ? 'bids' : 'bid'}
                </p>
                <div className="mt-1 flex items-center">
                  <p className="flex justify-center text-xs leading-5 text-gray-500">
                    Min. bid amount: {formatMoney(auction.current_bid)} <SatsSvg className="ml-1 text-gray-300 opacity-60" />
                  </p>
                </div>
              </div>
            </>
          )}
          {auction.status === AuctionStatus.Completed && (
            <>
              <div className="hidden flex-1 sm:flex sm:flex-col">
                <p className="text-sm leading-6 text-gray-900">{renderAuctionMeta()}</p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-red-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Complete</p>
                </div>
              </div>
              <div className="hidden w-6/12 sm:flex sm:flex-col">
                <p className="text-sm leading-6 text-gray-900">
                  {auction.bid_count} {auction.bid_count > 1 ? 'bids' : 'bid'}
                </p>
                <div className="mt-1 flex items-center">
                  <p className="flex justify-center text-xs leading-5 text-gray-500">
                    {t('home.winning_bid')}: {formatMoney(auction.current_bid)} <SatsSvg className="ml-1 text-gray-300 opacity-60" />
                  </p>
                </div>
              </div>
            </>
          )}
          <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
        </div>
      </Link>
    </ul>
  )
}
