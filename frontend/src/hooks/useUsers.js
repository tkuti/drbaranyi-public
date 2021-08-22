import { useState, useEffect } from 'react'
import api from '../api/createAxiosInstance'

function useUsers (errorHandler) {

    const [users, setUsers] = useState()


    const getUsers = () =>
        api.getUsers()
            .then((res) => {
                setUsers(res.data)
            })
            .catch((err) => {
                errorHandler(err)
            })


    useEffect(() => {
        getUsers()
    }, [])


    return { users }
}

export default useUsers
