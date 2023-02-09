import React from 'react'
import ProductTemplate from '../components/ProductTemplate'

import "../css/auction-product.css";

import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


const Product = ({ match, history }) => {
  const routeParams = useParams();
  const id_pro = routeParams.id
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/product/"+id_pro)
    const returnData = await response.json()
    console.log(returnData)
    setData(returnData)
  }

  useEffect(() => {
    fetchData();
  },[])


  return (
    <div className="auction-product">
      <div className="main-wrpper">
        <ProductTemplate  data={data} />
      </div>
    </div>
  )
}

export default Product