export enum PaymentStatus {
  Processing = "processing",
  Paid = "paid",
}

export type AuctionPayment = {
  order_id: string;
  payment_id: string;
  price: number;
  fee: number;
  status: PaymentStatus;
};
