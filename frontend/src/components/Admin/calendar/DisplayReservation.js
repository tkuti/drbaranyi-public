import React, { useContext } from 'react'
import axios from 'axios'
import UrlContext from '../../../contexts/urlContext'

function DisplayReservation({ setDisplayReservation, selectedTime, selectedEvent, setResponse }) {

    const url = useContext(UrlContext)

    const types = { vaccination: "Oltás", generale: "Általános vizsgálat", pause: "Szünet" }

    const deleteAppointment = () => {
        axios.delete(`${url}/appointments/${selectedEvent._id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`,
                }
            }
        )
            .then((res) => {
                setResponse(res.data.msg)
                setDisplayReservation(false)
                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
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
                        onClick={deleteAppointment}>
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
