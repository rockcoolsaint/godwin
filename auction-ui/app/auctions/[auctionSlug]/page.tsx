import AuctionContainer from 'src/components/pages/auction/AuctionContainer'
import ContentContainer from 'src/components/shared/ContentContainer'

export default async function AuctionPage() {
  return (
    <ContentContainer title="Auction">
      <AuctionContainer />
    </ContentContainer>
  )
}
