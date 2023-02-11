import React from 'react'

const Bids = ({bids}) => {
  return (
    <section className=" px-4 py-3 rounded-3 border bidsSection" style={{backgroundColor: '#fff'}}>
      <h5 className="text-start">Bids</h5>
      <div className="px-3"></div>
      {bids.map((bid, idx) => (
      <div key={idx} className="row border rounded-2 pt-3 px-3">
          <div className="col-md-8">
              <h6>{bid.user.username}</h6>
              <p>{new Date(bid.created_at).toLocaleString()}</p>
          </div>
          <div className="col-md-4">
              <h6 className="text-end-1">{bid.bid} sats</h6>
              <p className="text-end-1">0.035 BTC</p>
          </div>
      </div>
      ))
      }
    </section>
  )
}

export default Bids