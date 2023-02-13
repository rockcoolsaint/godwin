import React from 'react'
import logo from '../images/logo.svg'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useAuth0 } from "@auth0/auth0-react";

import Announcement from './Announcement'


const Header = () => {
    const [stickyClass, setStickyClass] = useState(null);

    useEffect(() => {
        fetchData();
        window.addEventListener('scroll', stickNavbar);

        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    const [data, setData] = useState([]);

    const fetchData = async () => {
      const response = await fetch("/api/header/")
      const returnData = await response.json()
      console.log(returnData[0])
      setData(returnData)
    }

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            windowHeight > 150 ? setStickyClass('nav-new') : setStickyClass('');
        }
    };


    const { loginWithRedirect,isAuthenticated,logout, isLoading  } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
        appState: {
            returnTo: "/profile",
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


  return (

    <>
        {data[0]?.annoucement_message?(<Announcement message={data[0]?.annoucement_message} />):(<></>)}
        <header  className={stickyClass}>
            <div className="container">


            <Navbar collapseOnSelect expand="md" variant="light">
            <Navbar.Brand href="/">
                <img src={data[0]?.header_logo} alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/collections">Collections</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/individuals">Individuals</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/businesses">Businesses</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/">Developers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/">Company</Nav.Link>
                </Nav.Item>
                
                <Nav.Item>
                    <Nav.Link style={{ visibility: isLoading? 'hidden': 'visible'}} href="#" onClick={ !isAuthenticated?(handleLogin):(handleLogout)} className='order-btn'> {!isAuthenticated ?"Sign up":"Logout"}</Nav.Link>
                </Nav.Item>
            </Nav>
            </Navbar.Collapse>
        </Navbar>

            </div>
        </header>
    </>

    
  )
}

export default Header