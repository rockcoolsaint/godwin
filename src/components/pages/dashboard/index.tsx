'use client'

import { Tab } from '@headlessui/react'
import Image from 'next/image'
import CKPoolHashrateGraph from './CKPoolHashrateGraph'
import PartyLeaderboard from './PartyLeaderboard'
import TeamPartyLeaderboard from './TeamPartyLeaderboard'

import DirectPartyLeaderboard from './DirectPartyLeaderboard'
import { getTotalHashrateData, type TotalHashrateData as HashrateDataType } from 'src/api/ckpool/getHashrateData'
import { useState, useEffect } from 'react'
import useSoloMineCalculator from 'src/hooks/useSoloMineCalculator'
import AuctionSchedule from 'src/components/pages/home/AuctionSchedule'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import { useAccountContext } from 'src/providers/AccountProvider'
import { DirectPartyLeaderboardEntry, PartyLeaderboardEntry } from 'src/api/auction/types'
import { getPartyLeaderboard, getNextSaturdayPartyLeaderboard, getDirectPartyLeaderboard, getNextSaturdayDirectPartyLeaderboard, getTeamLeaderboard } from 'src/api/party/getLeaderboard'
import { formatMoney } from 'src/utils/currency'
import { getBitcoinPrice } from 'src/utils/bitcoin'
import { format as formatDate, addDays } from 'date-fns'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import Link from 'src/components/shared/Link'
import Arusha from 'src/images/arusha.png'
import Isla from 'src/images/isla.png'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const TARGET_HASHRATE = 250000; // 250,000 TH/s

const LIVE_PARTY = false;

const TEAM_NAMES = {
  ARUSHA: 'bitcoinarusha',
  ISLA: 'bitcoinisla',
  UNDECIDED: 'undecided'
} as const;

function getNextNoonUTC() {
  const now = new Date();
  const nextNoon = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    12, 0, 0
  ));
  
  if (now.getUTCHours() >= 12) {
    nextNoon.setUTCDate(nextNoon.getUTCDate() + 1);
  }

  // Format the message based on whether it's today or tomorrow
  const isToday = nextNoon.getUTCDate() === now.getUTCDate();
  return `party will start ${isToday ? 'today' : 'tomorrow'} at 12p UTC`;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="text-center p-4 text-red-600">
      <p>Something went wrong loading auctions:</p>
      <pre className="text-sm">{error.message}</pre>
    </div>
  )
}

