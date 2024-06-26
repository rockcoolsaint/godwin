'use client'

import { AllAuctionsResponse, Auction } from "src/api/auction/types";
import AuctionSchedule from "../AuctionSchedule";
import ReactPaginate from "react-paginate";
import { getAllAuctions } from "src/api/auction/getAllAuctions";
import { useState } from "react";

export default function AuctionSchedulePaginated(
    { auctionsData, showTitle, limit, dataArgs }: 
    { auctionsData: AllAuctionsResponse; showTitle?: boolean, limit: number, dataArgs: any }
) {
    const [data, setData] = useState<AllAuctionsResponse>(auctionsData)

    return (<>
        <ReactPaginate
            className="react-paginate"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(e) => {
                getAllAuctions({
                    ...dataArgs,
                    limit,
                    offset: e.selected * limit
                }).then((d) => {
                    setData(d)
                })
            }}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={ Math.ceil(data.count / limit) }
            previousLabel="< previous"
            renderOnZeroPageCount={null}
        />
        <AuctionSchedule auctionsData={data.results} showTitle={showTitle}/>
    </>)
}
