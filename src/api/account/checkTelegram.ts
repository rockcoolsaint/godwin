import { makeClientRequest } from 'src/api/clientRequest'

export async function checkTelegram(email: string): Promise<boolean> {
  const res = await makeClientRequest({
    method: 'POST',
    path: `/api/account/telegram/check`,
    body: {
      email,
    },
  })

  if (res.error) {
    return true
  }

  return !!res.account.telegram_username
}
