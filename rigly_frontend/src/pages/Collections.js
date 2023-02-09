import React from 'react'
import FilterSort from '../components/FilterSort'
import InnerSection from '../components/InnerSection'
import Pagination from '../components/Pagination'
import ProductBlock from '../components/ProductBlock'

const Collections = () => {
  return (
    <>
        <InnerSection title={"Auctions"} breadcrumb={"All Auctions"} />
        <section className="product-lst-wrp">
            <div className="container">
                <FilterSort />
                <div className="row">
                    <ProductBlock />
                </div>
                <Pagination />
            </div>
        </section>
    </>
  )
}

export default Collections