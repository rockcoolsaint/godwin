import { Products } from 'src/api/home/types'
import CollectionProductBlock from 'src/components/CollectionProductBlock'
interface Props {
  products: Products[]
}

const HomeCollection = ({ products }: Props) => {
  return (
    <section className="w-full py-40">
      <h1 className="text-center text-7xl text-primary">Upcoming Auctions</h1>
      <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
        {products
          .slice(1, 4)
          .reverse()
          .map((product, idx) => (
            <div key={idx}>
              <CollectionProductBlock product={product} />
            </div>
          ))}
      </div>
    </section>
  )
}

export default HomeCollection
