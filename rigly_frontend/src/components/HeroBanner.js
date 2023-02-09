import React from 'react';

import bannerImg from '../images/banner-img.svg';
import shp1 from '../images/banner-shp1.svg';
import shp2 from '../images/banner-shp2.svg';
import shp3 from '../images/banner-shp3.png';

import parse from 'html-react-parser'


const HeroBanner = ({data}) => {
console.log(data)
  return (
    <section className="hero-banner-wrp">
        <div className="container">
            <div className="row">
                <div className="col-md-7 col-sm-12" id="one">
                    <div className="banner-data">
                        <h1>{data?.title}</h1>
                        {parse(data?.description.toString())}
                        <div className="btn-group">
                            <a href="#" className="btn-main">Start Mining Today</a>
                            <h5>Need any help? <a href="#">Contact us</a></h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 col-sm-12" id="two">
                    <div className="banner-img">
                        <img src={data?.image_file} alt="" />
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