import React from 'react'

import {bidProps} from './interfaces' 
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

import { satoshisToBitcoin } from 'bitcoin-conversion';

interface Ibids{
  bids: bidProps[],
  satToUsd: number
}

const Bids = ({bids, satToUsd}: Ibids) => {
  if(!bids){
    return <></>
  }
  return (
    <section className=" px-4 py-3 rounded-3 border bidsSection" style={{backgroundColor: '#fff'}}>
      <Tooltip id="my-tooltip-2" />

      <h5 className="text-start">Bids</h5>
      <div className="px-3"></div>
      {bids.length>= 1 ?bids.map((bid, idx) => (
      <div key={idx} className="row border rounded-2 pt-3 px-3">
          <div className="col-md-8">
              <h6>{bid.user?.bidding_name}</h6>
              <p>{new Date(bid?.created_at).toLocaleString()}</p>
          </div>
          <div className="col-md-4">
              <h6 className="text-end-1"><span data-tooltip-id="my-tooltip-2" data-tooltip-content={"$"+(bid.bid * satToUsd).toFixed(2).toString()} >{bid.bid} sats</span></h6>
              <p className="text-end-1">{satoshisToBitcoin(bid.bid)} BTC</p>
          </div>
      </div>
      )):"No Bids yet."
      }
    </section>
  )
}

export default Bids