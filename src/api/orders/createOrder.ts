import { makeClientRequest } from 'src/api/clientRequest'
import { Order } from 'src/types'

interface CreateOrderPayload {
  account_id?: number | undefined
  order_type: 'direct' | 'auction' | 'block_party'
  hashrate_thps?: number
  payout_address?: string
  start_date?: string
  end_date?: string
  amount_sats?: number
  duration_days?: number
}

export async function createOrder({ 
  account_id,
  order_type = 'direct',
  hashrate_thps,
  payout_address,
  start_date,
  end_date,
  amount_sats = 120,
  duration_days = 0.125
}: CreateOrderPayload): Promise<Order> {
  try {
    const res = await makeClientRequest({
      method: 'POST',
      path: `/api/orders/create`,
      body: {
        account_id,
        order_type,
        hashrate_thps,
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