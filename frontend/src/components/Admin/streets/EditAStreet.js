import React, { useState, useContext } from 'react'
import axios from 'axios'
import UrlContext from '../../../contexts/urlContext'
import UserContext from '../../../contexts/userContext'

function EditAStreet({ street, setResponse, setError }) {
    const [isEditable, setIsEditable] = useState(false)
    const [modifiedStreet, setModifiedStreet] = useState(street)
    const url = useContext(UrlContext)
    const { error401Handler } = useContext(UserContext)

    const handleDataChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setModifiedStreet({ ...modifiedStreet, [name]: value });
    }

    const streetUpdate = () => {
        axios.put(`${url}/streets/${modifiedStreet._id}`, modifiedStreet, {
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

    const streetDelete = () => {
        axios.delete(`${url}/streets/${street._id}`,
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
        <div className="street">
            <input type="text" name="irsz"
                readOnly={isEditable ? false : true}
                onChange={handleDataChange}
                defaultValue={street.irsz}
                className={isEditable ? "active" : ""} />
            <input type="text" name="kozterulet"
                readOnly={isEditable ? false : true}
                onChange={handleDataChange}
                defaultValue={street.kozterulet}
                className={isEditable ? "active" : ""} />
            <input type="text" name="jelleg"
                readOnly={isEditable ? false : true}
                onChange={handleDataChange}
                defaultValue={street.jelleg}
                className={isEditable ? "active" : ""} />
            <input type="text" name="hsz"
                readOnly={isEditable ? false : true}
                onChange={handleDataChange}
                defaultValue={street.hsz}
                className={isEditable ? "active" : ""} />
            <input type="text" name="oldal"
                readOnly={isEditable ? false : true}
                onChange={handleDataChange}
                defaultValue={street.oldal}
                className={isEditable ? "active" : ""} />
            <div className="btns">
                <button className="admin-button save-btn"
                    onClick={() => {
                        setIsEditable(!isEditable)
                        isEditable && streetUpdate()
                    }}>
                    {isEditable ? "Mentés" : "Szerkesztés"}
                </button>
                <button className="admin-button delete-btn"
                    onClick={streetDelete}>
                    Törlés
                </button>
            </div>
        </div>
    )
}

export default EditAStreet
