/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import AuctionContainer from 'src/components/pages/auction/AuctionContainer'
import CompleteAccountBanner from 'src/components/CompleteAccountBanner'
import Container from 'src/core/components/Container'
import { getAuctionBySlug } from 'src/api/auction/getAuctionBySlug'
import { getOrderByAuctionId } from 'src/api/orders/getOrderByAuctionId'
import { useEffect, useRef, useState } from 'react'

import { Loader } from 'src/core'
import { AuctionStatus, Auction, BidsEntityOrCurrentBid, ProxyBid } from 'src/api/auction/types'
import { useWebsocketContext } from 'src/providers/WebsocketProvider'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Order } from 'src/types'
import toast from 'react-hot-toast'
import { useNotificationsContext } from 'src/providers/NotificationsProvider'
import AuctionCard from 'src/components/pages/home/AuctionCard'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import Link from 'src/components/shared/Link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function AuctionPage({ params }: { params: { auctionSlug: [string, 'bids' | 'profile' | 'hash-price'] } }) {
  const [slug, tab] = params.auctionSlug

  const { token, isLoading: tokenLoading, account } = useAccountContext()
  const { socket, isSocketReady } = useWebsocketContext()

  const bids = useRef<BidsEntityOrCurrentBid[]>([])

  const [auction, setAuction] = useState<Auction | undefined>(undefined)
  const [currentBid, setCurrentBid] = useState<any>(undefined)
  const [proxyBids, setProxyBids] = useState<ProxyBid[]>([])
  const [userProxyBid, setUserProxyBid] = useState<ProxyBid | undefined>(undefined)
  const [winner, setWinner] = useState<any>(undefined)
  const [order, setOrder] = useState<Order | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [activeAuctions, setActiveAuctions] = useState<Auction[]>([])
  const { setAuction: handleSetAuction, setAuctionStatus, setAuctionEndNotification, setCheckoutNotification } = useNotificationsContext()

  const loadAuction = async () => {
    try {
      const result = await getAuctionBySlug(slug)
      if (!result.auction) {
        throw new Error(`Couldn't load auction`)
      }

      return result
    } catch (ex: any) {
      toast.error(ex.message)
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
      setLoading(true)
      try {
        const auctionResult = await loadAuction()
        const activeAuctions = await getAllAuctions({
          limit: 10,
          auction_type: 'forward_date',
          group_by: 'auction_status',
          auction_status: 'active',
        })
        if (!auctionResult) {
          throw new Error(`Couldn't load auction`)
        }
        setActiveAuctions(activeAuctions.results)

        setAuction(auctionResult.auction)
        bids.current = auctionResult.bids
        setProxyBids(auctionResult.proxy_bid)
        setCurrentBid(auctionResult.current_bid)
        setWinner(auctionResult.winner)

        if (token && auctionResult.auction.status === AuctionStatus.Completed) {
          if (account && auctionResult.winner.account) {
            if (account.id === auctionResult.winner.account.id) {
              await loadOrder()
            }
          }
        }
      } catch (ex: any) {
        toast.error(ex.message)
      } finally {
        setLoading(false)
      }
    }

    prepareAuction()
  }, [slug, token])

  useEffect(() => {
    if (auction && auction.status === AuctionStatus.Completed && !tokenLoading && token) {
      loadOrder()
    }
  }, [tokenLoading, token, auction])

  useEffect(() => {
    if (auction && isSocketReady) {
      const handleAuctionsUpdate = async (update: any) => {
        if (auction.status === AuctionStatus.Active && update === AuctionStatus.Completed) {
          const result = await getAuctionBySlug(slug)
          if (account?.id === result.winner.account.id) {
            await loadOrder()
            setCheckoutNotification(true)
          } else {
            setAuctionEndNotification(true)
          }
        }

        setAuction({ ...auction, status: update })
        handleSetAuction(auction)
        setAuctionStatus(update)
      }
      setAuctionEndNotification(false)

      const handleBidsUpdate = (update: any) => {
        bids.current = [update, ...bids.current]
      }

      const handleCurrentBidUpdate = (update: any) => {
        setCurrentBid(update)
      }

      const handleProxyBidsUpdate = (update: ProxyBid) => {
        setProxyBids(_ => {
          return [update]
        })
      }

      const prepare = async () => {
        socket.subscribe(`auction_status_${auction.id}`, handleAuctionsUpdate)
        socket.subscribe(`bids_${auction.id}`, handleBidsUpdate)
        socket.subscribe(`proxy_bids_${auction.id}`, handleProxyBidsUpdate)
        socket.subscribe(`current_bid_${auction.id}`, handleCurrentBidUpdate)
      }

      prepare()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auction?.id, auction?.status, socket, isSocketReady])

  useEffect(() => {
    const bid = proxyBids.filter(bid => {
      return bid.account.id === account?.id
    })
    setUserProxyBid(bid[0])
  }, [proxyBids])

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
          user_proxy_bid={userProxyBid}
          winner={winner}
          order={order}
          slug={slug}
          tab={tab}
        />
      </Container>
      {activeAuctions.length > 0 && (
        <Container>
          <div className="flex items-center justify-between">
            <h1 className="mb-2 mt-4 text-sm sm:text-2xl">Related auctions</h1>
            <Link href="/auction-market" className="flex items-center text-sm text-primary hover:underline sm:text-lg">
              <span>See more</span> <ArrowRightIcon className="ml-2 inline-block h-4 w-4" />
            </Link>
          </div>
          <div className="scrollbar-hide grid w-full auto-cols-max grid-flow-col items-start justify-between gap-4 overflow-x-scroll p-4 pl-0">
            {activeAuctions.map(auction => (
              <AuctionCard auction={auction} key={auction.id} />
            ))}
          </div>
        </Container>
      )}
    </>
  )
}
