import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EditAStreet from './EditAStreet'
import CreateNewStreet from './CreateNewStreet'
import UserContext from '../../../contexts/userContext'
import useStreets from '../../../hooks/useStreets'

function EditStreets() {

    const { successHandler, errorHandler } = useContext(UserContext)
    const { streets, getStreets } = useStreets(errorHandler, successHandler)
    const [newStreet, setNewStreet] = useState(false)

    useEffect(() => {
        getStreets()
    }, [])

    return (
        <div className="admin-container">
            <Container className="admin-edit-streets" >
                <Row>
                    <Col>
                        <p className="heading-admin">Utcák</p>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            streets &&
                            streets.map((str) =>
                                <EditAStreet
                                    key={str._id}
                                    street={str}
                                    getStreets={getStreets}
                                ></EditAStreet>
                            )
                        }
                        {
                            newStreet &&
                            <CreateNewStreet
                                setNewStreet={setNewStreet}
                                getStreets={getStreets}
                            ></CreateNewStreet>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button className="admin-button" onClick={() => setNewStreet(true)}>Hozzáadás</button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default EditStreets

