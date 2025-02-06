'use client'

import { useEffect, useState } from 'react'
import { BidsEntityOrCurrentBid } from 'src/api/auction/types'
import { satoshisToFiat } from 'src/utils/bitcoin'

export default function useSatsToFiat({ initialValue = 0, bid }: { initialValue: number; bid: BidsEntityOrCurrentBid | number }) {
  const [priceInFiat, setPriceInFiat] = useState(initialValue)

  useEffect(() => {
    const getPrice = async () => {
      try {
        let price
        if (typeof bid === 'number') {
          price = await satoshisToFiat(bid)
        } else {
          price = await satoshisToFiat(bid.bid)
        }
        setPriceInFiat(price)
      } catch (error) {
        console.error('Error converting sats to fiat:', error)
      }
    }

    getPrice()
  }, [bid])

  if (!Boolean(bid)) {
    return 0
  }

  return priceInFiat
}
