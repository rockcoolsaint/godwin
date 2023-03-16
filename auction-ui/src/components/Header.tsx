import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { useAuth0 } from '@auth0/auth0-react'

import Announcement from './Announcement'
import Loader from './Loader'

const Header = () => {
  const [stickyClass, setStickyClass] = useState<string>('')

  useEffect(() => {
    fetchData()
    window.addEventListener('scroll', stickNavbar)

    return () => {
      window.removeEventListener('scroll', stickNavbar)
    }
  }, [])

  interface headerData {
    annoucement_message: string
    header_logo: string
  }

  const [data, setData] = useState<headerData[]>([])

  const fetchData = async () => {
    const response = await fetch('/api/header/')
    const returnData = await response.json()
    setData(returnData)
  }

  const stickNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY
      windowHeight > 150 ? setStickyClass('nav-new') : setStickyClass('')
    }
  }

  const { loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0()

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/payment',
      },
    })
  }

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
  }

  return (
    <>
      {data[0]?.annoucement_message ? <Announcement message={data[0]?.annoucement_message} /> : <></>}
      {data[0]?.header_logo ? (
        <header className={stickyClass}>
          <div className="container">
            <Navbar collapseOnSelect expand="md" variant="light">
              <Navbar.Brand href="/">
                <Image src={data[0]?.header_logo} alt="Logo" />
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
                  <Link href="/collections">Collections</Link>
                  {/* <Nav.Item>
                    <Nav.Link href="/">Developers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/">Company</Nav.Link>
                </Nav.Item> */}

                  <Nav.Item>
                    <Nav.Link
                      style={{ visibility: isLoading ? 'hidden' : 'visible' }}
                      href="#"
                      onClick={!isAuthenticated ? handleLogin : handleLogout}
                      className="order-btn"
                    >
                      {' '}
                      {!isAuthenticated ? 'Sign up' : 'Logout'}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </header>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Header
