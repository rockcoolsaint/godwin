import React from 'react'
import ProImg from "../images/pro-img1.png";
const ProductBlock = () => {
  return (
    <div className="col-md-4 col-sm-6">
        <div className="similer-box">
            <div className="similer-proimg">
                <img src={ProImg} alt="" />
            </div>
            <div className="similer-data">
                <h3>Whatsminer M20s</h3>
                <p>Bidding Closed for this product</p>
                <h5>No. of Bids: <strong>9</strong></h5>
                <h6>Auction Ended at: <strong>$180.00</strong></h6>

                <a href="#" className="btn-main"><span>Start mining Today</span></a>
            </div>
        </div>
    </div>
  )
}

export default ProductBlock