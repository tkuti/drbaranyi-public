import React, { useState, useContext } from 'react'
import axios from 'axios'
import UrlContext from '../../../contexts/urlContext'
import UserContext from '../../../contexts/userContext'

function EditANurse({ nurse, setResponse, setError}) {
    const [isEditable, setIsEditable] = useState(false)
    const [modifiedNurse, setModifiedNurse] = useState(nurse)
    const url = useContext(UrlContext)
    const { error401Handler } = useContext(UserContext)

    const handleDataChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setModifiedNurse({ ...modifiedNurse, [name]: value });
    }

    const nurseUpdate = () => {
        axios.put(`${url}/nurses/${modifiedNurse._id}`, modifiedNurse,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`
                },
            })
            .then((res) => {
                setResponse(res.data.msg)
                setIsEditable(false)
                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
            .catch((err) => {
                setError(err.response.data.msg)
                error401Handler(err)
            })
    }

    const doctorDelete = () => {
        axios.delete(`${url}/nurses/${nurse._id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`
                },
            })
            .then((res) => {
                setResponse(res.data.msg)
                setIsEditable(false)
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
            <input type="text" name="name"
                readOnly={isEditable ? false : true}
                onChange={handleDataChange}
                defaultValue={nurse.name}
                className={isEditable ? "active" : ""} />
            <input type="text" name="phone"
                defaultValue={nurse.phone}
                readOnly={isEditable ? false : true}
                onChange={handleDataChange}
                className={isEditable ? "active" : ""} />
            <div className="btns">
                <button className="admin-button save-btn"
                    onClick={() => {
                        setIsEditable(!isEditable)
                        isEditable && nurseUpdate()
                    }}>
                    {isEditable ? "Mentés" : "Szerkesztés"}
                </button>
                <button className="admin-button delete-btn"
                    onClick={doctorDelete}>
                    Törlés
                </button>
            </div>
        </div>
    )
}

export default EditANurse