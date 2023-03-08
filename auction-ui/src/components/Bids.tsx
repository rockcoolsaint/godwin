import { bidProps } from './interfaces'

interface Ibids {
  bids: bidProps[]
}

const Bids = ({ bids }: Ibids) => {
  return (
    <section className=" rounded-3 bidsSection border px-4 py-3" style={{ backgroundColor: '#fff' }}>
      <h5 className="text-start">Bids</h5>
      <div className="px-3"></div>
      {bids.length >= 1
        ? bids.map((bid, idx) => (
            <div key={idx} className="row rounded-2 border px-3 pt-3">
              <div className="col-md-8">
                <h6>{bid.user?.username}</h6>
                <p>{new Date(bid?.created_at).toLocaleString()}</p>
              </div>
              <div className="col-md-4">
                <h6 className="text-end-1">{bid.bid} sats</h6>
                <p className="text-end-1">0.035 BTC</p>
              </div>
            </div>
          ))
        : 'No Bids yet.'}
    </section>
  )
}

export default Bids
