'use client'

import AuctionContainer from 'src/components/pages/auction/AuctionContainer'
import ContentContainer from 'src/components/shared/ContentContainer'
import { getAuctionBySlug } from 'src/api/auction/getAuctionBySlug'
import { getOrderByAuctionId } from 'src/api/orders/getOrderByAuctionId'
import { useEffect, useState } from 'react'

import ws from 'src/lib/ws'
import { Auction, Order } from 'src/types'
import { Loader } from 'src/core'
import { AuctionStatus } from 'src/api/auction/types'

export default function AuctionPage({ params }: { params: { auctionSlug: string } }) {
  const slug = params.auctionSlug

  const [auction, setAuction] = useState<Auction | undefined>(undefined)
  const [bids, setBids] = useState<any>(undefined)
  const [currentBid, setCurrentBid] = useState<any>(undefined)
  const [proxyBid, setProxyBid] = useState<any>(undefined)
  const [winner, setWinner] = useState<any>(undefined)

  const [order, setOrder] = useState<Order | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const prepareAuction = async () => {
      setLoading(true)

      try {
        const { auction, bids, current_bid, proxy_bid, winner } = await getAuctionBySlug(slug)
        if (!auction) {
          setLoading(false)

          return console.error('Couldnt load auction')
        }

        setAuction(auction)
        setBids(bids)
        setCurrentBid(current_bid)
        setProxyBid(proxy_bid)
        setWinner(winner)

        if (auction.status === AuctionStatus.Completed) {
          const order = await getOrderByAuctionId(auction.id)
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

  useEffect(() => {
    const handleAuctionsUpdate = (auction: Auction) => {
      setAuction(auction)
      setCurrentBid(auction.current_bid)
    }

    const handleBidsUpdate = (update: any) => {
      setBids(update.bids)
      setCurrentBid(update.proxy_bid)
      setWinner(update.winner)
    }

    const prepare = async () => {
      await ws.connect()

      ws.subscribe(`auctions_${slug}`, handleAuctionsUpdate)
      ws.subscribe(`bids_${slug}`, handleBidsUpdate)
    }

    prepare()

    return () => {
      ws.unsubscribe(`auctions_${slug}`, handleAuctionsUpdate)
      ws.unsubscribe(`bids_${slug}`, handleBidsUpdate)
    }
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
      <AuctionContainer
        auction={auction}
        bids={bids}
        current_bid={currentBid}
        proxy_bid={proxyBid}
        winner={winner}
        order={order}
        slug={slug}
      />
    </ContentContainer>
  )
}
