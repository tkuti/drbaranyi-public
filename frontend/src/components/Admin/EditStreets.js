import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
//import AdminEditAStreet from './AdminEditAStreet'
//import AdminEditNewStreet from './AdminEditNewStreet'
import UrlContext from '../../contexts/urlContext'

function EditStreets() {
    const [streetList, setStreetList] = useState()
    const [response, setResponse] = useState(false)
    const [newStreet, setNewStreet] = useState(false)
    const url = useContext(UrlContext)

    useEffect(() => {
        axios
            .get(`${url}/streets`)
            .then((res) => {
                let streets = [...res.data].sort((a, b) => a.kozterulet.localeCompare(b.kozterulet))
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
                    {/* <Col>
                        {
                            streetList &&
                            streetList.map((str, i) =>
                                <AdminEditAStreet
                                    key={i}
                                    url={url}
                                    street={str}
                                    setResponse={setResponse}
                                ></AdminEditAStreet>
                            )
                        }
                        {
                            newStreet &&
                            <AdminEditNewStreet
                                url={url}
                                setResponse={setResponse}
                                setNewStreet={setNewStreet}
                            ></AdminEditNewStreet>
                        }
                    </Col> */}
                </Row>
                <Row>
                    <Col>
                        <button className="admin-button" onClick={() => setNewStreet(true)}>Hozzáadás</button>
                    </Col>
                </Row>
                {
                    response && <div className="res-msg">Sikeres mentés</div>
                }
            </Container>
        </div>
    )
}

export default EditStreets

