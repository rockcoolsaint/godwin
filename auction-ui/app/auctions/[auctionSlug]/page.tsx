'use client'

import AuctionContainer from 'src/components/pages/auction/AuctionContainer'
import Container from 'src/core/components/Container'
import { getAuctionBySlug, Hashrate } from 'src/api/auction/getAuctionBySlug'
import { getOrderByAuctionId } from 'src/api/orders/getOrderByAuctionId'
import { useEffect, useRef, useState } from 'react'

import { Loader } from 'src/core'
import { AuctionStatus, Auction, BidsEntityOrCurrentBid } from 'src/api/auction/types'
import { useWebsocketContext } from 'src/providers/WebsocketProvider'
import { Order } from 'src/types'

export default function AuctionPage({ params }: { params: { auctionSlug: string } }) {
  const slug = params.auctionSlug

  const { socket, isSocketReady } = useWebsocketContext()

  const bids = useRef<BidsEntityOrCurrentBid[]>([])

  const [auction, setAuction] = useState<Auction | undefined>(undefined)
  const [currentBid, setCurrentBid] = useState<any>(undefined)
  const [proxyBids, setProxyBids] = useState<any>(undefined)
  const [winner, setWinner] = useState<any>(undefined)
  const [hashrateData, setHashrateData] = useState<Hashrate[]>([])
  const [order, setOrder] = useState<Order | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const prepareAuction = async () => {
      setLoading(true)

      try {
        const { auction, hashrate, bids: auction_bids, current_bid, proxy_bids, winner } = await getAuctionBySlug(slug)
        if (!auction) {
          setLoading(false)

          return console.error('Couldnt load auction')
        }

        setAuction(auction)
        bids.current = auction_bids
        setProxyBids(proxy_bids)
        setCurrentBid(current_bid)
        setWinner(winner)
        setHashrateData(hashrate)

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
      }

      const handleBidsUpdate = (update: any) => {
        bids.current = [update, ...bids.current]
      }

      const handleCurrentBidUpdate = (update: any) => {
        setCurrentBid(update)
      }

      const prepare = async () => {
        socket.subscribe(`auction_status_${auction.id}`, handleAuctionsUpdate)
        socket.subscribe(`bids_${auction.id}`, handleBidsUpdate)
        socket.subscribe(`current_bid_${auction.id}`, handleCurrentBidUpdate)
      }

      prepare()

      return () => {
        socket.unsubscribe(`auction_status_${auction.id}`, handleAuctionsUpdate)
        socket.unsubscribe(`bids_${auction.id}`, handleBidsUpdate)
        socket.unsubscribe(`current_bid_${auction.id}`, handleCurrentBidUpdate)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auction?.id, socket, isSocketReady])

  if (loading) {
    return (
      <Container className="h-full py-40">
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      </Container>
    )
  }

  if (!slug || !auction) {
    return <Container className="h-full py-40">Error loading auction</Container>
  }

  return (
    <Container className="h-full py-5">
      <AuctionContainer
        auction={auction}
        hashrate={hashrateData}
        bids={bids.current}
        current_bid={currentBid}
        proxy_bids={proxyBids}
        winner={winner}
        order={order}
        slug={slug}
      />
    </Container>
  )
}
