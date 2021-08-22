import { useState } from 'react'
import api from '../api/createAxiosInstance'

function useStreets(errorHandler, successHandler, setNewStreet ) {

    const [streets, setStreets] = useState()
    const [filteredStreets, setFilteredStreets] = useState()


    const getStreets = () =>

        api.getStreets()
            .then((res) => {
                const streets = [...res.data].sort((a, b) =>
                    a.kozterulet.localeCompare(b.kozterulet))
                setStreets(streets)
                setFilteredStreets(streets)
            })
            .catch((err) => {
                errorHandler(err)
            })


    const updateStreet = async (streetId, street) => {

        try {
            await api.updateStreet(streetId, street)
            successHandler()
        } catch (err) {
            errorHandler(err)
        }
    }

    const deleteStreet = async (streetId) => {
        try {
            await api.deleteStreet(streetId)
            successHandler()
        } catch (err) {
            errorHandler(err)
        }
    }

    const postStreet = async (street) => {
        try {
            await api.postStreet(street)
            setNewStreet(false)
            successHandler()
        } catch (err) {
            errorHandler(err)
        }
    }


    return { streets, filteredStreets, getStreets, updateStreet, deleteStreet, postStreet, setFilteredStreets}
}

export default useStreets
