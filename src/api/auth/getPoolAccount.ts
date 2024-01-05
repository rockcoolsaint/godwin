import { makeClientRequest } from 'src/api/clientRequest'

interface PoolAccount {
  count: number
  next: string | null
  previous: string | null
  results: [
    {
      pool: string
      username: string
      is_default: boolean
    },
  ]
}

export async function getPoolAccount(token: string): Promise<PoolAccount> {
  const res = await makeClientRequest({
    method: 'GET',
    path: `/api/account/pool-account`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res
}
