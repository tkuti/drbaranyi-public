import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BiUpArrow, BiDownArrow } from 'react-icons/bi'
import UserContext from '../contexts/userContext'
import useStreets from '../hooks/useStreets'
import useNurses from '../hooks/useNurses'

function Infos() {

    const { errorHandler } = useContext(UserContext)
    const { streets,
        filteredStreets,
        getStreets,
        setFilteredStreets } = useStreets(errorHandler)
    const [showMore, setShowMore] = useState(false)
    const { nurses, getNurses } = useNurses(errorHandler)

    useEffect(() => {
        getStreets()
        getNurses()
    }, [])

    return (
        <>
            <div id="background-blue" className="background"></div>
            <Container>
                <div className="doctors">
                    <Row>
                        <Col>
                            <div className="info card-box">
                                <p> Az alábbi listában az I.sz. Gyermekorvosi körzethez tartozó címek szerepelnek. Amennyiben a keresett cím nem található, akkor a cím egy másik körzethez tartozik. További információ a körzeti eloszlásokról
                                    <a href="https://net.jogtar.hu/rendelet?council=xvi-kerulet&dbnum=556&docid=A1900026.16R&searchUrl=/rendelet-kereso/gyors%3Fcouncil%3Dxvi-kerulet%26publisher%3D16R0"
                                        target="blank"> ezen a linken</a> található.
                                    A védőnői ellátás más területi elosztás szerint történik. Míg szabad orvosválasztás van, a védőnő nem választható, szoros, tartózkodási hely szerinti, utcára, házszámra lebontott beosztás szerint látják el a kismamákat és a gyermekeket. Így gyakran előfordul, hogy nem ugyanabban a rendelőben történik a védőnői és az orvosi ellátás.</p>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={12} lg={6}>
                            <div className="card-box search">
                                <p className="heading">I.sz Házi Gyermekorvosi Körzet</p>
                                <input type="text" placeholder="Keresés"
                                    onChange={(e) => setFilteredStreets(
                                        streets.filter(doc =>
                                            doc.kozterulet.toLowerCase().includes(e.target.value.toLowerCase())))} />
                            </div>
                            <div className="card-box address-container">
                                {
                                    filteredStreets && showMore &&
                                    filteredStreets.map((doc, index) =>
                                        <p className="address" key={index}>
                                            {doc.kozterulet} {doc.jelleg}
                                            {doc.hsz} ({doc.oldal})
                                        </p>
                                    )
                                }
                                {
                                    filteredStreets && !showMore &&
                                    filteredStreets.slice(0, 12).map((doc, index) =>
                                        <p className="address" key={index}>
                                            {doc.kozterulet} {doc.jelleg} {doc.hsz}
                                            ({doc.oldal})
                                        </p>
                                    )
                                }
                                <div className="show-more">
                                    {
                                        filteredStreets &&
                                        filteredStreets.length > 12 &&
                                        showMore &&
                                        <>
                                            <hr />
                                            <BiUpArrow
                                                onClick={() => setShowMore(false)}>
                                            </BiUpArrow>
                                        </>
                                    }
                                    {
                                        filteredStreets &&
                                        filteredStreets.length > 12 &&
                                        !showMore &&
                                        <>
                                            <hr />
                                            <BiDownArrow
                                                onClick={() => setShowMore(true)}>
                                            </BiDownArrow>
                                        </>
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} lg={6} className="doctors-details">
                            <Row>
                                <Col sm={12} lg={12}>
                                    <div className="card-box">
                                        <p className="heading">
                                            Hősök terén dolgozó védőnők
                                        </p>
                                    </div>
                                </Col>
                                {
                                    nurses && nurses.map((dr, i) =>
                                        <Col sm={12} lg={6} key={i}>
                                            <div className="card-box doctor-card">
                                                <p className="heading">
                                                    {dr.name}
                                                </p>
                                                <p className="doctor-tel">
                                                    {dr.phone}
                                                </p>
                                            </div>
                                        </Col>
                                    )
                                }
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}

export default Infos
