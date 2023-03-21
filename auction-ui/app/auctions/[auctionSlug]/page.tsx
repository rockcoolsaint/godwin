import { makeServerRequest } from 'src/api/serverRequest'
import ContentContainer from 'src/components/shared/ContentContainer'

export default async function AuctionPage({ params }: { params: { auctionSlug: string } }) {
  const slug = params.auctionSlug
  const auctionRes = await makeServerRequest({ method: 'GET', path: `/api/auctions?slug=${slug}` })

  if (auctionRes.error) {
    return <>Error loading auction</>
  }

  // TODO: Check if user is owner of this auction, only then get the order.
  const orderRes = await makeServerRequest({ method: 'GET', path: `/api/orders?auction_id=${auctionRes.auction.id}` })
  const orderId = orderRes.id

  return (
    <ContentContainer title="Auction">
      <a href={`/checkout?order_id=${orderId}`}>
        <button>Checkout</button>
      </a>
    </ContentContainer>
  )
}
