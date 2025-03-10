'use client'

import { Tab } from '@headlessui/react'
import CKPoolHashrateGraph from './CKPoolHashrateGraph'
import PartyLeaderboard from './PartyLeaderboard'
import { getTotalHashrateData, type TotalHashrateData as HashrateDataType } from 'src/api/ckpool/getHashrateData'
import { useState, useEffect } from 'react'
import useSoloMineCalculator from 'src/hooks/useSoloMineCalculator'
import AuctionSchedule from 'src/components/pages/home/AuctionSchedule'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import { useAccountContext } from 'src/providers/AccountProvider'
import { PartyLeaderboardEntry } from 'src/types'
import { getPartyLeaderboard, getNextSaturdayPartyLeaderboard } from 'src/api/party/getLeaderboard'
import { formatMoney } from 'src/utils/currency'
import { getBitcoinPrice } from 'src/utils/bitcoin'
import { format as formatDate, addDays } from 'date-fns'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import Link from 'src/components/shared/Link'

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
          limit: 1000,
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
  nextSaturday.setHours(0, 0, 0, 0)
  
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

// Add this function to render the top section
const renderTopSection = (
  account: any,
  hashrateData: HashrateDataType | null,
  leaderboard: PartyLeaderboardEntry[],
  bitcoinPrice: number,
  upcomingPartyData: any
) => {
  const isPartyActive = isBlockPartyActive(hashrateData)
  const userHashrate = getUserHashrate(
    account, 
    isPartyActive ? leaderboard : [], // Use current leaderboard for active party
    !isPartyActive // Use next Saturday's leaderboard for upcoming party
  )

  // Show potential block party view if:
  // 1. User not logged in
  // 2. User logged in but has no hashrate
  const showPotentialView = !account?.id || !userHashrate

  if (showPotentialView) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#fff5eb] rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
              <div className="flex items-center gap-1">
                Your potential block party share
                <Tooltip>
                  <TooltipTrigger>
                    <div className="cursor-help">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-sm text-white">
                    Based on 21 TH/s in a block party of 4,200 TH/s
                  </TooltipContent>
                </Tooltip>
              </div>
            </h3>
            <div>
              <p className="text-2xl font-semibold text-[#f08222]">
                ${formatMoney(0.005 * 3.125 * bitcoinPrice)} USD
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {(0.005 * 3.125).toFixed(8)} BTC
              </p>
            </div>
          </div>

          <div className="bg-[#fff5eb] rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
              {isPartyActive ? 'Current block reward 💸' : 'Potential block reward 💸'}
            </h3>
            <div>
              <p className="text-2xl font-semibold text-[#f08222]">
                ${formatMoney(3.125 * bitcoinPrice)} USD
              </p>
              <p className="text-sm text-gray-500 mt-1">
                3.125 BTC
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show user hashrate view
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#fff5eb] rounded-md p-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
            Your Hashrate ⛏️
          </h3>
          <p className="text-2xl font-semibold text-[#f08222]">
            {userHashrate.hashrate.toFixed(2)} TH/s
          </p>
        </div>

        <div className="bg-[#fff5eb] rounded-md p-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
            Block Party Share 🥧
          </h3>
          <p className="text-2xl font-semibold text-[#f08222]">
            {userHashrate.percentage}%
          </p>
          <div>
            <p className="text-lg font-semibold text-[#f08222] mt-2">
              ${formatMoney(userHashrate.rewardShareBtc * bitcoinPrice)} USD
            </p>
            <p className="text-sm text-gray-500">
              {userHashrate.rewardShareBtc.toFixed(8)} BTC
            </p>
          </div>
        </div>

        <div className="bg-[#fff5eb] rounded-md p-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
            {isPartyActive ? 'Current Reward 💸' : 'Potential Reward 💸'}
          </h3>
          <div>
            <p className="text-2xl font-semibold text-[#f08222]">
              ${formatMoney(userHashrate.rewardShareBtc * bitcoinPrice)} USD
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {userHashrate.rewardShareBtc.toFixed(8)} BTC
            </p>
          </div>
        </div>
      </div>
    </div>
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

  const [upcomingPartyData, setUpcomingPartyData] = useState<{
    date: Date;
    totalHashrate: number;
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
          limit: 1000,
          auction_status: 'active',
          auction_type: 'blockparty_auction'
        });
  
        // Fetch next Saturday's party leaderboard data
        const nextSatPartyLeaderboard = await getNextSaturdayPartyLeaderboard();
  
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
  
          console.log('Auction hashrate:', auctionHashrate);
          console.log('Party table hashrate:', partyTableHashrate);
          console.log('Total hashrate:', auctionHashrate + partyTableHashrate);
  
          setUpcomingPartyData({
            date: nextSaturday,
            totalHashrate: Math.max(auctionHashrate + partyTableHashrate, 0.01), // Ensure we never have 0 hashrate
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
        <h1 className="text-2xl font-bold text-gray-900">Block Party Mining</h1>
        <div className="mt-4">
        {!loading && !error && hashrateData && (
          <>
            {renderTopSection(account, hashrateData, leaderboard, bitcoinPrice, upcomingPartyData)}

              <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {hashrateData?.current_hashrate === 0 && upcomingPartyData ? (
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                          Next Block Party
                        </h3>
                        {upcomingPartyData?.date && (
                          <>
                          <Tooltip>
                            <TooltipTrigger>
                              <p className="text-2xl font-semibold text-gray-900 mb-2 cursor-help">
                                {formatDate(upcomingPartyData.date, 'EEEE, MMMM d')}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-sm text-white">
                              Starts {upcomingPartyData.auctions?.[0]?.delivery_date ? 
                                formatDate(new Date(upcomingPartyData.auctions[0].delivery_date), 'h:mm a') : 
                                'Time TBD'}
                            </TooltipContent>
                          </Tooltip>
                            <p className="text-xl text-gray-700 mb-2">
                              {formatMoney((upcomingPartyData.totalHashrate).toFixed(0))} TH/s
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              Projected hashrate
                              <Tooltip>
                                <TooltipTrigger>
                                  <div className="cursor-help">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-sm text-white">
                                  includes active and complete auctions, plus estimated bonus hashrate
                                </TooltipContent>
                              </Tooltip>
                            </p>
                          </>
                        )}
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                          Projected Daily Odds
                        </h3>
                        <p className="text-2xl font-semibold text-gray-900">
                          1 in {upcomingPartyCalc.chancePerBlockDay.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">Chance of mining a block</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                          Projected Daily Chance
                        </h3>
                        <p className="text-2xl font-semibold text-gray-900">
                          {formatDailyOdds(upcomingPartyCalc.chancePerBlockDay)}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">Probability per day</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                          Current Party Hashrate
                        </h3>
                        
                        <p className="text-2xl font-semibold text-gray-900 mb-2">
                          {hashrateData.current_hashrate.toFixed(2)} TH/s
                        </p>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="flex items-center">
                            <span className="w-32">Party:</span>
                            <span>{hashrateData.base_hashrate.toFixed(2)} TH/s</span>
                          </p>
                          <p className="flex items-center">
                            <span className="w-32">Bid Bonus:</span>
                            <span>{hashrateData.bid_bonus_hashrate.toFixed(2)} TH/s</span>
                          </p>
                          <p className="flex items-center">
                            <span className="w-32">Auctioneer Match:</span>
                            <span>{hashrateData.auctioneer_match_bonus.toFixed(2)} TH/s</span>
                          </p>
                          <p className="flex items-center">
                            <span className="w-32">Extra:</span>
                            <span>{hashrateData.extra_hashrate.toFixed(2)} TH/s</span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                          Daily Odds
                        </h3>
                        <p className="text-2xl font-semibold text-gray-900">
                          1 in {currentHashrateCalc.chancePerBlockDay.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">chance of mining a block per day</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                          Daily Chance
                        </h3>
                        <p className="text-2xl font-semibold text-gray-900">
                          {formatDailyOdds(currentHashrateCalc.chancePerBlockDay)}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">probability per day</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {featuredAuction && (
        <div className="bg-white rounded-lg shadow p-6 mt-4 mb-4">
          <Link href={`/auctions/${featuredAuction.id}`} className="block">
            <div className="bg-gradient-to-r from-[#f08222] to-[#ffa94d] rounded-lg p-1">
              <div className="bg-white rounded-md p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="text-lg font-semibold text-[#f08222] flex items-center gap-2">
                    Join the Block Party! 🎉
                    <span className="text-sm font-normal bg-[#fff5eb] text-[#f08222] px-2 py-1 rounded">
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
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Current auction: {featuredAuction.auction_meta.hashrate} TH/s
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-[#f08222] font-medium mr-2">Place Bid</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#f08222]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      <Tab.Group defaultIndex={1}>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-white text-white-900 shadow'
                : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'}`
            }
          >
            {hashrateData?.current_hashrate === 0 && upcomingPartyData ? 'Scheduled Miners' : 'Active Miners'}
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'}`
            }
          >
            Active Auctions
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <div className="bg-white rounded-lg shadow p-4">
              {hashrateData?.current_hashrate === 0 && upcomingPartyData ? (
                // Use a new state variable for next Saturday's leaderboard
                <PartyLeaderboard useNextSaturday={true} />
              ) : (
                <PartyLeaderboard useNextSaturday={false} />
              )}
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Active Auctions</h2>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">
                  <p className="text-gray-500">Loading auctions...</p>
                </div>}>
                  <div className="min-h-[200px]">
                    <AuctionsDataWrapper />
                  </div>
                </Suspense>
              </ErrorBoundary>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
          {/* Add Live View at the bottom, only shown when there's active mining */}
        {hashrateData?.current_hashrate > 0 && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Live Hashrate</h2>
              </div>
              <div className="h-[250px] sm:h-[300px] md:h-[400px]">
                <CKPoolHashrateGraph />
              </div>
              <div className="p-4 border-b">
                <p>Verify: <Link href="https://solo.ckpool.org/users/3Gk1GfP3bHA6M2ZzK5mHdqbWN1iNsqAenH" styled>CKPool</Link> and <Link href="https://solostats.ckpool.org/users/3Gk1GfP3bHA6M2ZzK5mHdqbWN1iNsqAenH" styled>Solostats</Link></p>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}