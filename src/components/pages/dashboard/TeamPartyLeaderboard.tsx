'use client'

import { useEffect, useState } from 'react'
import { PartyLeaderboardEntry } from 'src/types'
import { getNextSaturdayPartyLeaderboard } from 'src/api/party/getLeaderboard'
import { formatMoney } from 'src/utils/currency'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import { getBitcoinPrice } from 'src/utils/bitcoin'

interface TeamPartyLeaderboardProps {
  useNextSaturday?: boolean;
}

// Define team name constants
const TEAM_NAMES = {
  ARUSHA: 'bitcoinarusha',
  ISLA: 'bitcoinisla',
  UNDECIDED: 'undecided'
} as const;

export default function TeamPartyLeaderboard({ useNextSaturday = false }: TeamPartyLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<PartyLeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [bitcoinPrice, setBitcoinPrice] = useState(0)
  const [activeTeam, setActiveTeam] = useState(TEAM_NAMES.ARUSHA)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNextSaturdayPartyLeaderboard()
        setLeaderboard(data)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
      } finally {
        setLoading(false)
      }
    }

    const fetchBitcoinPrice = async () => {
      try {
        const price = await getBitcoinPrice()
        setBitcoinPrice(price)
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error)
      }
    }

    fetchData()
    fetchBitcoinPrice()
    
    const priceInterval = setInterval(fetchBitcoinPrice, 60000)
    const leaderboardInterval = setInterval(fetchData, 60000)
    
    return () => {
      clearInterval(priceInterval)
      clearInterval(leaderboardInterval)
    }
  }, [useNextSaturday])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  // Updated filtering logic
  const teamEntries = leaderboard.filter(entry => {
    if (activeTeam === TEAM_NAMES.UNDECIDED) {
      return !entry.team_name || entry.team_name === TEAM_NAMES.UNDECIDED;
    }
    return entry.team_name === activeTeam;
  });

  return (
    <div className="space-y-4">
      {/* Team Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTeam(TEAM_NAMES.ARUSHA)}
            className={`${
              activeTeam === TEAM_NAMES.ARUSHA
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Arusha Miners
          </button>
          <button
            onClick={() => setActiveTeam(TEAM_NAMES.ISLA)}
            className={`${
              activeTeam === TEAM_NAMES.ISLA
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Isla Miners
          </button>
          <button
            onClick={() => setActiveTeam(TEAM_NAMES.UNDECIDED)}
            className={`${
              activeTeam === TEAM_NAMES.UNDECIDED
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Undecided
          </button>
        </nav>
      </div>

      {/* Team Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="w-[15%] px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                Base Hashrate ⛏️
              </th>
              <th scope="col" className="w-[15%] px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                Bonus Hashrate 🚀
              </th>
              <th scope="col" className="w-[30%] px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                Miner 👤
              </th>
              <th scope="col" className="w-[15%] px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                Team %
              </th>
              <th scope="col" className="w-[15%] px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                Member %
              </th>
              <th scope="col" className="w-[25%] px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                Reward
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teamEntries.map((entry) => (
              <tr key={entry.buyer_name} className="even:bg-gray-50">
                <td className="w-[15%] whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {formatMoney(entry.total_hashrate)} TH/s
                </td>
                <td className="w-[15%] whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center cursor-help">
                        {formatMoney(entry.total_bid_bonus + entry.total_auctioneer_match_bonus)} TH/s
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-sm text-white">
                      <div className="space-y-1">
                        <div>Bid Bonus: {formatMoney(entry.total_bid_bonus)} TH/s</div>
                        <div>Match Bonus: {formatMoney(entry.total_auctioneer_match_bonus)} TH/s</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </td>
                <td className="w-[30%] whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {entry.buyer_name}
                </td>
                <td className="w-[15%] whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {entry.team_percentage}%
                </td>
                <td className="w-[15%] whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {entry.member_percentage}%
                </td>
                <td className="w-[25%] whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center cursor-help">
                        {entry.reward_share_btc} BTC
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-base font-medium text-white">
                      ${formatMoney(entry.reward_share_btc * bitcoinPrice)} USD
                    </TooltipContent>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-sm text-gray-500 italic">
        Team percentage shows the team's share of the total block party reward. Member percentage shows the miner's share within their team.
      </div>
    </div>
  )
}