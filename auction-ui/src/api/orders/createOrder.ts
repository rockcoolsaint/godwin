import { makeClientRequest } from 'src/api/clientRequest'
import { Order } from 'src/types'

interface CreateOrderPayload {
  account_id: number | undefined
  amount_sats?: number
  duration_days?: number
}

export async function createOrder({ account_id, amount_sats = 500, duration_days = 0.125 }: CreateOrderPayload): Promise<Order> {
  try {
    const res = await makeClientRequest({
      method: 'POST',
      path: `/api/orders/create`,
      body: { account_id: account_id, order_type: 'direct', amount_sats: amount_sats, duration_days: duration_days },
    })

    return res
  } catch (ex) {
    throw ex
  }
}
