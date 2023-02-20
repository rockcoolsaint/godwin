import React from 'react'
import Slider from "react-slick";


import {productProps} from "./interfaces"
import CollectionProductBlock from './CollectionProductBlock';

interface ProductsProps {
  products: productProps[];
}
 

const HomeCollection = ({products}: ProductsProps) => {

  var current_date = new Date()
  if(!current_date){
    current_date = new Date()
  }



    const settings = {
        arrows: false,
        dots: true,
        autoplay: false,
        autoplaySpeed:1000,
        speed: 1000,
        infinite:false,
        infinte: true,
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

return (
    <section className="similer-products-wrp">
        <div className="container">
            <h2>Featured Auctions</h2>
            <div className="similer-pro-slider">
                <Slider {...settings}>
                {
                  products.slice(0).reverse().map((product, idx) => (
                    <div key={idx} >
                    <CollectionProductBlock product={product}/>
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