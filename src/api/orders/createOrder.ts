import { makeClientRequest } from 'src/api/clientRequest'
import { Order } from 'src/types'

interface CreateOrderPayload {
  account_id?: number | undefined
  order_type: 'direct' | 'auction' | 'block_party'
  hashrate_thps?: number  // Renamed from hashrate to match backend
  payout_address?: string
  start_date?: string
  end_date?: string
  amount_sats?: number
  duration_days?: number
}

export async function createOrder({ 
  account_id,
  order_type = 'direct',
  hashrate_thps = 8.0, // Default to 8 TH/s per backend default
  payout_address,
  start_date,
  end_date,
  amount_sats,
  duration_days = 0.25 // Default to 6 hours (0.25 days) for direct orders
}: CreateOrderPayload): Promise<Order> {
  try {
    // Validate direct order parameters
    if (order_type === 'direct') {
      // Ensure required fields are present
      if (!payout_address) {
        throw new Error('Payout address is required for direct orders')
      }
      if (!amount_sats || amount_sats < 100) { // Match backend minimum
        throw new Error('Amount must be at least 100 sats')
      }
      if (!duration_days || duration_days > 1) { // Match backend maximum
        throw new Error('Duration must be 1 day or less')
      }
    }

    const res = await makeClientRequest({
      method: 'POST',
      path: `/api/orders/create`,
      body: {
        account_id,
        order_type,
        hashrate_thps, // Send hashrate in TH/s
        payout_address,
        start_date,
        end_date,
        amount_sats,
        duration_days
      },
    })

    return res
  } catch (ex) {
    throw ex
  }
}