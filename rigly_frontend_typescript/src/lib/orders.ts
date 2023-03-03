import { get, post } from "../utils/fetch";
import { url } from "../utils/url";

export const getOrder = async (orderId: string) => {
  return await get(url(`/api/orders/${orderId}`));
};

export const createOrder = async (slug: string) => {
  return await post(url("/api/orders"), {
    slug,
  });
};

const Orders = {
  get: getOrder,
  create: createOrder,
};

export default Orders;
