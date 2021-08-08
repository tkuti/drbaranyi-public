import React, { useEffect, useContext  } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import UrlContext from '../contexts/urlContext'
import UserContext from '../contexts/userContext'
import jwt_decode from "jwt-decode";

function Login() {
    let history = useHistory()
    const url = useContext(UrlContext)
    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
        const windowUrl = new URL(window.location.href)
        const code = windowUrl.searchParams.get('code')
        axios
            .post(`${url}/login`, { code })
            .then((res) => {
                const token = res.data.authorization
                localStorage.setItem('authorization', token)
                const loggedInUser = jwt_decode(token)
                history.push("/")
                setUser(loggedInUser)
            })
            .catch(err => console.log(err.response.data.msg))
    }, [])

    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}

export default Login
