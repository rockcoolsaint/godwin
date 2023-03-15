import HomeCollection from 'src/components/HomeCollection'
import { Products } from 'src/api/home/types'

interface Props {
  products: Products[]
}

export default function Home({ products }: Props) {
  return (
    <div>
      <HomeCollection products={products} />
    </div>
  )
}
