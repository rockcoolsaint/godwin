import { userHistory } from "./interfaces";
import UserProfileHistoryItem from "./UserProfileHistoryItem";

interface Props {
  userhistory: userHistory[] | null;
}

const UserProfileHistory = ({ userhistory }: Props) => {
  return (
    <div className="history-order">
      <h3>Recent Bidding History</h3>

      <div className="history-table">
        <div
          id="example_wrapper"
          className="dataTables_wrapper dt-bootstrap5 no-footer"
        >
          <div className="row">
            <div className="col-sm-12 col-md-6"></div>
            <div className="col-sm-12 col-md-6"></div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <table
                id="example"
                className="table table-striped dt-responsive dataTable no-footer dtr-inline"
                style={{ width: "100%" }}
                aria-describedby="example_info"
              >
                <thead>
                  <tr>
                    <th
                      className="sorting sorting_asc"
                      aria-controls="example"
                      rowSpan={1}
                      colSpan={1}
                      style={{ width: "56px" }}
                      aria-sort="ascending"
                      aria-label="Logo: activate to sort column descending"
                    >
                      Logo
                    </th>
                    <th
                      className="sorting"
                      aria-controls="example"
                      rowSpan={1}
                      colSpan={1}
                      style={{ width: "170px" }}
                      aria-label="Name: activate to sort column ascending"
                    >
                      Name
                    </th>
                    <th
                      className="sorting"
                      aria-controls="example"
                      rowSpan={1}
                      colSpan={1}
                      style={{ width: "102px" }}
                      aria-label="Auction Date: activate to sort column ascending"
                    >
                      Auction period
                    </th>
                    <th
                      className="sorting"
                      aria-controls="example"
                      rowSpan={1}
                      colSpan={1}
                      style={{ width: "119px" }}
                      aria-label="Status: activate to sort column ascending"
                    >
                      Status
                    </th>
                    <th
                      className="sorting numeric"
                      aria-controls="example"
                      rowSpan={1}
                      colSpan={1}
                      style={{ width: "126px" }}
                      aria-label="Bid Amount: activate to sort column ascending"
                    >
                      Bid amount
                    </th>
                    <th
                      className="sorting numeric"
                      aria-controls="example"
                      rowSpan={1}
                      colSpan={1}
                      style={{ width: "119px" }}
                      aria-label="Status: activate to sort column ascending"
                    >
                      Mining deposit
                    </th>
                    <th
                      className="sorting numeric"
                      aria-controls="example"
                      rowSpan={1}
                      colSpan={1}
                      style={{ width: "119px" }}
                      aria-label="Status: activate to sort column ascending"
                    >
                      Auction fee
                    </th>
                    <th
                      className="sorting numeric"
                      aria-controls="example"
                      rowSpan={1}
                      colSpan={1}
                      style={{ width: "126px" }}
                      aria-label="Bid Amount: activate to sort column ascending"
                    >
                      Total price
                    </th>
                    <th
                      className="sorting numeric"
                      aria-controls="example"
                      rowSpan={1}
                      colSpan={1}
                      style={{ width: "119px" }}
                      aria-label="Status: activate to sort column ascending"
                    >
                      Received
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userhistory ? (
                    userhistory.map((data, idx) => {
                      return <UserProfileHistoryItem key={idx} data={data} />;
                    })
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-5">
              <div
                className="dataTables_info"
                id="example_info"
                role="status"
                aria-live="polite"
              >
                Showing 1 to 2 of 2 entries
              </div>
            </div>
            <div className="col-sm-12 col-md-7"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHistory;
