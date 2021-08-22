import { useState } from 'react'
import api from '../api/createAxiosInstance'

function useNurses ( errorHandler, successHandler, setNewNurse) {

    const [nurses, setNurses] = useState()


    const getNurses =  () =>
        api.getNurses()
            .then((res) => {
                setNurses(res.data)
            })
            .catch((err) => {
                errorHandler(err)
            })

            
    const postNurse = async (nurse) => {
        try {
            await api.postNurse(nurse)
            setNewNurse(false)
            successHandler()
        } catch (err) {
            errorHandler(err)
        }
    }

    const updateNurse = async (nurseId, nurse) => {

        try {
            await api.updateNurse(nurseId, nurse)
            successHandler()
        } catch (err) {
            errorHandler(err)
        }
    }

    
    const deleteNurse = async (nurseId) => {
        try {
            await api.deleteNurse(nurseId)
            successHandler()
        } catch (err) {
            errorHandler(err)
        }
    }

    return { nurses, getNurses, postNurse, updateNurse, deleteNurse }
}

export default useNurses
