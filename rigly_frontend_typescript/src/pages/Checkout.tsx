import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Order, OrderPayment } from "../types";
import Button from "react-bootstrap/Button";

import Orders from "../lib/orders";
import Payments from "../lib/payments";
import { put } from "../utils/fetch";
import { url } from "../utils/url";

export default function Checkout() {
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [payment, setPayment] = useState<OrderPayment | undefined>(undefined);
  const [promoCodeInput, setPromoCodeInput] = useState<string | undefined>(
    undefined
  );
  const [promoCode, setPromoCode] = useState<string | undefined>(undefined);
  const [discount, setDiscount] = useState<number>(0);
  const [discountedTotal, setDiscountedTotal] = useState<number>(0);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const orderId = queryParams.get("order_id");

  const applyPromoCode = async () => {
    const update = await put(url("/api/orders/update"), {
      order_id: orderId,
      promo_code: promoCode,
    });

    setDiscount(update.discount);
    setDiscountedTotal(update.amount);
    setPayment({
      ...payment,
      checkout_url: update.checkout_url,
    } as OrderPayment);
  };

  useEffect(() => {
    if (promoCode === undefined) {
      return;
    }

    applyPromoCode();
  }, [promoCode]);

  useEffect(() => {
    const prepareCheckout = async () => {
      if (!orderId) {
        return;
      }

      const order = await Orders.get(orderId);
      const payment = await Payments.get(order.payment);

      setOrder(order);
      setPayment(payment);
    };

    prepareCheckout();
  }, [orderId]);

  return (
    <div
      className="container"
      style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <h2>Checkout</h2>

      {order && payment && (
        <div>
          <div>
            <div>PaymentID: {payment.payment_id}</div>
            <div>
              Auction fee: {order.auction_fee}
              <i className="fak fa-regular" />
            </div>
            <div>
              Mining deposit: {order.mining_deposit}
              <i className="fak fa-regular" />
            </div>
            <div>
              Price: {order.price}
              <i className="fak fa-regular" />
            </div>
            {discount > 0 && (
              <>
                <div>Discount: {discount}%</div>
                <div>
                  Total: {discountedTotal}
                  <i className="fak fa-regular" />
                </div>
              </>
            )}
            {discount === 0 && (
              <div>
                Total: {order.total}
                <i className="fak fa-regular" />
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              className="form-control mb-3"
              name="promo_code"
              onChange={(e) => setPromoCodeInput(e.target.value)}
              type="text"
            />

            <Button
              style={{ height: "38px" }}
              onClick={() => setPromoCode(promoCodeInput)}
            >
              <span style={{ whiteSpace: "nowrap" }}>Apply code</span>
            </Button>
          </div>

          <a href={payment.checkout_url} target="_blank" rel="noreferrer">
            <Button>Checkout</Button>
          </a>
        </div>
      )}
    </div>
  );
}
