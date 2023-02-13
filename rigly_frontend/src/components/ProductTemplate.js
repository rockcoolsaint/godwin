import React, { useState } from 'react'
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
import { Link } from 'react-router-dom'
import Countdown from "react-countdown";


const ProductTemplate = ({data, bids, currentbid}) => {
function formatMoney(number) {
    return Number((number).toFixed(2)).toLocaleString();
}

const { getIdTokenClaims, isAuthenticated } = useAuth0();


const [query, setQuery] = useState("");
const [userPaidStatus, setUserPaidStatus] = useState(true);

const Completionist = () => <span>You are good to go!</span>;

const renderer = ({ days, hours, minutes, seconds, completed }) => {
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

const handleSubmit = (e) => {
    e.preventDefault();
    getIdTokenClaims().then(async(data1) => {
        if (!query) return;
        if(!data1.__raw) return;
        fetch('/api/place-bid/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+data1.__raw, 
            },
            body: JSON.stringify({
                bid_amnt: query,
                source: "list_page",
                list_id: data.id
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.message == "User status Unpaid"){
                setUserPaidStatus(false)
            }else{
                setUserPaidStatus(true)
            }
            return responseJson.movies;
        })
        .catch((error) => {
            alert(error)
            console.error(error);
        });
    })
  };


  const dateFormat = (date) =>{
    return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(date)
  }

  if(data.expiry_at){
    console.log(dateFormat(new Date(data.expiry_at)))
  }

  return (
    <section className="product-details-wrp">
                <div className="container">
                    <div className="breadcrumb-bx"></div>
                    <h4>{data.title}</h4>
                    <p>{data.sub_title}</p>

                    <div className="container bid-container">
                        <div className="row">
                            <div className="col-md-8">
                                <Tab.Container defaultActiveKey="pro-tbs1">
                                    <Tab.Content>
                                        <Tab.Pane eventKey="pro-tbs1" title="Bids">
                                            <div className="">
                                                <Bids bids={bids} />
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="pro-tbs2" title="Product Profile">
                                            <div className="">
                                                <ProductProfile data={data} />
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="pro-tbs3" title="Live Feed">
                                            <div className="">
                                                <LiveFeed data={data} />
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="pro-tbs4" title="Calculator Widget">
                                            <div className="">
                                                <CalculatorWidget currentBid={currentbid.bid} data={data} />
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="pro-tbs5" title="Hash Price">
                                            <div className="">
                                                <HashPrice data={data} />
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="pro-tbs6" title="Site Photo">
                                            <div className="">
                                                <SitePhoto data={data} />
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
                                <p className="end-date">Bid End Date: <b>{data.expiry_at?dateFormat(new Date(data.expiry_at)):<></>}</b></p>
                                <div className="d-flex countdown">
                                {data.expiry_at?
                                <Countdown date={new Date(data.expiry_at)} renderer={renderer}>
                                    <Completionist />
                                </Countdown>:<></>
                                }
                                    
                                </div>
                                <div className="d-flex flex-column align-items-center justify-content-center mt-4 py-3 px-5 mb-4 w-75 current-bid-container">
                                    <p className="m-0 fs-6 current-bid-title">Current bid</p>
                                    <h2 className="m-0">{currentbid.bid?formatMoney(currentbid.bid):''}</h2>
                                </div>
                                <p className="fs-6 text-dark-emphasis fw-semibold cb-enter-bid">Enter your bid</p>
                                <div className="container px-5">
                                    <input type="number" onChange={(e) => {setQuery(e.target.value)}} defaultValue={currentbid.bid} className="form-control mb-3" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="cb-bid-note">
                                    Bids require 20,000$ deposit, refunded after auction
                                </div>
                                <div className="w-100 mt-4 border-top d-flex align-items-center justify-content-center">
                                    <button onClick={handleSubmit} className="btn btn-primary mt-4 w-75 cb-bid-btn py-2">Place bid</button>
                                </div>
                                <div className="w-100 mt-4 border-top d-flex align-items-center justify-content-center">
                                {/* <input type="number" onChange={(e) => {setQuery1(e.target.value)}} className="form-control mb-3" id="exampleInputEmail11" aria-describedby="emailHelp" />
                                <button onClick={handleSubmit1} className="btn btn-primary mt-4 w-75 cb-bid-btn py-2">Place automatic bid</button> */}
                                    <BidModal data={data} />
                                </div>
                                {isAuthenticated?<></>:<div>
                                    Kindly Login to place the bid.
                                </div>}
                                {userPaidStatus?<></>:<div>
                                    <Link to="/payment">Click here to pay the token amount to proceed.</Link>    
                                </div>}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
  )
}

export default ProductTemplate