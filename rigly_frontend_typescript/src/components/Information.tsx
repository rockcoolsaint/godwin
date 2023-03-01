import React from 'react'

import MiningImg1 from '../images/mining-img1.svg'
import MiningImg2 from '../images/mining-img1.svg'
import MiningImg3 from '../images/mining-img1.svg'
import { Link } from 'react-router-dom';

// interface props{
//     "mining_info_image_1": string,
//     "mining_info_title_1":string,
//     "mining_info_description_1": string,
//     "mining_info_url_1": string,

//     "mining_info_image_2": string,
//     "mining_info_title_2":string,
//     "mining_info_description_2": string,
//     "mining_info_url_2": string,

//     "mining_info_image_3": string,
//     "mining_info_title_3":string,
//     "mining_info_description_3": string,
//     "mining_info_url_3": string,
// }

// interface dataProp {
//     data: props;
//   }

const Information = () => {
  return (
    <section className="mini-hands-wrp">
        <div className="container">
            <h2>Mining Back in the<br /> Hands of ther Users</h2>

            <div className="mining-row">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="mining-img">
                            <img src={MiningImg1} alt="" />
                        </div>
                    </div>
                    <div className="offset-md-1 col-md-5 col-sm-12">
                        <div className="mining-data">
                            <h3>This isn’t cloud mining</h3>
                            <p>Cloud mining has a dubious reputation for good reason. Rigly exists to allow bitcoin enthusiasts to participate in the mining ecosystem while ensuring safety from frauds and schemes. Many miners are required to place up to 2x the rental agreement of BTC in escrow. If the seller doesn't deliver the promised hashrate, this deposit goes to the renter. Additionally, Rigly screens each miner and verifies that all contracts are backed by active machines in known locations.</p>
                            <Link to="#">Learn more <i className="far fa-arrow-right fa-fw"></i></Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mining-row">
                <div className="row">                    
                    <div className="col-md-5 col-sm-12" id="one">
                        <div className="mining-data">
                            <h3>Up and running without the 6-12 month lead time</h3>
                            <p>Check around. Getting up and running as a miner in this market takes months. Rigly offers the opportunity to start today without the big ASIC order, dealing with customs, or wiring your own electricity. Bidders are able to lock in physical miners at a known price for a known period. It’s as simple as that.</p>
                           <Link to="#">Learn more <i className="far fa-arrow-right fa-fw"></i></Link>
                        </div>
                    </div>
                    <div className="offset-md-1 col-md-6 col-sm-12" id="two">
                        <div className="mining-img">
                            <img src={MiningImg2} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mining-row">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="mining-img">
                            <img src={MiningImg3} alt="" />
                        </div>
                    </div>
                    <div className="offset-md-1 col-md-5 col-sm-12">
                        <div className="mining-data">
                            <h3>If mining is profitable, why would a miner do this?</h3>
                            <p>Not sure if you heard but bitcoin can be... volatile. This is both a blessing and a curse for a company as sensitive to price and hashrate as miners.</p>
                            <p>- Is hashrate going up or down? (maybe?)</p>
                            <p>- Is the price of bitcoin going up or down? (maybe?)</p>
                            <p>Rigly allows miners to de-risk their operations by locking-in a certain percentage of their fleet at today’s market price. A miner renting out a portion of their rig inventory is like a hotel selling a block of rooms to Hotels.com or Kayak.</p>
                            <p>Rigly allows the operators have dependable cash flow regardless of future market conditions.</p>
                           <Link to="#">Learn more <i className="far fa-arrow-right fa-fw"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Information