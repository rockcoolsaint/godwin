'use client'

import { useEffect, useState } from 'react'
import { getAuctionOfTheDay } from 'src/api/auction/getAuctionOfTheDay'
import { getFeaturedAuctions } from 'src/api/auction/getFeaturedAuctions'
import { Auction, AuctionOfTheDayResponse } from 'src/api/auction/types'
import Home from 'src/components/pages/home'
import { Container, Loader } from 'src/core'

export default function HomePage() {
  const [auctions, setAuctions] = useState<Auction[] | undefined>(undefined)
  const [auctionOfTheDay, setAuctionOfTheDay] = useState<AuctionOfTheDayResponse | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const prepareHomepage = async () => {
      setLoading(true)

      try {
        const [auctions, auctionOfTheDay] = await Promise.all([getFeaturedAuctions(), getAuctionOfTheDay()])

        setAuctions(auctions)
        setAuctionOfTheDay(auctionOfTheDay)
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }

    prepareHomepage
  }, [])

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      </Container>
    )
  }

  return <Home auctions={auctions} auctionOfTheDay={auctionOfTheDay} />
}
