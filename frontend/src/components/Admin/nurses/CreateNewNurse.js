import React, { useState, useContext } from 'react'
import UserContext from '../../../contexts/userContext'
import useNurses from '../../../hooks/useNurses'

function CreateNewNurse({ setNewNurse, getNurses }) {
    
    const { errorHandler, successHandler } = useContext(UserContext)
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const { postNurse } = useNurses(errorHandler, successHandler, setNewNurse)

    const sendNurse = async () => {
        await postNurse({ name: name, phone: phone })
        getNurses()
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
                    onClick={sendNurse}>
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
