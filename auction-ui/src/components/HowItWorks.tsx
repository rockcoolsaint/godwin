import Image from 'next/image'
import Link from './shared/Link'

const HowItWorks = () => {
  return (
    <section className="how-its-work-wrp">
      <div className="container">
        <div className="how-row">
          <div className="row">
            <div className="col-md-5 col-sm-12">
              <div className="how-it-img">
                <Image src="../images/how-seller-img1.svg" alt="" />
              </div>
            </div>
            <div className="offset-md-1 col-md-6 col-sm-12">
              <div className="how-work-data">
                <label>1</label>
                <h3>Signup as a Seller</h3>
                <p>
                  Check around. Getting up and running as a miner in this market takes months. %name% offers the opportunity to start today
                  without the big ASIC order, dealing with customs or wiring your own electricity. Bidders are able to lock in physical
                  miners at a known price for a known period. It’s as simple as that.
                </p>

                <Link href="#">
                  Learn more <i className="far fa-arrow-right fa-fw"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="how-row">
          <div className="row">
            <div className="col-md-6 col-sm-12" id="one">
              <div className="how-work-data">
                <label>2</label>
                <h3>Get Validation</h3>
                <p>
                  Check around. Getting up and running as a miner in this market takes months. %name% offers the opportunity to start today
                  without the big ASIC order, dealing with customs or wiring your own electricity. Bidders are able to lock in physical
                  miners at a known price for a known period. It’s as simple as that.
                </p>

                <Link href="#">
                  Learn more <i className="far fa-arrow-right fa-fw"></i>
                </Link>
              </div>
            </div>
            <div className="offset-md-1 col-md-5 col-sm-12" id="two">
              <div className="how-it-img">
                <Image src="../images/how-seller-img2.svg" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="how-row">
          <div className="row">
            <div className="col-md-5 col-sm-12">
              <div className="how-it-img">
                <Image src={'../images/how-seller-img3.svg'} alt="" />
              </div>
            </div>
            <div className="offset-md-1 col-md-6 col-sm-12">
              <div className="how-work-data">
                <label>3</label>
                <h3>Add your Rigs to Auction</h3>
                <p>
                  Check around. Getting up and running as a miner in this market takes months. %name% offers the opportunity to start today
                  without the big ASIC order, dealing with customs or wiring your own electricity. Bidders are able to lock in physical
                  miners at a known price for a known period. It’s as simple as that.
                </p>

                <Link href="#">
                  Learn more <i className="far fa-arrow-right fa-fw"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
