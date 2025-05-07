'use client'

import { WalletIcon } from '@heroicons/react/24/outline'
import { satoshisToBitcoin } from 'bitcoin-conversion'
import { format, parseISO } from 'date-fns'
import { BidsEntityOrCurrentBid } from 'src/api/auction/types'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import { useSatsToFiat } from 'src/hooks'
import { useAccountContext } from 'src/providers/AccountProvider'
import { formatMoney } from 'src/utils/currency'

interface Props {
  bids: BidsEntityOrCurrentBid[]
}

const AuctionBids = ({ bids }: Props) => {
  return (
    <section className="scrollbar-hide h-[600px] overflow-scroll rounded-xl p-1 sm:px-4 sm:py-3">
      <h5 className="text-3xl sm:mb-4">Bids</h5>
      <div className="mb-4 rounded-xl sm:border">
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
  const { account } = useAccountContext()

  return (
    <div className="flex flex-wrap items-center justify-between pt-3 sm:px-3">
      <div className="col-md-8">
        <h6 className="mb-1 flex w-48 items-center text-sm font-bold capitalize sm:w-96 lg:w-80 lg:text-xl">
          <span className="truncate">
            {bid.account.username} {bid.account.username.toLocaleLowerCase() === 'anonymous' ? bid.account.id : ''}
          </span>
          {account && bid.account.id === account.id ? ' (You)' : ''}
          {bid.is_proxy && (
            <span className="ml-2 items-center rounded-md bg-blue-50 px-2 text-xs font-normal leading-5 text-gray-600 ring-1 ring-inset ring-blue-500/30">
              Proxy
            </span>
          )}
          {/* Add team badge */}
          {bid.account.team && (
            <span className="ml-2 items-center rounded-md bg-blue-50 px-3 py-1.5 text-sm font-semibold leading-5 text-gray-600 ring-1 ring-inset ring-blue-500/30">
              {bid.account.team.name}
            </span>
          )}
        </h6>
        <p className="text-sm font-medium text-dark-100/[.8]">{format(parseISO(bid.created_at), 'do MMMM, yy hh:mmaaa')}</p>
      </div>
      {/* Rest of the component remains the same */}
      <div className="col-md-4 mt-2 flex flex-col items-end sm:mt-0">
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
