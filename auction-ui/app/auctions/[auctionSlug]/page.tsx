'use client'

import AuctionContainer from 'src/components/pages/auction/AuctionContainer'
import ContentContainer from 'src/components/shared/ContentContainer'
import { AuctionResponse, getAuctionBySlug } from 'src/api/auction/getAuctionBySlug'
import { getOrderByAuctionId } from 'src/api/orders/getOrderByAuctionId'
import { useEffect, useState } from 'react'

import { Order, OrderStatus } from 'src/types'
import { Loader } from 'src/core'
import { AuctionStatus } from 'src/api/auction/types'

export default function AuctionPage({ params }: { params: { auctionSlug: string } }) {
  const slug = params.auctionSlug

  const [auction, setAuction] = useState<AuctionResponse | undefined>(undefined)
  const [order, setOrder] = useState<Order | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const prepareAuction = async () => {
      setLoading(true)

      try {
        const auction = await getAuctionBySlug(slug)
        if (!auction) {
          setLoading(false)

          return console.error('Couldnt load auction')
        }

        setAuction(auction)

        if (auction.auction.status === AuctionStatus.Completed) {
          const order = await getOrderByAuctionId(auction.auction.id)
          if (!order) {
            setLoading(false)

            return console.error('Couldnt load order')
          }
          setOrder(order)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }

    prepareAuction()
  }, [slug])

  if (loading) {
    return (
      <ContentContainer>
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      </ContentContainer>
    )
  }

  if (!slug || slug === 'undefined') {
    return <ContentContainer title="Auction">Error loading auction</ContentContainer>
  }

  if (!auction) {
    return <ContentContainer title="Auction">Error loading auction</ContentContainer>
  }

  return (
    <ContentContainer className="py-5">
      <AuctionContainer {...auction} order={order} slug={slug} />
    </ContentContainer>
  )
}
