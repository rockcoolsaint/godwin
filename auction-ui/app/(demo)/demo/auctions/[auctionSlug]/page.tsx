/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import AuctionContainer from 'src/components/pages/auction/AuctionContainer'
import CompleteAccountBanner from 'src/components/CompleteAccountBanner'
import Container from 'src/core/components/Container'
import { getAuctionBySlug } from 'src/api/auction/getAuctionBySlug'
import { getOrderByAuctionId } from 'src/api/orders/getOrderByAuctionId'
import { useEffect, useRef, useState } from 'react'

import { Loader } from 'src/core'
import { AuctionStatus, Auction, BidsEntityOrCurrentBid } from 'src/api/auction/types'
import { useWebsocketContext } from 'src/providers/WebsocketProvider'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Order } from 'src/types'
import toast from 'react-hot-toast'

export default function AuctionPage({ params }: { params: { auctionSlug: string } }) {
  const slug = params.auctionSlug

  const { token, isLoading: tokenLoading } = useAccountContext()
  const { socket, isSocketReady } = useWebsocketContext()

  const bids = useRef<BidsEntityOrCurrentBid[]>([])

  const [auction, setAuction] = useState<Auction | undefined>(undefined)
  const [currentBid, setCurrentBid] = useState<any>(undefined)
  const [proxyBids, setProxyBids] = useState<any>(undefined)
  const [winner, setWinner] = useState<any>(undefined)
  const [order, setOrder] = useState<Order | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  const loadAuction = async () => {
    try {
      setLoading(true)
      const result = await getAuctionBySlug(slug)
      if (!result.auction) {
        throw new Error(`Couldn't load auction`)
      }

      return result
    } catch (ex: any) {
      toast.error(ex.message)
    } finally {
      setLoading(false)
    }
  }

  const loadOrder = async () => {
    if (!auction || !token) {
      return
    }

    try {
      const order = await getOrderByAuctionId(auction.id, token)
      if (!order) {
        throw new Error(`Couldn't load order`)
      }
      setOrder(order)
    } catch (ex: any) {
      toast.error(ex.message)
    }
  }

  useEffect(() => {
    const prepareAuction = async () => {
      try {
        setLoading(true)
        const auctionResult = await loadAuction()
        if (!auctionResult) {
          throw new Error(`Couldn't load auction`)
        }

        setAuction(auctionResult.auction)
        bids.current = auctionResult.bids
        setProxyBids(auctionResult.proxy_bid)
        setCurrentBid(auctionResult.current_bid)
        setWinner(auctionResult.winner)
      } catch (ex: any) {
        toast.error(ex.message)
      } finally {
        setLoading(false)
      }
    }

    prepareAuction()
  }, [slug, tokenLoading, token])

  useEffect(() => {
    if (auction && auction.status === AuctionStatus.Completed && !tokenLoading && token) {
      loadOrder()
    }
  }, [tokenLoading, token, auction])

  useEffect(() => {
    if (auction && isSocketReady) {
      const handleAuctionsUpdate = async (update: any) => {
        if (auction.status === AuctionStatus.Active && update === AuctionStatus.Completed) {
          await loadOrder()
        }

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
    <>
      <CompleteAccountBanner auction={auction} />
      <Container className="h-full py-5">
        <AuctionContainer
          auction={auction}
          bids={bids.current}
          current_bid={currentBid}
          proxy_bid={proxyBids}
          winner={winner}
          order={order}
          slug={slug}
        />
      </Container>
    </>
  )
}
