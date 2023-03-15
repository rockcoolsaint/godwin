import { getHomeData } from 'src/api/home/getHomeData'
import Home from 'src/components/pages/home'

export default async function HomePage() {
  const homeData = await getHomeData()

  return <Home products={homeData.products} />
}
