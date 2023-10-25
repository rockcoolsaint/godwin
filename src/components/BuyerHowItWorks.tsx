import Image from 'next/image'
import Link from './shared/Link'

const BuyerHowItWorks = () => {
  return (
    <section className="how-its-work-wrp">
      <div className="container">
        <div className="how-row">
          <div className="row">
            <div className="col-md-6 col-sm-12" id="one">
              <div className="how-work-data">
                <label>1</label>
                <h3>Sign up as Buyer</h3>
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
                <Image src="../images/how-buyer-img1.svg" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="how-row">
          <div className="row">
            <div className="col-md-5 col-sm-12">
              <div className="how-it-img">
                <Image src="../images/how-buyer-img1.svg" alt="" />
              </div>
            </div>
            <div className="offset-md-1 col-md-6 col-sm-12">
              <div className="how-work-data">
                <label>2</label>
                <h3>Fund your account </h3>
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
                <label>3</label>
                <h3>Bid on auctions</h3>
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
                <Image src="../images/how-buyer-img1.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="buyer-rows">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="buyer-block">
                <h3>
                  You Win! <Image src="../images/points.svg" alt="" />
                </h3>

                <ul>
                  <li>
                    <div className="buyer-ic">
                      <Image src="../images/win-ic1.svg" alt="" />
                    </div>
                    <div className="buyer-dt">
                      <h4>Send Payment</h4>
                      <p>
                        Free local dispatch for our gold and platinum members, Professional advise Dispatch for our gold and platinum
                        members.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="buyer-ic">
                      <Image src="../images/win-ic2.svg" alt="" />
                    </div>
                    <div className="buyer-dt">
                      <h4>Start Mining</h4>
                      <p>
                        Free local dispatch for our gold and platinum members, Professional advise Dispatch for our gold and platinum
                        members.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="buyer-block">
                <h3>You don’t Win!</h3>

                <ul>
                  <li>
                    <div className="buyer-ic">
                      <Image src="../images/win-ic3.svg" alt="" />
                    </div>
                    <div className="buyer-dt">
                      <h4>Keep bidding on other Auctions</h4>
                      <p>
                        Free local dispatch for our gold and platinum members, Professional advise Dispatch for our gold and platinum
                        members.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="buyer-ic">
                      <Image src="../images/win-ic4.svg" alt="" />
                    </div>
                    <div className="buyer-dt">
                      <h4>Refund Deposit after 1 Month</h4>
                      <p>
                        Free local dispatch for our gold and platinum members, Professional advise Dispatch for our gold and platinum
                        members.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuyerHowItWorks
