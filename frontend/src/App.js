import './App.scss'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import axios from 'axios'
import { BiHomeHeart } from 'react-icons/bi'
import googleIcon from './images/google-icon.png'
import Home from './components/Home'
import About from './components/About'

function App() {
  const [user, setUser] = useState()
  const [status, setStatus] = useState()
  const url = "http://localhost:5000/api"

  const logout = () => { }

  return (
    <Router>
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
            <Link to='/doctors' className="nav-btn">
              Körzeti információk
            </Link>
            <Link to='/faq' className="nav-btn">
              Kérdések
            </Link>
            {
              !user &&

              <button className="login-btn">
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
              user && status === "admin" &&
              <Link to='/admin' className="nav-btn">Admin</Link>
            }
            {
              user &&
              <button onClick={logout} className="nav-btn logout-btn">Kijelentkezés</button>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        
        <Route path='/' exact>
          <Home url={url}></Home>
        </Route>

        <Route path='/about'>
          <About></About>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
