import { productProps } from './interfaces'

interface Iprops {
  data: productProps[]
}

const ProductBlock = ({ data }: Iprops) => {
  return (
    <>
      {data.map((product, idx) => (
        <div className="col-md-4 col-sm-6" key={idx}></div>
      ))}
    </>
  )
}

export default ProductBlock
