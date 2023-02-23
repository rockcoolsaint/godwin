import React from 'react'
import { useState, useEffect } from 'react';


import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useAuth0 } from "@auth0/auth0-react";

import Announcement from './Announcement'
import Loader from './Loader';
import { Link } from 'react-router-dom';


const Header = () => {
    const [stickyClass, setStickyClass] = useState<string>("");

    useEffect(() => {
        fetchData();
        window.addEventListener('scroll', stickNavbar);

        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    interface headerData {
        annoucement_message: string,
        header_logo: string
    }

    const [data, setData] = useState<headerData[]>([]);
    const[profileData ,setProfileData] = useState({"username":""})

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


    const { loginWithRedirect,isAuthenticated,logout, isLoading, getIdTokenClaims  } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
        appState: {
            returnTo: "/payment",
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


    useEffect(()=>{
    if(isLoading || !isAuthenticated){
        return
    }
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
          } catch(error) {
            console.log(error)
            logout({
                logoutParams: {
                    returnTo: window.location.origin,
                },
            });
          } 
        }
      })

    },[isLoading, isAuthenticated, getIdTokenClaims, logout])


  return (

    <>
        {data[0]?.annoucement_message?(<Announcement message={data[0]?.annoucement_message} />):(<></>)}
        {data[0]?.header_logo?
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
                    <Link className='nav-link' to="/">Home</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className='nav-link' to="/collections">Collections</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className='nav-link' to="/individuals">Individuals</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className='nav-link' to="/businesses">Businesses</Link>
                </Nav.Item>
                {/* <Nav.Item>
                    <Nav.Link href="/">Developers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/">Company</Nav.Link>
                </Nav.Item> */}

                {isAuthenticated? <Nav.Item>
                    <Link className='nav-link' to="/profile">Profile</Link>
                </Nav.Item>:<></>}
                
                <Nav.Item className='text-center'>
                    <Nav.Link style={{ visibility: isLoading? 'hidden': 'visible'}} href="#" onClick={ !isAuthenticated?(handleLogin):(handleLogout)} className='order-btn'> {!isAuthenticated ?"Sign up":"Logout"}</Nav.Link>
                   <small>{profileData&&isAuthenticated?profileData.username:""}</small>
                   {isAuthenticated?"":<small>Already have an account? <span onClick={(handleLogin)} className='text-primary'  role="button">Sign In</span></small>}
                </Nav.Item>
            </Nav>
            </Navbar.Collapse>
        </Navbar>

            </div>
        </header>:
        <Loader />
        }
    </>

    
  )
}

export default Header