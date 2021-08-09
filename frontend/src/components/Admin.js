import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BiMessageDetail } from 'react-icons/bi'
import { FaRegCalendarAlt, FaRegEdit, FaQuestionCircle } from 'react-icons/fa'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import EditStreets from './Admin/streets/EditStreets'

function Admin() {
    let { path, url } = useRouteMatch();

    return (
        <Container className="admin">
            <Route exact path={path}>
                <Row>
                    <Col sm={12} md={6}>
                        <div className="card-box">
                            <BiMessageDetail className="admin-icon"></BiMessageDetail>
                            <Link to="/admin-messages">
                                <button className="button">Üzenetek</button>
                            </Link>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="card-box">
                            <FaRegCalendarAlt className="admin-icon"></FaRegCalendarAlt>
                            <Link to="/admin-calendar">
                                <button className="button">Naptár</button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <div className="card-box">
                            <FaQuestionCircle className="admin-icon"></FaQuestionCircle>
                            <Link to="/admin-faq">
                                <button className="button">Tanácsok</button>
                            </Link>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="card-box">
                            <FaRegEdit className="admin-icon"></FaRegEdit>
                            <Link to="/admin-edit">
                                <button className="button">Üzenet szerkesztés</button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <div className="card-box">
                            <FaRegEdit className="admin-icon"></FaRegEdit>
                            <Link to="/admin-edit-doctors">
                                <button className="button">Védőnő szerkesztés</button>
                            </Link>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="card-box">
                            <FaRegEdit className="admin-icon"></FaRegEdit>
                            <Link to={`${url}/edit-streets`}>
                                <button className="button">Utca szerkesztés</button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Route>

            <Switch>
                <Route path={`${path}/edit-streets`}>
                    <EditStreets />
                </Route>
            </Switch>
        </Container>
    )
}

export default Admin
