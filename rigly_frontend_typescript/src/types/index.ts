export enum OrderPaymentStatus {
  Processing = "processing",
  Paid = "paid",
}

export type OrderPayment = {
  order_id: string;
  payment_id: string;
  amount: number;
  status: OrderPaymentStatus;
  checkout_url: string;
};

export enum OrderStatus {
  Unpaid = "unpaid",
  PartiallyPaid = "partial",
  Paid = "paid",
}

export type Order = {
  auction: Object;
  price: number;
  total: number;
  mining_deposit: number;
  auction_fee: number;
  status: OrderStatus;
};
