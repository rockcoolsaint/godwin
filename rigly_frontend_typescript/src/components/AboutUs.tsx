import React from 'react'

import AbtImg1 from '../images/abt-img1.png'
import AbtImg2 from '../images/abt-img2.png'
import AbtImg3 from '../images/abt-img3.png'
import { Link } from 'react-router-dom';

// interface props{
//     "about_us_1_image": string,
//     "about_us_1_title":string,
//     "about_us_1_sub_title": string,
//     "about_us_1_url": string,

//     "about_us_2_image": string,
//     "about_us_2_title":string,
//     "about_us_2_sub_title": string,
//     "about_us_2_url": string,

//     "about_us_3_image": string,
//     "about_us_3_title":string,
//     "about_us_3_sub_title": string,
//     "about_us_3_url": string,
// }

// interface dataProp {
//     data: props;
//   }
const AboutUs = () => {
  return (
    <section className="about-wrp">
        <div className="container">
            <h2>About Us</h2>

            <div className="abt-row">
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <div className="abt-box">
                            <img src={AbtImg1} alt="" />
                            <h3>A Janus "The Pro"</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est sed quis vulputate aliquet ac. Nam phasellus massa proin posuere malesuada.</p>

                            <Link to="#">Read More <i className="far fa-arrow-right fa-fw"></i></Link>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="abt-box">
                            <img src={AbtImg2} alt="" />
                            <h3>A Janus "The Pro"</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est sed quis vulputate aliquet ac. Nam phasellus massa proin posuere malesuada.</p>
                            <Link to="#">Read More <i className="far fa-arrow-right fa-fw"></i></Link>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="abt-box">
                            <img src={AbtImg3} alt="" />
                            <h3>A Janus "The Pro"</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est sed quis vulputate aliquet ac. Nam phasellus massa proin posuere malesuada.</p>
                            <Link to="#">Read More <i className="far fa-arrow-right fa-fw"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutUs