import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import UserContext from '../contexts/userContext'
import UrlContext from '../contexts/urlContext'

function Messages() {
    const [user, setUser] = useContext(UserContext)
    const [messages, setMessages] = useState()
    const [newMessage, setNewMessage] = useState("")
    const [response, setResponse] = useState(false)
    const url = useContext(UrlContext)

    useEffect(() => {
        axios
            .get(`${url}/messages/byuser/${user.userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `${localStorage.getItem('authorization')}`
                    },
                }
            )
            .then((res) => {
                setMessages(res.data)
            })
    }, [response])

    const postNewMessage = () => {
        const postMessage = {
            userId: user.userId,
            type: "question",
            userName: user.name,
            date: new Date(),
            message: newMessage,
            creatorId: user.userId
        }

        axios.post(`${url}/messages/${user.userId}`, postMessage,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`
                }
            }
        )
            .then((res) => {
                setResponse(res.data.msg)
                setNewMessage("")
                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
            .catch((err) => {
                setResponse(err)
            })
    }

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
                                    onClick={postNewMessage}>
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
