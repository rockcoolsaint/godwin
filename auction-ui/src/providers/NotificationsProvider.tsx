'use client'

import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Auction, BidsEntityOrCurrentBid, AuctionStatus } from 'src/api/auction/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export interface INotificationsContext {
  showAuctionNotification(): void
  setAuction?: any
  setAuctionStatus?: any
  setBids?: any
  auction?: Auction
  auctionStatus?: AuctionStatus
  bids?: BidsEntityOrCurrentBid[]
}

const NotificationsContext = createContext<INotificationsContext | null>(null)

export function useNotificationsContext() {
  const context = useContext(NotificationsContext)

  if (!context) {
    throw new Error('[Rigly UI]: useNotificationsContext must be used within a `<NotificationsProvider />` component')
  }

  return context
}

export default function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [auction, setAuction] = useState<Auction | undefined>(undefined)
  const [auctionStatus, setAuctionStatus] = useState<AuctionStatus>(AuctionStatus.Active)
  const [bids, setBids] = useState(undefined)
  const router = useRouter()

  const displayAuctionNotification = () =>
    toast.custom(
      t => (
        <>
          {auction && auctionStatus === AuctionStatus.Completed && (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black/5`}
            >
              <div className="w-0 flex-1 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <Image
                      width={60}
                      height={60}
                      className=" h-10 w-10 rounded-sm"
                      src={auction.auction_meta.site_photo}
                      alt={auction.title + ' Image'}
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{auction?.title}</p>
                    <p className="mt-1 text-sm text-gray-500">Auction Ended</p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => {
                    toast.dismiss()
                    router.push('/auctions/' + auction?.slug)
                  }}
                  className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 "
                >
                  View
                </button>
              </div>
            </div>
          )}
        </>
      ),
      { id: 'auction', position: 'top-center', duration: Infinity },
    )

  const context: INotificationsContext = {
    showAuctionNotification: displayAuctionNotification,
    auction: auction,
    bids: bids,
    setBids,
    setAuction,
    auctionStatus,
    setAuctionStatus,
  }

  return <NotificationsContext.Provider value={context}>{children}</NotificationsContext.Provider>
}
