/* eslint-disable react/jsx-no-bind */
'use client'

import clsx from 'clsx'
import { Tab } from '@headlessui/react'

import { BidsEntityOrCurrentBid, Winner } from 'src/api/auction/types'
import AuctionBids from 'src/components/pages/auction/AuctionBids'
import AuctionProfile from 'src/components/pages/auction/AuctionProfile'
import AuctionLiveFeed from 'src/components/pages/auction/AuctionLiveFeed'
import AuctionSitePhotos from 'src/components/pages/auction/AuctionSitePhotos'
import AuctionHashPrice from 'src/components/pages/auction/AuctionHashPrice'
import AuctionCalculator from 'src/components/pages/auction/AuctionCalculator'
import ContentContainer from 'src/components/shared/ContentContainer'
import BidWidget from 'src/components/pages/auction/BidWidget'
import { Button } from 'src/core'
import { Auction, Order } from 'src/types'
import { Fragment } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function handleSelect({ selected }: { selected: boolean }) {
  return clsx(
    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-dark-100',
    ' ring-offset-blue-400 ',
    selected ? 'bg-gradient !text-white' : 'text-dark-100 hover:bg-white/[0.52] hover:text-dark-100',
  )
}

interface AuctionContainerProps {
  auction: Auction
  order?: Order
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid
  proxy_bid: BidsEntityOrCurrentBid[]
  winner: Winner
  slug: string
}

export default function AuctionContainer({ auction, order, bids, current_bid }: AuctionContainerProps) {
  const categories = {
    Bids: [
      {
        id: 1,
        component: <AuctionBids bids={bids} />,
      },
    ],
    Profile: [
      {
        id: 2,
        component: <AuctionProfile data={auction} />,
      },
    ],
    'Live feed': [
      {
        id: 3,
        component: <AuctionLiveFeed />,
      },
    ],
    Calculator: [
      {
        id: 4,
        component: <AuctionCalculator data={auction} />,
      },
    ],
    'Hash price': [
      {
        id: 5,
        component: <AuctionHashPrice />,
      },
    ],
    'Site photos': [
      {
        id: 6,
        component: <AuctionSitePhotos />,
      },
    ],
  }

  if (!auction) {
    return <ContentContainer>Error loading auction</ContentContainer>
  }

  return (
    <>
      <h1 className="mb-2 text-4xl">{auction.title}</h1>
      <p></p>
      <section className="flex rounded-xl bg-gray-50 p-3">
        <div className=" w-[75%] px-2 sm:px-0">
          <Tab.Group>
            <Tab.Panels className=" h-[640px] overflow-scroll ">
              {Object.values(categories).map((posts, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    'rounded-xl bg-white pb-4',
                    'h-full ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  )}
                >
                  {posts.map(post => (
                    <div key={post.id} className="relative h-full rounded-md">
                      {post.component}
                    </div>
                  ))}
                </Tab.Panel>
              ))}
            </Tab.Panels>
            <Tab.List className="mt-4 flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {Object.keys(categories).map(category => (
                <Tab key={category} className={handleSelect}>
                  {category}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
        <div className="ml-4 flex w-[25%] flex-col">
          <BidWidget auction={auction} bids={bids} current_bid={current_bid} />
          {order && (
            <a href={`/checkout/${order.id}`} className="mt-4 block w-full">
              <Button className="w-full">Checkout</Button>
            </a>
          )}
        </div>
      </section>
    </>
  )
}
