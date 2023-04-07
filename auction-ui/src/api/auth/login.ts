import { makeClientRequest } from 'src/api/clientRequest'

export async function login(email: string): Promise<boolean> {
  const res = await makeClientRequest({
    method: 'POST',
    path: `/api/auth/login`,
    body: {
      email,
    },
  })

  if (res.error) {
    return false
  }

  return true
}
