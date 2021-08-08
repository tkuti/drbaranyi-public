import './App.scss'
import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Navigation from './components/Navigation'
import Home from './components/Home'
import About from './components/About'
import Infos from './components/Infos'
import Login from './components/Login'
import UserContext from './contexts/userContext'
import UrlContext from './contexts/urlContext'


function App() {
  const [user, setUser] = useState("")
  const url = useContext(UrlContext)

  const checkToken = () => {
    const token = localStorage.getItem('authorization')
    if (token) {
      axios.get(`${url}/token`)
      .then(res => setUser(res.data))
      .catch(err => {
        console.log(err.response.data.msg)
        localStorage.removeItem('authorization')
      })
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
            <Login />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
