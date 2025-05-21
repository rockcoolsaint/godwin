         
'use client'
import { Auction, AuctionOfTheDayResponse } from 'src/api/auction/types'
import { LocalStorageKeys } from 'src/constants/localStorage'
import { useAccountContext } from 'src/providers/AccountProvider'
import { useEffect, useState } from 'react'
import Gradient from 'src/components/shared/Gradient'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import Hero from './Hero'
import Link from 'src/components/shared/Link'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import { getAuctionOfTheDay } from 'src/api/auction/getAuctionOfTheDay'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Arusha from 'src/images/arusha.png'
import Isla from 'src/images/isla.png'

const TrustlessMining = dynamic(() => import('./TrustlessMining'), {
  ssr: true
})



const Learn = dynamic(() => import('./Learn'), {
  ssr: false,
})

const AOTD = dynamic(() => import('./AOTD'), {
  ssr: false,
})

const RealMachines = dynamic(() => import('./RealMachines'), {
  ssr: false,
})

const UpcomingAuctions = dynamic(() => import('./UpcomingAuctions'), {
  ssr: false,
})

interface Props {
  isDemo?: boolean
  code?: string
}

const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

const formatDateWithSuffix = (date: Date) => {
  const day = format(date, 'd');
  const month = format(date, 'MMMM');
  const dayNumber = parseInt(day, 10);
  const suffix = getOrdinalSuffix(dayNumber);
  return `${month} ${dayNumber}${suffix}`;
};

// Common button style class
const buttonClass = "w-full flex items-center justify-center rounded-lg bg-navy px-8 py-4 font-epilogue text-lg text-white hover:opacity-90";

