import React, { useState, useContext } from 'react'
import axios from 'axios'
import UrlContext from '../../../contexts/urlContext'
import UserContext from '../../../contexts/userContext'

function CreateNewStreet({ setResponse, setNewStreet, setError}) {
    const [code, setCode] = useState()
    const [street, setStreet] = useState()
    const [type, setType] = useState()
    const [number, setNumber] = useState()
    const [side, setSide] = useState()
    const url = useContext(UrlContext)
    const { error401Handler } = useContext(UserContext)

    const streetInsert = () => {
        axios.post(`${url}/streets`,
            {
                irsz: code,
                kozterulet: street,
                jelleg: type,
                hsz: number,
                oldal: side
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`
                },
            })
            .then((res) => {
                setResponse(res.data.msg)
                setNewStreet(false)
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
                onChange={(e) => setCode(e.target.value)}
                placeholder="Irányítószám" />
            <input type="text" name="kozterulet"
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Közterület" />
            <input type="text" name="kozterulet"
                onChange={(e) => setType(e.target.value)}
                placeholder="Közterület" />
            <input type="text" name="hsz"
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Házszám" />
            <input type="text" name="oldal"
                onChange={(e) => setSide(e.target.value)}
                placeholder="Oldal" />
            <div className="btns">
                <button className="admin-button save-btn"
                    disabled={code && street && type && number && side
                        ? false : true}
                    onClick={streetInsert}>
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
