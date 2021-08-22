import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserContext from '../contexts/userContext'
import useWarningMessages from '../hooks/useWarningMessages'

function DisplayWarningMessages({type}) {

    const { errorHandler } = useContext(UserContext)
    const { messages } = useWarningMessages(type, errorHandler)


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
