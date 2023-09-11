import { makeClientRequest } from 'src/api/clientRequest'
import { Order } from 'src/types'

interface CreateOrderPayload {
  account_id: number | undefined
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  try {
    const res = await makeClientRequest({
      method: 'POST',
      path: `/api/orders/create`,
      body: { ...payload, order_type: 'direct', amount_sats: 500, duration_days: 0.125 },
    })

    return res
  } catch (ex) {
    throw ex
  }
}
