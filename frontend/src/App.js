import './App.scss'
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import About from './components/About'
import Infos from './components/Infos'
import Faq from './components/Faq'
import Login from './components/Login'
import Messages from './components/Messages'
import Calendar from './components/Calendar/Calendar'
import Admin from './components/Admin'
import UserContext from './contexts/userContext'
import api from './api/createAxiosInstance'
import useCheckToken from './hooks/useCheckToken'


function App() {
  const { user, setUser } = useCheckToken()
  const [successNotification, setSuccessNotification] = useState(false)
  const [errorNotification, setErrorNotification] = useState(false)



  const successHandler = () => {
    setSuccessNotification("Sikeres mentés!")
    setTimeout(() => {
      setSuccessNotification(false)
    }, 2000)
  }

  const errorHandler = (err) => {
    console.log(err)
   if (err?.response || false) {
      setErrorNotification(err.response.data.msg)
      setTimeout(() => {
        setErrorNotification("")
      }, 2000)
    }
    if (err?.response?.status === 401 || false) {
      logout()
    }
  }

  const logout = () => {
    localStorage.removeItem('authorization')
    api.removeTokenFromAxiosHeader()
    setUser("")
  }


  return (
    <Router>
      <UserContext.Provider value={{ user, setUser, successHandler, errorHandler, logout }}>
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

          <Route path='/faq'>
            <Faq></Faq>
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

          <Route path='/calendar'>
            {
              user
                ? <Calendar />
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
      {
        successNotification &&
        <div className="res-msg res-msg-success">
          {successNotification}
        </div>
      }
      {
        errorNotification &&
        <div className="res-msg res-msg-error">
          {errorNotification}
        </div>
      }
    </Router>
  );
}

export default App;
