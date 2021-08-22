import React, { useState, useContext } from 'react'
import UserContext from '../../../contexts/userContext'
import useNurses from '../../../hooks/useNurses'

function EditANurse({ nurse, getNurses }) {

    const { successHandler, errorHandler } = useContext(UserContext)
    const { updateNurse, deleteNurse } = useNurses(errorHandler, successHandler)
    const [isEditable, setIsEditable] = useState(false)
    const [modifiedNurse, setModifiedNurse] = useState(nurse)


    const handleDataChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setModifiedNurse({ ...modifiedNurse, [name]: value });
    }

    const handleEditButton = async () => {
        setIsEditable(!isEditable)
        if (isEditable) {
            await updateNurse(modifiedNurse._id, modifiedNurse);
            getNurses()
        }
    }

    const handleDeleteButton = async () => {
        await deleteNurse(nurse._id)
        getNurses()
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

export default EditANurse
