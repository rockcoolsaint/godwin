// src/components/pages/account/OrderHistoryView.tsx
import React from 'react';
import { formatMoney } from 'src/utils/currency';

interface OrderHistoryProps {
  orders: {
    auction: {
      title: string;
      auction_meta: {
        hashrate: number;
        days_of_mining: number;
      };
    };
    price: number;
  }[];
}

const OrderHistoryView = ({ orders }: OrderHistoryProps) => {
  return (
    <section className="rounded-3 flow-root h-full rounded-xl border bg-gray-50 px-0 py-3 sm:px-4">
      <div className="border-1 rounded-xl bg-white p-2">
        <div className="border-b">
          <div className="flex items-center justify-between p-4">
            <h3 className="text-lg font-bold">Order History</h3>
          </div>
          <div className="px-4">
            {orders.map((order, index) => (
              <div key={index} className="border-b">
                <div className="flex items-center border-b py-3">
                  <span className="w-1/4 font-semibold">Auction</span>
                  <span className="w-3/4">{order.auction.title}</span>
                </div>
                <div className="flex items-center border-b py-3">
                  <span className="w-1/4 font-semibold">Price</span>
                  <span className="w-3/4">{formatMoney(order.price)} sats</span>
                </div>
                <div className="flex items-center border-b py-3">
                  <span className="w-1/4 font-semibold">Fee</span>
                  <span className="w-3/4">0%</span>
                </div>
                <div className="flex items-center border-b py-3">
                  <span className="w-1/4 font-semibold">Hashrate</span>
                  <span className="w-3/4">{formatMoney(order.auction.auction_meta.hashrate)} TH/s</span>
                </div>
                <div className="flex items-center border-b py-3">
                  <span className="w-1/4 font-semibold">Duration</span>
                  <span className="w-3/4">
                    {order.auction.auction_meta.days_of_mining} {order.auction.auction_meta.days_of_mining > 1 ? 'days' : 'day'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderHistoryView;
