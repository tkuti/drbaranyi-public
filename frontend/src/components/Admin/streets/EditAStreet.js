import React, { useState, useContext } from 'react'
import UserContext from '../../../contexts/userContext'
import useStreets from '../../../hooks/useStreets'

function EditAStreet({ street, getStreets }) {

    const { errorHandler, successHandler } = useContext(UserContext)
    const [isEditable, setIsEditable] = useState(false)
    const { updateStreet, deleteStreet } = useStreets(errorHandler, successHandler)
    const [modifiedStreet, setModifiedStreet] = useState(street)


    const handleDataChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setModifiedStreet({ ...modifiedStreet, [name]: value });
    }

    const handleEditButton = async () => {
        setIsEditable(!isEditable)
        if (isEditable) {
            await updateStreet(modifiedStreet._id, modifiedStreet);
            getStreets()
        }
    }

    const handleDeleteButton = async () => {
        await deleteStreet(street._id)
        getStreets()
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
                    onClick={handleEditButton}>
                    {isEditable ? "Mentés" : "Szerkesztés"}
                </button>
                <button className="admin-button delete-btn"
                    onClick={handleDeleteButton}>
                    Törlés
                </button>
            </div>
        </div>
    )
}

export default EditAStreet
