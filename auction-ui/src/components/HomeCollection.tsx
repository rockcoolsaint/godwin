'use client'

import { Auction } from 'src/api/auction/types'
import CollectionProductBlock from 'src/components/CollectionProductBlock'
interface Props {
  auctions: Auction[]
}

const HomeCollection = ({ auctions }: Props) => {
  return (
    <section className="flex w-full flex-col items-center justify-center py-40">
      <h1 className="text-center text-7xl text-primary">Upcoming Auctions</h1>
      <div className="mt-20 grid w-full grid-cols-1 gap-6 md:w-[52%] md:grid-cols-2">
        {auctions.map((auction, idx) => (
          <CollectionProductBlock key={idx} auction={auction} />
        ))}
      </div>
    </section>
  )
}

export default HomeCollection
