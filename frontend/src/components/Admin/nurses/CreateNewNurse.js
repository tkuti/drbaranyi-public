import React, { useState, useContext } from 'react'
import axios from 'axios'
import UrlContext from '../../../contexts/urlContext'
import UserContext from '../../../contexts/userContext'

function CreateNewNurse({ setResponse, setNewNurse, setError }) {
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const url = useContext(UrlContext)
    const { error401Handler } = useContext(UserContext)

    const doctorInsert = () => {
        axios.post(`${url}/nurses`, { name: name, phone: phone },
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`
                },
            })
            .then((res) => {
                setResponse(res.data.msg)
                setNewNurse(false)
                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
            .catch((err) => {
                setError(err.response.data.msg)
                error401Handler(err)
            })
    }

    return (
        <div className="dr">
            <input type="text" name="name" id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Név" />
            <input type="text" name="phone"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefonszám" />
            <div className="btns">
                <button className="admin-button save-btn"
                    disabled={name && phone ? false : true}
                    onClick={doctorInsert}>
                    Mentés
                </button>
                <button className="admin-button"
                    onClick={() => setNewNurse(false)}>
                    Mégse
                </button>
            </div>
        </div>
    )
}

export default CreateNewNurse
