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
    const response = await fetch("/api/get_homepage_data/")
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
      <HeroBanner title={data[0].title} description={data[0].description} image_file={data[0].image_file} />
      <HomeCollection products={data[0].products} />
      <Information data={data[0]} />
      <AboutUs data={data[0]} /> 
    </>:
   <Loader />
  )
}

export default Homepage