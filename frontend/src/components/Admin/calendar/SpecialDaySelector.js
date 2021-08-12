import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import UrlContext from '../../../contexts/urlContext'

function SpecialDaySelector ({ weekday, isInactive, setNewSpecialDay }) {
    
    const [newDay, setNewDay] = useState(false)
    const url = useContext(UrlContext)
    const [error, setError] = useState(false)

    useEffect(() => {
        axios
            .get(`${url}/special-days/${weekday}`, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`,
                }
            })
            .then((res) => {
                res.data ? setNewDay(res.data.newDay) : setNewDay(null)
                
            })
    }, []) 


    const postSpecialDay = (newDay, type) => {
        const newSpecialDay = {
            day: new Date(weekday),
            type: type ? "inactive" : "active",
            newDay: newDay
        }

        axios.post(`${url}/special-days`, newSpecialDay,
        {
            headers: {
                'Content-Type': 'application/json',
                authorization: `${localStorage.getItem('authorization')}`,
            }
        })
            .then((res) => {
                setNewSpecialDay(Date.now())
            })
            .catch((err) => {
                setError(err.response.data.msg)
            })
    }

    return (
        <div key={newDay} className="special-day-select">
            <select name="newDay" id="newDay"
                defaultValue={newDay}
                onChange={(e) => 
                postSpecialDay(e.target.value, isInactive(weekday))}>
                <option value="none">-</option>
                <option value="Hétfő">Hétfő</option>
                <option value="Kedd">Kedd</option>
                <option value="Szerda">Szerda</option>
                <option value="Csütörtök">Csütörtök</option>
                <option value="Péntek1">Péntek(1)</option>
                <option value="Péntek2">Péntek(2)</option>
            </select>
            {
                    error &&
                    <div className="res-msg res-msg-error">
                        {error}
                    </div>
                }
        </div>
    )
}

export default SpecialDaySelector
