import { makeClientRequest } from 'src/api/clientRequest'

export async function disconnectTelegram(email: string): Promise<string | undefined> {
  const res = await makeClientRequest({
    method: 'POST',
    path: `/api/account/telegram/disconnect`,
    body: {
      email,
    },
  })

  if (res.error) {
    return res.error
  }

  return
}
