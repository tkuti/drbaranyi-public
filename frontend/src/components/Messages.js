import React, { useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserContext from '../contexts/userContext'
import useMessages from '../hooks/useMessages'


function Messages() {

    const { user, errorHandler } = useContext(UserContext)
    const [newMessage, setNewMessage] = useState("")

    const { messages, postNewMessage } = useMessages(user, errorHandler, setNewMessage)


    return (
        <>
            <div id="background-color4" className="background"></div>
            <Container className="messages">
                <Row>
                    <Col sm={12} lg={4} >
                        <div className="card-box">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <textarea name="message" id="message"
                                    cols="40" rows="8"
                                    placeholder="Írja le az üzenetét"
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}>
                                </textarea>
                                <button className="button" type="submit"
                                    onClick={() =>
                                        postNewMessage(newMessage)}>
                                    Küldés
                                </button>
                            </form>
                        </div>
                    </Col>
                    <Col sm={12} lg={8}>
                        <div className="card-box display-messages">
                            {
                                messages && messages.map((msg, i) =>
                                    <div key={i}
                                        className={msg.type === "question"
                                            ? "private-msg-user"
                                            : "private-msg-admin"
                                        }>
                                        {msg.message}
                                    </div>
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Messages
