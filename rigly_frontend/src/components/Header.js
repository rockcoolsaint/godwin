import React from 'react'
import logo from '../images/logo.svg'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useAuth0 } from "@auth0/auth0-react";


const Header = () => {
    const [stickyClass, setStickyClass] = useState(null);

    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);

        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

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

    

    <header  className={stickyClass}>
        <div className="container">


        <Navbar collapseOnSelect expand="md" variant="light">
        <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
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

            {/* <nav className="navbar navbar-expand-md navbar-light">
                <a className="navbar-brand" href="index.html">
                    <Link to="/">
                        
                    </Link>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/collections">Collections</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/individuals">Individuals</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/businesses">Businesses</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Developers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Company</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link order-btn" href="#">Sign up</a>
                        </li>
                    </ul>
                </div>
            </nav> */}
        </div>
    </header>
  )
}

export default Header