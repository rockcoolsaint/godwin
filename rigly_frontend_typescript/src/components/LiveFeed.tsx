import React from 'react'

import {StringProps} from './interfaces' 

const LiveFeed = ({data}: StringProps) => {
  return (
    <section className=" px-4 py-3 rounded-3 border" style={{backgroundColor: '#fff'}}>
        <h5 className="text-start">Live Feed</h5>
        <div>
            <img className="w-100" src={data} alt="live feed" />
        </div>
    </section>

  )
}

export default LiveFeed