import { makeClientRequest } from 'src/api/clientRequest'

interface RegisterPayload {
  email: string
  mining_pool_username: string
  mining_pool_address: string
  referral_code?: string
  create_pool_account: boolean
  is_demo?: boolean
}

export async function register(payload: RegisterPayload, returnUrl?: string): Promise<[boolean, string | undefined]> {
  const res = await makeClientRequest({
    method: 'POST',
    path: `/api/auth/register`,
    body: {
      ...payload,
      return_url: returnUrl,
      url: process.env.NEXT_PUBLIC_APP_CALLBACK_URL,
    },
  })

  if (res.error) {
    console.error(res.error)

    return [false, res.error]
  }

  return [true, undefined]
}
