import React, { useState, useContext } from 'react'
import UserContext from '../../../contexts/userContext'
import useAppointments from '../../../hooks/useAppointments'
import useUsers from '../../../hooks/useUsers'

function AdminNewReservation({ setNewReservation, selectedTime }) {

    const { errorHandler, successHandler } = useContext(UserContext)
    const { postAppointment } = useAppointments(errorHandler, successHandler)
    const {users} = useUsers(errorHandler)

    const [selectedUser, setSelectedUser] = useState()
    const [childName, setChildName] = useState("")
    const [selectedEvent, setSelectedEvent] = useState("")


    const sendNewAppointment = async () => {
        const newAppointment = {
            userId: selectedUser.userId,
            userName: selectedUser.name,
            email: selectedUser.email,
            description: childName,
            event: selectedEvent,
            day: new Date(selectedTime.day),
            time: selectedTime.time
        }
        await postAppointment(newAppointment)
        setNewReservation(false)
    }

    return (
        <div className="edit-reservation">
            <h4>Új foglalás</h4>
            <p className="date">{`${selectedTime.day} (${selectedTime.time})`}</p>
            <div className="form">
                <select name="users" id="users"
                    onChange={(e) => setSelectedUser(users.find(user =>
                        user.userId === e.target.value))}>
                    {
                        users &&
                        users.map((user, i) =>
                            <option key={i} value={user.userId}>{user.name}</option>
                        )
                    }
                </select>
                <input type="text" name="child-name" id="child-name"
                    placeholder="Gyermek neve"
                    onChange={(e) => setChildName(e.target.value)} />
                <select name="event" id="event" onChange={(e) => setSelectedEvent(e.target.value)}>
                    <option value="none" selected>Esemény</option>
                    <option value="generale">Általános vizsgálat</option>
                    <option value="vaccination">Oltás</option>
                    <option value="pause">Szünet</option>
                </select>
            </div>
            <div className="buttons">
                <button className="admin-button save-btn"
                    disabled={selectedUser && childName && selectedEvent
                        ? false : true}
                    onClick={sendNewAppointment}>
                    Mentés
                </button>
                <button className="admin-button"
                    onClick={(e) => setNewReservation(false)}>
                    Mégse
                </button>
            </div>
        </div>
    )
}

export default AdminNewReservation
