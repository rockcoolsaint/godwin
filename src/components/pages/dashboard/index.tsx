'use client'

import CKPoolHashrateGraph from './CKPoolHashrateGraph'
import PartyLeaderboard from './PartyLeaderboard'
import { getTotalHashrateData, type TotalHashrateData as HashrateDataType } from 'src/api/ckpool/getHashrateData'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [hashrateData, setHashrateData] = useState<HashrateDataType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Block Party Mining</h1>
        <p className="mt-2 text-sm text-gray-500">
          Current mining hashrate
        </p>
      </div>
      
      {/* Add the hashrate graph */}
      <div className="mb-12 h-[400px]">
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
              <span className="font-semibold">Base Hashrate:</span> {hashrateData.base_hashrate.toFixed(2)} TH/s
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Current Hashrate:</span> {hashrateData.current_hashrate.toFixed(2)} TH/s
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Bonus Hashrate:</span> {hashrateData.bonus_hashrate.toFixed(2)} TH/s
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