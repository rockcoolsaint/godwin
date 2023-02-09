import React from 'react'
import Bids from './Bids'
import CalculatorWidget from './CalculatorWidget'
import HashPrice from './HashPrice'
import LiveFeed from './LiveFeed'
import ProductProfile from './ProductProfile'
import SitePhoto from './SitePhoto'

import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';


const ProductTemplate = ({data}) => {
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
                                                <Bids />
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
                                                <CalculatorWidget data={data} />
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
                                <p className="end-date">Bid End Date: <b>28 Dec, 2022, 12:00 Am</b></p>
                                <div className="d-flex countdown">
                                    <h4>7 <sup>days</sup></h4>
                                    <h4>33 <sup>hours</sup></h4>
                                    <h4>58 <sup>min</sup></h4>
                                    <h4>30 <sup>sec</sup></h4>
                                </div>
                                <div className="d-flex flex-column align-items-center justify-content-center mt-4 py-3 px-5 mb-4 w-75 current-bid-container">
                                    <p className="m-0 fs-6 current-bid-title">Current bid</p>
                                    <h2 className="m-0">1,500,999</h2>
                                </div>
                                <p className="fs-6 text-dark-emphasis fw-semibold cb-enter-bid">Enter your bid</p>
                                <div className="container px-5">
                                    <input type="number" className="form-control mb-3" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="cb-bid-note">
                                    Bids require 20,000$ deposit, refunded after auction
                                </div>
                                <div className="w-100 mt-4 border-top d-flex align-items-center justify-content-center">
                                    <button className="btn btn-primary mt-4 w-75 cb-bid-btn py-2">Place bid</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
  )
}

export default ProductTemplate