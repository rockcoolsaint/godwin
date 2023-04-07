import { makeClientRequest } from 'src/api/clientRequest'
import { Account } from 'src/api/auction/types'

export async function getAccount(token: string): Promise<Account> {
  const res = await makeClientRequest({
    method: 'GET',
    path: `/api/account`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  // TODO: Error handling

  const { account } = res

  return account
}
