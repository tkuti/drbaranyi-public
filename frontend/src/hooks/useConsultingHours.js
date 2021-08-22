import { useState, useEffect } from 'react'
import api from '../api/createAxiosInstance'

function useConsultingHours (errorHandler) {

    const [consultingHours, setConsultingHours] = useState()


    const getConsultingHours = () =>
        api.getConsultingHours()
            .then((res) => {
                setConsultingHours(res.data)
            })
            .catch((err) => {
                errorHandler(err)
            })


    useEffect(() => {
        getConsultingHours()
    }, [])


    return { consultingHours }
}

export default useConsultingHours
