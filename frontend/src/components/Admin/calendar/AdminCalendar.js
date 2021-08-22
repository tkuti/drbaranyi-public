import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NewReservation from './NewReservation'
import DisplayReservation from './DisplayReservation'
import SpecialDaySelector from './SpecialDaySelector'
import TimeListing from './TimeListing'
import { AiTwotoneEdit, AiOutlineEdit } from 'react-icons/ai'
import UserContext from '../../../contexts/userContext'
import { getACertainFullWeek, getWeekNumber } from '../../../api/DateHelperFunctions'
import useConsultingHours from '../../../hooks/useConsultingHours'
import useSpecialDays from '../../../hooks/useSpecialDays'
import useAppointments from '../../../hooks/useAppointments'


function AdminCalendar() {

    const {errorHandler, successHandler } = useContext(UserContext)
    const {consultingHours} = useConsultingHours(errorHandler)
    const {specialDays, getSpecialDays, postSpecialDay} = useSpecialDays(errorHandler,successHandler)
    const {appointments, getAppointments} = useAppointments(errorHandler, successHandler)
    const [actualWeek, setActualWeek] = useState()

    const [focus, setFocus] = useState(new Date().getDay() - 1)
    const [relativeDate, setRelativeDate] = useState(new Date())
    
    const [newReservation, setNewReservation] = useState(false)
    const [displayReservation, setDisplayReservation] = useState(false)

    
    const [selectedTime, setSelectedTime] = useState()
    const nameOfDays = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"]


    useEffect(() => {
        setActualWeek(getACertainFullWeek(new Date()))
    }, [])


    useEffect(() => {

        if (actualWeek) {
            getSpecialDays(actualWeek[0], actualWeek[6])
        }

    }, [actualWeek])


    useEffect(() => {
        
        if (actualWeek) {
            getAppointments(actualWeek[0], actualWeek[6])
        }
        
    }, [actualWeek, newReservation, displayReservation])


    const sendSpecialDay = async (day, type) => {
        const specialDay = {
            day: new Date(day),
            type: type,
            newDay: isSpecialDay(day)
        }
        await postSpecialDay(specialDay)
        getSpecialDays(actualWeek[0], actualWeek[6])
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
                                                    ? sendSpecialDay(weekday, "active")
                                                    : sendSpecialDay(weekday, "inactive")
                                                } />
                                        </button>
                                    }
                                </div>
                                {
                                    focus === i && consultingHours && appointments && i === 5
                                    && <SpecialDaySelector
                                        weekday={weekday}
                                        isInactive={isInactive}
                                        actualWeek={actualWeek}
                                        getSpecialDays={getSpecialDays}>
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
                                                        key={index}
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
        </div>
    )
}

export default AdminCalendar
