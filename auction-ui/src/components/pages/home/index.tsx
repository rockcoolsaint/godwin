'use client'

import HomeCollection from 'src/components/HomeCollection'
import { Auction } from 'src/api/auction/types'

interface Props {
  auctions: Auction[]
}

export default function Home({ auctions }: Props) {
  return (
    <div>
      <HomeCollection auctions={auctions} />
    </div>
  )
}
