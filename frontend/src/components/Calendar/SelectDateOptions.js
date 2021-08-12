import React from 'react'
import { getNameofDay } from '../../DateHelperFunctions'


function SelectDateOptions({ freeDaysOfWeeks }) {

    return (
        <>
            <option value="none">
                Válasszon napot
            </option>
            {
                freeDaysOfWeeks[0].map(day =>
                    <option key={day} value={day}>
                        {day} ({getNameofDay(day)})
                    </option>)
            }
            <option value="none" disabled>--- Jövő hét ---</option>
            {
                freeDaysOfWeeks[1].map(day =>
                    <option key={day} value={day}>
                        {day} ({getNameofDay(day)})
                    </option>)
            }
            <option value="none" disabled>--- Két hét múlva ---</option>
            {
                freeDaysOfWeeks[2].map(day =>
                    <option key={day} value={day}>
                        {day} ({getNameofDay(day)})
                    </option>)
            }
            <option value="none" disabled>--- Három hét múlva ---</option>
            {
                freeDaysOfWeeks[3].map(day =>
                    <option key={day} value={day}>
                        {day} ({getNameofDay(day)})
                    </option>)
            }
        </>
    )
}

export default SelectDateOptions
