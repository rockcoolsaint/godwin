import React, { useEffect, useState } from 'react'
import Bids from './Bids'
import CalculatorWidget from './CalculatorWidget'
import HashPrice from './HashPrice'
import LiveFeed from './LiveFeed'
import ProductProfile from './ProductProfile'
import SitePhoto from './SitePhoto'

import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { useAuth0 } from '@auth0/auth0-react'
import BidModal from './Modal'
import Countdown from "react-countdown";

import {RendererProps, bidProps, productProps, winnerProps} from './interfaces'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import AlertDismissible from './Alert'

import ToastAlert from '../components/Toast'

interface ProductsProps {
    data: productProps | null,
    bids: bidProps[],
    currentbid: bidProps,
    route_id?: string,
    winner: winnerProps | null,
    satToUsd: number
}

const ProductTemplate = ({data, bids, currentbid, winner, route_id, satToUsd}: ProductsProps) => {

const [showToast, setShowToast] = useState(false)
const [toastData, setToastData] = useState({"message":""})
const [winnerUser, setWinnerUser] = useState(false)
console.log("***************************")



function formatMoney(number: number) {
    return Number((number).toFixed(2)).toLocaleString();
}

const { getIdTokenClaims, isAuthenticated, user } = useAuth0();

useEffect(()=>{
if(user && winner){
    if(user?.email === winner?.user?.email){
        setWinnerUser(true)
    }
}
},[user, winner])

const [query, setQuery] = useState<string>("");
const [userPaidStatus, setUserPaidStatus] = useState<boolean>(true);

const Completionist = () => <span>Bidding for this auction is now being closed</span>;


const renderer = ({ days, hours, minutes, seconds, completed }:RendererProps): JSX.Element => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return( 
        <>
            <h4>{days} <sup>days</sup></h4>
            <h4>{hours} <sup>hours</sup></h4>
            <h4>{minutes} <sup>min</sup></h4>
            <h4>{seconds} <sup>sec</sup></h4>
        </>);
    }
  };

const handleSubmit = () => {
    getIdTokenClaims().then(async(data1: any) => {
        if (!query) return;
        if(!data1.__raw) return;
        fetch('/api/place-bid/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+data1?.__raw, 
            },
            body: JSON.stringify({
                bid_amnt: query,
                source: "list_page",
                list_id: data?.id
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if(responseJson.message === "User status Unpaid"){
                setUserPaidStatus(false)
            }else{
                setUserPaidStatus(true)
           
                setToastData({
                    "message": responseJson.place_bid_status.message
                })
                setShowToast(true)
            }
            //window.location.reload()
            return responseJson;
        })
        .catch((error) => {
            alert(error)
            console.error(error);
        });
    })
  };


  const dateFormat = (date: Date) =>{
    return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(date)
  }

