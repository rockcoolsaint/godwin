import React from 'react'
import { Link } from 'react-router-dom'
import {productProfileProps} from './interfaces' 


const ProductProfile = ({data}: productProfileProps) => {
  return (
    <section className=" px-4 py-3 rounded-3 border" style={{backgroundColor: '#fff'}}>
        <h5 className="text-start">Profile</h5>
        <div className="row profile">
            <div className="col-md-8">
                <div className="row profile-row">
                    <div className="col-4 border-end border-white py-2 profile-row-title ps-3">Name</div>
                    <div className="col-8 py-2 ps-4">{data.title}</div>
                </div>
                <div className="row profile-row">
                    <div className="col-4 border-end border-white py-2 profile-row-title ps-3">Hashrate</div>
                    <div className="col-8 py-2 ps-4">{data.auction_meta.hashrate}</div>
                </div>
                <div className="row profile-row">
                    <div className="col-4 border-end border-white py-2 profile-row-title ps-3">Location</div>
                    <div className="col-8 py-2 ps-4">{data.auction_meta.location}</div>
                </div>
                <div className="row profile-row">
                    <div className="col-4 border-end border-white py-2 profile-row-title ps-3">Days of mining</div>
                    <div className="col-8 py-2 ps-4">{data.auction_meta.days_of_mining}</div>
                </div>
                <div className="row profile-row">
                    <div className="col-4 border-end border-white py-2 profile-row-title ps-3">Hours/day</div>
                    <div className="col-8 py-2 ps-4">{data.auction_meta.hours_per_day}</div>
                </div>
                <div className="row profile-row">
                    <div className="col-4 border-end border-white py-2 profile-row-title ps-3">Power source</div>
                    <div className="col-8 py-2 ps-4">{data.auction_meta.power_source}</div>
                </div>
                <div className="row profile-row">
                    <div className="col-4 border-end border-white py-2 profile-row-title ps-3">ASIC model</div>
                    <div className="col-8 py-2 ps-4">{data.auction_meta.asic_model}</div>
                </div>
                <div className="row profile-row">
                    <div className="col-4 border-end border-white py-2 profile-row-title ps-3">Terms</div>
                    <div className="col-8 py-2 ps-4">
                        <Link to={data?.auction_meta.terms_link}>Click Here</Link>
                    </div>
                </div>
                <div className="row profile-row">
                    <div className="col-4 border-end border-white py-2 profile-row-title ps-3">Auction Start</div>
                    <div className="col-8 py-2 ps-4">{new Date(data.created_at).toLocaleString()}
                    </div>
                </div>
                <div className="row profile-row">
                    <div className="col-4 border-end border-white py-2 profile-row-title ps-3">Auction end</div>
                    <div className="col-8 py-2 ps-4">{new Date(data.expiry_at).toLocaleString()}
                    </div>
                </div>

            </div>
            <div className="col-md-4">
                <div className="d-flex justify-content-center flex-column align-items-center py-2">
                    <img className="w-75 mb-1" src={data.auction_meta.profile_image_1} alt="Profile" />
                    <img className="w-75 mb-1" src={data.auction_meta.profile_image_2} alt="Profile" />
                    <img className="w-75 mb-1" src={data.auction_meta.profile_image_3} alt="Profile" />
                </div>
            </div>
        </div>
    </section>

  )
}

export default ProductProfile