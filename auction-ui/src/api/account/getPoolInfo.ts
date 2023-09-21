import { makeClientRequest } from 'src/api/clientRequest'

export async function getPoolInfo(token: string): Promise<any> {
  const poolInfo = await makeClientRequest({
    method: 'GET',
    path: '/api/account/pool-info',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return poolInfo
}
