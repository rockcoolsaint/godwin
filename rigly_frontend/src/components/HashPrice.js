import React from 'react'

const HashPrice = ({data}) => {
  return (
    <section className=" px-4 py-3 rounded-3 border" style={{backgroundColor: '#fff'}}>
        <h5 className="text-start">Hash price</h5>
        <div>
            <img className="w-100" src={data.hash_price_image} alt="hash price" />
        </div>
    </section>
  )
}

export default HashPrice