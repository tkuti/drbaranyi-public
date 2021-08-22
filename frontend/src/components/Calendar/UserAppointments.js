import React, { useEffect, useContext } from 'react'
import UserContext from '../../contexts/userContext'
import { getNameofDay } from '../../api/DateHelperFunctions'
import useAppointments from '../../hooks/useAppointments'


function UserAppointments() {
    const { user, errorHandler, successHandler } = useContext(UserContext)
    const {appointmentsByUser, 
        getAppointmentsByUser, 
        deleteAppointment} = useAppointments(errorHandler, successHandler)

    const types = { vaccination: "Oltás", generale: "Általános vizsgálat" }


    useEffect(() => {
        getAppointmentsByUser(user.userId)
    }, [])


    const handleDeleteButton = async (appointment) => {
        await deleteAppointment(appointment._id)
        getAppointmentsByUser(user.userId)
    }

    return (
        <>
            {
                appointmentsByUser &&
                appointmentsByUser.map(app =>
                    <div className="card-box user-appointment"
                        key={app._id}>
                        <div className="details">
                            <span>
                                {types[app.event]} - {app.description}
                            </span>
                            <span className="date">
                                {app.day.slice(0, 10)}&nbsp;
                                ({getNameofDay(app.day)}) -&nbsp;
                                {app.time}
                            </span>
                        </div>
                        <button className="button"
                            onClick={() => handleDeleteButton(app)}
                            disabled={
                                new Date(app.day.slice(0, 10)) < new Date()
                                    ? true
                                    : false
                            }>
                            Lemondás
                        </button>
                    </div>
                )
            }
        </>
    )
}

export default UserAppointments
