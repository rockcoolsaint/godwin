import { makeClientRequest } from 'src/api/clientRequest'

export async function getToken(email: string, code: string): Promise<string> {
  const res = await makeClientRequest({
    method: 'POST',
    path: `/api/auth/authorize`,
    body: {
      email,
      code,
    },
  })

  if (res.error) {
    throw res.error
  }

  return res.token
}
