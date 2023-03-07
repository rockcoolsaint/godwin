import { get, post } from "../utils/fetch";
import { url } from "../utils/url";

export const getById = async (orderId: string) => {
  return await get(url(`/api/orders?order_id=${orderId}`));
};

export const getByAuctionId = async (auctionId: number) => {
  return await get(url(`/api/orders?auction_id=${auctionId}`));
};

export const create = async (slug: string) => {
  return await post(url("/api/orders"), {
    slug,
  });
};

const Orders = {
  getById,
  getByAuctionId,
  create,
};

export default Orders;
