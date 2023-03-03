import React from "react";
import ProductTemplate from "../components/ProductTemplate";

import "../css/auction-product.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { satoshisToFiat } from "bitcoin-conversion";
import { get } from "../utils/fetch";
import { url } from "../utils/url";
import { useAuth0 } from "@auth0/auth0-react";
import Orders from "../lib/orders";

const Product = () => {
  const routeParams = useParams();
  const [dataProduct, setdataProduct] = useState(null);
  const [dataBids, setdataBids] = useState([]);
  const [dataProxyBids, setdataProxyBids] = useState([]);
  const [currentBid, setcurrentBid] = useState(null);
  const [winner, setWinner] = useState(null);
  const [paymentInBtcFromUsd, setPaymentInBtcFromUsd] = useState(5917.861);
  const { user, getIdTokenClaims, isLoading } = useAuth0();
  const [orderId, setOrderId] = useState(null);

  const getAuctionStatus = async () => {
    const auction = await get(
      url(`/api/auctions/${routeParams.id}/complete_auction_detail`)
    );

    setdataBids(auction.Bids);
    setcurrentBid(auction.CurrentBid);
    setdataProxyBids(auction.proxy_bid);
    setWinner(auction.winner);

    return auction;
  };

  const getUser = async () => {
    const claims = await getIdTokenClaims();
    const { user } = await get(url("/api/profile"), {
      // @ts-ignore
      Authorization: `Bearer ${claims.__raw}`,
    });
    return user;
  };

  const checkIsPaymentNeeded = async () => {
    if (!routeParams.id) {
      return;
    }

    const user = await getUser();
    await getAuctionStatus();

    const order = await Orders.create(routeParams.id);

    if (order.user_id !== user.id) {
      // Current user is not winner of the auction.
      return;
    }
    console.log(order.order_id);

    // TODO: Replace with more robust way to check if order has received payment.
    if (order.status === "unpaid" || order.status === "partial") {
      setOrderId(order.order_id);
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    checkIsPaymentNeeded();
  }, [routeParams, user, getIdTokenClaims, isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      const id_pro = routeParams.id;

      const auctionDetail = await get(
        url(`/api/auctions/${id_pro}/complete_auction_detail`)
      );
      setdataProduct(auctionDetail.Product);
      setdataBids(auctionDetail.Bids);
      setcurrentBid(auctionDetail.CurrentBid);
      setdataProxyBids(auctionDetail.proxy_bid);
      setPaymentInBtcFromUsd(await satoshisToFiat(1, "USD"));
    };
    fetchData();
  }, [routeParams]);

  useEffect(() => {
    const interval = setInterval(getAuctionStatus, 3000);

    return () => clearInterval(interval);
  }, [routeParams]);

  return (
    <div className="auction-product">
      <div className="main-wrpper">
        {dataProduct && currentBid ? (
          <ProductTemplate
            proxy_bid={dataProxyBids}
            satToUsd={paymentInBtcFromUsd}
            route_id={routeParams.id}
            data={dataProduct}
            bids={dataBids}
            currentbid={currentBid}
            winner={winner}
            orderId={orderId}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Product;
