import { makeClientRequest } from 'src/api/clientRequest'

export async function getCollections({ query }: { query: string }) {
  const program = await makeClientRequest({
    method: 'GET',
    path: `api/get_homepage_data/${query}`,
  })

  return program
}
