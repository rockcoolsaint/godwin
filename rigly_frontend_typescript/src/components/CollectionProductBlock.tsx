import React from 'react'
import { productProps } from './interfaces';

import Countdown from "react-countdown";
import { Link } from 'react-router-dom';

interface ProductProps {
    product: productProps
}


const Completionist = () => <p>Bidding Closed for this product</p>;

interface RendererProps {
  "days": string | number,
  "hours": string | number, 
  "minutes": string | number, 
  "seconds": string | number, 
  "completed": boolean | number
};

const renderer = ({ days, hours, minutes, seconds, completed }:RendererProps): JSX.Element => {
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

const CollectionProductBlock = ({product}: ProductProps) => {
 const current_date = new Date()
  return (
    <div className="similer-box">
      <Link to={"/product/"+product.slug_category} >
        <div className="similer-proimg">
            <img src={product.auction_meta.site_photo} alt={product.title + " Image"} />
        </div>
        <div className="similer-data">
            <h3>{product.title}</h3>
            {new Date(product.auction_start_date) > current_date ? <p>Auction starting in: </p>: 
            new Date(product.expiry_at) < current_date ?<p>Auction ended</p>:<p>Auction ending at: </p>}
            <Countdown
            date={(new Date(product.auction_start_date ) > current_date) ?( new Date(product.auction_start_date)) : (new Date(product.expiry_at))}
            renderer={renderer}
            />
            <h5>No. of Bids: <strong>{product.bid_count}</strong></h5>
            <h6>{new Date(product.auction_start_date) > current_date ? <><p>Auction starting at: <strong>{product.starting_bid}</strong></p></>: 
            new Date(product.expiry_at) < current_date ?<><p>Auction Ended at: <strong>{product.current_bid}</strong></p></>:
            <><p>Auction current bid: <strong>{product.current_bid}</strong></p></>}</h6>

            <span className={new Date(product.expiry_at) > current_date?"btn-main opacity-50":"btn-main"}><span>{new Date(product.expiry_at) > current_date?"View Auction":"Start mining Today"}</span></span>
        </div>
        </Link>
    </div>
  )
}

export default CollectionProductBlock