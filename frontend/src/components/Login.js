import React, { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function Login({url}) {
    let history = useHistory()

    useEffect(() => {
        const windowUrl = new URL(window.location.href)
        const code = windowUrl.searchParams.get('code')
        console.log(code)
        axios
            .post(`${url}/login`, { code })
            .then((res) => {
                localStorage.setItem('authorization', res.data.authorization)
                history.push("/")
                //checkToken()
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
