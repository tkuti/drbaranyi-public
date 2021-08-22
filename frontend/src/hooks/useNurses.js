import { useState, useEffect } from 'react'
import api from '../api/createAxiosInstance'

function useNurses ( errorHandler) {

    const [nurses, setNurses] = useState()


    const getNurses =  () =>
        api.getNurses()
            .then((res) => {
                setNurses(res.data)
            })
            .catch((err) => {
                errorHandler(err)
            })


    useEffect(() => {
        getNurses()
    }, [])



    return { nurses }
}

export default useNurses
