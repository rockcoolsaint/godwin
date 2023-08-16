'use client'

import { Auction } from 'src/api/auction/types'
import AuctionCard from 'src/components/pages/home/AuctionCard'
import Link from 'src/components/shared/Link'
import { Container } from 'src/core'
interface Props {
  auctions: Auction[]
}

const FeaturedAuctions = ({ auctions }: Props) => {
  if (!auctions || !auctions.length) {
    return (
      <Container className="flex items-center justify-center py-20">
        <span className="text-red-500">No auctions available</span>
      </Container>
    )
  }

  return (
    <Container>
      <section className="flex w-full flex-col items-center justify-center py-28 md:px-0">
        <h1 className="text-center text-7xl text-primary">View the auctions</h1>
        <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {auctions.map((auction, idx) => (
            <AuctionCard key={idx} auction={auction} />
          ))}
        </div>
        <Link className="mt-8 underline hover:no-underline" href="/collections">
          View all auctions
        </Link>
      </section>
    </Container>
  )
}

export default FeaturedAuctions
