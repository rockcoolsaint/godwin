'use client'

import CKPoolHashrateGraph from './CKPoolHashrateGraph'
import PartyLeaderboard from './PartyLeaderboard'
import { getTotalHashrateData, type TotalHashrateData as HashrateDataType } from 'src/api/ckpool/getHashrateData'
import { useState, useEffect } from 'react'
import useSoloMineCalculator from 'src/hooks/useSoloMineCalculator'

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

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Active Miners</h2>
        <PartyLeaderboard />
      </div>
    </div>
  )
}