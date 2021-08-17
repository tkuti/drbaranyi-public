import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import UrlContext from '../contexts/urlContext'

function DisplayWarningMessages({type}) {

    const [messages, setMessages] = useState()
    const url = useContext(UrlContext)

    useEffect(() => {
        axios
            .get(`${url}/warning-messages`)
            .then((res) => {
                setMessages(res.data.filter(msg => msg.name.includes(type)))
            })
    }, [])

    return (
        <Row>
        {
            messages &&
            messages.map( msg =>
                <Col lg={12} key={msg._id}>
                    <div className="warning-message-box">
                        {
                            msg.message.split("\n").map((line, index) =>
                                <p key={index}>{line}</p>
                            )
                        }
                    </div>
                </Col>
            )
        }
    </Row>
    )
}

export default DisplayWarningMessages
