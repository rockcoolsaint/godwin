'use client'

import { satoshisToBitcoin } from 'bitcoin-conversion'
import { format, parseISO } from 'date-fns'
import { BidsEntityOrCurrentBid } from 'src/api/auction/types'

interface Props {
  bids: BidsEntityOrCurrentBid[]
}

const AuctionBids = ({ bids }: Props) => {
  return (
    <section className=" rounded-xl border bg-white px-4 py-3">
      <h5 className="mb-4 text-3xl">Bids</h5>
      <div className="px-3"></div>
      <div className="mb-4 rounded-xl border">
        {bids.length > 0
          ? bids.map((bid, idx) => (
              <div key={idx} className="flex items-center justify-between  px-3 pt-3">
                <div className="col-md-8">
                  <h6 className="mb-1 text-xl font-bold capitalize">{bid.user.bidding_name || 'Anonymous'}</h6>
                  <p className="text-sm font-medium text-dark-100/[.8]">{format(parseISO(bid.created_at), 'do MMMM, yyyy hh:mmaaa')}</p>
                </div>
                <div className="col-md-4">
                  <h6 className="mb-1 text-xl font-bold capitalize">{bid.bid} sats</h6>
                  <p className="text-right text-sm font-medium text-dark-100/[.8]">{satoshisToBitcoin(bid.bid)} BTC</p>
                </div>
              </div>
            ))
          : 'No Bids yet.'}
      </div>
    </section>
  )
}

export default AuctionBids
