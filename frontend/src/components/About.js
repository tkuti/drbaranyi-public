import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AboutMe from './AboutMenu/AboutMe'
import Surgery from './AboutMenu/Surgery'
import Replacement from './AboutMenu/Replacement'
import Reception from './AboutMenu/Reception'
import Lab from './AboutMenu/Lab'
import Referrals from './AboutMenu/Referrals'


function About() {
    const [menu, setMenu] = useState("Rólam")

    return (
        <>
            <div id="background-color1" className="background"></div>
            <div className="about">
                <Container>
                    <Row>
                        <Col sm={12} md={4}>
                            <div className="buttons card-box">
                                <button className="button"
                                    onClick={(e) => { setMenu(e.target.innerHTML) }}>
                                    Rólam
                                </button>
                                <button className="button"
                                    onClick={(e) => { setMenu(e.target.innerHTML) }}>
                                    Rendelő
                                </button>
                                <button className="button"
                                    onClick={(e) => { setMenu(e.target.innerHTML) }}>
                                    Helyettesítés
                                </button>
                                <button className="button"
                                    onClick={(e) => { setMenu(e.target.innerHTML) }}>
                                    Recepció
                                </button>
                                <button className="button"
                                    onClick={(e) => { setMenu(e.target.innerHTML) }}>
                                    Labor
                                </button>
                                <button className="button"
                                    onClick={(e) => { setMenu(e.target.innerHTML) }}>
                                    Szakrendelések - beutalók
                                </button>
                            </div>
                        </Col>
                        <Col sm={12} md={8}>
                            <div className="about-description card-box">
                                {
                                    menu === "Rólam" &&
                                    <AboutMe />
                                }
                                {
                                    menu === "Rendelő" &&
                                    <Surgery />
                                }
                                {
                                    menu === "Helyettesítés" &&
                                    <Replacement />
                                }
                                {
                                    menu === "Recepció" &&
                                    <Reception />
                                }
                                {
                                    menu === "Labor" &&
                                    <Lab />
                                }
                                {
                                    menu === "Szakrendelések - beutalók" &&
                                    <Referrals />
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default About