function HashrateTable({ auctions }: HashrateTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 5;

  // Calculate hourly hashrates
  const calculateHourlyHashrates = () => {
    const hourlyHashrates: { 
      hour: Date; 
      activeHashrate: number;
      completedHashrate?: {
        base: number;
        bonus: number;
        auctioneerMatch: number;
      };
    }[] = [];
    
    if (!auctions.length) return hourlyHashrates;

    // Create maps to store hashrates by hour
    const activeHashrateMap = new Map<string, number>();
    const completedHashrateMap = new Map<string, {
      base: number;
      bonus: number;
      auctioneerMatch: number;
    }>();

    // Process each auction
    auctions.forEach(auction => {
      const start = new Date(auction.delivery_date);
      const end = new Date(start.getTime() + 
        auction.auction_meta.days_of_mining * 24 * 60 * 60 * 1000);
      
      // For each hour of this auction
      for (let time = start; time < end; time = new Date(time.getTime() + 60 * 60 * 1000)) {
        const key = time.toISOString();
        
        if (auction.status === 'completed') {
          const existing = completedHashrateMap.get(key) || { base: 0, bonus: 0, auctioneerMatch: 0 };
          completedHashrateMap.set(key, {
            base: existing.base + auction.auction_meta.hashrate,
            bonus: existing.bonus + (auction.auction_meta.bid_bonus_hashrate || 0),
            auctioneerMatch: existing.auctioneerMatch + (auction.auction_meta.auctioneer_match_bonus || 0)
          });
        } else {
          activeHashrateMap.set(key, (activeHashrateMap.get(key) || 0) + auction.auction_meta.hashrate);
        }
      }
    });

    // Convert maps to sorted array
    Array.from(activeHashrateMap.entries())
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .forEach(([timeStr, activeHashrate]) => {
        const completed = completedHashrateMap.get(timeStr);
        if (activeHashrate > 0 || completed) {
          hourlyHashrates.push({
            hour: new Date(timeStr),
            activeHashrate,
            completedHashrate: completed
          });
        }
      });

    return hourlyHashrates;
  };

  const hourlyHashrates = calculateHourlyHashrates();
  const totalPages = Math.ceil(hourlyHashrates.length / entriesPerPage);
  const paginatedHashrates = hourlyHashrates.slice(
    currentPage * entriesPerPage,
    (currentPage + 1) * entriesPerPage
  );

  return (
    <div>
      <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Time
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Upcoming Auctions
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Bonus Hashrate (wild guess)
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {paginatedHashrates.map((entry, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(entry.hour, 'MMM d, HH:mm')}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {formatMoney(entry.activeHashrate)} TH/s
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <Tooltip>
            <TooltipTrigger>
              <span className="cursor-help">
                {formatMoney(entry.activeHashrate * 2.5)} TH/s
              </span>
            </TooltipTrigger>
            <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-sm text-white">
              based on 2.5x bonus hashrate - with auctioneer match
            </TooltipContent>
          </Tooltip>
        </td>
      </tr>
    ))}
  </tbody>
</table>
      </div>

      {/* Pagination Controls */}
      {hourlyHashrates.length > entriesPerPage && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex justify-between w-full">
            <div className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {currentPage * entriesPerPage + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min((currentPage + 1) * entriesPerPage, hourlyHashrates.length)}
              </span>{' '}
              of{' '}
              <span className="font-medium">{hourlyHashrates.length}</span>{' '}
              hours
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                  ${currentPage === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage >= totalPages - 1}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                  ${currentPage >= totalPages - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const AuctionsDataWrapper = () => {
  const [auctionsData, setAuctionsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAuctions() {
      try {
        const activeAuctions = await getAllAuctions({
          limit: 50,
          group_by: 'auction_status',
          auction_status: 'active',
          sort_by: 'end_time',
          sorting: 'desc'
        })
        
        if (activeAuctions?.results) {
          const sortedAuctions = [...activeAuctions.results].sort((a, b) => {
            return new Date(a.end_at).getTime() - new Date(b.end_at).getTime()
          })
          setAuctionsData(sortedAuctions)
        }
      } catch (err) {
        setError('Failed to fetch auctions')
        console.error('Error fetching auctions:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAuctions()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-[200px]">
      <p className="text-gray-500">Loading auctions...</p>
    </div>
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-[200px]">
      <p className="text-red-500">{error}</p>
    </div>
  }

  if (!auctionsData?.length) {
    return <div className="flex items-center justify-center min-h-[200px]">
      <p className="text-gray-500">No active auctions found</p>
    </div>
  }

  return <AuctionSchedule auctionsData={[...auctionsData].reverse()} showTitle={false} />
}

function getNextBlockPartyDate() {
  const now = new Date()
  const nextSaturday = new Date()
  nextSaturday.setDate(now.getDate() + ((6 - now.getDay() + 7) % 7))
  nextSaturday.setHours(12, 0, 0, 0)
  
  // Add another week if the next block party is two weeks out - or +14 for 3 weeks
  // nextSaturday.setDate(nextSaturday.getDate() + 7) 
  
  const followingSaturday = addDays(nextSaturday, 7)
  
  return { nextSaturday, followingSaturday }
}

// Add these helper functions before the Dashboard component
const isBlockPartyActive = (hashrateData: HashrateDataType | null) => {
  return hashrateData?.current_hashrate > 0
}

const getUserHashrate = (
  account: any, 
  leaderboard: PartyLeaderboardEntry[], 
  useNextSaturday: boolean = false
) => {
  if (!account?.username) return null
  
  const userEntry = leaderboard?.find(entry => entry.buyer_name === account.username)
  if (!userEntry) return null

  return {
    hashrate: userEntry.total_hashrate,
    percentage: userEntry.percentage,
    rewardShareBtc: userEntry.reward_share_btc
  }
}

const renderTopSection = (
  account: any,
  hashrateData: HashrateDataType | null,
  leaderboard: PartyLeaderboardEntry[],
  bitcoinPrice: number,
  upcomingPartyData: any,
  upcomingPartyCalc: any,
  showDetails: boolean,
  setShowDetails: (show: boolean) => void,
  teamData: any[],
  currentHashrateCalc: any,
) => {
  // Get next block party date
  const { nextSaturday } = getNextBlockPartyDate()
  
  // Calculate time remaining
  const now = new Date()
  const timeRemaining = nextSaturday.getTime() - now.getTime()
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))

  // Calculate hashrates and percentages for expanded view
  const directBuyHashrate = upcomingPartyData?.directBuyHashrate || 0
  const auctionHashrate = (upcomingPartyData?.totalHashrate || 0) - directBuyHashrate
  const totalHashrate = directBuyHashrate + auctionHashrate
  
  const directBuyPercentage = totalHashrate ? ((directBuyHashrate / totalHashrate) * 100).toFixed(1) : '0'
  const auctionPercentage = totalHashrate ? ((auctionHashrate / totalHashrate) * 100).toFixed(1) : '0'

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-6">
        {/* First row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Box 1: Block Party Status */}
          <div className="bg-[#fff5eb] rounded-md p-4">
            <h3 className="text-sm font-bold text-[#f08222] uppercase mb-2">
              {LIVE_PARTY ? "Block party" : "Next block party"}
            </h3>
            {LIVE_PARTY ? (
              <p className="text-2xl font-semibold text-gray-900 mb-2">
                IN PROGRESS
              </p>
            ) : (
              <>
                <p className="text-2xl font-semibold text-gray-900 mb-2">
                  {formatDate(nextSaturday, 'EEEE, MMMM d')}
                </p>
                <p className="text-sm text-gray-600">
                  {days}d {hours}h {minutes}m
                </p>
              </>
            )}
          </div>

          {/* Box 2: Hashrate */}
          <div className="bg-[#fff5eb] rounded-md p-4">
            <h3 className="text-sm font-bold text-[#f08222] uppercase mb-2">
              {LIVE_PARTY ? "Live Hashrate" : "Projected Hashrate"}
            </h3>
            <p className="text-2xl font-semibold text-gray-900 mb-2">
              {LIVE_PARTY 
                ? `${formatMoney(hashrateData?.current_hashrate || 0)} TH/s`
                : `${formatMoney(upcomingPartyData?.totalHashrate || 0)} TH/s`
              }
            </p>
            <Tooltip>
              <TooltipTrigger>
                <p className="text-sm text-gray-600 cursor-help">
                  1 in {Math.round((LIVE_PARTY ? currentHashrateCalc?.chancePerBlockDay : upcomingPartyCalc?.chancePerBlockDay || 0) * 4).toLocaleString()} party odds (6 hrs)
                </p>
              </TooltipTrigger>
              <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-sm text-white">
                Based on {LIVE_PARTY ? "current" : "projected"} hashrate
              </TooltipContent>
            </Tooltip>
            {/* Add the new link here */}
            {LIVE_PARTY && (
              <a 
                href="https://solostats.ckpool.org/users/3Gk1GfP3bHA6M2ZzK5mHdqbWN1iNsqAenH" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block mt-2 text-xs text-orange-500 italic hover:text-orange-800"
              >
                Verify at CK Pool
              </a>
            )}
          </div>

          {/* Box 3: Block Reward */}
          <div className="bg-[#fff5eb] rounded-md p-4">
            <h3 className="text-sm font-bold text-[#f08222] uppercase mb-2">
              Potential Block reward
            </h3>
            <p className="text-2xl font-semibold text-gray-900">
              ${formatMoney(3.125 * bitcoinPrice)} USD
            </p>
            <p className="text-sm text-gray-600 mt-1">
              3.125 BTC
            </p>
          </div>
        </div>

        {/* Additional boxes when expanded */}
{/* Additional boxes when expanded */}
<div className="pt-2">


<div className="bg-[#fff5eb] rounded-md p-4">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Team Arusha */}
    <div className="flex flex-col items-center space-y-1.5">
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#f08222] text-white">
        Team Arusha
      </span>
      <Tooltip>
        <TooltipTrigger>
          <div className="text-center cursor-help">
            <p className="text-2xl text-gray-900">
              {formatMoney(
                (teamData?.find(t => t.team_name === TEAM_NAMES.ARUSHA)?.total_hashrate || 0) +
                (upcomingPartyData?.nextSatDirectLeaderboard
                  .filter(entry => entry.team_name === "Bitcoin Arusha")
                  .reduce((sum, entry) => sum + entry.total_hashrate, 0) || 0)
              )} TH/s
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-sm text-white">
          <div className="space-y-1">
            <div>Auction: {formatMoney(teamData?.find(t => t.team_name === TEAM_NAMES.ARUSHA)?.total_hashrate || 0)} TH/s</div>
            <div>Direct Buy: {formatMoney(upcomingPartyData?.nextSatDirectLeaderboard
              .filter(entry => entry.team_name === "Bitcoin Arusha")
              .reduce((sum, entry) => sum + entry.total_hashrate, 0) || 0)} TH/s</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
    

    {/* Team Isla */}
    <div className="flex flex-col items-center space-y-1.5">
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#f08222] text-white">
        Team Isla
      </span>
      <Tooltip>
        <TooltipTrigger>
          <div className="text-center cursor-help">
            <p className="text-2xl text-gray-900">
              {formatMoney(
                (teamData?.find(t => t.team_name === TEAM_NAMES.ISLA)?.total_hashrate || 0) +
                (upcomingPartyData?.nextSatDirectLeaderboard
                  .filter(entry => entry.team_name === "Bitcoin Isla")
                  .reduce((sum, entry) => sum + entry.total_hashrate, 0) || 0)
              )} TH/s
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-sm text-white">
          <div className="space-y-1">
            <div>Auction: {formatMoney(teamData?.find(t => t.team_name === TEAM_NAMES.ISLA)?.total_hashrate || 0)} TH/s</div>
            <div>Direct Buy: {formatMoney(upcomingPartyData?.nextSatDirectLeaderboard
              .filter(entry => entry.team_name === "Bitcoin Isla")
              .reduce((sum, entry) => sum + entry.total_hashrate, 0) || 0)} TH/s</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>

    {/* Undecided */}
    <div className="flex flex-col items-center space-y-1.5">
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#f08222] text-white">
        Undecided
      </span>
      <Tooltip>
        <TooltipTrigger>
          <div className="text-center cursor-help">
            <p className="text-2xl text-gray-900">
              {formatMoney(
                (teamData?.find(t => t.team_name === TEAM_NAMES.UNDECIDED)?.total_hashrate || 0) +
                (upcomingPartyData?.nextSatDirectLeaderboard
                  .filter(entry => !entry.team_name || entry.team_name === TEAM_NAMES.UNDECIDED)
                  .reduce((sum, entry) => sum + entry.total_hashrate, 0) || 0)
              )} TH/s
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-sm text-white">
          <div className="space-y-1">
            <div>Auction: {formatMoney(teamData?.find(t => t.team_name === TEAM_NAMES.UNDECIDED)?.total_hashrate || 0)} TH/s</div>
            <div>Direct Buy: {formatMoney(upcomingPartyData?.nextSatDirectLeaderboard
              .filter(entry => !entry.team_name || entry.team_name === "undecided")
              .reduce((sum, entry) => sum + entry.total_hashrate, 0) || 0)} TH/s</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  </div>
</div>

</div>
      </div>
    </div>
  )
}

// Define TabButton component at the top level
const TabButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tab
      className={({ selected }) =>
        `w-full rounded-lg py-2.5 text-sm font-medium leading-5
        ${selected 
          ? 'bg-white text-gray-900 shadow'
          : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'}`
      }
    >
      {children}
    </Tab>
  )
}

