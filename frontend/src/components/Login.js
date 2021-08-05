import React, { useEffect, useContext  } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import UrlContext from '../contexts/urlContext'

function Login({checkToken}) {
    let history = useHistory()
    const url = useContext(UrlContext)

    useEffect(() => {
        const windowUrl = new URL(window.location.href)
        const code = windowUrl.searchParams.get('code')
        axios
            .post(`${url}/login`, { code })
            .then((res) => {
                localStorage.setItem('authorization', res.data.authorization)
                history.push("/")
                checkToken()
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}

export default Login
