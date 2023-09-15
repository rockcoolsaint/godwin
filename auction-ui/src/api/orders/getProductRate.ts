import { makeClientRequest } from 'src/api/clientRequest'

export async function getProductRate(): Promise<any> {
  const rates = await makeClientRequest({
    method: 'GET',
    path: `/api/products/rates`,
  })

  return rates
}
