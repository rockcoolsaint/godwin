import { makeClientRequest } from 'src/api/clientRequest'

export async function login(email: string, returnUrl?: string): Promise<boolean> {
  const res = await makeClientRequest({
    method: 'POST',
    path: `/api/auth/login`,
    body: {
      email,
      url: process.env.NEXT_PUBLIC_APP_CALLBACK_URL,
      return_url: returnUrl,
    },
  })

  if (res.error) {
    console.error(res.error)

    return false
  }

  return true
}
