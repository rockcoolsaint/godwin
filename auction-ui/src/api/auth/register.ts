import { makeClientRequest } from 'src/api/clientRequest'

interface RegisterPayload {
  email: string
  mining_pool_username: string
  mining_pool_address: string
  referral_code: string
}

export async function register(payload: RegisterPayload): Promise<boolean> {
  const res = await makeClientRequest({
    method: 'POST',
    path: `/api/auth/register`,
    body: {
      ...payload,
      url: process.env.NEXT_PUBLIC_APP_LOGIN_CALLBACK_URL,
    },
  })

  if (res.error) {
    return false
  }

  return true
}
