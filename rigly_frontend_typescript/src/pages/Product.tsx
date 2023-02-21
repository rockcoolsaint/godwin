import React from 'react'
import ProductTemplate from '../components/ProductTemplate'

import "../css/auction-product.css";

import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


const Product = () => {
  const routeParams = useParams();
  const [dataProduct, setdataProduct] = useState(null);
  const [dataBids, setdataBids] = useState([]);
  const [currentBid, setcurrentBid] = useState(null);
  const [winner, setWinner] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const id_pro = routeParams.id
      const response = await fetch("/api/auctions/"+id_pro+"/complete_auction_detail/")
      const returnData = await response.json()
      console.log(returnData)
      setdataProduct(returnData.Product)
      setdataBids(returnData.Bids)
      setcurrentBid(returnData.CurrentBid)
    }

    fetchData();
  },[routeParams])

  useEffect(() => {
    const fetchData1 = async () => {
      const id_pro = routeParams.id
      const response = await fetch("/api/auctions/"+id_pro+"/complete_auction_detail/")
      const returnData = await response.json()
      setdataBids(returnData.Bids)
      setcurrentBid(returnData.CurrentBid)
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
          <ProductTemplate route_id={routeParams.id} data={dataProduct} bids={dataBids} currentbid={currentBid} winner={winner} />
          :<></>
        }
      </div>
    </div>
  )
}

export default Product