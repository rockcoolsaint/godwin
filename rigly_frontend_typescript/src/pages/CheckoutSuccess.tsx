import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuctionPayment, PaymentStatus } from "../types";

export default function CheckoutSuccess() {
  const [payment, setPayment] = useState<AuctionPayment | undefined>(undefined);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const orderId = queryParams.get("order_id");

  useEffect(() => {
    const getPaymentStatus = async () => {
      const res = await fetch(
        "https://localhost:8000" + "/api/payments/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: orderId,
          }),
        }
      );

      const data = await res.json();
      const payment = data as AuctionPayment;

      setPayment(payment);

      if (payment.status === PaymentStatus.Processing) {
        setTimeout(getPaymentStatus, 5000);
      }
    };

    getPaymentStatus();
  }, [orderId]);

  if (!payment) {
    return <div>Loading</div>;
  }

  return (
    <div className="container">
      <h2>Checkout success</h2>

      <div className="flex">
        <p>Order ID: {payment.order_id}</p>
        <p>Payment ID: {payment.payment_id}</p>
        <p>Price: {payment.price}</p>
        <p>Fee: {payment.fee}</p>
        <p>
          Status:{" "}
          {payment.status === PaymentStatus.Processing && (
            <span style={{ color: "blue" }}>Processing</span>
          )}
          {payment.status === PaymentStatus.Paid && (
            <span style={{ color: "green" }}>Paid</span>
          )}
        </p>
      </div>
    </div>
  );
}
