import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EditANurse from './EditANurse'
import CreateNewNurse from './CreateNewNurse'
import UserContext from '../../../contexts/userContext'
import useNurses from '../../../hooks/useNurses'


function EditNurses() {
    const { successHandler, errorHandler } = useContext(UserContext)
    const {nurses, getNurses} = useNurses(errorHandler, successHandler)
    const [newNurse, setNewNurse] = useState(false)


    useEffect(() => {
        getNurses()
    }, [])


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
                            nurses &&
                            nurses.map((nurse) =>
                                <EditANurse
                                    key={nurse._id}
                                    nurse={nurse}
                                    getNurses={getNurses}
                                ></EditANurse>
                            )
                        }
                        {
                            newNurse &&
                            <CreateNewNurse
                                setNewNurse={setNewNurse}
                                getNurses={getNurses}
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
            </Container>
        </div>
    )
}

export default EditNurses
