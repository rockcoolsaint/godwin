import { redirect } from 'next/navigation'
import { getLatestRollingAuction } from 'src/api/auction/getLatestRollingAuction'

export default async function LatestAuctionPage() {
  const auction = await getLatestRollingAuction()

  if (!auction) {
    return redirect('/')
  }

  return redirect(`/demo/auctions/${auction.slug}`)
}
