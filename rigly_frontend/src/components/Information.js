import React from 'react'

import MiningImg1 from '../images/mining-img1.svg'
import MiningImg2 from '../images/mining-img1.svg'
import MiningImg3 from '../images/mining-img1.svg'

import parse from 'html-react-parser';


const Information = ({data}) => {
  return (
    <section className="mini-hands-wrp">
        <div className="container">
            <h2>Mining Back in the<br /> Hands of ther Users</h2>

            <div className="mining-row">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="mining-img">
                            <img src={data.mining_info_image_1} alt="" />
                        </div>
                    </div>
                    <div className="offset-md-1 col-md-5 col-sm-12">
                        <div className="mining-data">
                            <h3>{data.mining_info_title_1}</h3>
                            {
                               parse(data.mining_info_description_1.toString())
                            }
                            <a href={data.mining_info_url_1}>Learn more <i className="far fa-arrow-right fa-fw"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mining-row">
                <div className="row">                    
                    <div className="col-md-5 col-sm-12" id="one">
                        <div className="mining-data">
                            <h3>{data.mining_info_title_2}</h3>
                            {
                               parse(data.mining_info_description_2.toString())
                            }
                            <a href={data.mining_info_url_2}>Learn more <i className="far fa-arrow-right fa-fw"></i></a>
                        </div>
                    </div>
                    <div className="offset-md-1 col-md-6 col-sm-12" id="two">
                        <div className="mining-img">
                            <img src={data.mining_info_image_2} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mining-row">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="mining-img">
                            <img src={data.mining_info_image_2} alt="" />
                        </div>
                    </div>
                    <div className="offset-md-1 col-md-5 col-sm-12">
                        <div className="mining-data">
                            <h3>{data.mining_info_title_3}</h3>
                            {
                               parse(data.mining_info_description_3.toString())
                            }
                            <a href={data.mining_info_url_3}>Learn more <i className="far fa-arrow-right fa-fw"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Information