import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OrderPayment, OrderPaymentStatus } from "../types";
import Orders from "../lib/orders";
import Payments from "../lib/payments";

export default function CheckoutSuccess() {
  const [payment, setPayment] = useState<OrderPayment | undefined>(undefined);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const orderId = queryParams.get("order_id");

  useEffect(() => {
    const getPaymentStatus = async () => {
      if (!orderId) {
        return;
      }

      const order = await Orders.get(orderId);
      const payment = await Payments.get(order.payment);

      setPayment(payment);

      if (payment.status === OrderPaymentStatus.Processing) {
        setTimeout(getPaymentStatus, 5000);
      }
    };

    getPaymentStatus();
  }, [orderId]);

  if (!payment) {
    return (
      <div
        className="container"
        style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
      >
        Loading
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <h2>Checkout success</h2>

      <div className="flex">
        <p>Order ID: {payment.order_id}</p>
        <p>Payment ID: {payment.payment_id}</p>
        <p>Amount: {payment.amount}</p>
        <p>
          Status:{" "}
          {payment.status === OrderPaymentStatus.Processing && (
            <span style={{ color: "blue" }}>Processing</span>
          )}
          {payment.status === OrderPaymentStatus.Paid && (
            <span style={{ color: "green" }}>Paid</span>
          )}
        </p>
      </div>
    </div>
  );
}
