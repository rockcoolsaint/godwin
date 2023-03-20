import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import CollectionList from 'src/components/pages/collections/CollectionsList'

export default async function HomePage() {
  const auctions = await getAllAuctions({ limit: 10 })

  return (
    <section>
      <CollectionList auction={auctions.results} />
    </section>
  )
}
