import { makeClientRequest } from 'src/api/clientRequest'

export async function subscribeNewsletter(email: string) {
  const subscribe = await makeClientRequest({
    method: 'POST',
    path: '/api/newsletter/subscribe',
    body: { email: email },
  })

  return subscribe
}