//   if(data.expiry_at){
//     console.log(dateFormat(new Date(data.expiry_at)))
//   }

  return (
    <section className="product-details-wrp">
        {showToast?<ToastAlert title='Alert' description={toastData.message} show_toast={showToast} />:<></>}
        
        {data?.id? 
                <div className="container">
                    <div className="breadcrumb-bx"></div>
                    <h4>{data.title}</h4>
                    <p>{data.sub_title}</p>

                    <div className="container bid-container">
                        <div className="row">
                            <div className="col-md-8">
                                <Tab.Container defaultActiveKey="pro-tbs1">
                                    <Tab.Content>
                                        <Tab.Pane eventKey="pro-tbs1">
                                            <div className="">
                                                <Bids satToUsd={satToUsd} bids={bids} />
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="pro-tbs2" title="Product Profile">
                                            <div className="">
                                                <ProductProfile data={data} />
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="pro-tbs3" title="Live Feed">
                                            <div className="">
                                                <LiveFeed data={data.auction_meta.live_feed_image} />
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="pro-tbs4" title="Calculator Widget">
                                            <div className="">
                                                <CalculatorWidget satToUsd={satToUsd} currentBid={currentbid.bid} data={data} />
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="pro-tbs5" title="Hash Price">
                                            <div className="">
                                                <HashPrice data={data.auction_meta.hash_price_image} />
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="pro-tbs6" title="Site Photo">
                                            <div className="">
                                                <SitePhoto data={data.auction_meta.site_photo} />
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>

                                    <div className="products-details-tabs">
                                        <Nav variant="tabs">
                                            <Nav.Item>
                                                <Nav.Link eventKey="pro-tbs1">Bids</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="pro-tbs2">Profile</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="pro-tbs3">Live feed</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="pro-tbs4">Calculator</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="pro-tbs5">Hash price</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="pro-tbs6">Site photos</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                </Tab.Container>
                            </div>
                            <div className="border d-flex flex-column align-items-center py-4 px-0 col-md-4 rounded-3" style={{backgroundColor: '#fff'}}>
                                {new Date(data.auction_start_date) > new Date()? <p className="end-date">Auction Starting Date: <b>{data.auction_start_date?dateFormat(new Date(data.auction_start_date)):<></>}</b></p>:
                                <p className="end-date">Bid End Date: <b>{data.expiry_at?dateFormat(new Date(data.expiry_at)):<></>}</b></p> }
                                
                                <div className="d-flex countdown">
                                {data.expiry_at?
                                <Countdown date={new Date(data.auction_start_date) > new Date()?new Date(data.auction_start_date):new Date(data.expiry_at)} renderer={renderer}>
                                    <Completionist />
                                </Countdown>:<></>
                                }
                                    
                                </div>
                                <div className="d-flex flex-column align-items-center justify-content-center mt-4 py-3 px-5 mb-4 w-75 current-bid-container">
                                    <p className="m-0 fs-6 current-bid-title">Current bid</p>
                                    <h2 className="m-0"><span data-tooltip-content={"$"+(currentbid.bid * satToUsd).toFixed(2).toString()} data-tooltip-id="my-tooltip">{currentbid.bid?formatMoney(currentbid.bid):''}</span></h2>
                                </div>
                                {winnerUser?<div className='text-center'>
                                    <hr />
                                    <p>You are the winner.</p>
                                    {route_id?
                                        <Link to={"/winner-payment/"+route_id}>Click Here to checkout</Link>
                                        :""
                                    }
                                    <hr />
                                </div>:""}
                                {data.is_expired || (new Date(data.expiry_at) > new Date()) || (new Date(data.auction_start_date) > new Date())?<><p><Link to="/collections">Checkout more auctions </Link></p>
                                
                                
                                
                                </>:
                                <>
                                {isAuthenticated?<></>:<div>
                                    <AlertDismissible button_arg='login' heading='Login' button='Login' description='Kindly Login to place the bid.' />
                                </div>}
                                {userPaidStatus?<></>:<div>
                                    <AlertDismissible button_arg='payment' heading='Payment Pending' button='Complete Payment' description='Kindly pay the token amount to place the bid.' />
                                </div>}
                                <p className="fs-6 text-dark-emphasis fw-semibold cb-enter-bid">Enter your bid</p>
                                <div className="container px-5">
                                    <input type="number" onChange={(e) => {setQuery(e.target.value)}} defaultValue={currentbid.bid?currentbid.bid: data.starting_bid} className="form-control mb-3" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="cb-bid-note">
                                    Bids require 20,000$ deposit, refunded after auction
                                </div>
                                <div className="w-100 mt-4 border-top d-flex align-items-center justify-content-center">
                                    <button onClick={handleSubmit} className="btn btn-primary mt-4 w-75 cb-bid-btn py-2">Place bid</button>
                                </div>
                                
                                <div className="w-100 mt-4 d-flex align-items-center justify-content-center">
                                {/* <input type="number" onChange={(e) => {setQuery1(e.target.value)}} className="form-control mb-3" id="exampleInputEmail11" aria-describedby="emailHelp" />
                                <button onClick={handleSubmit1} className="btn btn-primary mt-4 w-75 cb-bid-btn py-2">Place automatic bid</button> */}
                                    <BidModal data={data.id} />
                                </div>
                                </>
                                }
                                
                            </div>
                        </div>
                    </div>

                </div>
                :
                <Loader />
                }
            </section>
  )
}

export default ProductTemplate