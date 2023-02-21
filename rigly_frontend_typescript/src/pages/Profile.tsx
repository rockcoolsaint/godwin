import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserEditProfile from "../components/UserEditProfile";
import UserProfileContent from "../components/UserProfileContent";
import UserProfileHistory from "../components/UserProfileHistory";


import pro_img from '../images/user-tb-ic1.svg'
import pro_img2 from '../images/user-tb-ic2.svg'
import pro_img4 from '../images/user-tb-ic4.svg'
import pro_img5 from '../images/user-tb-ic5.svg'

export const ProfilePage = () => {
  const { user, getIdTokenClaims, logout } = useAuth0();

  const [profileData, setProfileData] = useState(null)
  const [profileHistory, setProfileHistory] = useState(null)

  useEffect(() =>{  
  getIdTokenClaims().then(async(data1: any) => {
      console.log(data1)
      if(data1.__raw){
      try {
        const response = await fetch('/api/profile/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data1.__raw,
          }
      });
        const data = await response.json();
        console.log(data);
        setProfileData(data.user)
        setProfileHistory(data.history)
        } catch(error) {
          console.log(error)
        } 
      }
    }
  )
}, [user, getIdTokenClaims])

const handleLogout = () => {
  logout({
  logoutParams: {
      returnTo: window.location.origin,
  },
  });
};
  return (
    <section className="user-profile-wrp">
    <div className="container">


    <Tab.Container id="left-tabs-example" defaultActiveKey="user-tb1">
      <Row>
        <Col sm={12} md={4} lg={3}>
        <div className="user-profiletabs">
          <Nav variant="tabs" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="user-tb1"><img src={pro_img} alt="" /> Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="user-tb2"><img src={pro_img2} alt="" /> Edit Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="user-tb4"><img src={pro_img4} alt="" /> Order History</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="#" onClick={handleLogout}><img src={pro_img5} alt="" /> Logout</Link>
            </Nav.Item>
          </Nav>
          </div>
        </Col>
        <Col sm={12} md={8} lg={9}>
          <Tab.Content>
            <Tab.Pane eventKey="user-tb1">
              <UserProfileContent data={profileData} userhistory={profileHistory} setData={setProfileData} />
            </Tab.Pane>
            <Tab.Pane eventKey="user-tb2">
              {profileData?
              <UserEditProfile data={profileData} setData={setProfileData} />
              : <></>}
            </Tab.Pane>
            <Tab.Pane eventKey="user-tb4">
              <UserProfileHistory userhistory={profileHistory} />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>

        {/* <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12">
                <div className="user-profiletabs">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link className="nav-link active" data-bs-toggle="tab" to="#user-tb1"><img src="images/user-tb-ic1.svg" alt="" /> Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="tab" to="#user-tb2"><img src="images/user-tb-ic2.svg" alt="" /> Edit Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="tab" to="#user-tb3"><img src="images/user-tb-ic3.svg" alt="" /> Settings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="tab" to="#user-tb4"><img src="images/user-tb-ic4.svg" alt="" /> Order History</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#"><img src="images/user-tb-ic5.svg" alt="" /> Logout</Link>
                        </li>
                    </ul>
                
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12">
                


                    <Tab.Container defaultActiveKey="user-tbs1">
                                    <Tab.Content>
                        
                            <Tab.Pane eventKey="user-tb1" title="Bids">
                                        <UserProfileContent />
                            </Tab.Pane>

                        <div className="tab-pane fade" id="user-tb2">
                            <div className="user-order">
                                <h3>Edit Profile</h3>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="user-tb3">
                            <div className="history-order">
                                <h3>Settings</h3>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="user-tb4">
                            <div className="history-order">
                                <h3>Order History</h3>

                                <div className="history-table">
                                    <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer"><div className="row"><div className="col-sm-12 col-md-6"></div><div className="col-sm-12 col-md-6"></div></div><div className="row"><div className="col-sm-12"><table id="example2" className="table table-striped dt-responsive dataTable no-footer dtr-inline" style={{width: "100%"}} aria-describedby="example2_info">
                                        <thead>
                                            <tr>
                                              <th className="sorting sorting_asc" aria-controls="example2" rowSpan={1} colSpan={1} style={{width: "0px"}} aria-sort="ascending" aria-label="Logo: activate to sort column descending">Logo</th>
                                              <th className="sorting" aria-controls="example2" rowSpan={1} colSpan={1} style={{width: "0px"}} aria-label="Name: activate to sort column ascending">Name</th><th className="sorting" aria-controls="example2" rowSpan={1} colSpan={1} style={{width: "0px"}} aria-label="Bid Date: activate to sort column ascending">Bid Date</th><th className="sorting" aria-controls="example2" rowSpan={1} colSpan={1} style={{width: "0px"}} aria-label="Bid Amount: activate to sort column ascending">Bid Amount</th><th className="sorting" aria-controls="example2" rowSpan={1} colSpan={1} style={{width: "0px"}} aria-label="Auction Date: activate to sort column ascending">Auction Date</th><th className="sorting" aria-controls="example2" rowSpan={1} colSpan={1} style={{width: "0px"}} aria-label="Status: activate to sort column ascending">Status</th></tr>
                                        </thead>
                                        <tbody>
                                            
                                            
                                        <tr className="odd">
                                                <td className="dtr-control sorting_1">
                                                    <div className="proimgbx">
                                                        <img src="images/pro-img1.png" alt="" />
                                                    </div>
                                                </td>
                                                <td>Whatsminer m20s</td>
                                                <td>10 Feb 2022</td>
                                                <td>$550.00</td>
                                                <td>20 Feb 2022</td>
                                                <td><label className="pending">Pending</label> <Link to="#"><img src="images/delet-ic.svg" alt="" /></Link></td>
                                            </tr><tr className="even">
                                                <td className="dtr-control sorting_1">
                                                    <div className="proimgbx">
                                                        <img src="images/pro-img2.png" alt="" />
                                                    </div>
                                                </td>
                                                <td>Whatsminer m20s</td>
                                                <td>10 Feb 2022</td>
                                                <td>$550.00</td>
                                                <td>20 Feb 2022</td>
                                                <td><label className="win">Win</label> <Link to="#"><img src="images/delet-ic.svg" alt="" /></Link></td>
                                            </tr></tbody>
                                    </table></div></div><div className="row"><div className="col-sm-12 col-md-5"><div className="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div></div><div className="col-sm-12 col-md-7"></div></div></div>
                                </div>
                            </div>
                        </div>
                        </Tab.Content>
                                          </Tab.Container>
                  
                </div>
            </div>
        </div> */}
    </div>
</section>
             

  );
};