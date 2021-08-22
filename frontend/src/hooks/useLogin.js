import { useState, useEffect } from 'react'
import api from '../api/createAxiosInstance'


function useLogin (errorHandler) {

    const [token, setToken] = useState("")
    

    useEffect(() => {
        api.login()
        .then((res) => setToken(res.data.authorization))
        .catch((err) => {
            errorHandler(err)
        })
    }, [])


    return { token }
}

export default useLogin
