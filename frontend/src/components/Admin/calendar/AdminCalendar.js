import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import NewReservation from './NewReservation'
import DisplayReservation from './DisplayReservation'
import SpecialDaySelector from './SpecialDaySelector'
import TimeListing from './TimeListing'
import { AiTwotoneEdit, AiOutlineEdit } from 'react-icons/ai'
import UrlContext from '../../../contexts/urlContext'
import { getACertainFullWeek, getWeekNumber } from '../../../api/DateHelperFunctions'


function AdminCalendar() {

    const nameOfDays = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"]
    const [consultingHours, setConsultingHours] = useState()
    const [appointments, setAppointments] = useState()
    const [specialDays, setSpecialDays] = useState()
    const [actualWeek, setActualWeek] = useState()
    const [response, setResponse] = useState(false)
    const [error, setError] = useState(false)

    const [focus, setFocus] = useState(new Date().getDay() - 1)
    const [relativeDate, setRelativeDate] = useState(new Date())

    const [newReservation, setNewReservation] = useState(false)
    const [displayReservation, setDisplayReservation] = useState(false)
    const [newSpecialDay, setNewSpecialDay] = useState()

    const [selectedTime, setSelectedTime] = useState()
    const url = useContext(UrlContext)


    useEffect(() => {
        axios
            .get(`${url}/consulting-hours`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `${localStorage.getItem('authorization')}`,
                    },
                })
            .then((res) => {
                setConsultingHours(res.data)
                setActualWeek(getACertainFullWeek(new Date()))
            })
            .catch((err) => {
                setError(err.response.data.msg)
            })
    }, [])


    useEffect(() => {

        actualWeek &&
            axios
                .get(`${url}/special-days/${actualWeek[0]}/${actualWeek[6]}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `${localStorage.getItem('authorization')}`,
                        },
                    })
                .then((res) => {
                    setSpecialDays(res.data)
                })
    }, [actualWeek, response, newSpecialDay])


    useEffect(() => {
        actualWeek &&
            axios
                .get(`${url}/appointments/byInterval/${actualWeek[0]}/${actualWeek[6]}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `${localStorage.getItem('authorization')}`,
                        },
                    }
                )
                .then((res) => {
                    const apps = res.data.map(app => app.day.length > 10 ? { ...app, day: app.day.slice(0, 10) } : app)
                    setAppointments(apps)
                })
    }, [actualWeek, newReservation, displayReservation])


    const postSpecialDay = (day, type) => {
        const newSpecialDay = {
            day: new Date(day),
            type: type,
            newDay: isSpecialDay(day)
        }
        axios.post(`${url}/special-days`, newSpecialDay,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`,
                },
            })
            .then((res) => {
                setResponse(res.data.success)
                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
    }


    const isReserved = (date, time) => {
        if (appointments.length > 0) {
            const reservedTime = appointments.find(app =>
                app.day === date && app.time === time)
            if (!reservedTime) {
                return false
            } else {
                return reservedTime
            }
        }
        return false
    }

    const isInactive = (date) => {
        return ((actualWeek.indexOf(date) === 5
            || actualWeek.indexOf(date) === 6)
            && specialDays.findIndex(specDay =>
                specDay.day.slice(0, 10) === date
                && specDay.type === "active") < 0
        )
            || specialDays.findIndex(specDay =>
                specDay.day.slice(0, 10) === date
                && specDay.type === "inactive") >= 0
    }

    const isSpecialDay = (date) => {
        const specialDay = specialDays.find(specDay =>
            specDay.day.slice(0, 10) === date)
        if (specialDay && specialDay.newDay) {
            return specialDay.newDay
        } else {
            return null
        }
    }

    const weekPaging = (actual, newRelative) => {
        setRelativeDate(newRelative);
        setActualWeek(getACertainFullWeek(actual))
        setDisplayReservation(false)
        setNewReservation(false)
    }

    return (

        <div className="admin-calendar">
            <Row>
                <Col sm={12} lg={3} >
                    <div className="nav-btns">
                        <button className="admin-button"
                            onClick={() => {
                                weekPaging(relativeDate,
                                    new Date(relativeDate.setDate(relativeDate.getDate() - 7)))
                            }}>
                            Előző hét
                        </button>
                        <button className="admin-button"
                            onClick={() => {
                                weekPaging(new Date(), new Date())
                            }}>
                            Ma
                        </button>
                        <button className="admin-button"
                            onClick={() => {
                                weekPaging(relativeDate,
                                    new Date(relativeDate.setDate(relativeDate.getDate() + 7)))
                            }}>
                            Következő hét
                        </button>
                    </div>
                    <hr />
                    {
                        newReservation &&
                        <NewReservation
                            setNewReservation={setNewReservation}
                            selectedTime={selectedTime}
                            setResponse={setResponse}
                        ></NewReservation>
                    }
                    {
                        displayReservation &&
                        <DisplayReservation
                            setDisplayReservation={setDisplayReservation}
                            selectedTime={selectedTime}
                            selectedEvent={appointments.find(app =>
                                app.day === selectedTime.day
                                && app.time === selectedTime.time)}
                            setResponse={setResponse}
                        ></DisplayReservation>
                    }
                </Col>
                <Col sm={12} lg={9} className="calendar-box">
                    {
                        actualWeek && specialDays &&
                        actualWeek.map((weekday, i) =>
                            <div id={focus === i ? "focus" : ""}
                                className={
                                    isInactive(weekday)
                                        ? "day inactive"
                                        : "day"
                                }
                                key={weekday}>
                                <p className="date">
                                    {
                                        focus === i
                                            ? weekday
                                            : weekday.split("-")[2]
                                    }
                                </p>
                                <div className="btns">
                                    <button onClick={() => setFocus(i)}
                                        className={
                                            isInactive(weekday)
                                                ? "inactive admin-button"
                                                : "admin-button"
                                        }>
                                        {nameOfDays[i]}
                                    </button>
                                    {
                                        focus === i
                                        && <button className={
                                            isInactive(weekday)
                                                ? "inactive admin-button"
                                                : "admin-button"
                                        }>
                                            {
                                                isInactive(weekday)
                                                    ? <AiOutlineEdit></AiOutlineEdit>
                                                    : <AiTwotoneEdit></AiTwotoneEdit>
                                            }
                                            <input type="checkbox" name="inactive" id="inactive"
                                                checked={
                                                    isInactive(weekday)
                                                        ? false
                                                        : true}
                                                onChange={(e) => e.target.checked
                                                    ? postSpecialDay(weekday, "active")
                                                    : postSpecialDay(weekday, "inactive")
                                                } />
                                        </button>
                                    }
                                </div>
                                {
                                    focus === i && consultingHours && appointments && i === 5
                                    && <SpecialDaySelector
                                        weekday={weekday}
                                        isInactive={isInactive}
                                        setNewSpecialDay={setNewSpecialDay}>
                                    </SpecialDaySelector>
                                }
                                <hr />
                                <div className="time-container">

                                    {
                                        consultingHours &&
                                        appointments &&
                                        consultingHours.filter(day =>
                                            isSpecialDay(weekday)
                                                ? day.name === isSpecialDay(weekday)
                                                : i !== 4
                                                    ? day.name === nameOfDays[i]
                                                    : getWeekNumber(new Date(weekday)) % 2 === 1
                                                        ? day.name === "Péntek1"
                                                        : day.name === "Péntek2"
                                        )
                                            .map((day) =>
                                                day.hours.map((time, index) =>
                                                    <TimeListing
                                                        weekday={weekday}
                                                        i={i}
                                                        time={time}
                                                        index={index}
                                                        focus={focus}
                                                        isReserved={isReserved}
                                                        isInactive={isInactive}
                                                        setSelectedTime={setSelectedTime}
                                                        setNewReservation={setNewReservation}
                                                        setDisplayReservation={setDisplayReservation}>
                                                    </TimeListing>
                                                )
                                            )
                                    }
                                </div>
                            </div>
                        )
                    }
                </Col>
            </Row>
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
        </div>
    )
}

export default AdminCalendar
