'use client'

import CKPoolHashrateGraph from './CKPoolHashrateGraph'
import PartyLeaderboard from './PartyLeaderboard'
import { getTotalHashrateData, type TotalHashrateData as HashrateDataType } from 'src/api/ckpool/getHashrateData'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [hashrateData, setHashrateData] = useState<HashrateDataType | null>(null)

  useEffect(() => {
    async function fetchHashrateData() {
      try {
        const data = await getTotalHashrateData()
        if (data) {
          setHashrateData(data)
        }
      } catch (error) {
        console.error('Failed to fetch hashrate data:', error)
      }
    }

    fetchHashrateData()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Block Party Mining</h1>
        <p className="mt-2 text-sm text-gray-500">
          Current mining hashrate for the Block Party
        </p>
      </div>
      
      {/* Add the hashrate graph */}
      <div className="mb-12 h-[400px]">
        <CKPoolHashrateGraph />
      </div>

      <div className="mb-8">
        {hashrateData && (
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
        <h1 className="text-2xl font-bold text-gray-900">Active Miners</h1>
        <p className="mt-2 text-sm text-gray-500">
          Current active miners ranked by total hashrate
        </p>
      </div>
      <PartyLeaderboard />
    </div>
  )
}