import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DisplayWarningMessages from './DisplayWarningMessages'


function Home() {

    return (
        <div>
             <div id="background-color1" className="background"></div>
            <Container className="home">
                <DisplayWarningMessages type="home"/>
                <Row>
                    <Col sm={12} md={6}>
                        <div className="welcome card-box">
                            <p className="heading">Üdvözlöm!</p>
                            <p className="info">Ön Dr. Baranyi Judit gyermekorvos weboldalát látja. <br />
                    Köszönöm, hogy felkereste az oldalamat, és hogy ezen keresztül intézi gyermeke ügyét. Regisztráció után <span>foglalhat időpontot</span>, illetve <span>privát üzenetváltásra</span> is lehetősége nyílik. Ennek hiányában is tájékozódhat a rendelőben dolgozó <Link to='/doctors'>védőnőkről</Link>, valamint olvashat a <Link to='/faq'>gyakran felmerülő problémákról</Link> is.</p>
                        </div>
                        <div className="card-box contact">
                            <p className="heading">Elérhetőség</p>
                            <p className="day">
                                <span>Telefon (rendelési időben): </span>
                                <span>06-1/405-87-40</span>
                            </p>
                            <p className="day">
                                <span>Mobil (csak sürgős!): </span>
                                <span>06-30/966-16-31</span>
                            </p>
                            <p className="day">
                                <span>Cím: </span>
                                <span>1161 Hősök tere 7-8.</span>
                            </p>
                        </div>

                    </Col>
                    <Col sm={12} md={6}>
                        <div className="opening card-box">
                            <p className="heading">Rendelés</p>
                            <p className="day">
                                <span>Hétfő</span>
                                <span>16:00 - 20:00</span>
                            </p>
                            <p className="day">
                                <span>Kedd</span>
                                <span>16:00 - 18:00</span>
                            </p>
                            <p className="day">
                                <span>Szerda</span>
                                <span>10:00 - 12:00</span>
                            </p>
                            <p className="day">
                                <span>Csütörtök</span>
                                <span>14:00 - 18:00</span>
                            </p>
                            <p className="day">
                                <span>Péntek (páratlan)</span>
                                <span>8:00 - 12:00</span>
                            </p>
                            <p className="day">
                                <span>Péntek (páros)</span>
                                <span>16:00 - 20:00</span>
                            </p>
                            <hr />
                            <p className="heading">Oltás, tanácsadás</p>
                            <p className="day">
                                <span>Kedd</span>
                                <span>14:00 - 16:00</span>
                            </p>
                            <p className="day">
                                <span>Szerda</span>
                                <span>8:00 - 10:00</span>
                            </p>
                            <p className="day">
                                <span>Csütörtök (ha kedd, szerda betelt)</span>
                                <span>14:00 - 16:00</span>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container >
            <div  className="footer card-box">
                    <div>
                        <p className="day">
                            <span>Háttérképek: </span>
                            <span>Sárkány Vivien</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span>2021</span>
                            <span> | drbaranyi.com</span>
                        </p>
                    </div>
                    <div>
                        <p className="day">
                            <span>Website: </span>
                            <span>Kuti Tünde</span>
                        </p>
                    </div>
            </div>
        </div>
    )
}

export default Home
