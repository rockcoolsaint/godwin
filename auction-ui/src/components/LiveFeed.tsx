import { StringProps } from './interfaces'

const LiveFeed = ({ data }: StringProps) => {
  return (
    <section className=" rounded-3 border px-4 py-3" style={{ backgroundColor: '#fff' }}>
      <h5 className="text-start">Live Feed</h5>
      <div>
        <img className="w-100" src={data} alt="live feed" />
      </div>
    </section>
  )
}

export default LiveFeed
