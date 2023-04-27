'use client'

import HashPriceStats from './HashPriceStats'

export default function AuctionHashPrice() {
  return (
    <div className="flex flex-col items-center justify-center overflow-scroll bg-gray-100">
      <div>
        <HashPriceStats />
      </div>
      <div />
    </div>
  )
}
