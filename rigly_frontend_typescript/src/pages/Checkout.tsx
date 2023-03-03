import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Order, OrderPayment } from "../types";

import Orders from "../lib/orders";
import Payments from "../lib/payments";

export default function Checkout() {
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [payment, setPayment] = useState<OrderPayment | undefined>(undefined);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const orderId = queryParams.get("order_id");

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
            <div>payment_id: {payment.payment_id}</div>
            <div>fee: {order.fee}</div>
            <div>price: {order.price}</div>
            <div>total: {order.total}</div>
          </div>

          <a href={payment.checkout_url} target="_blank" rel="noreferrer">
            <button>Checkout</button>
          </a>
        </div>
      )}
    </div>
  );
}
