import React from 'react'
// import AboutUs from '../components/AboutUs'
import HeroBanner from '../components/HeroBanner'
// import HomeCollection from '../components/HomeCollection'
// import Information from '../components/Information'

import { useState, useEffect } from 'react';
import HomeCollection from '../components/HomeCollection';
import Information from '../components/Information';
import AboutUs from '../components/AboutUs';
import Loader from '../components/Loader';

import {HomePageProps} from "../components/interfaces"



const Homepage = () => {
  const [data, setData] = useState<HomePageProps[] | null>(null);


  const fetchData = async () => {
    const response = await fetch(window.fetchUrl+"/api/get_homepage_data/")
    const returnData = await response.json()
    console.log(returnData)
    setData(returnData)
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    data?
    <>
      <HeroBanner />
      <HomeCollection products={data[0].products} />
      <Information />
      <AboutUs /> 
    </>:
   <Loader />
  )
}

export default Homepage