import { makeServerRequest } from 'src/api/serverRequest'
import ContentContainer from 'src/components/shared/ContentContainer'

export default async function AuctionPage({ params }: { params: { auctionSlug: string } }) {
  const slug = params.auctionSlug
  const auctionRes = await makeServerRequest({ method: 'GET', path: `/api/auctions?slug=${slug}` })

  if (auctionRes.error) {
    return <ContentContainer title="Auction">Error loading auction</ContentContainer>
  }

  // TODO: Check if user is owner of this auction, only then get the order.
  const orderRes = await makeServerRequest({ method: 'GET', path: `/api/orders?auction_id=${auctionRes.auction.id}` })
  if (orderRes.error) {
    return <ContentContainer title="Auction">Error loading order</ContentContainer>
  }

  return (
    <ContentContainer title="Auction">
      <a href={`/checkout?order_id=${orderRes.id}`}>
        <button>Checkout</button>
      </a>
    </ContentContainer>
  )
}
