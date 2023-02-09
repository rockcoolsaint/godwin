import React from 'react'
import Slider from "react-slick";

import {Link} from 'react-router-dom';

const HomeCollection = ({data}) => {

    var settings = {
        arrows: false,
        dots: true,
        autoplay: false,
        autoplaySpeed:1000,
        speed: 1000,
        infinite:false,
        slidesToShow:3,
        slidesToScroll:1,
        responsive: [
        {
          breakpoint:1600,
          settings: {
            slidesToShow:3
          }
        },
        {
          breakpoint:1440,
          settings: {
            slidesToShow:3
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow:3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow:2
          }
        },
        {
          breakpoint:575,
          settings: {
            slidesToShow:1
          }
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };
console.log('Inside Home COllection')
console.log(data)
console.log(data.products)
return (
    <section className="similer-products-wrp">
        <div className="container">
            <h2>Featured Auctions</h2>
            <div className="similer-pro-slider">
                <Slider {...settings}>
                {
                  data.products.map((product, idx) => (
                    <div className="similer-box" key={idx}>
                      <div className="similer-proimg">
                          <img src={product.site_photo} alt={product.title + " Image"} />
                      </div>
                      <div className="similer-data">
                          <h3>{product.title}</h3>
                          <p>Bidding Closed for this product</p>
                          <h5>No. of Bids: <strong>9</strong></h5>
                          <h6>Auction Ended at: <strong>$180.00</strong></h6>

                          <Link to={"/product/"+product.slug_category} className="btn-main"><span>Start mining Today</span></Link>
                      </div>
                  </div>
                  ))
                }
                </Slider>
            </div>
        </div>
    </section>
  )
}

export default HomeCollection