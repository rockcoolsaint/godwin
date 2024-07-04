'use client'

import clsx from 'clsx'
import { Tab } from '@headlessui/react'

import { BidsEntityOrCurrentBid, ProxyBid, Winner } from 'src/api/auction/types'
import AuctionBids from 'src/components/pages/auction/AuctionBids'
import AuctionProfile from 'src/components/pages/auction/AuctionProfile'
import AuctionLiveFeed from 'src/components/pages/auction/AuctionLiveFeed'
import AuctionHashPrice from 'src/components/pages/auction/AuctionHashPrice'
import Container from 'src/core/components/Container'
import BidWidget from 'src/components/pages/auction/BidWidget'
import { Button } from 'src/core'
import { Auction } from 'src/api/auction/types'
import { Order } from 'src/types'
import { useAccountContext } from 'src/providers/AccountProvider'
import isOrderFulfilled from 'src/utils/isOrderFulfilled'
import { useEffect, useState, useRef } from 'react'
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS } from 'react-joyride'
import { useIsMounted } from 'src/hooks/useIsMounted'
import { LocalStorageKeys } from 'src/constants/localStorage'
import { TAB_PANEL, TourState } from './types'
import BreadCrumb from 'src/components/shared/BreadCrumb'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { ErrorBoundary } from 'react-error-boundary'
import { updateAccount } from 'src/api/auth/updateAccount'
import { formatDate } from 'src/utils/date'
import { formatMoney } from 'src/utils/currency'
import { FC } from 'react';

const WinnersStatement: FC = () => {
  return (
    <section className="winners-statement mt-8">
      <h2 className="text-2xl font-bold">Winner’s Statement</h2>
      <p className="mt-2 text-base text-dark-100" style={{ marginLeft: '1in', maxWidth: '8in' }}>
Call me Ed 66. I learned about bitcoin some years ago. I can share some of my story.
</p>
<p className="mt-2 text-base text-dark-100" style={{ marginLeft: '1in', maxWidth: '8in' }}>
I grew up in a lot of places, I always was into computers and learning new stuff - I worked in tech support for several years and went back to school to become a teacher in 2007. I saved some money and was able to go full-time, but when the financial crisis happened my savings went down by 50% - this really threw me. 
</p>
<p className="mt-2 text-base text-dark-100" style={{ marginLeft: '1in', maxWidth: '8in' }}>
I’ll spare the details but shit happens, life moves on. I gave up on pursuing teaching.
</p>
<p className="mt-2 text-base text-dark-100" style={{ marginLeft: '1in', maxWidth: '8in' }}>
Years later, I read more about all the financial crisis stuff, what the banks did, and I learned about bitcoin and it put me down a path … I learned about fiat money, money printing. It blew my mind. That it’s just printed from thin air.. I mean when you really look close it’s just nonsense.
</p>
<p className="mt-2 text-base text-dark-100" style={{ marginLeft: '1in', maxWidth: '8in' }}>
Anyhow the thing I was most interested in back then with bitcoin was the proof of work. 
</p>
<p className="mt-2 text-base text-dark-100" style={{ marginLeft: '1in', maxWidth: '8in' }}>
How mining creates value. It’s an honest system. Fuck fiat.
</p>
<p className="mt-2 text-base text-dark-100" style={{ marginLeft: '1in', maxWidth: '8in' }}>
I checked out mining myself a few years ago but it was too complicated. I've looked into the home mining rigs but they look slow. I heard about Rigly from a friend, tried out the test drive, pretty cool. I was a little confused with the pool setup but I’m good there now.
</p>
<p className="mt-2 text-base text-dark-100" style={{ marginLeft: '1in', maxWidth: '8in' }}>
Bitcoin is a better system. July 4th feels like a good day to do my part for independent money.
</p>
<p className="mt-2 text-base text-dark-100" style={{ marginLeft: '1in', maxWidth: '8in' }}>
 I’m excited to mine and be a part of it. Thanks.
      </p>
    </section>
  );
};

function tabClass({ selected }: { selected: boolean }) {
  return clsx(
    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-dark-100',
    ' ring-offset-blue-400 ',
    selected ? 'bg-gradient !text-white' : 'text-dark-100 hover:bg-white/[0.52] hover:text-dark-100',
  )
}

