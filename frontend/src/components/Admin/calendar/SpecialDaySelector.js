import React, { useEffect, useContext } from 'react'
import UserContext from '../../../contexts/userContext'
import useSpecialDays from '../../../hooks/useSpecialDays'

function SpecialDaySelector({ weekday, isInactive, actualWeek, getSpecialDays }) {

    const { errorHandler, successHandler } = useContext(UserContext)
    const { specialDay, getSpecialDay, postSpecialDay } = useSpecialDays(errorHandler, successHandler)


    useEffect(() => {
        getSpecialDay(weekday)
    }, [])


    const sendSpecialDay = async (newDay, type) => {
        const newSpecialDay = {
            day: new Date(weekday),
            type: type ? "inactive" : "active",
            newDay: newDay
        }
        await postSpecialDay(newSpecialDay)
        getSpecialDays(actualWeek[0], actualWeek[6])
    }

    return (
        <div key={specialDay} className="special-day-select">
            <select name="newDay" id="newDay"
                defaultValue={specialDay}
                onChange={(e) =>
                    sendSpecialDay(e.target.value, isInactive(weekday))}>
                <option value="none">-</option>
                <option value="Hétfő">Hétfő</option>
                <option value="Kedd">Kedd</option>
                <option value="Szerda">Szerda</option>
                <option value="Csütörtök">Csütörtök</option>
                <option value="Péntek1">Péntek(1)</option>
                <option value="Péntek2">Péntek(2)</option>
            </select>
        </div>
    )
}

export default SpecialDaySelector
