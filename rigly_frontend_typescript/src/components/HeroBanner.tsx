import React from 'react';

import shp1 from '../images/banner-shp1.svg';
import shp2 from '../images/banner-shp2.svg';
import shp3 from '../images/banner-shp3.png';

import { Link } from 'react-router-dom';

import BannerImg from '../images/banner-img.svg'

const HeroBanner = () => {
  return (
    <section className="hero-banner-wrp">
        <div className="container">
            <div className="row">
                <div className="col-md-7 col-sm-12" id="one">
                    <div className="banner-data">
                        <h1>Mining Has Never Been Easier</h1>
                        <ul>
                            <li>Bid on verified machines</li>
                            <li>No need to wait</li>
                            <li>No need for expensive upfront capital investment</li>
                        </ul>
                        <div className="btn-group">
                            <Link to="/collections" className="btn-main">Start Mining Today</Link>
                            <h5>Need any help? <Link to="#">Contact us</Link></h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 col-sm-12" id="two">
                    <div className="banner-img">
                        <img src={BannerImg} alt="" />
                    </div>
                </div>
            </div>
        </div>

        <img src={shp1} alt="" className="banner-shp1" />
        <img src={shp2} alt="" className="banner-shp2" />
        <img src={shp3} alt="" className="banner-shp3" />
    </section>
  )
}

export default HeroBanner