import { StringProps } from './interfaces'

const HashPrice = ({ data }: StringProps) => {
  return (
    <section className=" rounded-3 border px-4 py-3" style={{ backgroundColor: '#fff' }}>
      <h5 className="text-start">Hash price</h5>
      <div>
        <img className="w-100" src={data} alt="hash price" />
      </div>
    </section>
  )
}

export default HashPrice
