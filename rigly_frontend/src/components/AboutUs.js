import React from 'react'

import AboutImg1 from '../images/abt-img1.png'
import AboutImg2 from '../images/abt-img2.png'
import AboutImg3 from '../images/abt-img3.png'

const AboutUs = () => {
  return (
    <section className="about-wrp">
        <div className="container">
            <h2>About Us</h2>

            <div className="abt-row">
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <div className="abt-box">
                            <img src={AboutImg1} alt="" />
                            <h3>A Janus "The Pro"</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est sed quis vulputate aliquet ac. Nam phasellus massa proin posuere malesuada.</p>

                            <a href="#">Read More <i className="far fa-arrow-right fa-fw"></i></a>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="abt-box">
                            <img src={AboutImg2} alt="" />
                            <h3>A Janus "The Pro"</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est sed quis vulputate aliquet ac. Nam phasellus massa proin posuere malesuada.</p>

                            <a href="#">Read More <i className="far fa-arrow-right fa-fw"></i></a>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="abt-box">
                            <img src={AboutImg3} alt="" />
                            <h3>A Janus "The Pro"</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est sed quis vulputate aliquet ac. Nam phasellus massa proin posuere malesuada.</p>

                            <a href="#">Read More <i className="far fa-arrow-right fa-fw"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutUs