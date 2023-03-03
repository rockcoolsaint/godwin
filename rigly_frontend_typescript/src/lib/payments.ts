import { get } from "../utils/fetch";
import { url } from "../utils/url";

export async function getPayment(paymentId: string) {
  return get(url(`/api/payments/${paymentId}`));
}

const Payments = {
  get: getPayment,
};

export default Payments;
