import './App.scss'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Navigation from './components/Navigation'
import Home from './components/Home'
import About from './components/About'
import Infos from './components/Infos'
import Login from './components/Login'
import jwt_decode from "jwt-decode";
import UserContext from './contexts/userContext'


function App() {
  const [user, setUser] = useState("")

  const checkToken = () => {
    const token = localStorage.getItem('authorization')
    if (token) {
      const loggedInUser = jwt_decode(token)
      setUser(loggedInUser)
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <Router>
      <UserContext.Provider value={[user, setUser]}>
        <Navigation />

        <Switch>
          <Route path='/' exact>
            <Home></Home>
          </Route>

          <Route path='/about'>
            <About></About>
          </Route>

          <Route path='/infos'>
            <Infos></Infos>
          </Route>

          <Route path='/login' >
            <Login checkToken={checkToken} />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
