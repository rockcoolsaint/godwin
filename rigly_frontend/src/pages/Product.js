import React from 'react'
import ProductTemplate from '../components/ProductTemplate'

import "../css/auction-product.css";

import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


const Product = ({ match, history }) => {
  const routeParams = useParams();
  const id_pro = routeParams.id
  const [dataProduct, setdataProduct] = useState([]);
  const [dataBids, setdataBids] = useState([]);
  const [currentBid, setcurrentBid] = useState([]);


  const fetchData = async () => {
    const response = await fetch("/api/product/"+id_pro)
    const returnData = await response.json()
    console.log(returnData)
    setdataProduct(returnData.Product)
    setdataBids(returnData.Bids)
    setcurrentBid(returnData.CurrentBid)
  }

  useEffect(() => {
    fetchData();
  },[])


  return (
    <div className="auction-product">
      <div className="main-wrpper">
        <ProductTemplate  data={dataProduct} bids={dataBids} currentbid={currentBid} />
      </div>
    </div>
  )
}

export default Product