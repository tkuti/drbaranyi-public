import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DisplayWarningMessages from '../DisplayWarningMessages'
import CalendarText from './CalendarText'
import SelectDateOptions from './SelectDateOptions'
import UserAppointments from './UserAppointments'
import UserContext from '../../contexts/userContext'
import useConsultingHours from '../../hooks/useConsultingHours'
import useSpecialDays from '../../hooks/useSpecialDays'
import useAppointments from '../../hooks/useAppointments'
import { getNext3Weeks, getWeekNumber, setHoursAndMinutes, getNameofDay } from '../../api/DateHelperFunctions'


function Calendar() {

    const { user, errorHandler, successHandler } = useContext(UserContext)
    const { consultingHours } = useConsultingHours(errorHandler)
    const { specialDays, getSpecialDays } = useSpecialDays(errorHandler)

    const { reservedTimes, getReservedTimesByDate, postAppointment } = useAppointments(errorHandler, successHandler)

    const [actualWeeks, setActualWeeks] = useState()
    const [freeDaysOfWeeks, setFreeDaysOfWeeks] = useState()
    const [freeTimesOfDay, setFreeTimesOfDay] = useState()

    const [selectedEvent, setSelectedEvent] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [description, setDescription] = useState("")

    const [newBooking, setNewBooking] = useState(false)

    const types = { vaccination: "Oltás", generale: "Általános vizsgálat" }


    useEffect(() => {
        setActualWeeks(getNext3Weeks())
    }, [])


    useEffect(() => {
        if (actualWeeks) {
            const startDate = actualWeeks[0][0]
            const endDate = actualWeeks[3][5]
            getSpecialDays(startDate, endDate)
        }
    }, [actualWeeks, selectedEvent])


    useEffect(() => {

        if (selectedEvent && actualWeeks) {
            const createDate = (stringDate) => {
                return new Date(stringDate.slice(0, 10)).getTime()
            }

            let arrayOfAvailableDays = actualWeeks.map(week =>
                //filter out the inactive days
                week.filter(day =>
                    specialDays.findIndex(specDay =>
                        createDate(specDay.day) === createDate(day)
                        && specDay.type === "inactive") < 0
                )
                    //filter out Saturdays that not active
                    .filter(day => new Date(day).getDay() === 6
                        ? specialDays.findIndex(specDay =>
                            createDate(specDay.day) === createDate(day)
                            && specDay.type === "active") >= 0
                        : true))

            if (selectedEvent === "vaccination") {
                setFreeDaysOfWeeks(arrayOfAvailableDays.map(week =>
                    week.filter(day =>
                        new Date(day).getDay() === 2
                        || new Date(day).getDay() === 3
                        || new Date(day).getDay() === 4)))
            } else {
                setFreeDaysOfWeeks(arrayOfAvailableDays)
            }
        }
    }, [selectedEvent])


    useEffect(() => {
        if (selectedDate) {
            getReservedTimesByDate(selectedDate)
        }
    }, [selectedDate])


    useEffect(() => {

        if (selectedDate && reservedTimes) {


            //set all consulting hours of the selected date
            let hoursOfSelectedDate

            if (new Date(selectedDate).getDay() === 6) {
                hoursOfSelectedDate = consultingHours.filter(day =>
                    day.name === specialDays.find(specDay => specDay.day.includes(selectedDate)).newDay)
            } else {
                hoursOfSelectedDate = consultingHours.filter(day =>
                    day.name.includes(getNameofDay(selectedDate)))
            }

            //filter to the selected event - check if Friday is odd or even
            let times;
            if (hoursOfSelectedDate.length === 1) {
                times = hoursOfSelectedDate[0].hours
                    .filter(obj => obj.type === selectedEvent)
                    .map(obj => obj.time)
            } else {
                if (getWeekNumber(new Date(selectedDate)) % 2 === 1) {
                    times = hoursOfSelectedDate[0].hours
                        .filter(obj => obj.type === selectedEvent)
                        .map(obj => obj.time)
                } else {
                    times = hoursOfSelectedDate[1].hours
                        .filter(obj => obj.type === selectedEvent)
                        .map(obj => obj.time)
                }
            }

            //filter out the reserved times
            const freeTimes = times.filter(time =>
                reservedTimes.findIndex(t => t === time) < 0
                && setHoursAndMinutes(selectedDate, time) > new Date())
            setFreeTimesOfDay(freeTimes)
        }
    }, [reservedTimes])


    const sendNewAppointment = async () => {

        const newAppointment = {
            userId: user.userId,
            userName: user.name,
            email: user.email,
            description: description,
            event: selectedEvent,
            day: new Date(selectedDate),
            time: selectedTime
        }

        await postAppointment(newAppointment)

        setNewBooking(false)
        setSelectedEvent("")
        setSelectedDate("")
        setSelectedTime("")
        setDescription("")
    }


    return (
        <>
            <div id="background-color4" className="background"></div>
            <Container className="calendar">
                <DisplayWarningMessages type="calendar" />
                <hr />
                <Row>
                    <Col sm={12} lg={6}>
                        <CalendarText />
                    </Col>
                    <Col sm={12} lg={6}>
                        <div className="booking card-box">
                            {
                                !newBooking
                                    ?
                                    <button className="button"
                                        onClick={() => setNewBooking(true)}>
                                        Új foglalás
                                    </button>
                                    : <>
                                        <p>{types[selectedEvent]}</p>
                                        {
                                            selectedDate &&
                                            <p className="date">
                                                {selectedDate}&nbsp;
                                                ({getNameofDay(selectedDate)})&nbsp;
                                                {selectedTime}</p>
                                        }
                                        {
                                            !selectedEvent &&
                                            <select name="event" id="event"
                                                defaultValue="none"
                                                onChange={(e) =>
                                                    setSelectedEvent(e.target.value)}>
                                                <option value="none">
                                                    Válasszon eseményt
                                                </option>
                                                <option value="vaccination">
                                                    Oltás
                                                </option>
                                                <option value="generale">
                                                    Általános vizsgálat
                                                </option>
                                            </select>
                                        }
                                        {
                                            selectedEvent && !selectedDate && freeDaysOfWeeks &&
                                            <select name="date" id="date"
                                                defaultValue="none"
                                                onChange={(e) =>
                                                    setSelectedDate(e.target.value)}>
                                                <SelectDateOptions freeDaysOfWeeks={freeDaysOfWeeks} />
                                            </select>
                                        }
                                        {
                                            selectedDate && !selectedTime &&
                                            <select name="time" id="time"
                                                defaultValue="none"
                                                onChange={(e) => setSelectedTime(e.target.value)}>
                                                <option value="none">Válasszon időpontot</option>
                                                {
                                                    freeTimesOfDay &&
                                                    freeTimesOfDay.map(time =>
                                                        <option key={time} value={time}>
                                                            {time}
                                                        </option>)
                                                }
                                            </select>
                                        }
                                        {
                                            selectedTime &&
                                            <>
                                                <input type="text"
                                                    placeholder={selectedEvent === "Oltás"
                                                        ? "Gyerek neve és a kért oltás"
                                                        : "Gyerek neve"}
                                                    onChange={(e) =>
                                                        setDescription(e.target.value)} />
                                                <button className="button"
                                                    disabled={description.length > 3
                                                        ? false : true}
                                                    onClick={sendNewAppointment}>
                                                    Foglalás
                                                </button>
                                            </>
                                        }
                                        <button className="button"
                                            onClick={() => {
                                                setNewBooking(false);
                                                setSelectedEvent("");
                                                setSelectedDate("");
                                                setSelectedTime("");
                                                setDescription("")
                                            }}>
                                            Mégse
                                        </button>
                                    </>
                            }
                        </div>
                        {
                            !newBooking &&
                            <UserAppointments />
                        }
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default Calendar
