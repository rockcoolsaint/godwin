'use client'

import { Auction } from 'src/api/auction/types'
import AuctionCard from 'src/components/pages/home/AuctionCard'
import { Container } from 'src/core'
import { isDateBefore } from 'src/utils/date'
interface Props {
  auctions: Auction[]
}

const FeaturedAuctions = ({ auctions }: Props) => {
  if (!auctions || !auctions.length) {
    return <Container>Could not load auctions</Container>
  }

  // show only 6 auctions and filter out the ones that are already ended
  auctions = auctions
    .filter(auction => {
      const isAuctionEnded = isDateBefore(auction.end_at)

      return !isAuctionEnded || isAuctionEnded
    })
    .slice(0, 6)

  return (
    <section className="flex w-full flex-col items-center justify-center px-5 py-40 md:px-0">
      <h1 className="text-center text-7xl text-primary">Upcoming Auctions</h1>
      <div className="mt-20 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {auctions.slice(0, 6).map((auction, idx) => (
          <AuctionCard key={idx} auction={auction} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedAuctions
