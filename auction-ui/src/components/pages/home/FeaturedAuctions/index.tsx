'use client'

import { Auction } from 'src/api/auction/types'
import AuctionCard from 'src/components/pages/home/AuctionCard'
interface Props {
  auctions: Auction[]
}

const FeaturedAuctions = ({ auctions }: Props) => {
  return (
    <section className="flex w-full flex-col items-center justify-center px-5 py-40 md:px-0">
      <h1 className="text-center text-7xl text-primary">Upcoming Auctions</h1>
      <div className="mt-20 grid w-full grid-cols-1 gap-6 md:w-4/5 md:grid-cols-3">
        {auctions && auctions.map((auction, idx) => <AuctionCard key={idx} auction={auction} />)}
      </div>
    </section>
  )
}

export default FeaturedAuctions
