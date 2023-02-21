import React from 'react'
import { Link } from 'react-router-dom'

import { userHistory } from './interfaces'

interface Props{
    userhistory: userHistory[] | null
}

const UserProfileHistory = ({userhistory}: Props) => {
  const dateFormat = (date: Date) =>{
    return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit'}).format(date)
  }
  return (
    <div className="history-order">
                <h3>Recent Bidding History</h3>

                <div className="history-table">
                    <div id="example_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer"><div className="row"><div className="col-sm-12 col-md-6"></div><div className="col-sm-12 col-md-6"></div></div><div className="row"><div className="col-sm-12"><table id="example" className="table table-striped dt-responsive dataTable no-footer dtr-inline" style={{width: "100%"}} aria-describedby="example_info">
                        <thead>
                            <tr>
                                <th className="sorting sorting_asc" aria-controls="example" rowSpan={1} colSpan={1} style={{width: "56px"}} aria-sort="ascending" aria-label="Logo: activate to sort column descending">Logo</th><th className="sorting" aria-controls="example" rowSpan={1} colSpan={1} style={{width: "170px"}} aria-label="Name: activate to sort column ascending">Name</th><th className="sorting" aria-controls="example" rowSpan={1} colSpan={1} style={{width: "102px"}} aria-label="Auction Date: activate to sort column ascending">Auction Date</th><th className="sorting" aria-controls="example" rowSpan={1} colSpan={1} style={{width: "126px"}} aria-label="Bid Amount: activate to sort column ascending">Bid Amount</th><th className="sorting" aria-controls="example" rowSpan={1} colSpan={1} style={{width: "139px"}} aria-label="Auction End Date: activate to sort column ascending">Auction End Date</th><th className="sorting" aria-controls="example" rowSpan={1} colSpan={1} style={{width: "119px"}} aria-label="Status: activate to sort column ascending">Status</th></tr>
                        </thead>
                        <tbody>
                            
                            {userhistory?userhistory.map((data, idx)=>{
                               return <tr className="odd" key={idx}>
                                    <td className="dtr-control sorting_1">
                                        <div className="proimgbx">
                                            <img src={data.auction_list.auction_meta.site_photo} alt="" />
                                        </div>
                                    </td>
                                    <td>{data.auction_list.title}</td>
                                    <td>{dateFormat(new Date(data.auction_list.created_at))}</td>
                                    <td>{data.bid} sats</td>
                                    <td>{dateFormat(new Date(data.auction_list.expiry_at))}</td>
                                    <td><label className={data.auction_list.user_auction_status}>{data.auction_list.user_auction_status.toUpperCase()}</label> <Link to="#"><img src="images/delet-ic.svg" alt="" /></Link></td>
                                </tr>
                            }):<></> }
                            
                            </tbody>
                    </table></div></div><div className="row"><div className="col-sm-12 col-md-5"><div className="dataTables_info" id="example_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div></div><div className="col-sm-12 col-md-7"></div></div></div>
                </div>
            </div>
  )
}

export default UserProfileHistory