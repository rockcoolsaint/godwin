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
import Container from 'src/core/components/Container'
import BidWidget from 'src/components/pages/auction/BidWidget'
import { Button, Loader } from 'src/core'
import { Auction, Order, OrderStatus } from 'src/types'
import { useAccountContext } from 'src/providers/AccountProvider'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function handleSelect({ selected }: { selected: boolean }) {
  return clsx(
    'text-dark-100 w-full rounded-lg py-2.5 text-sm font-medium leading-5',
    ' ring-offset-blue-400 ',
    selected ? 'bg-gradient !text-white' : 'text-dark-100 hover:text-dark-100 hover:bg-white/[0.52]',
  )
}

interface AuctionContainerProps {
  auction: Auction
  order?: Order
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid | null
  proxy_bids: BidsEntityOrCurrentBid[]
  winner: Winner
  slug: string
}

export default function AuctionContainer({ auction, order, bids, current_bid }: AuctionContainerProps) {
  const { account, isLoading } = useAccountContext()

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

  if (isLoading) {
    return (
      <Container className="flex h-full grow items-center justify-center">
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      </Container>
    )
  }

  if (!auction) {
    return (
      <Container className="flex h-full grow items-center justify-center">
        <div className="flex items-center justify-center">Error loading auction</div>
      </Container>
    )
  }

  return (
    <>
      <h1 className="mb-2 text-4xl">{auction.title}</h1>
      <p></p>
      <section className="flex flex-col rounded-xl bg-gray-50 p-3 lg:flex-row">
        <div className=" px-2 sm:px-0 lg:w-[75%]">
          <Tab.Group>
            <Tab.Panels className=" h-[640px] overflow-scroll ">
              {Object.values(categories).map((posts, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    'rounded-xl bg-white',
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
        <div className="ml-4 mt-4 flex flex-col lg:mt-0 lg:w-[25%]">
          <BidWidget auction={auction} bids={bids} current_bid={current_bid} />

          {order && account && order.account_id === account.id && order.status !== OrderStatus.PaymentTwoComplete && (
            <a href={`/checkout/${order.id}`} className="mt-4 flex w-full flex-col">
              <Button>Checkout</Button>
            </a>
          )}
          {order && account && order.account_id === account.id && order.status === OrderStatus.PaymentTwoComplete && (
            <a href={`/account/hashrate/${order.auction.id}`} className="mt-4 flex w-full flex-col">
              <Button>Manage</Button>
            </a>
          )}
        </div>
      </section>
    </>
  )
}
