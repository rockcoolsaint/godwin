import React from 'react'

const Bids = () => {
  return (
    <section className=" px-4 py-3 rounded-3 border" style={{backgroundColor: '#fff'}}>
      <h5 className="text-start">Bids</h5>
      <div className="px-3"></div>
      <div className="row border rounded-2 pt-3 px-3">
          <div className="col-md-8">
              <h6>Flinky</h6>
              <p>January 31, 2023</p>
          </div>
          <div className="col-md-4">
              <h6 className="text-end-1">8,5000,000 sats</h6>
              <p className="text-end-1">0.035 BTC</p>
          </div>
      </div>
    </section>
  )
}

export default Bids