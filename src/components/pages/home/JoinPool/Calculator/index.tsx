'use client'
import { useEffect, useState } from 'react'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import { getNextSaturdayPartyLeaderboard, getNextSaturdayDirectPartyLeaderboard } from 'src/api/party/getLeaderboard'
import useSoloMineCalculator from 'src/hooks/useSoloMineCalculator'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import { getBitcoinPrice, satoshisToBTC, satoshisToFiat } from 'src/utils/bitcoin'
import { formatMoney } from 'src/utils/currency'
import { useAccountContext } from 'src/providers/AccountProvider'
import { useRouter } from 'next/navigation'
import { createOrder } from 'src/api/orders/createOrder'
import createDirectOrderPayment from 'src/api/checkout/createDirectOrderPayment'
import { makeClientRequest } from 'src/api/clientRequest'
import { toast } from 'react-hot-toast'
import { Team, getTeams } from 'src/api/account/getTeams'


export const MiningCalculator = () => {
  const { account } = useAccountContext()
  const router = useRouter()
  const [btcPrice, setBtcPrice] = useState<number>(0)
  // Add this instead:
  const [payoutAddress, setPayoutAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const blockRewardBTC = 3.125
  const hashrate = 3 // TH/s - hardcoded for now
  const [customHashrate, setCustomHashrate] = useState(3) // Default to 3 TH/s
  const [hashrateError, setHashrateError] = useState('')

  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  const miningGoals = [
    'Get more bitcoin!',
    // 'More corn 🌽',
    // 'Dinner with friends 🍽️',
    // 'Lambo payment 🚗'
  ]
  const [miningGoal, setMiningGoal] = useState('')  // Initialize with empty string
  
  // Get random goal function
  const getRandomGoal = () => {
    const randomIndex = Math.floor(Math.random() * miningGoals.length)
    setMiningGoal(miningGoals[randomIndex])
  }
  
  // Call getRandomGoal when component mounts
  useEffect(() => {
    getRandomGoal()
  }, []) // Empty dependency array means this runs once on mount

  // Calculate price in sats based on hashrate
  const calculatePrice = (hashrate: number) => {
    const SATS_PER_THS_PER_DAY = 60
    return Math.round(hashrate * (SATS_PER_THS_PER_DAY / 12)) // Divide by 4 for 12 hours
  }

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await getTeams()
        // Filter out team with ID 1 (as done in account page)
        const filteredTeams = teamsData.filter(team => team.id !== 1)
        setTeams(filteredTeams)
      } catch (error) {
        console.error('Failed to fetch teams:', error)
        toast.error('Failed to load teams')
      }
    }
  
    fetchTeams()
  }, [])

  // Add this state to your component
  const [upcomingPartyData, setUpcomingPartyData] = useState<{
    totalHashrate: number;
    directBuyHashrate: number;
  }>({ totalHashrate: 500, directBuyHashrate: 0 }) // Default to 500 TH/s

  // Add this effect to fetch the data
  useEffect(() => {
    async function fetchUpcomingPartyData() {
      try {
        // Fetch upcoming block party auctions
        const upcomingAuctions = await getAllAuctions({
          limit: 50,
          auction_status: 'active',
          auction_type: 'blockparty_auction'
        });

        // Fetch next Saturday's leaderboard data
        const nextSatPartyLeaderboard = await getNextSaturdayPartyLeaderboard();
        const nextSatDirectLeaderboard = await getNextSaturdayDirectPartyLeaderboard();

        // Calculate hashrates
        const auctionHashrate = upcomingAuctions?.results?.reduce(
          (sum, auction) => sum + (auction.auction_meta.hashrate || 0),
          0
        ) || 0;

        const partyTableHashrate = nextSatPartyLeaderboard.reduce((sum, entry) => {
          return sum + 
            (entry.total_hashrate || 0) + 
            (entry.total_bid_bonus || 0) + 
            (entry.total_auctioneer_match_bonus || 0);
        }, 0);

        const directBuyHashrate = nextSatDirectLeaderboard.reduce((sum, entry) => {
          return sum + (entry.total_hashrate || 0);
        }, 0);

        setUpcomingPartyData({
          totalHashrate: Math.max(auctionHashrate + partyTableHashrate + directBuyHashrate, 0.01),
          directBuyHashrate
        });

      } catch (error) {
        console.error('Error fetching upcoming party data:', error);
      }
    }

    fetchUpcomingPartyData();
  }, []);

  useEffect(() => {
    const fetchBTCPrice = async () => {
      const price = await getBitcoinPrice()
      setBtcPrice(price)
    }
    fetchBTCPrice()
  }, [])

  const handleSubmit = async () => {
    if (!payoutAddress) {
      setError('Please enter a Lightning email or Bitcoin address')
      return
    }
    if (payoutAddress.toLowerCase().startsWith('lnbc')) {
      setError('Enter a Lightning email not an LNBC invoice')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Create the order
      const order = await createOrder({
        amount_sats: calculatePrice(customHashrate), // Use calculated price
        duration_days: 0.25, // 6 hours
        payout_address: payoutAddress,
        hashrate_thps: customHashrate,
        promo_code: miningGoal,
        team_id: selectedTeam?.id || null,
      })

      if (order?.id) {
        // Create payment with callback URL
        const callbackUrl = `${process.env.NEXT_PUBLIC_APP_CALLBACK_URL}/direct-order/success?order_id=${order.id}`
        
        try {
          const payment = await createDirectOrderPayment(order.id, callbackUrl)
          
          if (payment?.checkout_url) {
            router.push(payment.checkout_url)
          } else {
            throw new Error('Invalid payment response')
          }
        } catch (paymentError) {
          console.error('Payment creation failed:', paymentError)
          toast.error('Failed to create payment. Please try again.')
          setIsSubmitting(false)
          return
        }
      } else {
        throw new Error('Failed to create order')
      }
    } catch (error) {
      setError('Failed to process your purchase. Please try again.')
      console.error(error)
      toast.error(error.message || 'Failed to process order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const blockRewardUSD = btcPrice * blockRewardBTC
  const buyerRewardUSD = btcPrice * 0.00050000

  // Add this calculator hook
  const calculator = useSoloMineCalculator({
    customHashrate: upcomingPartyData?.totalHashrate || 500 // Default to 500 TH/s if no data
  })

  return (
    <div className="border rounded-lg p-6 space-y-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Next block party</span>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger>
              <span className="text-lg font-semibold bg-gray-100 px-3 py-1 rounded-full">
                Saturday, May 31st
              </span>
            </TooltipTrigger>
            <TooltipContent className="w-max rounded bg-gray-600 p-3 text-sm text-white">
              Or @ 200 PH/s -- 2 hour mining party
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

{/* Block Reward */}
<div className="flex justify-between items-center">
  <div className="flex items-center gap-2">
    <span className="font-medium text-gray-900">Potential block reward</span>
  </div>
  <div className="flex items-center gap-2">
    <Tooltip>
      <TooltipTrigger>
        <span className="text-lg font-semibold bg-gray-100 px-3 py-1 rounded-full">
          ${formatMoney(blockRewardUSD)}
        </span>
      </TooltipTrigger>
      <TooltipContent className="w-max rounded bg-gray-600 p-3 text-sm text-white">
        {blockRewardBTC} BTC
        <br />
        {(blockRewardBTC * 100000000).toLocaleString()} sats
      </TooltipContent>
    </Tooltip>
  </div>
</div>

{/* Your Share - Now on its own line */}
<div className="flex justify-between items-center mt-2">
  <div className="flex items-center gap-2">
    <span className="font-medium text-gray-900">Your share</span>
    <Tooltip>
      <TooltipTrigger>
        <InformationCircleIcon className="h-4 w-4 text-gray-400" />
      </TooltipTrigger>
      <TooltipContent className="w-max rounded bg-gray-600 p-3 text-sm text-white">
        Share will change based on total party hashrate
      </TooltipContent>
    </Tooltip>
  </div>
  <div className="flex items-center gap-2">
    <Tooltip>
      <TooltipTrigger>
        <span className="text-lg font-semibold bg-gray-100 px-3 py-1 rounded-full">
          ${formatMoney((customHashrate / upcomingPartyData.totalHashrate) * blockRewardBTC * btcPrice)}
        </span>
      </TooltipTrigger>
      <TooltipContent className="w-max rounded bg-gray-600 p-3 text-sm text-white">
        {((customHashrate / upcomingPartyData.totalHashrate) * blockRewardBTC).toFixed(8)} BTC
        <br />
        {Math.round((customHashrate / upcomingPartyData.totalHashrate) * blockRewardBTC * 100000000).toLocaleString()} sats
      </TooltipContent>
    </Tooltip>
  </div>
</div>



<div className="flex justify-between items-center">
  <div className="flex items-center gap-2">
    <span className="font-medium text-gray-900">Hashrate</span>
    <span className="text-xs text-gray-500 align-text-bottom">
      60 sats/TH/day
    </span>
  </div>
  <div className="flex items-center gap-2">
    <div className="flex items-center">
      <div className="flex flex-col border-y border-l rounded-l-lg">
        <button
          onClick={() => {
            const newValue = customHashrate + 1
            if (newValue <= 21000) {
              setCustomHashrate(newValue)
              setHashrateError('')
            }
          }}
          className="px-1.5 py-0.75 border-b hover:bg-gray-100 text-gray-600 text-xs"
        >
          ▲
        </button>
        <button
          onClick={() => {
            const newValue = customHashrate - 1
            if (newValue >= 1) {
              setCustomHashrate(newValue)
              setHashrateError('')
            }
          }}
          className="px-1.5 py-0.75 hover:bg-gray-100 text-gray-600 text-xs"
        >
          ▼
        </button>
      </div>

                <input
                  type="number"
                  value={customHashrate}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value)
                    if (isNaN(value)) {
                      setHashrateError('Please enter a valid number')
                      return
                    }
                    if (value < 1) {
                      setHashrateError('Minimum hashrate is 1 TH/s')
                      return
                    }
                    if (value > 21000) {
                      setHashrateError('Maximum hashrate is 21,000 TH/s')
                      return
                    }
                    setHashrateError('')
                    setCustomHashrate(value)
                  }}
                  className="w-24 px-3 py-1 text-right border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <span className="text-lg font-semibold bg-gray-100 px-3 py-1 rounded-full">TH/s</span>
            </div>
          </div>

      {/* Remove the existing Odds row and replace with this text */}
        <div className="text-sm text-gray-500 text-center">
        Odds: 1 in {Math.round(calculator.chancePerBlockDay * 4).toLocaleString()} based on {formatMoney(upcomingPartyData.totalHashrate)} TH/s
      </div>

{/* Payment Form */}
<div className="space-y-6">
  <div className="relative flex py-1 items-center">
    <div className="flex-grow border-t border-gray-300"></div>
    <span className="flex-shrink mx-4 text-gray-600 text-lg font-semibold">
      Enter your payout details
    </span>
    <div className="flex-grow border-t border-gray-300"></div>
  </div>
  <div className="max-w-3xl mx-auto space-y-4">
    {/* Payout Address Field */}
    <div className="grid grid-cols-[120px,1fr] items-center gap-4">
      <label className="text-sm text-gray-600 whitespace-nowrap">
        ₿ or Lightning ⚡
      </label>
      <input
        type="text"
        value={payoutAddress}
        onChange={(e) => {
          const value = e.target.value
          if (value.toLowerCase().startsWith('lnbc')) {
            setError('Enter a Lightning email not an LNBC invoice')
          } else {
            setError('')
          }
          setPayoutAddress(value)
        }}
        placeholder="bc123etc or Lightning email"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
        aria-label="Lightning or Bitcoin address"
      />
    </div>

    {/* Mining Goal Field */}
    {/* <div className="grid grid-cols-[120px,1fr] items-center gap-4">
      <label className="text-sm text-gray-600 whitespace-nowrap">
        Goal (optional)
      </label>
      <input
        type="text"
        value={miningGoal}
        onChange={(e) => setMiningGoal(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
      />
    </div> */}

<div className="grid grid-cols-[120px,1fr] gap-4">
  <div className="items-center">
    <label className="text-sm text-gray-600 whitespace-nowrap">
      Mining Team
    </label>
  </div>
  <div className="flex flex-col gap-1">
    <select
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      value={selectedTeam?.id?.toString() || ''}
      onChange={(e) => setSelectedTeam(teams.find(t => t.id.toString() === e.target.value) || null)}
    >
      <option value="">No Team</option>
      {teams.map((team) => (
        <option key={team.id} value={team.id}>
          {team.name}
        </option>
      ))}
    </select>
    <span className="text-sm text-gray-500">
      Help bitcoin projects earn hashrate
    </span>
  </div>
</div>

    {error && (
      <div className="text-center text-red-500 text-sm mt-4">
        {error}
      </div>
    )}
  </div>
</div>

      <button 
        onClick={handleSubmit}
        disabled={isSubmitting || hashrateError}
        className="w-full mt-6 bg-[#f08222] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#e07212] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processing...' : `Buy - ${calculatePrice(customHashrate)} sats`}
      </button>

      {/* Add this new div for the notice text */}
      {/*  <div className="text-sm text-gray-500 text-center mt-2">
        Speed may be increased if block party in progress 
      </div> */}

    </div>
  )
}