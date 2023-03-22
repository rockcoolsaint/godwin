import AuctionContainer from 'src/components/pages/auction/AuctionContainer'
import ContentContainer from 'src/components/shared/ContentContainer'
import { getAuctionBySlug } from 'src/api/auction/getAuctionBySlug'
import { getOrderByAuctionId } from 'src/api/orders/getOrderByAuctionId'

export default async function AuctionPage({ params }: { params: { auctionSlug: string } }) {
  const slug = params.auctionSlug
  const auction = await getAuctionBySlug(slug)

  if (!auction) {
    return <ContentContainer title="Auction">Error loading auction</ContentContainer>
  }

  // TODO: Check if user is owner of this auction, only then get the order.
  const order = await getOrderByAuctionId(auction.auction.id)
  if (!order) {
    return <ContentContainer title="Auction">Error loading order</ContentContainer>
  }

  return (
    <ContentContainer className="py-5">
      {/* <a href={`/checkout?order_id=${order.id}`}>
        <button>Checkout</button>
      </a> */}
      <AuctionContainer {...auction} slug={slug} />
    </ContentContainer>
  )
}
