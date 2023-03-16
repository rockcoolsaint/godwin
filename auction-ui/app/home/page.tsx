import { getFeaturedAuctions } from 'src/api/auction/getFeaturedAuctions'
import Home from 'src/components/pages/home'

export default async function HomePage() {
  const auctions = await getFeaturedAuctions()

  return <Home auctions={auctions} />
}
