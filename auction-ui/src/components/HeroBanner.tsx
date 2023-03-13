import Image from 'next/image'
import parse from 'html-react-parser'
import Link from './shared/Link'

interface props {
  title: string
  description: string
  image_file: string
}

const HeroBanner = ({ title, description, image_file }: props) => {
  return (
    <section className="hero-banner-wrp">
      <div className="container">
        <div className="row">
          <div className="col-md-7 col-sm-12" id="one">
            <div className="banner-data">
              <h1>{title}</h1>
              {parse(description?.toString())}
              <div className="btn-group">
                <Link href="/collections" className="btn-main">
                  Start Mining Today
                </Link>
                <h5>
                  Need any help? <Link href="#">Contact us</Link>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-sm-12" id="two">
            <div className="banner-img">
              <Image src={image_file} alt="" />
            </div>
          </div>
        </div>
      </div>

      <Image src="../images/banner-shp1.svg" alt="" className="banner-shp1" />
      <Image src="../images/banner-shp2.svg" alt="" className="banner-shp2" />
      <Image src="../images/banner-shp3.svg" alt="" className="banner-shp3" />
    </section>
  )
}

export default HeroBanner
