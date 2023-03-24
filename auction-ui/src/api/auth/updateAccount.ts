import { makeClientRequest } from 'src/api/clientRequest'

export async function updateAccount(update: object, token: string): Promise<boolean> {
  try {
    await makeClientRequest({
      method: 'PUT',
      path: `/api/account/update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: { ...update },
    })

    // TODO: Error handling

    return true
  } catch (ex) {
    return false
  }
}
