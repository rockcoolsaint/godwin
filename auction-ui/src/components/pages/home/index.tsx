'use client'

import HomeCollection from 'src/components/HomeCollection'
import Loader from 'src/components/Loader'
import { HomePageProps } from 'src/components/interfaces'
import { useState, useEffect } from 'react'
import { getHomeData } from 'src/api/home/getHomeData'

export default function Home() {
  const [data, setData] = useState<HomePageProps[] | null>(null)

  const fetchData = async () => {
    const response = await getHomeData()
    const returnData = await response
    setData(returnData)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!data) {
    return null
  }

  return data ? (
    <>
      {/* <HeroBanner title={data[0].title} description={data[0].description} image_file={data[0].image_file} /> */}
      <HomeCollection products={data[0].products} />
      {/* <Information data={data[0]} /> */}
      {/* <AboutUs data={data[0]} /> */}
    </>
  ) : (
    <Loader />
  )
}
