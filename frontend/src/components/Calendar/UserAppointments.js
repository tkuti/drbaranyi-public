import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import UserContext from '../../contexts/userContext'
import UrlContext from '../../contexts/urlContext'
import { getNameofDay } from '../../api/DateHelperFunctions'


function UserAppointments() {
    const { user, error401Handler } = useContext(UserContext)
    const url = useContext(UrlContext)
    const [userAppointments, setUserAppointments] = useState()
    const [response, setResponse] = useState(false)
    const [error, setError] = useState(false)

    const types = { vaccination: "Oltás", generale: "Általános vizsgálat" }


    useEffect(() => {
        axios
            .get(`${url}/appointments/${user.userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `${localStorage.getItem('authorization')}`,
                    },
                })
            .then((res) => {
                setUserAppointments(res.data)
            })
            .catch((err) => {
                setError(err.response.data.msg)
                error401Handler(err)
            })
    }, [response])


    const deleteAppointment = (appointment) => {
        axios.delete(`${url}/appointments/${appointment._id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`,
                }
            }
        )
            .then((res) => {
                setResponse(res.data.msg)
                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
            .catch((err) => {
                setError(err.response.data.msg)
                error401Handler(err)
            })
    }

    return (
        <>
            {
                userAppointments &&
                userAppointments.map(app =>
                    <div className="card-box user-appointment"
                        key={app._id}>
                        <div className="details">
                            <span>
                                {types[app.event]} - {app.description}
                            </span>
                            <span className="date">
                                {app.day.slice(0, 10)}
                                ({getNameofDay(app.day)}) -
                                {app.time}
                            </span>
                        </div>
                        <button className="button"
                            onClick={() => deleteAppointment(app)}
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
            {
                response &&
                <div className="res-msg res-msg-success">
                    {response}
                </div>
            }
            {
                error && 
                <div className="res-msg res-msg-error">
                    {error}
                </div>
            }
        </>
    )
}

export default UserAppointments
