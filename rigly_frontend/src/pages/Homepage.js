import React from 'react'
import AboutUs from '../components/AboutUs'
import HeroBanner from '../components/HeroBanner'
import HomeCollection from '../components/HomeCollection'
import Information from '../components/Information'

import { useState, useEffect } from 'react';


const Homepage = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/")
    const returnData = await response.json()
    console.log(returnData)
    setData(returnData)
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    data.length > 0?
    <>
        <HeroBanner data={data[0]} />
        <HomeCollection data={data[0]} />
        <Information data={data[0]} />
        <AboutUs data={data[0]} />
    </>:
    <></>
  )
}

export default Homepage