import { getAuctionOfTheDay } from 'src/api/auction/getAuctionOfTheDay'
import { getFeaturedAuctions } from 'src/api/auction/getFeaturedAuctions'
import Home from 'src/components/pages/home'

export default async function HomePage() {
  const [auctions, auctionOfTheDay] = await Promise.all([getFeaturedAuctions(), getAuctionOfTheDay()])

  return <Home auctions={auctions} auctionOfTheDay={auctionOfTheDay} />
}
