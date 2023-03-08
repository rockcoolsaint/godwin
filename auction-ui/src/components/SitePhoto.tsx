import { StringProps } from './interfaces'

const SitePhoto = ({ data }: StringProps) => {
  return (
    <section className=" rounded-3 border px-4 py-3" style={{ backgroundColor: '#fff' }}>
      <h5 className="text-start">Site photo</h5>
      <div>
        <img className="w-100" src={data} alt="site" />
      </div>
    </section>
  )
}

export default SitePhoto
