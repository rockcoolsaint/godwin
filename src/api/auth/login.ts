import { makeClientRequest } from 'src/api/clientRequest'

export async function login(email: string, returnUrl: string = '/pages/dashboard', code?: string): Promise<[boolean, string | undefined]> {
  const res = await makeClientRequest({
    method: 'POST',
    path: `/api/auth/login`,
    body: {
      email,
      url: process.env.NEXT_PUBLIC_APP_CALLBACK_URL,
      return_url: returnUrl, // This will default to '/pages/dashboard' if no returnUrl is provided
      code: code,
    },
  })

  if (res.error) {
    return [false, res.error]
  }

  return [true, undefined]
}