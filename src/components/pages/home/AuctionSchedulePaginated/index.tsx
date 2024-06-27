'use client'

import { AllAuctionsResponse, Auction } from "src/api/auction/types";
import AuctionSchedule from "../AuctionSchedule";
import ReactPaginate from "react-paginate";
import { getAllAuctions } from "src/api/auction/getAllAuctions";
import { useEffect, useState } from "react";

export default function AuctionSchedulePaginated(
    { auctionsData, showTitle, limit, dataArgs }: 
    { auctionsData: AllAuctionsResponse; showTitle?: boolean, limit: number, dataArgs: any }
) {
    const [data, setData] = useState<AllAuctionsResponse>(auctionsData)
    const [pageNum, setPageNum] = useState<number>(0)

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
        fetchPage(pageNum)
    }, [pageNum])

    return (<>
        <ReactPaginate
            className="react-paginate"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(e) => {
                setPageNum(e.selected)
            }}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            pageCount={ Math.ceil(data?.count / limit) }
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            forcePage={pageNum}
        />
        {data?.results && <AuctionSchedule auctionsData={data?.results} showTitle={showTitle}/>}
        <ReactPaginate
            className="react-paginate"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(e) => {
                setPageNum(e.selected)
            }}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            pageCount={ Math.ceil(data?.count / limit) }
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            forcePage={pageNum}
        />
    </>)
}
