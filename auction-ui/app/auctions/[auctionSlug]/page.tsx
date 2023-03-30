'use client'

import AuctionContainer from 'src/components/pages/auction/AuctionContainer'
import ContentContainer from 'src/components/shared/ContentContainer'
import { getAuctionBySlug } from 'src/api/auction/getAuctionBySlug'
import { getOrderByAuctionId } from 'src/api/orders/getOrderByAuctionId'
import { useEffect, useState } from 'react'

import { Auction, Order } from 'src/types'
import { Loader } from 'src/core'
import { AuctionStatus } from 'src/api/auction/types'
import { useWebsocketContext } from 'src/providers/WebsocketProvider'

export default function AuctionPage({ params }: { params: { auctionSlug: string } }) {
  const slug = params.auctionSlug

  const { socket, isSocketReady } = useWebsocketContext()

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
    if (auction && isSocketReady) {
      const handleAuctionsUpdate = (update: any) => {
        setAuction({ ...auction, status: update })
        // setAuction(newAuction)
        // setCurrentBid(newAuction.current_bid)
      }

      const handleBidsUpdate = (update: any) => {
        setBids(update.bids)
      }

      const prepare = async () => {
        socket.subscribe(`auction_status_${auction.id}`, handleAuctionsUpdate)
        socket.subscribe(`bids_${auction.id}`, handleBidsUpdate)
      }

      prepare()

      return () => {
        socket.unsubscribe(`auction_status_${auction.id}`, handleAuctionsUpdate)
        socket.unsubscribe(`bids_${auction.id}`, handleBidsUpdate)
      }
    }
  }, [auction, auction?.id, socket, isSocketReady])

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
