import { makeClientRequest } from 'src/api/clientRequest'

export async function getHomeData() {
  const program = await makeClientRequest({
    method: 'GET',
    path: `api/get_homepage_data/`,
  })

  return program
}
