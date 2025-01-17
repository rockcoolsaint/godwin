'use client'

import PartyLeaderboard from './PartyLeaderboard'

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Active Miners Leaderboard</h1>
        <p className="mt-2 text-sm text-gray-500">
          Current active miners ranked by total hashrate
        </p>
      </div>
      <PartyLeaderboard />
    </div>
  )
}
