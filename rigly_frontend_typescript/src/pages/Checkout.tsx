import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { Order, OrderPayment } from "../types";
import Orders from "../lib/orders";
import Payments from "../lib/payments";
import usePayments from "../hooks/usePayments";

export default function Checkout() {
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [firstPayment, setFirstPayment] = useState<OrderPayment | undefined>(
    undefined
  );
  const [payments, setPayments] = useState<OrderPayment[]>([]);
  const [promoCode, setPromoCode] = useState<string | undefined>(undefined);
  const [promoCodeInput, setPromoCodeInput] = useState<string>("");

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
  } = usePayments(payments);

  const handleApplyPromoCode = () => {
    setPromoCode(promoCodeInput);
    setPromoCodeInput("");
    applyPromoCode();
  };

  const applyPromoCode = async () => {
    if (!firstPayment || !promoCode) {
      return;
    }

    try {
      const res = await Payments.applyPromoCode(
        firstPayment.id,
        promoCodeInput
      );

      setFirstPayment(res);

      const newPayments = [...payments];
      newPayments[0] = res;
      setPayments(newPayments);
    } catch (ex) {
      console.error(ex);
    }
  };

  const clearPromoCode = async () => {
    if (!firstPayment || !promoCode) {
      return;
    }

    try {
      const res = await Payments.clearPromoCode(firstPayment.id);

      setFirstPayment(res);

      const newPayments = [...payments];
      newPayments[0] = res;
      setPayments(newPayments);

      setPromoCode(undefined);
    } catch (ex) {
      console.error(ex);
    }
  };

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

  useEffect(() => {
    const prepareCheckout = async () => {
      if (!orderId) {
        return;
      }

      const order = await Orders.getById(orderId);
      const payments = await Payments.get(
        order.payments.map((payment: OrderPayment) => payment.payment_id)
      );

      const first = payments[0];

      setOrder(order);
      setFirstPayment(first);
      setPayments(payments);

      if (first.promo_code) {
        setPromoCode(first.promo_code.code);
      }
    };

    prepareCheckout();
  }, [orderId]);

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
              <span>Bid:</span>{" "}
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
              <span>Auction fee (3.5%):</span>{" "}
              <b>
                {order.auction_fee}
                <i className="fak fa-regular" />
              </b>
            </div>
            {first.promo_code && (
              <>
                <div>Discount: {first.promo_code.discount}%</div>
                <div>
                  <span>Total:</span>{" "}
                  <b>
                    {first.amount}
                    <i className="fak fa-regular" />
                  </b>
                </div>
              </>
            )}
            {!first.promo_code && (
              <div>
                <span>Total:</span>{" "}
                <b>
                  {order.total}
                  <i className="fak fa-regular" />
                </b>
              </div>
            )}
            {payments.length > 0 && !isPaymentComplete && (
              <div style={{ paddingTop: "20px" }}>
                <b style={{ color: "red" }}>
                  You still need to complete payment for this order:
                </b>
                <div>
                  <span>Paid:</span>{" "}
                  <b>
                    {amountPaid}
                    <i className="fak fa-regular" />
                  </b>
                </div>
                <div>
                  <span>Remaining:</span>{" "}
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

          {first.can_apply_promo_code && (
            <div style={{ display: "flex", gap: "1rem", marginTop: "20px" }}>
              <input
                className="form-control mb-3"
                name="promo_code"
                value={promoCodeInput}
                onChange={(e) => setPromoCodeInput(e.target.value)}
                type="text"
              />

              <Button
                style={{ height: "38px" }}
                onClick={() => handleApplyPromoCode()}
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
                <Button onClick={clearPromoCode}>Clear</Button>
              )}
            </div>
          )}

          {!isPaymentComplete && (
            <a href={checkoutUrl} target="_blank" rel="noreferrer">
              <Button>Checkout</Button>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
