import { makeClientRequest } from 'src/api/clientRequest'

let loading = false

export default async function getOrder() {
  if (!loading) {
    loading = true

    const order = await makeClientRequest({ method: 'GET', path: '/api/orders?auction_id=1' })

    loading = false

    return order
  }

  return undefined
}
