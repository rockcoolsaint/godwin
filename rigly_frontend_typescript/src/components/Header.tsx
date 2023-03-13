import React from "react";
import { useState, useEffect } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useAuth0 } from "@auth0/auth0-react";

import Announcement from "./Announcement";
import { Link } from "react-router-dom";

import Logo from "../images/logo.svg";
import { get } from "../utils/fetch";
import { url } from "../utils/url";

const Header = () => {
  const [stickyClass, setStickyClass] = useState<string>("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // fetchData();
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  // interface headerData {
  //     annoucement_message: string,
  //     header_logo: string
  // }

  const [profileData, setProfileData] = useState({ bidding_name: "" });

  // const fetchData = async () => {
  //   const response = await fetch("/api/header/")
  //   const returnData = await response.json()
  //   console.log(returnData[0])
  //   setData(returnData)
  // }

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 150 ? setStickyClass("nav-new") : setStickyClass("");
    }
  };

  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
    isLoading,
    getIdTokenClaims,
  } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  useEffect(() => {
    if (isLoading || !isAuthenticated) {
      return;
    }
    getIdTokenClaims().then(async (data1: any) => {
      console.log(data1);
      if (data1.__raw) {
        try {
          const data = await get(url("/api/profile"), {
            Authorization: "Bearer " + data1.__raw,
          });

          setProfileData(data.user);
        } catch (error) {
          console.log(error);
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          });
        }
      }
    });
  }, [isLoading, isAuthenticated, getIdTokenClaims, logout]);

  return (
    <>
      <Announcement message="Appropriately foster efficient ideas after go forward alignments. Monotonectally." />
      <header className={stickyClass}>
        <div className="container">
          <Navbar
            collapseOnSelect
            expanded={expanded}
            expand="md"
            variant="light"
          >
            <Navbar.Brand href="/">
              <img src={Logo} alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              onClick={() => setExpanded(expanded ? false : true)}
            />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Item>
                  <Link
                    onClick={() => setExpanded(false)}
                    className="nav-link"
                    to="/"
                  >
                    Home
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    className="nav-link"
                    onClick={() => setExpanded(false)}
                    to="/collections"
                  >
                    Collections
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    onClick={() => setExpanded(false)}
                    className="nav-link"
                    to="/individuals"
                  >
                    Individuals
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    className="nav-link"
                    onClick={() => setExpanded(false)}
                    to="/businesses"
                  >
                    Businesses
                  </Link>
                </Nav.Item>
                {/* <Nav.Item>
                    <Nav.Link href="/">Developers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/">Company</Nav.Link>
                </Nav.Item> */}

                {isAuthenticated ? (
                  <Nav.Item>
                    <Link
                      className="nav-link"
                      onClick={() => setExpanded(false)}
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </Nav.Item>
                ) : (
                  <></>
                )}

                <Nav.Item className="text-center">
                  <Nav.Link
                    style={{ visibility: isLoading ? "hidden" : "visible" }}
                    href="#"
                    onClick={!isAuthenticated ? handleLogin : handleLogout}
                    className="order-btn"
                  >
                    {" "}
                    {!isAuthenticated ? "Sign up" : "Logout"}
                  </Nav.Link>
                  <small>
                    {profileData && isAuthenticated
                      ? profileData.bidding_name
                      : ""}
                  </small>
                  {isAuthenticated ? (
                    ""
                  ) : (
                    <small>
                      Already have an account?{" "}
                      <span
                        onClick={handleLogin}
                        className="text-primary"
                        role="button"
                      >
                        Sign In
                      </span>
                    </small>
                  )}
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
    </>
  );
};

export default Header;
