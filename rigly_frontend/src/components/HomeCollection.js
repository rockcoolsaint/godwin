import React from 'react'
import Slider from "react-slick";

import {Link} from 'react-router-dom';

import Countdown from "react-countdown";

const HomeCollection = ({data}) => {

  var current_date = new Date()
  if(!current_date){
    current_date = new Date().now()
  }

  const Completionist = () => <p>Bidding Closed for this product</p>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
        return( 
          <div className='d-flex countdown'>
            <h4>{days} <sup>days</sup></h4>
            <h4>{hours} <sup>hours</sup></h4>
            <h4>{minutes} <sup>min</sup></h4>
            <h4>{seconds} <sup>sec</sup></h4>
          </div>);
      }
    };


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
                          {new Date(product.auction_start_date) > current_date ? <p>Auction starting in: </p>: <p>Auction ending at: </p>}
                          <Countdown
                            date={(new Date(product.auction_start_date ) > current_date) ?( new Date(product.auction_start_date)) : (new Date(product.expiry_at))}
                            renderer={renderer}
                          />
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