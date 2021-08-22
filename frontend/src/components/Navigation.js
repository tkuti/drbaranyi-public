import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { BiHomeHeart } from 'react-icons/bi'
import googleIcon from '../images/google-icon.png'

import UserContext from '../contexts/userContext'

function Navigation() {
    const {user, logout} = useContext(UserContext)

    const googleSignIn = () => {
        window.location.href =
          `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&prompt=select_account&client_id=${process.env.REACT_APP_GOOGLE_CLIENT}&scope=openid%20profile email&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT}`
      }


    return (
        <Navbar variant="dark" expand="lg" className="navb" fixed="top" >
            <Navbar.Brand>
                <Link to='/' className="logo">
                    <BiHomeHeart className="icon"></BiHomeHeart>
                    Főoldal
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" id="toggle" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav>
                    <Link to='/about' className="nav-btn">
                        Rólam
                    </Link>
                    <Link to='/infos' className="nav-btn">
                        Körzeti információk
                    </Link>
                    <Link to='/faq' className="nav-btn">
                        Kérdések
                    </Link>
                    {
                        !user &&

                        <button className="login-btn"
                            onClick={googleSignIn}>
                            <img src={googleIcon} alt="google-icon" className="icon" />
                            Bejelentkezés
                        </button>

                    }
                    {
                        user &&
                        <>
                            <Link to='/messages' className="nav-btn">
                                Üzenetek
                            </Link>
                            <Link to='/calendar' className="nav-btn">
                                Időpontfoglalás
                            </Link>
                        </>
                    }
                    {
                        user && user.role === "admin" &&
                        <Link to='/admin' className="nav-btn">Admin</Link>
                    }
                    {
                        user &&
                        <button onClick={logout} className="nav-btn logout-btn">Kijelentkezés</button>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation
