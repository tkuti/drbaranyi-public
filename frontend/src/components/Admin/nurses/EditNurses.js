import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import EditANurse from './EditANurse'
import CreateNewNurse from './CreateNewNurse'
import UrlContext from '../../../contexts/urlContext'

function EditNurses() {
    const [nurseList, setNurseList] = useState()
    const [response, setResponse] = useState(false)
    const [error, setError] = useState(false)
    const [newNurse, setNewNurse] = useState(false)
    const url = useContext(UrlContext)

    useEffect(() => {
        axios
            .get(`${url}/nurses`)
            .then((res) => {
                setNurseList(res.data)
            })
    }, [response])


    return (
        <div className="admin-container" >
            <Container className="admin-edit-doctors" >
                <Row>
                    <Col>
                        <p className="heading-admin">Védőnők</p>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            nurseList &&
                            nurseList.map((nurse) =>
                                <EditANurse
                                    key={nurse._id}
                                    nurse={nurse}
                                    setResponse={setResponse}
                                    setError={setError}
                                ></EditANurse>
                            )
                        }
                        {
                            newNurse &&
                            <CreateNewNurse
                                setResponse={setResponse}
                                setNewNurse={setNewNurse}
                                setError={setError}
                            ></CreateNewNurse>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button className="admin-button"
                            onClick={() => setNewNurse(true)}>
                            Hozzáadás
                        </button>
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

export default EditNurses
