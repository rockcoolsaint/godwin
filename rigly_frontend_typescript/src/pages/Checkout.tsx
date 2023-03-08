import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";

import Orders from "../lib/orders";
import Payments from "../lib/payments";
import usePayments from "../hooks/usePayments";
import { Order, OrderPaymentStatus } from "../types";

const formatAuctionType = (auctionType: string) => {
  switch (auctionType) {
    case "immediate_delivery":
      return "Immediate delivery";
    case "forward_date":
      return "Forward date";
    case "upfront_payment":
      return "Upfront payment";
  }
};

export default function Checkout() {
  const [promoCode, setPromoCode] = useState("");
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const orderId = queryParams.get("order_id");

  const {
    first,
    paymentId,
    amountPaid,
    amountRemaining,
    isPaymentComplete,
    checkoutUrl,
  } = usePayments(order);

  const applyPromoCode = async () => {
    if (!promoCode || promoCode === "" || !first || !orderId) {
      return;
    }

    try {
      setLoading(true);

      await Payments.applyPromoCode(first.id, promoCode);

      const order = await Orders.getById(orderId);

      setOrder(order);
      setPromoCode("");
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  const clearPromoCode = async () => {
    if (!first || !orderId) {
      return;
    }

    try {
      setLoading(true);

      await Payments.clearPromoCode(first.id);

      const order = await Orders.getById(orderId);

      setOrder(order);
      setPromoCode("");
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const prepareCheckout = async () => {
      if (!orderId) {
        return;
      }

      const order = await Orders.getById(orderId);
      const payment = await Payments.create(order.id);
      console.log(payment);

      setOrder(order);
    };

    prepareCheckout();
  }, [orderId]);

  const showRemaining =
    order &&
    order.payments &&
    order.payments.length > 0 &&
    !isPaymentComplete &&
    first &&
    first.status !== OrderPaymentStatus.Processing;

  return (
    <div
      className="container"
      style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <h2>Checkout</h2>

      {order && first && (
        <div>
          <div>
            <div>
              <span>PaymentID:</span> <b>{paymentId}</b>
            </div>
            <div>
              <span>Bid: </span>
              <b>
                {order.price}
                <i className="fak fa-regular" />
              </b>
            </div>
            <div>
              <span>
                Mining deposit (
                {formatAuctionType(order.auction.auction_type.type)}{" "}
                {order.auction.auction_type.percentage}%):
              </span>{" "}
              <b>
                {order.mining_deposit}
                <i className="fak fa-regular" />
              </b>
            </div>
            <div>
              <span>Auction fee (3.5%): </span>
              <b>
                {order.auction_fee}
                <i className="fak fa-regular" />
              </b>
            </div>
            {first.promo_code && (
              <>
                <div>
                  <span>Discount: </span>
                  <b>{first.promo_code.discount}%</b>
                </div>
                <div>
                  <span>Total: </span>
                  <b>
                    {first.amount}
                    <i className="fak fa-regular" />
                  </b>
                </div>
              </>
            )}
            {!first.promo_code && (
              <div>
                <span>Total: </span>
                <b>
                  {order.total}
                  <i className="fak fa-regular" />
                </b>
              </div>
            )}

            {first.can_apply_promo_code && (
              <div style={{ display: "flex", gap: "1rem", marginTop: "20px" }}>
                <input
                  className="form-control mb-3"
                  name="promo_code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  type="text"
                />

                <Button
                  style={{ height: "38px" }}
                  onClick={applyPromoCode}
                  disabled={loading}
                >
                  <span style={{ whiteSpace: "nowrap" }}>Apply code</span>
                </Button>
              </div>
            )}

            {first.promo_code && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  background: "#E8F6FF",
                  borderRadius: "8px",
                  padding: "16px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <div>Promo code applied:</div>
                  <b>
                    {first.promo_code.code} ({first.promo_code.discount}% OFF)
                  </b>
                </div>

                {first.can_apply_promo_code && (
                  <Button onClick={clearPromoCode} disabled={loading}>
                    Clear
                  </Button>
                )}
              </div>
            )}

            {showRemaining && (
              <div style={{ margin: "20px 0" }}>
                <b style={{ color: "red" }}>
                  You still need to complete payment for this order:
                </b>
                <div>
                  <span>Paid: </span>
                  <b>
                    {amountPaid}
                    <i className="fak fa-regular" />
                  </b>
                </div>
                <div>
                  <span>Remaining: </span>
                  <b>
                    {amountRemaining}
                    <i className="fak fa-regular" />
                  </b>
                </div>
              </div>
            )}
            {isPaymentComplete && (
              <div style={{ paddingTop: "20px" }}>
                <b style={{ color: "green" }}>
                  You've completed payment for this order.
                </b>
              </div>
            )}
          </div>

          {!isPaymentComplete && (
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noreferrer"
              style={{ pointerEvents: !loading ? "all" : "none" }}
            >
              <Button disabled={loading}>Checkout</Button>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
