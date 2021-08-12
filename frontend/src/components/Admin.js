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
import AllMessages from './Admin/messages/AllMessages'
import AdminCalendar from './Admin/calendar/AdminCalendar'
import EditWarningMessages from './Admin/warningMessages/EditWarningMessages'
import EditStreets from './Admin/streets/EditStreets'
import EditNurses from './Admin/nurses/EditNurses'

function Admin() {
    let { path, url } = useRouteMatch();

    return (
        <Container className="admin">
            <Route exact path={path}>
                <Row>
                    <Col sm={12} md={6}>
                        <div className="card-box">
                            <BiMessageDetail className="admin-icon">
                            </BiMessageDetail>
                            <Link to={`${url}/messages`}>
                                <button className="button">Üzenetek</button>
                            </Link>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="card-box">
                            <FaRegCalendarAlt className="admin-icon">
                            </FaRegCalendarAlt>
                            <Link to={`${url}/calendar`}>
                                <button className="button">
                                    Naptár
                                </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <div className="card-box">
                            <FaQuestionCircle className="admin-icon">
                            </FaQuestionCircle>
                            <Link to="/admin-faq">
                                <button className="button">Tanácsok</button>
                            </Link>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="card-box">
                            <FaRegEdit className="admin-icon"></FaRegEdit>
                            <Link to={`${url}/edit-warning-messages`}>
                                <button className="button">
                                    Üzenet szerkesztés
                                </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <div className="card-box">
                            <FaRegEdit className="admin-icon"></FaRegEdit>
                            <Link to={`${url}/edit-nurses`}>
                                <button className="button">
                                    Védőnő szerkesztés
                                </button>
                            </Link>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="card-box">
                            <FaRegEdit className="admin-icon"></FaRegEdit>
                            <Link to={`${url}/edit-streets`}>
                                <button className="button">
                                    Utca szerkesztés
                                </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Route>

            <Switch>

                <Route path={`${path}/messages`}>
                    <AllMessages />
                </Route>

                <Route path={`${path}/calendar`}>
                    <AdminCalendar />
                </Route>

                <Route path={`${path}/edit-warning-messages`}>
                    <EditWarningMessages />
                </Route>

                <Route path={`${path}/edit-nurses`}>
                    <EditNurses />
                </Route>

                <Route path={`${path}/edit-streets`}>
                    <EditStreets />
                </Route>

            </Switch>
        </Container>
    )
}

export default Admin