export default function Dashboard() {
  const { account } = useAccountContext()
  const [hashrateData, setHashrateData] = useState<HashrateDataType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [leaderboard, setLeaderboard] = useState<PartyLeaderboardEntry[]>([])
  const [leaderboardLoading, setLeaderboardLoading] = useState(true)
  const [bitcoinPrice, setBitcoinPrice] = useState(0)
  const [projectedHashrate, setProjectedHashrate] = useState<HashrateDataType | null>(null)
  const [featuredAuction, setFeaturedAuction] = useState<any>(null)
  const [teamData, setTeamData] = useState<any[]>([])
  const [teamDataLoading, setTeamDataLoading] = useState(true)
  const [showAuctions, setShowAuctions] = useState(false)

  const [showTeamMembers, setShowTeamMembers] = useState({
    bitcoinisla: false,
    bitcoinarusha: false
  })
  // In the Dashboard component, add this state
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setTeamDataLoading(true)
        const data = await getTeamLeaderboard()
        setTeamData(data)
      } catch (error) {
        console.error('Error fetching team data:', error)
      } finally {
        setTeamDataLoading(false)
      }
    }
  
    fetchTeamData()
    const interval = setInterval(fetchTeamData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const [upcomingPartyData, setUpcomingPartyData] = useState<{
    date: Date;
    totalHashrate: number;
    directBuyHashrate: number;
    nextSatDirectLeaderboard: DirectPartyLeaderboardEntry[]; // Add this
    nextSatPartyLeaderboard: PartyLeaderboardEntry[]; // Add this
    auctions: {
      delivery_date: string;
      auction_meta: {
        hashrate: number;
        days_of_mining: number;
      };
    }[];
  } | null>(null)

  // Move calculator hooks to top level
  const baseHashrateCalc = useSoloMineCalculator({ 
    customHashrate: hashrateData?.base_hashrate || 0 
  })
  
  const currentHashrateCalc = useSoloMineCalculator({ 
    customHashrate: hashrateData?.current_hashrate || 0 
  })

  const upcomingPartyCalc = useSoloMineCalculator({
    customHashrate: upcomingPartyData?.totalHashrate || 0
  })

  const formatDailyOdds = (chancePerBlockDay: number) => {
    const dailyPercentage = (1 / chancePerBlockDay) * 100
    
    if (dailyPercentage < 0.01) {
      return `${dailyPercentage.toFixed(4)}%`
    } else if (dailyPercentage < 0.1) {
      return `${dailyPercentage.toFixed(3)}%`
    } else if (dailyPercentage < 1) {
      return `${dailyPercentage.toFixed(2)}%`
    } else {
      return `${dailyPercentage.toFixed(1)}%`
    }
  }

    // Add this useEffect
  useEffect(() => {
    async function fetchFeaturedAuction() {
      try {
        const auctions = await getAllAuctions({
          limit: 1,
          featured: true,
          auction_status: 'active'
        })
        if (auctions?.results?.[0]) {
          setFeaturedAuction(auctions.results[0])
        }
      } catch (error) {
        console.error('Error fetching featured auction:', error)
      }
    }

    fetchFeaturedAuction()
  }, [])

  useEffect(() => {
    async function fetchUpcomingPartyData() {
      try {
        // Fetch upcoming block party auctions
        const upcomingAuctions = await getAllAuctions({
          limit: 50,
          auction_status: 'active',
          auction_type: 'blockparty_auction'
        });
  
        // Fetch next Saturday's party leaderboard data
        const nextSatPartyLeaderboard = await getNextSaturdayPartyLeaderboard();
        
        // Fetch next Saturday's direct buy leaderboard data
        const nextSatDirectLeaderboard = await getNextSaturdayDirectPartyLeaderboard();
  
        if (upcomingAuctions?.results) {
          const partyAuctions = upcomingAuctions.results.filter(auction => {
            if (!auction.delivery_date) {
              console.warn('Auction missing delivery_date:', auction.id);
              return false;
            }
            const deliveryDate = new Date(auction.delivery_date);
            return !isNaN(deliveryDate.getTime());
          });
  
          // Get the next Saturday date
          const { nextSaturday } = getNextBlockPartyDate();
  
          // Calculate auction hashrate
          const auctionHashrate = partyAuctions.reduce(
            (sum, auction) => sum + (auction.auction_meta.hashrate || 0),
            0
          );
  
          // Calculate party table hashrate from next Saturday's data
          const partyTableHashrate = nextSatPartyLeaderboard.reduce((sum, entry) => {
            return sum + 
              (entry.total_hashrate || 0) + 
              (entry.total_bid_bonus || 0) + 
              (entry.total_auctioneer_match_bonus || 0);
          }, 0);
  
          // Calculate direct buy hashrate
          const directBuyHashrate = nextSatDirectLeaderboard.reduce((sum, entry) => {
            return sum + (entry.total_hashrate || 0);
          }, 0);
  
          console.log('Auction hashrate:', auctionHashrate);
          console.log('Party table hashrate:', partyTableHashrate);
          console.log('Direct buy hashrate:', directBuyHashrate);
          console.log('Total hashrate:', auctionHashrate + partyTableHashrate + directBuyHashrate);
  
          setUpcomingPartyData({
            date: nextSaturday,
            totalHashrate: Math.max(auctionHashrate + partyTableHashrate + directBuyHashrate, 0.01), // Ensure we never have 0 hashrate
            directBuyHashrate: directBuyHashrate, // Add direct buy hashrate to state
            nextSatDirectLeaderboard: nextSatDirectLeaderboard, // Add this
            nextSatPartyLeaderboard: nextSatPartyLeaderboard, // Add this
            auctions: partyAuctions
          });
        }
      } catch (error) {
        console.error('Error fetching upcoming party data:', error);
      }
    }
  
    fetchUpcomingPartyData();
  }, []); // Remove hashrateData dependency since we want this to run independently

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      const price = await getBitcoinPrice()
      setBitcoinPrice(price)
    }

    const fetchLeaderboard = async () => {
      try {
        const data = await getPartyLeaderboard()
        setLeaderboard(data)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
      } finally {
        setLeaderboardLoading(false)
      }
    }

    fetchBitcoinPrice()
    fetchLeaderboard()
    
    const priceInterval = setInterval(fetchBitcoinPrice, 60000)
    const leaderboardInterval = setInterval(fetchLeaderboard, 60000)
    
    return () => {
      clearInterval(priceInterval)
      clearInterval(leaderboardInterval)
    }
  }, [])

  useEffect(() => {
    async function fetchHashrateData() {
      try {
        setLoading(true)
        setError(null)
        const data = await getTotalHashrateData()
        if (data) {
          setHashrateData(data)
        } else {
          setError('No hashrate data available')
        }
      } catch (error) {
        console.error('Failed to fetch hashrate data:', error)
        setError('Failed to fetch hashrate data')
      } finally {
        setLoading(false)
      }
    }

    fetchHashrateData()
    const interval = setInterval(fetchHashrateData, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-8">
        <div className="mt-4">
        {!loading && !error && hashrateData && (
          <>
          {renderTopSection(
            account, 
            hashrateData, 
            leaderboard, 
            bitcoinPrice, 
            upcomingPartyData, 
            upcomingPartyCalc,
            showDetails,
            setShowDetails,
            teamData,
            currentHashrateCalc  // Add this argument
          )}
            </>
          )}
        </div>
      </div>

      <Tab.Group defaultIndex={0}>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1 mb-6">
          <TabButton>Direct Buy</TabButton>
          <TabButton>Auction</TabButton>
          <TabButton>Alliance Miners</TabButton>
        </Tab.List>

      <Tab.Panels>
        {/* Direct Buy Tab */}
        <Tab.Panel>
          <div className="bg-white rounded-lg shadow p-4">
            <DirectPartyLeaderboard useNextSaturday={true} />
          </div>
          <div className="flex justify-center pt-6">
            <Link 
              href="/" 
              className="bg-[#f08222] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#d67420] transition-colors"
            >
              Buy hashrate
            </Link>
          </div>
        </Tab.Panel>


    {/* Auction Tab */}
    <Tab.Panel>
      <div className="space-y-8">
        {/* Team Arusha */}
        <div className="bg-white rounded-lg shadow">
          <h3 className="px-4 pt-5 font-medium text-gray-900">Team Arusha</h3>
          <div className="px-4 py-5 sm:p-6">
            <TeamPartyLeaderboard 
              useNextSaturday={true}
              defaultTeam={TEAM_NAMES.ARUSHA}
              hideTeamTabs={true}
            />
          </div>
        </div>

        {/* Team Isla */}
        <div className="bg-white rounded-lg shadow">
          <h3 className="px-4 pt-5 font-medium text-gray-900">Team Isla</h3>
          <div className="px-4 py-5 sm:p-6">
            <TeamPartyLeaderboard 
              useNextSaturday={true}
              defaultTeam={TEAM_NAMES.ISLA}
              hideTeamTabs={true}
            />
          </div>
        </div>

        {/* Undecided */}
        <div className="bg-white rounded-lg shadow">
          <h3 className="px-4 pt-5 font-medium text-gray-900">Undecided</h3>
          <div className="px-4 py-5 sm:p-6">
            <TeamPartyLeaderboard 
              useNextSaturday={true}
              defaultTeam={TEAM_NAMES.UNDECIDED}
              hideTeamTabs={true}
            />
          </div>
        </div>
      </div>
    </Tab.Panel>

        {/* Pre-game Tab */}
        <Tab.Panel>
         {/* Add explainer text */}
         <div className="bg-white rounded-lg shadow p-6 mb-4">
          <p className="text-lg font-medium text-gray-900 mb-2">
            Bring-your-own Miner
          </p>
          <p className="text-sm text-gray-600">
            Outside of the party, the miner who finds the block gets 1 BTC and everyone else gets a hashrate-% reward share
          </p>
          <Link 
                      href="/learn/upendo"
                      className="text-sm text-[#f08222] hover:text-[#d06000] mt-2 inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more →
                    </Link>
        </div>
        {/* Second row */}
        <div className="flex gap-4">
              </div>
              {/* Configure miner button*/}
              <div className="flex justify-center pt-6">
              <Link 
                href="/learn/upendo" 
                className="bg-[#f08222] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#d67420] transition-colors"
              >
                Configure your ASIC
              </Link>
            </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>

    <div className="mt-8">
            
            {/* Add explainer text */}
            <div className="bg-white rounded-lg shadow p-6 mb-4">
              <p className="text-lg font-medium text-gray-900 mb-2">
                Block Party Auction
              </p>
              <p className="text-sm text-gray-600">
                Raise $ for Bitcoin Circular Economies. Sign up, pick your team and place your bid.
              </p>
              <Link 
                          href="/auction-market"
                          className="text-sm text-[#f08222] hover:text-[#d06000] mt-2 inline-block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn more →
                        </Link>
            </div>

              {teamDataLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f08222]" />
                </div>
              ) : teamData.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No team data available
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


{/* Team Arusha */}
<div className="bg-[#fff5eb] rounded-lg shadow p-6">
  <div className="flex items-center gap-4 mb-4">
    <a href="https://x.com/bitcoinarusha" target="_blank" rel="noopener noreferrer">
      <Image 
        src={Arusha} 
        alt="Bitcoin Arusha Logo" 
        width={100} 
        height={100} 
        objectFit="contain" 
      />
    </a>
    <div>
      <h4 className="text-lg font-semibold">Team Arusha</h4>
      <Tooltip>
        <TooltipTrigger>
          <p className="text-xl font-bold text-[#f08222] cursor-help">
            {formatMoney(
              (teamData?.find(t => t.team_name === 'bitcoinarusha')?.total_hashrate || 0) +
              (upcomingPartyData?.nextSatDirectLeaderboard
                .filter(entry => entry.team_name === "Bitcoin Arusha")
                .reduce((sum, entry) => sum + entry.total_hashrate, 0) || 0)
            )} TH/s
          </p>
        </TooltipTrigger>
        <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-sm text-white">
          <div className="space-y-1">
            <div>Auction: {formatMoney(teamData?.find(t => t.team_name === 'bitcoinarusha')?.total_hashrate || 0)} TH/s</div>
            <div>Direct Buy: {formatMoney(upcomingPartyData?.nextSatDirectLeaderboard
              .filter(entry => entry.team_name === "Bitcoin Arusha")
              .reduce((sum, entry) => sum + entry.total_hashrate, 0) || 0)} TH/s</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  </div>
  <p className="text-gray-600 mb-4">
    Bitcoin Circular Economy in Tanzania
  </p>
  <p className="text-sm text-[#f08222] font-medium">
    Heather is donating 10% of her share to Arusha!
  </p>
</div>

{/* Team Isla */}
<div className="bg-[#fff5eb] rounded-lg shadow p-6">
  <div className="flex items-center gap-4 mb-4">
    <a href="https://x.com/btcisla" target="_blank" rel="noopener noreferrer">
      <Image src={Isla} alt="Bitcoin Isla Logo" width={100} height={100} objectFit="contain" />
    </a>
    <div>
      <h4 className="text-lg font-semibold">Team Isla</h4>
      <Tooltip>
        <TooltipTrigger>
          <p className="text-xl font-bold text-[#f08222] cursor-help">
            {formatMoney(
              (teamData?.find(t => t.team_name === 'bitcoinisla')?.total_hashrate || 0) +
              (upcomingPartyData?.nextSatDirectLeaderboard
                .filter(entry => entry.team_name === "Bitcoin Isla")
                .reduce((sum, entry) => sum + entry.total_hashrate, 0) || 0)
            )} TH/s
          </p>
        </TooltipTrigger>
        <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-sm text-white">
          <div className="space-y-1">
            <div>Auction: {formatMoney(teamData?.find(t => t.team_name === 'bitcoinisla')?.total_hashrate || 0)} TH/s</div>
            <div>Direct Buy: {formatMoney(upcomingPartyData?.nextSatDirectLeaderboard
              .filter(entry => entry.team_name === "Bitcoin Isla")
              .reduce((sum, entry) => sum + entry.total_hashrate, 0) || 0)} TH/s</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  </div>
  <p className="text-gray-600 mb-4">
    Bitcoin Circular Economy in Mexico 🏝️
  </p>
  <p className="text-sm text-[#f08222] font-medium">
    QW is donating 10% of his share to Isla!
  </p>
</div>

                </div>
              )}
            </div>
            <br/>

            {/* Show auctions list */}
              <div className="mt-6">
                <AuctionsDataWrapper />
              </div>

            {/* View auction button */}
            <div className="flex justify-center">
              {featuredAuction && (
              <div className="flex justify-center mt-2 pt-4">
                <Link 
                  href={`/auctions/${featuredAuction.id}`} 
                  className="bg-[#f08222] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#d67420] transition-colors flex items-center gap-3"
                >
                  <span>Place your bid</span>
                  <span className="text-sm bg-[#d67420] px-3 py-1 rounded">
                    {(() => {
                      const now = new Date()
                      const end = new Date(featuredAuction.end_at)
                      const diff = end.getTime() - now.getTime()
                      
                      if (diff <= 0) return 'Ended'
                      
                      const hours = Math.floor(diff / (1000 * 60 * 60))
                      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                      
                      if (hours > 24) {
                        const days = Math.floor(hours / 24)
                        return `${days}d ${hours % 24}h left`
                      }
                      
                      if (hours > 0) {
                        return `${hours}h ${minutes}m left`
                      }
                      
                      return `${minutes}m left`
                    })()}
                  </span>
                </Link>
              </div>
            )}
            </div>
      <br/>
    </div>
  )
}
