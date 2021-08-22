import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../contexts/userContext'
import jwt_decode from "jwt-decode";
import api from '../api/createAxiosInstance'
import useLogin from '../hooks/useLogin'

function Login() {
    const { setUser, errorHandler} = useContext(UserContext)
    let history = useHistory()
    const {token} = useLogin(errorHandler)



    useEffect(() => {

        if (token) {
            localStorage.setItem('authorization', token)
            api.setTokenInAxiosHeader(token)
            const loggedInUser = jwt_decode(token)
            setUser(loggedInUser)
            history.push("/")
        }

    }, [token])

    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}

export default Login
