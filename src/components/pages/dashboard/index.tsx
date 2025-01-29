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
import { getPartyLeaderboard } from 'src/api/party/getLeaderboard'
import { formatMoney } from 'src/utils/currency'

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="text-center p-4 text-red-600">
      <p>Something went wrong loading auctions:</p>
      <pre className="text-sm">{error.message}</pre>
    </div>
  )
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
          sort_by: 'end_time', // Sort by end time
          sorting: 'asc'       // Ascending order (soonest first)
        })
        
        if (activeAuctions?.results) {
          setAuctionsData(activeAuctions.results)
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

  return <AuctionSchedule auctionsData={auctionsData} showTitle={false} />
}

export default function Dashboard() {
  const { account } = useAccountContext()
  const [hashrateData, setHashrateData] = useState<HashrateDataType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [leaderboard, setLeaderboard] = useState<PartyLeaderboardEntry[]>([])
  const [leaderboardLoading, setLeaderboardLoading] = useState(true)
  const [bitcoinPrice, setBitcoinPrice] = useState(0)

  // Add this useEffect to fetch leaderboard data
  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
        const data = await response.json()
        setBitcoinPrice(data.bpi.USD.rate_float)
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error)
      }
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

  // Get solo mining calculations for base and current hashrate
  const baseHashrateCalc = useSoloMineCalculator({ 
    customHashrate: hashrateData?.base_hashrate || 0 
  })
  const currentHashrateCalc = useSoloMineCalculator({ 
    customHashrate: hashrateData?.current_hashrate || 0 
  })

  // Function to format daily odds as percentage
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
    // Poll for updates every minute
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
    {/* Party Stats Card */}
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hashrate Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
            Current Party Hashrate
          </h3>
          <p className="text-2xl font-semibold text-gray-900 mb-2">
            {hashrateData.current_hashrate.toFixed(2)} TH/s
          </p>
          <div className="space-y-1 text-sm text-gray-600">
            <p className="flex items-center">
              <span className="w-16">Party:</span>
              <span>{hashrateData.base_hashrate.toFixed(2)} TH/s</span>
            </p>
            <p className="flex items-center">
              <span className="w-16">Bonus:</span>
              <span>{hashrateData.bonus_hashrate.toFixed(2)} TH/s</span>
              <span className="ml-1 group relative">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  className="w-4 h-4 text-gray-600 hover:text-gray-600"
                >
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                <span className="invisible group-hover:visible absolute left-0 transform -translate-y-full -translate-x-1/2 mt-0 px-2 py-1 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap">
                  The party earns bonus hashrate for every new bidder and high auction bid
                </span>
              </span>
            </p>
          </div>
        </div>

        {/* Daily Odds Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
            Daily Odds
          </h3>
          <p className="text-2xl font-semibold text-gray-900">
            1 in {currentHashrateCalc.chancePerBlockDay.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mt-2">chance of mining a block per day</p>
        </div>

        {/* Percentage Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
            Daily Chance
          </h3>
          <p className="text-2xl font-semibold text-gray-900">
            {formatDailyOdds(currentHashrateCalc.chancePerBlockDay)}
          </p>
          <p className="text-sm text-gray-600 mt-2">probability per day</p>
        </div>
      </div>
    </div>


{/* User Stats Card - Only shown when user is logged in */}
{account?.id && (
  <div className="bg-white rounded-lg shadow p-6 mt-4">
    {console.log('Account:', account)}
    {console.log('Leaderboard:', leaderboard)}
    {console.log('Found entry:', leaderboard?.find(entry => entry.buyer_name === account.username))}
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* User Hashrate */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
          Your Hashrate
        </h3>
        <p className="text-2xl font-semibold text-gray-900">
          {leaderboard?.find(entry => entry.buyer_name === account.username)?.total_hashrate.toFixed(2) || '0.00'} TH/s
        </p>
      </div>

      {/* Party Percentage */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
          Block Party Share
        </h3>
        <p className="text-2xl font-semibold text-gray-900">
          {leaderboard?.find(entry => entry.buyer_name === account.username)?.percentage || '0'}%
        </p>
      </div>

      {/* Potential Reward */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
          Your Potential Reward
        </h3>
        <div>
          <p className="text-2xl font-semibold text-gray-900">
            {leaderboard?.find(entry => entry.buyer_name === account.username)?.reward_share_btc || '0.00000000'} BTC
          </p>
          <p className="text-sm text-gray-500 mt-1">
            ${formatMoney((leaderboard?.find(entry => entry.buyer_name === account.username)?.reward_share_btc || 0) * bitcoinPrice)} USD
          </p>
        </div>
      </div>
    </div>
  </div>
)}

  </>
)}

        </div>
      </div>
        
      {/* Add the hashrate graph with responsive height */}
      <div className="mb-12 w-full h-[250px] sm:h-[300px] md:h-[400px]">
        <CKPoolHashrateGraph />
      </div>

      <div className="mb-8 p-4 bg-white rounded-lg shadow">        
        {loading && (
          <div className="text-center py-4">
            <p className="text-gray-600">Loading hashrate data...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>

      <Tab.Group defaultIndex={1}>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'}`
            }
          >
            Active Miners
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
              <h2 className="text-lg font-semibold mb-4">Active Miners</h2>
              <PartyLeaderboard />
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
    </div>
  )
}