'use client'

import { useEffect, useState } from 'react'
import { PartyLeaderboardEntry } from 'src/types'
import { getPartyLeaderboard, getNextSaturdayPartyLeaderboard } from 'src/api/party/getLeaderboard'
import { formatMoney } from 'src/utils/currency'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import { getBitcoinPrice } from 'src/utils/bitcoin'

interface PartyLeaderboardProps {
  useNextSaturday?: boolean;
}

export default function PartyLeaderboard({ useNextSaturday = false }: PartyLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<PartyLeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [bitcoinPrice, setBitcoinPrice] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const entriesPerPage = 7

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
          ? await getNextSaturdayPartyLeaderboard()
          : await getPartyLeaderboard()
        setLeaderboard(data)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
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

  // Pagination calculations
  const totalPages = Math.ceil(leaderboard.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const currentEntries = leaderboard.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  return (
    <div className="flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
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
                  % of Block Party
                </th>
                <th scope="col" className="w-[25%] px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                  <div className="flex items-center gap-1">
                    Reward
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map((entry, index) => (
                <tr key={entry.buyer_id} className="even:bg-gray-50">
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
              ))}
            </tbody>
          </table>

          {/* Pagination Controls - Only show if more than 3 entries */}
          {leaderboard.length > 10 && (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
              <div className="flex justify-between w-full">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
                {/* Add this right after the closing </table> tag */}
                <div className="mt-2 text-sm text-gray-500 italic">
            Auction reward share is based on base hashrate. Bonus hashrate increases the reward percentage for all auction miners - and improves odds for everyone in the block party.
          </div>
    </div>
    
  )
}