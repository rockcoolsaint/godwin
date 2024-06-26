'use client'

import { AllAuctionsResponse, Auction } from "src/api/auction/types";
import AuctionSchedule from "../AuctionSchedule";
import ReactPaginate from "react-paginate";
import { getAllAuctions } from "src/api/auction/getAllAuctions";
import { useEffect, useState } from "react";

export default function AuctionSchedulePaginated(
    { showTitle, limit, dataArgs }: 
    { showTitle?: boolean, limit: number, dataArgs: any }
) {
    const [data, setData] = useState<AllAuctionsResponse>({
        count: 0, 
        results: []
    })

    const fetchPage = (pageNum) => {
        getAllAuctions({
            ...dataArgs,
            limit,
            offset: pageNum * limit
        }).then((d) => {
            setData(d)
        })
    }

    useEffect(() => {
        fetchPage(0)
    }, [])

    return (<>
        <ReactPaginate
            className="react-paginate"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(e) => {
                fetchPage(e.selected)
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
