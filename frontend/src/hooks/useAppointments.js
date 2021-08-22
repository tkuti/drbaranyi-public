import { useState } from 'react'
import api from '../api/createAxiosInstance'

function useAppointments(errorHandler, successHandler) {

    const [appointments, setAppointments] = useState()
    const [appointmentsByUser, setAppointmentsByUser] = useState()
    const [reservedTimes, setReservedTimes] = useState()


    const getAppointments = (startDate, endDate) =>

        api.getAppointments(startDate, endDate)
            .then((res) => {
                const apps = res.data.map(app => {
                    return { ...app, day: app.day.slice(0, 10) } 
                })
                setAppointments(apps)
            })
            .catch((err) => {
                errorHandler(err)
            })


    const getAppointmentsByUser = (userId) =>

        api.getAppointmentsByUser(userId)
            .then((res) => {
                setAppointmentsByUser(res.data)
            })
            .catch((err) => {
                errorHandler(err)
            })


    const getReservedTimesByDate = (date) =>

        api.getReservedTimesByDate(date)
            .then((res) => {
                setReservedTimes(res.data)
            })
            .catch((err) => {
                errorHandler(err)
            })


    const postAppointment = async (appointment) => {
        try {
            await api.postAppointment(appointment)
            successHandler()
        } catch (err) {
            errorHandler(err)
        }
    }

    const deleteAppointment = async (appointmentId) => {
        try {
            await api.deleteAppointment(appointmentId)
            successHandler()
        } catch (err) {
            errorHandler(err)
        }
    }



    return { appointments, getAppointments,appointmentsByUser, getAppointmentsByUser, reservedTimes, getReservedTimesByDate, postAppointment, deleteAppointment }
}

export default useAppointments
