import { satoshisToFiat } from 'bitcoin-conversion'
import { useState } from 'react'
import { BidsEntityOrCurrentBid } from 'src/api/auction/types'

export default function useSatsToFiat({ initialValue = 0, bid }: { initialValue: number; bid: BidsEntityOrCurrentBid | number }) {
  const [priceInFiat, setPriceInFiat] = useState(initialValue)
  if (!Boolean(bid)) {
    return 0
  }
  ;(async () => {
    let price
    if (typeof bid == 'number') {
      price = await satoshisToFiat(bid, 'USD')
    } else {
      price = await satoshisToFiat(bid.bid, 'USD')
    }

    setPriceInFiat(price)
  })()

  return priceInFiat
}
