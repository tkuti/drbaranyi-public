import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import UrlContext from '../../../contexts/urlContext'

function AdminNewReservation({ setNewReservation, selectedTime, setResponse }) {

    const [users, setUsers] = useState()
    const [selectedUser, setSelectedUser] = useState({
        userId: "110748397229408922403", 
        userName: "Judit Baranyi", 
        email: "baranyi1968@gmail.com",
    })
    const [childName, setChildName] = useState("")
    const [selectedEvent, setSelectedEvent] = useState("")
    const url = useContext(UrlContext)

    
    useEffect(() => {
        axios
            .get(`${url}/users`,  
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`
                }
            }
            )
            .then((res) => {
                setUsers(res.data)
            })
    }, [])


    const postNewAppointment = () => {
        const newAppointment = {
            userId: selectedUser.userId,
            userName: selectedUser.name,
            email: selectedUser.email,
            description: childName,
            event: selectedEvent,
            day: new Date(selectedTime.day),
            time: selectedTime.time
        }
        axios.post(`${url}/appointments`, newAppointment,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`,
                },
            }
        )
            .then((res) => {
                setResponse(res.data.msg)
                setNewReservation(false)
                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
    }

    return (
        <div className="edit-reservation">
            <h4>Új foglalás</h4>
            <p className="date">{`${selectedTime.day} (${selectedTime.time})`}</p>
            <div className="form">
                <select name="users" id="users" 
                onChange={(e) => setSelectedUser(users.find(user =>
                    user.userId === e.target.value))}>
                    <option value="110748397229408922403">Judit Baranyi</option>
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
                    disabled={selectedUser && childName && selectedEvent ? false : true}
                    onClick={postNewAppointment}
                >
                    Mentés
                    </button>
                <button className="admin-button"
                    onClick={(e) => setNewReservation(false)}
                >Mégse</button>
            </div>

        </div>
    )
}

export default AdminNewReservation
