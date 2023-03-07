import { OrderPayment } from "../types";
import { get, put, post } from "../utils/fetch";
import { url } from "../utils/url";

export async function getPayments(paymentIds: string | string[]) {
  if (Array.isArray(paymentIds)) {
    return post(url("/api/payments"), { payment_ids: paymentIds });
  }

  return get(url(`/api/payments/${paymentIds}`));
}

export async function applyPromoCode(
  paymentId: number,
  promoCode: string
): Promise<OrderPayment> {
  const res = await put(url("/api/payments/update"), {
    payment_id: paymentId,
    promo_code: promoCode,
  });

  if (res.error) {
    throw res.error;
  }

  const payment = res as OrderPayment;

  return payment;
}

export async function clearPromoCode(paymentId: number): Promise<OrderPayment> {
  const res = await put(url("/api/payments/update"), {
    payment_id: paymentId,
    promo_code: null,
  });

  if (res.error) {
    throw res.error;
  }

  const payment = res as OrderPayment;

  return payment;
}

const Payments = {
  get: getPayments,
  applyPromoCode,
  clearPromoCode,
};

export default Payments;
