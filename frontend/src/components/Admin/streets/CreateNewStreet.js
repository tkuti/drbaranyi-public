import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../../contexts/userContext'
import useStreets from '../../../hooks/useStreets'

function CreateNewStreet({ setNewStreet, getStreets }) {

   const { errorHandler, successHandler } = useContext(UserContext)
    const { postStreet } = useStreets(errorHandler, successHandler, setNewStreet)

    const [street, setStreet] = useState({
        irsz: "",
        kozterulet: "",
        jelleg: "",
        hsz: "",
        oldal: ""
    })
    const [isEmptyInput, setIsEmptyInput] = useState(true)

    const handleDataChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setStreet({ ...street, [name]: value });
    }

    useEffect(() => {
        const inputStates = Object.keys(street).some(key => !street[key])
        setIsEmptyInput(inputStates)
    }, [street])


    return (
        <div className="street">
           <input type="text" name="irsz"
                onChange={handleDataChange}
                placeholder="Irányítószám" />
            <input type="text" name="kozterulet"
                onChange={handleDataChange}
                placeholder="Közterület" />
            <input type="text" name="jelleg"
                onChange={handleDataChange}
                placeholder="Jelleg" />
            <input type="text" name="hsz"
                onChange={handleDataChange}
                placeholder="Házszám" />
            <input type="text" name="oldal"
                onChange={handleDataChange}
                placeholder="Oldal" />
            <div className="btns">
                <button className="admin-button save-btn"
                    disabled={isEmptyInput
                        ? true 
                        : false}
                    onClick={async() => {
                        await postStreet(street)
                        getStreets()
                        }}>
                    Mentés
                </button>
                <button className="admin-button"
                    onClick={() => setNewStreet(false)}>
                    Mégse
                </button>
                    </div>
        </div>
    )
}

export default CreateNewStreet
