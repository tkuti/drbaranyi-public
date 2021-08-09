import './App.scss'
import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import Navigation from './components/Navigation'
import Home from './components/Home'
import About from './components/About'
import Infos from './components/Infos'
import Login from './components/Login'
import Messages from './components/Messages'
import Admin from './components/Admin'
import UserContext from './contexts/userContext'
import UrlContext from './contexts/urlContext'


function App() {
  const [user, setUser] = useState("")
  const url = useContext(UrlContext)

  const checkToken = () => {
    const token = localStorage.getItem('authorization')
    if (token) {
      axios.get(`${url}/token`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `${localStorage.getItem('authorization')}`
          },
        })
        .then(res => setUser(res.data))
        .catch(err => {
          localStorage.removeItem('authorization')
          setUser()
        })
    }
  }

  const error401Handler = (err) => {
    if (err.response.status === 401) {
      setTimeout(() => {
        localStorage.removeItem('authorization')
        setUser("")
      }, 2000)
    }
  }


  useEffect(() => {
    checkToken()
  }, [])

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser, error401Handler }}>
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

          <Route path='/messages'>
            {
              user
                ? <Messages />
                : <Redirect push to="/" />
            }
          </Route>

          <Route path='/admin'>
            {
              user && user.role === "admin"
                ? <Admin />
                : <Redirect push to="/" />
            }
          </Route>

        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
