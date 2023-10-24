import { makeClientRequest } from 'src/api/clientRequest'
import { Order } from 'src/types'

interface CreateOrderPayload {
  block_party_id: number
  block_party_speed: string
  account_id: number
  order_type: string
}

export async function createOrder({ account_id, block_party_id, order_type, block_party_speed }: CreateOrderPayload): Promise<Order> {
  try {
    const res = await makeClientRequest({
      method: 'POST',
      path: `/api/orders/create`,
      body: { order_type: order_type, account_id: account_id, block_party_speed: block_party_speed, block_party_id: block_party_id },
    })

    return res
  } catch (ex) {
    throw ex
  }
}
