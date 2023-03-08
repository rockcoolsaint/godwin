import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserEditProfile from "../components/UserEditProfile";
import UserProfileContent from "../components/UserProfileContent";
import UserProfileHistory from "../components/UserProfileHistory";
import Orders from "../lib/orders";

import pro_img from "../images/user-tb-ic1.svg";
import pro_img2 from "../images/user-tb-ic2.svg";
import pro_img4 from "../images/user-tb-ic4.svg";
import pro_img5 from "../images/user-tb-ic5.svg";
import { Order } from "../types";

export const ProfilePage = () => {
  const {
    user,
    getIdTokenClaims,
    logout,
    loginWithRedirect,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  const [profileData, setProfileData] = useState(null);
  const [profileHistory, setProfileHistory] = useState(null);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const handleLogin = async () => {
      await loginWithRedirect({
        appState: {
          returnTo: "/profile",
        },
      });
    };
    if (!user) {
      handleLogin();
    }
    getIdTokenClaims().then(async (data1: any) => {
      console.log(data1);
      if (data1.__raw) {
        try {
          const response = await fetch(window.fetchUrl + "/api/profile/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + data1.__raw,
            },
          });

          const data = await response.json();

          // TODO: Refactor this, backend should have endpoint.
          const orders = await Promise.all(
            data.history.map((item: any) =>
              Orders.getByAuctionId(item.auction_list.id)
            )
          );

          const ordersByAuctionId: { [key: number]: Order } = {};
          orders.forEach((order) => {
            ordersByAuctionId[order.auction.id] = order;
          });

          const historyWithPayments = data.history.map((item: any) => {
            if (ordersByAuctionId.hasOwnProperty(item.auction_list.id)) {
              const order = ordersByAuctionId[item.auction_list.id];

              return {
                ...item,
                order,
              };
            }
            return item;
          });

          setProfileData(data.user);
          setProfileHistory(historyWithPayments);
        } catch (error) {
          console.log(error);
          handleLogin();
        }
      }
    });
  }, [user, getIdTokenClaims, loginWithRedirect, isLoading]);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  return (
    <section className="user-profile-wrp">
      {isAuthenticated ? (
        <div className="container">
          <Tab.Container id="left-tabs-example" defaultActiveKey="user-tb1">
            <Row>
              <Col sm={12} md={4} lg={3}>
                <div className="user-profiletabs">
                  <Nav variant="tabs" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="user-tb1">
                        <img src={pro_img} alt="" /> Profile
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="user-tb2">
                        <img src={pro_img2} alt="" /> Edit Profile
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="user-tb4">
                        <img src={pro_img4} alt="" /> Order History
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Link to="#" onClick={handleLogout}>
                        <img src={pro_img5} alt="" /> Logout
                      </Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </Col>
              <Col sm={12} md={8} lg={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="user-tb1">
                    <UserProfileContent
                      data={profileData}
                      userhistory={profileHistory}
                      setData={setProfileData}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="user-tb2">
                    {profileData ? (
                      <UserEditProfile
                        data={profileData}
                        setData={setProfileData}
                      />
                    ) : (
                      <></>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="user-tb4">
                    <UserProfileHistory userhistory={profileHistory} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};
