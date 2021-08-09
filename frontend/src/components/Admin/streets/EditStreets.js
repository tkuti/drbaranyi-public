import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import EditAStreet from './EditAStreet'
import CreateNewStreet from './CreateNewStreet'
import UrlContext from '../../../contexts/urlContext'

function EditStreets() {
    const [streetList, setStreetList] = useState()
    const [newStreet, setNewStreet] = useState(false)
    const [response, setResponse] = useState(false)
    const [error, setError] = useState(false)
    const url = useContext(UrlContext)

    useEffect(() => {
        axios
            .get(`${url}/streets`)
            .then((res) => {
                let streets = [...res.data].sort((a, b) =>
                    a.kozterulet.localeCompare(b.kozterulet))
                setStreetList([])
                setStreetList(streets)
            })
    }, [response])

    return (
        <div className="admin-container">
            <Container className="admin-edit-streets admin-card" >
                <Row>
                    <Col>
                        <p className="heading">Utcák</p>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            streetList &&
                            streetList.map((str) =>
                                <EditAStreet
                                    key={str._id}
                                    street={str}
                                    setResponse={setResponse}
                                    setError={setError}
                                ></EditAStreet>
                            )
                        }
                        {
                            newStreet &&
                            <CreateNewStreet
                                setResponse={setResponse}
                                setNewStreet={setNewStreet}
                                setError={setError}
                            ></CreateNewStreet>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button className="admin-button" onClick={() => setNewStreet(true)}>Hozzáadás</button>
                    </Col>
                </Row>
                {
                    response &&
                    <div className="res-msg res-msg-success">
                        {response}
                    </div>
                }
                {
                    error &&
                    <div className="res-msg res-msg-error">
                        {error}
                    </div>
                }
            </Container>
        </div>
    )
}

export default EditStreets

