'use client'

import { useEffect, useState } from 'react'
import { PartyLeaderboardEntry } from 'src/types'
import { getPartyLeaderboard } from 'src/api/party/getLeaderboard'
import { formatMoney } from 'src/utils/currency'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'

export default function PartyLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<PartyLeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [bitcoinPrice, setBitcoinPrice] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const entriesPerPage = 10

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
  }, [])

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
                  Hashrate ⛏️
                </th>
                <th scope="col" className="w-[40%] px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                  Miner 👤
                </th>
                <th scope="col" className="w-[20%] px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                  % of Block Party
                </th>
                <th scope="col" className="w-[25%] px-3 py-3.5 text-left text-sm font-medium text-gray-900">
                  <div className="flex items-center gap-1">
                    Potential Reward 💸
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="cursor-help">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-base font-medium text-white">
                        Miner earnings if a block is found
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map((entry, index) => (
                <tr key={entry.buyer_id} className="even:bg-gray-50">
                  <td className="w-[15%] whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center cursor-help">
                          {formatMoney(entry.total_hashrate)} TH/s
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-sm text-white">
                        <div className="space-y-1">
                          {entry.total_bid_bonus > 0 && (
                            <div>Bid Bonus: {formatMoney(entry.total_bid_bonus)} TH/s</div>
                          )}
                          {entry.total_auctioneer_match_bonus > 0 && (
                            <div>Match Bonus: {formatMoney(entry.total_auctioneer_match_bonus)} TH/s</div>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </td>
                  <td className="w-[40%] whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {entry.buyer_name}
                  </td>
                  <td className="w-[20%] whitespace-nowrap px-3 py-4 text-sm text-gray-900">
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
    </div>
  )
}