import { makeServerRequest } from 'src/api/serverRequest'
import { HomePageDataResponse } from 'src/api/home/types'

export async function getHomeData(): Promise<HomePageDataResponse> {
  const homeData: HomePageDataResponse[] = await makeServerRequest({
    method: 'GET',
    path: `api/get_homepage_data`,
  })

  return homeData[0]
}
