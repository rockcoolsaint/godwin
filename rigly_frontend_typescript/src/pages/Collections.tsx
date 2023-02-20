import React, { useEffect, useState } from 'react'
import FilterSort from '../components/FilterSort'
import InnerSection from '../components/InnerSection'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import ProductBlock from '../components/ProductBlock'

import {collectionProps} from '../components/interfaces'

const limit = 10

const Collections = () => {
  const [data, setData] = useState<collectionProps|null>(null);
  const [query, setQuery] = useState<string>("?limit="+limit);
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/v1/auctions/"+query)
      const returnData = await response.json()
      console.log(returnData)
      setData(returnData)
    }

    fetchData();
  },[query])

  return (
    data?
    <>
        <InnerSection title={"Auctions"} breadcrumb={"All Auctions"} />
        <section className="product-lst-wrp">
            <div className="container">
                <FilterSort />
                <div className="row">
                    <ProductBlock  data={data.results} />
                </div>
                {data &&data.count?
                  <Pagination limit={limit} prev={data?.previous} next={data?.next} count={data.count} setQuery={setQuery} />:<></>
                }
            </div>
        </section>
    </>:
    <Loader />
  )
}

export default Collections