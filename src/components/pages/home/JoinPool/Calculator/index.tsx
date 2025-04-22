'use client'
import { useEffect, useState } from 'react'
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

export const MiningCalculator = () => {
  const { account } = useAccountContext()
  const router = useRouter()
  const [btcPrice, setBtcPrice] = useState<number>(0)
  const [lightningEmail, setLightningEmail] = useState('')
  const [bitcoinAddress, setBitcoinAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const blockRewardBTC = 3.125
  const hashrate = 8 // TH/s - hardcoded for now
  
  useEffect(() => {
    if (lightningEmail && bitcoinAddress) {
      setError('Enter either a Lightning email or Bitcoin address, but not both')
    } else {
      setError('')
    }
  }, [lightningEmail, bitcoinAddress])

  useEffect(() => {
    const fetchBTCPrice = async () => {
      const price = await getBitcoinPrice()
      setBtcPrice(price)
    }
    fetchBTCPrice()
  }, [])

  const handleSubmit = async () => {
    if (lightningEmail && bitcoinAddress) {
      setError('Enter either a Lightning email or Bitcoin address, but not both')
      return
    }

    if (!lightningEmail && !bitcoinAddress) {
      setError('Please enter either a Lightning email or Bitcoin address')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Create the order
      const order = await createOrder({
        amount_sats: 120, // Hardcoded amount from button text
        duration_days: 0.25, // 6 hours
        payout_address: lightningEmail || bitcoinAddress
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
                Saturday, April 26th
              </span>
            </TooltipTrigger>
            <TooltipContent className="w-max rounded bg-gray-600 p-3 text-sm text-white">
              6 hour mining party 14:00 to 22:00 UTC
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Hashrate</span>
          <Tooltip>
            <TooltipTrigger>
              <InformationCircleIcon className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent className="w-max rounded bg-gray-600 p-3 text-sm text-white">
              Current hashprice is 60 sats per TH/s/day
            </TooltipContent>
          </Tooltip>
        </div>
        <span className="text-lg font-semibold bg-gray-100 px-3 py-1 rounded-full">8 TH/s</span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Block reward</span>
        </div>
        <div className="text-right flex items-center gap-2">
          <span className="text-gray-600">{blockRewardBTC} BTC + tx fees</span>
          <span className="text-lg font-semibold bg-gray-100 px-3 py-1 rounded-full">
            ${formatMoney(blockRewardUSD)}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Your potential share</span>
        </div>
        <div className="text-right flex items-center gap-2">
          <span className="text-gray-600">50,000 sats</span>
          <span className="text-lg font-semibold bg-gray-100 px-3 py-1 rounded-full">
            ${formatMoney(buyerRewardUSD)}
          </span>
        </div>
      </div>

      {/* Remove the existing Odds row and replace with this text */}
      <div className="text-sm text-gray-500 text-center">
        Odds: 1 in 460 based on 50 PH/s block party</div>

      {/* Payment Form */}
      <div className="space-y-6">
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600 text-lg font-semibold">
            Enter your payout details
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-8 items-start justify-center">
            <div className="flex-1 flex flex-col items-center">
              <input
                type="email"
                value={lightningEmail}
                onChange={(e) => setLightningEmail(e.target.value)}
                placeholder="Lightning email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>

            <div className="flex items-center self-center pt-2">
              <span className="text-gray-600 font-bold px-4">or</span>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <input
                type="text"
                value={bitcoinAddress}
                onChange={(e) => setBitcoinAddress(e.target.value)}
                placeholder="Bitcoin address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
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
        disabled={isSubmitting || (lightningEmail && bitcoinAddress)}
        className="w-full mt-6 bg-[#f08222] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#e07212] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processing...' : 'Buy - 120 sats'}
      </button>
    </div>
  )
}