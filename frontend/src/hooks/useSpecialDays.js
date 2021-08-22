import { useState } from 'react'
import api from '../api/createAxiosInstance'

function useSpecialDays(errorHandler, successHandler) {

    const [specialDay, setSpecialDay] = useState()
    const [specialDays, setSpecialDays] = useState()


    const getSpecialDay = (date) =>
        api.getSpecialDay(date)
            .then((res) => {
                res.data 
                ? setSpecialDay(res.data.newDay) 
                : setSpecialDay(null)
            })
            .catch((err) => {
                errorHandler(err)
            })

    const getSpecialDays = (startDate, endDate) =>
        api.getSpecialDays(startDate, endDate)
            .then((res) => {
                setSpecialDays(res.data)
            })
            .catch((err) => {
                errorHandler(err)
            })


    const postSpecialDay = async (specialDay) => {
        try {
            await api.postSpecialDay(specialDay)
            successHandler()
        } catch (err) {
            errorHandler(err)
        }
    }


    return { specialDay, getSpecialDay, specialDays, getSpecialDays, postSpecialDay }
}

export default useSpecialDays
