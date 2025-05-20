'use client'

import { useEffect, useState } from 'react'
import { DirectPartyLeaderboardEntry } from 'src/api/auction'
import { getDirectPartyLeaderboard, getNextSaturdayDirectPartyLeaderboard } from 'src/api/party/getLeaderboard'
import { formatMoney } from 'src/utils/currency'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import { getBitcoinPrice } from 'src/utils/bitcoin'

// Add TeamBadge component
const TeamBadge = ({ teamName }: { teamName: string }) => (
  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
    {teamName}
  </span>
)

interface DirectPartyLeaderboardProps {
  useNextSaturday?: boolean;
}

export default function DirectPartyLeaderboard({ useNextSaturday = false }: DirectPartyLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<DirectPartyLeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [bitcoinPrice, setBitcoinPrice] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const entriesPerPage = 5

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const price = await getBitcoinPrice()
        setBitcoinPrice(price)
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error)
      }
    }

    const fetchLeaderboard = async () => {
      try {
        const data = useNextSaturday 
          ? await getNextSaturdayDirectPartyLeaderboard()
          : await getDirectPartyLeaderboard()
        setLeaderboard(data)
      } catch (error) {
        console.error('Error fetching direct leaderboard:', error)
      } finally {
        setLoading(false)
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
  }, [useNextSaturday])

  const totalPages = Math.ceil(leaderboard.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const currentEntries = leaderboard.slice(startIndex, endIndex)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Direct Buy Miner 👤
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Hashrate (TH/s) ⛏️
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            % of Block Party
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Reward
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center">
                Loading...
              </td>
            </tr>
          ) : currentEntries.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center">
                No entries found
              </td>
            </tr>
          ) : (
            currentEntries.map((entry, index) => (
              <tr key={entry.payout_address}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    {entry.payout_address}
                    {entry.team_name && (
                      <TeamBadge teamName={entry.team_name} />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.total_hashrate.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.percentage}%
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
            ))
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex justify-between w-full">
          <div className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {startIndex + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(endIndex, leaderboard.length)}
            </span>{' '}
            of{' '}
            <span className="font-medium">{leaderboard.length}</span>{' '}
            entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )}
    <div className="mt-2 text-sm text-gray-500 italic">
      Direct buy reward share is based on total block party hashrate.
    </div>
    </div>
  )
}