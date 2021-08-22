import { useState, useEffect } from 'react'
import api from '../api/createAxiosInstance'

function useCheckToken () {

    const [user, setUser] = useState("")


    const checkJwtToken = () => {
        const token = localStorage.getItem('authorization')
        if (token) {
            api.checkJwtToken()
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                localStorage.removeItem('authorization')
                api.removeTokenFromAxiosHeader()
                setUser("")
            })
        }
    }
    

    useEffect(() => {
        checkJwtToken()
    }, [])


    return { user, setUser }
}

export default useCheckToken
