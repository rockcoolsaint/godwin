import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { put } from "../utils/fetch";
import { url } from "../utils/url";
import { userProps } from "./interfaces";
import Loader from "./Loader";
import ToastAlert from "./Toast";
interface Props {
  data: userProps | null;
  setData: React.Dispatch<React.SetStateAction<null>>;
}
const UserEditProfile = ({ data, setData }: Props) => {
  const { getIdTokenClaims } = useAuth0();
  const [first_name, setFirstName] = useState(data?.first_name);
  //   const [last_name, setLastName] = useState(data?.last_name)
  const [bidding_name, setBiddingName] = useState(data?.bidding_name);
  //   const [username, setUsername] = useState(data?.username)
  const [email, setEmail] = useState(data?.email);
  const [referral, setReferral] = useState(data?.referral_code);
  //const [phone_number, setPhoneNumber] = useState(data?.phone_number)
  const [mining_pool_username, setMiningPoolUsername] = useState(
    data?.mining_pool_username
  );
  const [telegram_username, setTelegramUserName] = useState(
    data?.telegram_username
  );
  const [mining_pool_stratum_address, setMiningPoolStratumAddress] = useState(
    data?.mining_pool_stratum_address
  );
  // const [address, setAddress] = useState(data?.address)
  const [showAlert, setShowAlert] = useState(false);

  if (!data) {
    return <Loader />;
  }
  const handleSubmit = () => {
    getIdTokenClaims().then(async (data1: any) => {
      console.log(data1);
      if (data1.__raw) {
        try {
          const result = await put(
            url("/api/profile/"),
            {
              first_name: first_name,
              bidding_name: bidding_name,
              email: email,
              username: data?.username,
              mining_pool_username: mining_pool_username,
              telegram_username: telegram_username,
              mining_pool_stratum_address: mining_pool_stratum_address,
              referral_code: referral,
            },
            {
              Authorization: "Bearer " + data1.__raw,
            }
          );
          setData(result);
          console.log(result);
          setShowAlert(true);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="user-order">
      {showAlert ? (
        <ToastAlert
          title="Alert"
          description="Saved Successfully"
          show_toast={showAlert}
        />
      ) : (
        <></>
      )}
      <h3>Edit Profile</h3>
      <Form>
        <Row>
          <Col sm={12} md={6} lg={6}>
            <label>First Name</label>
            <input
              className="form-control mb-3"
              name="first_name"
              onChange={(e) => setFirstName(e.target.value)}
              defaultValue={first_name}
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <label>Email</label>
            <input
              className="form-control mb-3"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
            />
          </Col>
          {/* <Col sm={12} md={6} lg={6}>
                <label>Last Name</label>
                <input className="form-control mb-3" name='last_name' onChange={(e) => setLastName(e.target.value)} defaultValue={last_name} />
            </Col> */}
        </Row>
        <Row>
          <Col sm={12} md={6} lg={6}>
            <label>Bidding Name</label>
            <input
              className="form-control mb-3"
              name="bidding_name"
              onChange={(e) => setBiddingName(e.target.value)}
              type="text"
              defaultValue={bidding_name}
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <label>Telegram Username</label>
            <input
              className="form-control mb-3"
              name="telegram_username"
              onChange={(e) => setTelegramUserName(e.target.value)}
              type="text"
              defaultValue={telegram_username}
            />
          </Col>
        </Row>
        {/* <Row>
            
            <Col sm={12} md={6} lg={6}>
                <label>Mobile</label>
                <input className="form-control mb-3" name='phone_number' onChange={(e) => setPhoneNumber(e.target.value)} type="text" defaultValue={phone_number} />
            </Col>
        </Row> */}
        <Row>
          <Col sm={12} md={6} lg={6}>
            <label>Mining Pool Username</label>
            <input
              className="form-control mb-3"
              name="mining_pool_username"
              onChange={(e) => setMiningPoolUsername(e.target.value)}
              defaultValue={mining_pool_username}
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <label>Mining Pool Stratum Address</label>
            <textarea
              className="form-control mb-3"
              onChange={(e) => setMiningPoolStratumAddress(e.target.value)}
              defaultValue={mining_pool_stratum_address}
              name="mining_pool_stratum_address"
            ></textarea>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6} lg={6}>
            <label>Referral Code</label>
            <input
              className="form-control mb-3"
              name="referral_code"
              onChange={(e) => setReferral(e.target.value)}
              defaultValue={referral}
            />
          </Col>
        </Row>
        {/* <Row>
            
            <Col sm={12} md={6} lg={6}>
                <label>Address</label>
                <textarea className="form-control mb-3" onChange={(e) => setAddress(e.target.value)} defaultValue={address} name='address'></textarea>
            </Col>
            
        </Row> */}
        <Row className="text-center">
          <Button type="button" onClick={handleSubmit}>
            Save
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default UserEditProfile;
