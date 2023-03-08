import { useEffect, useState } from 'react'
import FilterSort from 'src/components/FilterSort'
import InnerSection from 'src/components/InnerSection'
import Loader from 'src/components/Loader'
import Pagination from 'src/components/Pagination'
import { collectionProps } from 'src/components/interfaces'
import ProductBlock from 'src/components/ProductBlock'
import { getCollections } from 'src/api/collections/getCollections'

const limit = 10

const Collections = () => {
  const [data, setData] = useState<collectionProps | null>(null)
  const [query, setQuery] = useState<string>('?limit=' + limit)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCollections({ query })
      const returnData = await response.json()
      setData(returnData)
    }

    fetchData()
  }, [query])

  return data ? (
    <>
      <InnerSection title={'Auctions'} breadcrumb={'All Auctions'} />
      <section className="product-lst-wrp">
        <div className="container">
          <FilterSort />
          <div className="row">
            <ProductBlock data={data.results} />
          </div>
          {data && data.count ? (
            <Pagination limit={limit} prev={data?.previous} next={data?.next} count={data.count} setQuery={setQuery} />
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  ) : (
    <Loader />
  )
}

export default Collections
