import { Link, useNavigate } from "react-router-dom";
import usePayments from "../hooks/usePayments";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
};

export default function UserProfileHistoryItem({ data }: { data: any }) {
  const navigate = useNavigate();

  const { amountPaid, auctionFee, miningDeposit } = usePayments(data.order);

  return (
    <tr
      className="odd"
      onClick={(e) => navigate("/product/" + data.auction_list.slug_category)}
    >
      <td className="dtr-control sorting_1">
        <div className="proimgbx">
          <img src={data.auction_list.auction_meta.site_photo} alt="" />
        </div>
      </td>
      <td>{data.auction_list.title}</td>
      <td>{formatDate(new Date(data.auction_list.created_at))}</td>
      <td>{formatDate(new Date(data.auction_list.expiry_at))}</td>
      <td>
        <span className={data.auction_list.user_auction_status}>
          {data.auction_list.user_auction_status.toUpperCase()}
        </span>
      </td>
      <td className="numeric">
        <span>
          {data.bid} <i className="fak fa-regular" />
        </span>
      </td>
      <td className="numeric">
        <span>
          {miningDeposit} <i className="fak fa-regular" />
        </span>
      </td>
      <td className="numeric">
        <span>
          {auctionFee} <i className="fak fa-regular" />
        </span>
      </td>
      <td className="numeric">
        <span>
          {amountPaid} <i className="fak fa-regular" />
        </span>
      </td>
    </tr>
  );
}
