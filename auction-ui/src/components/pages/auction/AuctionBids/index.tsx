'use client'

import { WalletIcon } from '@heroicons/react/24/outline'
import { satoshisToBitcoin } from 'bitcoin-conversion'
import { format, parseISO } from 'date-fns'
import { BidsEntityOrCurrentBid } from 'src/api/auction/types'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import { useSatsToFiat } from 'src/hooks'
import { formatMoney } from 'src/utils/currency'

interface Props {
  bids: BidsEntityOrCurrentBid[]
}

const AuctionBids = ({ bids }: Props) => {
  return (
    <section className=" rounded-xl bg-white px-4 py-3">
      <h5 className="mb-4 text-3xl">Bids</h5>
      <div className="px-3"></div>
      <div className="mb-4 rounded-xl border">
        {bids.length > 0 ? (
          bids.map((bid, idx) => <AuctionBidList key={idx} bid={bid} />)
        ) : (
          <div className="flex items-center p-4">
            <WalletIcon className="h-8 w-8 text-gray-500" /> <p className="ml-4 text-gray-500">No bids yet, be the first to place a bid</p>
          </div>
        )}
      </div>
    </section>
  )
}

interface AuctionBidListProps {
  bid: BidsEntityOrCurrentBid
}

const AuctionBidList = ({ bid }: AuctionBidListProps) => {
  const priceInFiat = useSatsToFiat({ initialValue: 0, bid })

  return (
    <div className="flex items-center justify-between  px-3 pt-3">
      <div className="col-md-8">
        <h6 className="mb-1 w-32 truncate text-sm font-bold capitalize sm:w-96 lg:w-80 lg:text-xl">{bid.account.username}</h6>
        <p className="text-sm font-medium text-dark-100/[.8]">{format(parseISO(bid.created_at), 'do MMMM, yy hh:mmaaa')}</p>
      </div>
      <div className="col-md-4 flex flex-col items-end">
        <Tooltip placement="left">
          <TooltipTrigger>
            <h6 className="mb-1 text-sm font-bold capitalize lg:text-xl">{formatMoney(bid.bid)} sats</h6>
          </TooltipTrigger>
          <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
            ${formatMoney(priceInFiat)}
          </TooltipContent>
        </Tooltip>

        <Tooltip placement="left">
          <TooltipTrigger>
            <p className="text-right text-sm font-medium text-dark-100/[.8]">{satoshisToBitcoin(bid.bid)} BTC</p>
          </TooltipTrigger>
          <TooltipContent className="w-max max-w-fit rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
            ${formatMoney(priceInFiat)}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

export default AuctionBids
