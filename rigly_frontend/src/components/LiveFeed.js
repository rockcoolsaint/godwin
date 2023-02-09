import React from 'react'

const LiveFeed = ({data}) => {
  return (
    <section className=" px-4 py-3 rounded-3 border" style={{backgroundColor: '#fff'}}>
        <h5 className="text-start">Live Feed</h5>
        <div>
            <img className="w-100" src={data.live_feed_image} alt="Live Feed" />
        </div>
    </section>

  )
}

export default LiveFeed