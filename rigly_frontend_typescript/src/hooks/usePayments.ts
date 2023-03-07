import { OrderPayment, OrderPaymentStatus } from "../types";

function getAmountRemaining(payments: OrderPayment[]) {
  if (payments.length === 0) {
    return 0;
  }

  if (payments.length === 1) {
    const first = payments[0];

    return first.status === OrderPaymentStatus.Paid ? 0 : first.amount;
  }

  const last = payments[payments.length - 1];

  return last.status === OrderPaymentStatus.Paid ? 0 : last.amount;
}

function getAmountPaid(payments: OrderPayment[]) {
  if (payments.length === 0) {
    return 0;
  }

  if (payments.length === 1) {
    const first = payments[0];

    return first.status === OrderPaymentStatus.Paid ? first.amount : 0;
  }

  const first = payments[0];
  const last = payments[payments.length - 1];

  return last.status === OrderPaymentStatus.Paid
    ? first.original_amount
    : first.original_amount - last.amount;
}

export default function usePayments(payments: OrderPayment[]) {
  if (!payments) {
    return {};
  }

  const first = payments.length > 0 ? payments[0] : undefined;
  const last = payments.length > 1 ? payments[payments.length - 1] : undefined;

  const amountPaid = getAmountPaid(payments);
  const amountRemaining = getAmountRemaining(payments);

  const isPaymentComplete = last
    ? last.status === OrderPaymentStatus.Paid
    : first
    ? first.status === OrderPaymentStatus.Paid
    : false;

  const checkoutUrl = last
    ? last.checkout_url
    : first
    ? first.checkout_url
    : undefined;

  const paymentId = last
    ? last.payment_id
    : first
    ? first.payment_id
    : undefined;

  return {
    first,
    last,
    amountPaid,
    amountRemaining,
    isPaymentComplete,
    paymentId,
    checkoutUrl,
  };
}
