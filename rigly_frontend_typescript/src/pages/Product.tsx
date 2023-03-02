import React from 'react'
import ProductTemplate from '../components/ProductTemplate'

import "../css/auction-product.css";

import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { satoshisToFiat } from 'bitcoin-conversion';

const Product = () => {
  const routeParams = useParams();
  const [dataProduct, setdataProduct] = useState(null);
  const [dataBids, setdataBids] = useState([]);
  const [dataProxyBids, setdataProxyBids] = useState([]);
  const [currentBid, setcurrentBid] = useState(null);
  const [winner, setWinner] = useState(null);
  const [paymentInBtcFromUsd, setPaymentInBtcFromUsd] = useState(5917.861);


  useEffect(() => {
    const fetchData = async () => {
      const id_pro = routeParams.id
      const response = await fetch(window.fetchUrl+"/api/auctions/"+id_pro+"/complete_auction_detail/")
      const returnData = await response.json()
      console.log(returnData)
      setdataProduct(returnData.Product)
      setdataBids(returnData.Bids)
      setcurrentBid(returnData.CurrentBid)
      setdataProxyBids(returnData.proxy_bid)
      setPaymentInBtcFromUsd(await satoshisToFiat(1, 'USD'))
    }

    

    fetchData();
  },[routeParams])

  useEffect(() => {
    const fetchData1 = async () => {
      const id_pro = routeParams.id
      const response = await fetch(window.fetchUrl+"/api/auctions/"+id_pro+"/complete_auction_detail/")
      const returnData = await response.json()
      setdataBids(returnData.Bids)
      setcurrentBid(returnData.CurrentBid)
      setdataProxyBids(returnData.proxy_bid)
      setWinner(returnData.winner)
    }
    const interval = setInterval(() => {
      fetchData1()
    }, 3000)
    return () => clearInterval(interval)
  }, [routeParams]);

  return (
    <div className="auction-product">
      <div className="main-wrpper">
        {dataProduct && currentBid?
          <ProductTemplate proxy_bid={dataProxyBids} satToUsd={paymentInBtcFromUsd} route_id={routeParams.id} data={dataProduct} bids={dataBids} currentbid={currentBid} winner={winner} />
          :<></>
        }
      </div>
    </div>
  )
}

export default Product