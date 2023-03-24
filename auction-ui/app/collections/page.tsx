import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import CollectionList from 'src/components/pages/collections/CollectionsList'
import Container from 'src/core/components/Container'

export default async function HomePage() {
  const auctions = await getAllAuctions({ limit: 10 })

  if (!auctions) {
    return (
      <Container>
        <div className="flex items-center justify-center">Could not load auctions</div>
      </Container>
    )
  }

  return (
    <section>
      <CollectionList auction={auctions.results} />
    </section>
  )
}
