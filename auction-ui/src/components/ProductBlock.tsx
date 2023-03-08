import CollectionProductBlock from './CollectionProductBlock'

import { productProps } from './interfaces'

interface Iprops {
  data: productProps[]
}

const ProductBlock = ({ data }: Iprops) => {
  return (
    <>
      {data.map((product, idx) => (
        <div className="col-md-4 col-sm-6" key={idx}>
          <CollectionProductBlock product={product} />
        </div>
      ))}
    </>
  )
}

export default ProductBlock
