import { Products } from 'src/api/auction/types'
import CollectionProductBlock from 'src/components/CollectionProductBlock'
interface Props {
  products: Products[]
}

const HomeCollection = ({ products }: Props) => {
  return (
    <section className="flex w-full flex-col items-center justify-center py-40">
      <h1 className="text-center text-7xl text-primary">Upcoming Auctions</h1>
      <div className="mt-20 grid w-full grid-cols-1 gap-6 md:w-[52%] md:grid-cols-2">
        {products.map((product, idx) => (
          <CollectionProductBlock key={idx} product={product} />
        ))}
      </div>
    </section>
  )
}

export default HomeCollection
