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
  const [hashrateData, setHashrateData] = useState<HashrateDataType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <div className="min-w-full">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Hashrate
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Daily Odds
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage Chance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {hashrateData.current_hashrate.toFixed(2)} TH/s
                      </td>
                      <td className="px-4 py-4 whitespace-normal text-sm text-gray-500">
                        1 in {currentHashrateCalc.chancePerBlockDay.toLocaleString()} per day
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDailyOdds(currentHashrateCalc.chancePerBlockDay)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
        
        {!loading && !error && hashrateData && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Current Hashrate:</span> {hashrateData.current_hashrate.toFixed(2)} TH/s
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-italics">- Auction:</span> {hashrateData.base_hashrate.toFixed(2)} TH/s
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-italics">- Bonus:</span> {hashrateData.bonus_hashrate.toFixed(2)} TH/s
            </p>
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