function panelClass() {
  return clsx(
    'rounded-xl bg-white',
    'scrollbar-hide h-full ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
  )
}

interface AuctionContainerProps {
  auction: Auction
  order?: Order
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid
  user_proxy_bid?: ProxyBid
  winner: Winner
  slug: string
  tab?: 'bids' | 'profile' | 'live-feed' | 'hash-price'
}

export default function AuctionContainer({ auction, order, bids, current_bid, user_proxy_bid, winner, tab }: AuctionContainerProps) {
  const { account, token } = useAccountContext()
  const [currentTab] = useState(TAB_PANEL[tab || 'bids'])
  const [selectedIndex, setSelectedIndex] = useState(currentTab?.index || 0)
  const isMounted = useIsMounted()
  const [{ run, steps }, setState] = useState<TourState>({
    run: false,
    steps: [],
  })

  const bidRef = useRef<HTMLButtonElement>(null)
  const profileRef = useRef<HTMLButtonElement>(null)
  const liveFeedRef = useRef<HTMLButtonElement>(null)
  const hashPriceRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prepareSteps = () => {
      const hasGuide = localStorage.getItem(LocalStorageKeys.Guide.bid)
      if (isMounted() && account?.id && !hasGuide && !account?.has_completed_tour) {
        setState(prevState => ({
          ...prevState,
          run: true,
          steps: [
            {
              disableBeacon: true,
              content: <div className="text-left">View your bids here and the bids of other users</div>,
              placement: 'left',
              target: '[data-test-id="digest-step-settings-interval"]',
              title: <p className="font-bold">Bids</p>,
            },
            {
              content: <div className="text-left">View hashrate delivery terms</div>,
              placement: 'left',
              target: profileRef.current!,
              title: <p className="font-bold">Profile</p>,
            },
            {
              content: <div className="text-left">Check live feed of hashrate from our proxy</div>,
              placement: 'left',
              target: liveFeedRef.current!,
              title: <p className="font-bold">Livefeed</p>,
            },
            {
              content: <div className="text-left">Consult on-chain data to calculate hash price</div>,
              placement: 'left',
              target: hashPriceRef.current!,
              title: <p className="font-bold">Hash price</p>,
            },
            {
              content: <div className="text-left">Hashprice = (block subsidy + tx fees) / network hashrate</div>,
              placement: 'left',
              target: '[data-test-id="step-hashprice"]',
            },
            {
              content: <div className="text-left">Adjust hashprice for forward dated epochs</div>,
              placement: 'left',
              target: '[data-test-id="step-range"]',
            },
            {
              content: <div className="text-left">Compare estimate and bid price</div>,
              placement: 'left',
              target: '[data-test-id="step-estimate"]',
            },
            {
              content: <div className="text-left">Enter your bid and click button to place bid</div>,
              placement: 'left',
              target: '[data-test-id="step-bid-input"]',
            },
          ],
        }))
      }
    }
    prepareSteps()
  }, [account?.has_completed_tour, account?.id, isMounted])

  if (!auction) {
    return (
      <Container className="flex h-full grow items-center justify-center">
        <div className="flex items-center justify-center">Error loading auction</div>
      </Container>
    )
  }
  const renderAuctionMeta = () => {
    if (!auction.epoch) {
      return
    }

    return (
      <p className="mb-2 text-base text-dark-100">
        <span className="text-sm">{`${auction.auction_meta.days_of_mining} ${
          auction.auction_meta.days_of_mining > 1 ? 'days' : 'day'
        }  | Start date: ${formatDate(auction?.epoch?.start_time, 'MMM dd, yyyy')} `}</span>
      </p>
    )
  }

  const handleCallback = async (data: CallBackProps) => {
    const { action, index, status, type } = data

    if (([ACTIONS.CLOSE, ACTIONS.SKIP] as string[]).includes(action)) {
      localStorage.setItem(LocalStorageKeys.Guide.bid, JSON.stringify(true))

      if (token) {
        await updateAccount({ has_completed_tour: true }, token)
      }
      setSelectedIndex(0)
      setState(prevState => ({ ...prevState, run: false }))
    }

    if (status === STATUS.FINISHED && type === EVENTS.TOUR_END) {
      localStorage.setItem(LocalStorageKeys.Guide.bid, JSON.stringify(true))
      if (token) {
        await updateAccount({ has_completed_tour: true }, token)
      }
      setSelectedIndex(0)
      setState(prevState => ({ ...prevState, run: false }))
    }

    if (type === EVENTS.STEP_AFTER && index <= 4) {
      if (action === ACTIONS.NEXT) {
        setSelectedIndex(index + 1)

        setState(prevState => ({ ...prevState }))
      } else {
        setSelectedIndex(index - 1)
      }
    }
  }

  return (
    <>
      <h1 className="mb-2 text-4xl">{auction.title}</h1>
      <span className="mb-2 block text-sm text-dark-300">{`${auction.auction_meta?.days_of_mining} ${
        auction.auction_meta?.days_of_mining > 1 ? 'days' : 'day'
      }  | ${formatMoney(auction.auction_meta?.hashrate)} TH/s `}</span>
      <BreadCrumb
        homeElement={'Home'}
        separator={
          <span>
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        }
        activeClasses="text-primary"
        containerClasses="flex items-center -ml-1 mb-2"
        listClasses="hover:underline mr-2 ml-1 font-light text-sm"
      />
      {renderAuctionMeta()}
      <section className="auction-container flex flex-col rounded-xl bg-gray-50 sm:p-3 lg:flex-row">
        <ErrorBoundary fallback={<div className="w-full p-8">⚠️ Oops! something went wrong</div>}>
          <div data-test-id="digest-step-settings-interval" className="lg:w-[75%]">
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
              <Tab.Panels className="scrollbar-hide h-[600px] overflow-scroll">
                <Tab.Panel className={panelClass()}>
                  <div className="scrollbar-hide relative h-full rounded-md">
                    <AuctionBids bids={bids} />
                  </div>
                </Tab.Panel>
                <Tab.Panel className={panelClass()}>
                  <div className="scrollbar-hide relative h-full rounded-md">
                    <AuctionProfile data={auction} />
                  </div>
                </Tab.Panel>
                <Tab.Panel className={panelClass()}>
                  <div className="scrollbar-hide relative h-full rounded-md">
                    <AuctionLiveFeed auction={auction} />
                  </div>
                </Tab.Panel>
                <Tab.Panel className={panelClass()}>
                  <div className="scrollbar-hide relative h-full rounded-md">
                    <AuctionHashPrice />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
              <Tab.List className="mt-4 flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab ref={bidRef} className={tabClass}>
                  Bids
                </Tab>
                <Tab ref={profileRef} className={tabClass}>
                  Profile
                </Tab>
                <Tab ref={liveFeedRef} className={tabClass}>
                  Live feed
                </Tab>
                <Tab ref={hashPriceRef} className={tabClass}>
                  Hash price
                </Tab>
              </Tab.List>
            </Tab.Group>
          </div>
        </ErrorBoundary>
        <div className=" mt-4 flex min-w-fit flex-col lg:ml-4 lg:mt-0 lg:w-[25%]">
          <BidWidget auction={auction} bids={bids} current_bid={current_bid} user_proxy_bid={user_proxy_bid} winner={winner} />

          {order && account && order.account_id === account.id && !isOrderFulfilled(order.status) && (
            <a href={`/checkout/${order.id}`} className="mt-4 flex w-full flex-col">
              <Button>Checkout</Button>
            </a>
          )}
          {order && order.auction && account && order.account_id === account.id && isOrderFulfilled(order.status) && (
            <a href={`/account/hashrate/${order.auction.id}`} className="mt-4 flex w-full flex-col">
              <Button>Manage</Button>
            </a>
          )}
        </div>
      </section>
      {auction.id === 1705 && <WinnersStatement />}
      
      <Joyride
        callback={handleCallback}
        steps={steps}
        continuous
        showProgress
        run={run}
        showSkipButton
        disableCloseOnEsc
        disableOverlayClose
        hideCloseButton={false}
        styles={{
          options: {
            primaryColor: '#035DF2',
          },
        }}
      ></Joyride>
    </>
  )
}
