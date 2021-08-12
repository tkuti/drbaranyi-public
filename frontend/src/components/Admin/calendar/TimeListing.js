import React from 'react'
import { FaInfoCircle } from 'react-icons/fa'

function AdminTimeListing ({weekday, i, time, index, focus, isReserved, isInactive, setSelectedTime, setNewReservation, setDisplayReservation}) {

    return (
        <div key={index} className={
            !isReserved(weekday, time.time)
                ? "time-line"
                : isReserved(weekday, time.time).event === "vaccination"
                    ? "time-line vaccination"
                    : isReserved(weekday, time.time).event === "generale"
                        ? "time-line generale"
                        : "time-line pause"
        }>
            <p className="time">{time.time}</p>
            {
                focus === i
                && <>
                    <p className="description">
                        {
                            isReserved(weekday, time.time) &&
                            isReserved(weekday, time.time).description
                        }
                    </p>
                    <button className={
                        isInactive(weekday)
                            ? "inactive info-button"
                            : "info-button"
                    }
                        onClick={() => {
                            setSelectedTime({ day: weekday, time: time.time })
                            if (isReserved(weekday, time.time)) {
                                setNewReservation(false)
                                setDisplayReservation(true)
                            } else {
                                setDisplayReservation(false)
                                setNewReservation(true)
                            }
                        }}
                    >
                        <FaInfoCircle></FaInfoCircle>
                    </button>
                </>
            }
        </div>
    )
}

export default AdminTimeListing