export default function Home({ isDemo, code }: Props) {
  const { account } = useAccountContext()
  const [_, setLoading] = useState(false)
  const [auctionData, setAuctionData] = useState<Auction[]>([])
  const [auctionOfTheDay, setAuctionOfTheDay] = useState<AuctionOfTheDayResponse | null>(null)
  const isLoggedIn = Boolean(account?.email)
  // Add a new state to track if countdown is ready
  const [isCountdownReady, setIsCountdownReady] = useState(false);

  // Add state for countdown
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Add function to calculate next block party date (Saturday at 16:00 UTC)
  const getNextBlockPartyDate = () => {
    const now = new Date();
    const nextParty = new Date();
    
    // Set to next Saturday
    nextParty.setUTCDate(now.getUTCDate() + ((6 - now.getUTCDay() + 7) % 14));
    
    // Set time to 16:00 UTC
    nextParty.setUTCHours(16, 0, 0, 0);
    
    // If it's Saturday after 16:00 UTC, move to next Saturday
    if (now.getUTCDay() === 6 && now.getUTCHours() >= 16) {
      nextParty.setUTCDate(nextParty.getUTCDate() + 7);
    }
    
    return nextParty;
  };

  // Modify the useEffect for countdown
  useEffect(() => {
    // Calculate initial countdown
    const now = new Date();
    const nextParty = getNextBlockPartyDate();
    const timeRemaining = nextParty.getTime() - now.getTime();

    if (timeRemaining > 0) {
      setCountdown({
        days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000)
      });
      setIsCountdownReady(true);
    }

    const timer = setInterval(() => {
      const now = new Date();
      const nextParty = getNextBlockPartyDate();
      const timeRemaining = nextParty.getTime() - now.getTime();

      if (timeRemaining > 0) {
        setCountdown({
          days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const prepareCollections = async () => {
      setLoading(true)
      try {
        const res = await getAllAuctions({
          limit: 1_000,
          group_by: 'auction_status',
          auction_status: 'active',
        })
        const resAuctionOfTheDay = await getAuctionOfTheDay({ isDemo: false })
        setAuctionOfTheDay(resAuctionOfTheDay)
        setAuctionData(res.results)
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }
    prepareCollections()
  }, [])

  if (code) {
    localStorage.setItem(LocalStorageKeys.Referral.plebtern, code)
  }

  return (
    <div>

      <div className="flex items-center justify-center gap-x-6 bg-[#f08222] px-6 py-2.5 sm:px-3.5">
            <p className="text-sm leading-6 text-white">
              <a href="/pages/dashboard">
                <strong className="font-semibold">{formatDateWithSuffix(new Date())}</strong>
                <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                {isCountdownReady ? (
                  `Next block party in ${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} min, ${countdown.seconds} sec`
                ) : null}
              </a>
            </p>
          </div>

        <>
          <section className="mx-auto mt-8 flex flex-col items-center justify-center sm:mt-14">
            <Gradient />
            <Hero>
              <>
                <div className="mb-20 mt-6 flex w-full justify-center font-chakra font-bold">
              </div>
              </>
            </Hero>

            {/* Added text */}
            <div className="text-center text-l text-gray-600 mb-12 mt-8">
              <h2 className="text-3xl font-orange mb-6">Mine with a Team and Earn a Bigger Reward</h2>
              <p>Team with most hash wins</p>

              <p><small>+21% reward share</small></p>
              <br/>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Team Arusha */}
              <div className="bg-[#fff5eb] rounded-lg shadow p-4 w-full sm:w-[200px]">
                <div className="flex flex-col items-center gap-2">
                  <a href="https://x.com/bitcoinarusha" target="_blank" rel="noopener noreferrer">
                    <Image 
                      src={Arusha} 
                      alt="Bitcoin Arusha Logo" 
                      width={80} 
                      height={80} 
                      objectFit="contain" 
                    />
                  </a>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold">Team Arusha</h4>
                    <p className="text-sm font-bold text-[#f08222]">Bitcoin Circular Economy in Tanzania</p>
                  </div>
                </div>
              </div>

              {/* Team Isla */}
              <div className="bg-[#fff5eb] rounded-lg shadow p-4 w-full sm:w-[200px]">
                <div className="flex flex-col items-center gap-2">
                  <a href="https://x.com/bitcoinisla" target="_blank" rel="noopener noreferrer">
                    <Image 
                      src={Isla} 
                      alt="Bitcoin Isla Logo" 
                      width={80} 
                      height={80} 
                      objectFit="contain" 
                    />
                  </a>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold">Team Isla</h4>
                    <p className="text-sm font-bold text-[#f08222]">Bitcoin Circular Economy in Maxico</p>
                  </div>
                </div>
              </div>
            </div>

              <Link 
                href="/pages/dashboard"
                className="inline-block mt-6 px-8 py-4 text-lg font-bold text-white bg-[#f08222] rounded-lg hover:bg-[#d67420] transition-colors duration-200"
              >
                View the dashboard
              </Link>
            </div>

            <section className="-mt-6 flex w-full flex-col items-center justify-center py-12 sm:px-4 sm:py-28 md:px-0">
            {auctionOfTheDay && <AOTD auction={auctionOfTheDay} />}
            {auctionData.length > 0 && auctionOfTheDay && (
              <>
                <div className="w-3/4 mx-auto max-w-7xl overflow-auto sm:mt-28"> {/* Changed from w-full */}
                  <UpcomingAuctions auction={auctionOfTheDay} auctionsData={auctionData} />
                </div>
                <Link href="/auction-market" className="mt-10 rounded-xl bg-navy p-2 font-epilogue text-sm font-bold text-white lg:p-4">
                  Explore All Auctions
                </Link>
              </>
            )}
          </section>
          <RealMachines />

          </section>

          {/* Add Telegram button */}
          <div className="mt-20 mb-20 flex flex-col items-center justify-center">
            <Link
              href="https://t.me/+K8JjHpTgqoFjZmIx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-orange-400 px-8 py-4 font-epilogue text-lg text-white hover:opacity-90"
            >
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
              Block party chat - Telegram
            </Link>
          </div>

        </>

    </div>
  )
}

