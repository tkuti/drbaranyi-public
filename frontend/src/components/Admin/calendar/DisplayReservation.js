import React, { useContext } from 'react'
import UserContext from '../../../contexts/userContext'
import useAppointments from '../../../hooks/useAppointments'

function DisplayReservation({ setDisplayReservation, selectedTime, selectedEvent}) {

    const {errorHandler, successHandler } = useContext(UserContext)
    const {deleteAppointment} = useAppointments(errorHandler, successHandler)

    const types = { vaccination: "Oltás", generale: "Általános vizsgálat", pause: "Szünet" }

    const handleDeleteButton = async () => {
        await deleteAppointment(selectedEvent._id)
        setDisplayReservation(false)
    }

    return (
        <div className="edit-reservation">
            <h4>Foglalás megtekintése</h4>
            <p className="date">{`${selectedTime.day}
             (${selectedTime.time})`}</p>
            <div>
                <div className="event-details">
                    <p>{selectedEvent.userName}</p>
                    <p>{selectedEvent.email}</p>
                    <p>{selectedEvent.description}</p>
                    <p>{types[selectedEvent.event]}</p>
                </div>
                <div className="buttons">
                    <button className="admin-button delete-btn"
                        onClick={handleDeleteButton}>
                        Törlés
                    </button>
                    <button className="admin-button"
                        onClick={(e) =>
                            setDisplayReservation(false)}>
                        Mégse
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DisplayReservation
