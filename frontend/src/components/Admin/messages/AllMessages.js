import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import { IoIosMail } from 'react-icons/io'
import { ImUndo2 } from 'react-icons/im'
import UrlContext from '../../../contexts/urlContext'
import UserContext from '../../../contexts/userContext'

function AllMessages() {
    const [users, setUsers] = useState()
    const [messages, setMessages] = useState()
    const [selectedUser, setSelectedUser] = useState()
    const [newMessage, setNewMessage] = useState("")
    const [response, setResponse] = useState(false)
    const [error, setError] = useState(false)
    const url = useContext(UrlContext)
    const { user, error401Handler } = useContext(UserContext)

    useEffect(() => {
        axios
            .get(`${url}/messages/lastMessageByUsers`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `${localStorage.getItem('authorization')}`
                    }
                })
            .then((res) => {
                setUsers(res.data)
            })
    }, [response, newMessage])

    const getMessages = (userId) => {
        axios
            .get(`${url}/messages/byuser/${userId}`,
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
            .catch((err) => {
                setError(err.response.data.msg)
                error401Handler(err)
            })
    }

    const postNewMessage = () => {
        const postMessage = {
            userId: selectedUser._id,
            type: "answer",
            userName: selectedUser.userName,
            date: new Date(),
            message: newMessage,
            creatorId: user.userId
        }
        newMessage &&
            axios.post(`${url}/messages/${user.userId}`, postMessage,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `${localStorage.getItem('authorization')}`
                    },
                }
            )
                .then((res) => {
                    setResponse(res.data.msg)
                    setNewMessage("")
                    getMessages(selectedUser._id)
                })
                .catch((err) => {
                    setError(err.response.data.msg)
                    error401Handler(err)
                })
    }

    return (
        <div className="admin-container">
            <Container className="admin-messages">
                <Row>
                    <Col sm={12} lg={3}>
                        <div>
                            <p className="heading-admin">
                                Felhasználók
                            </p>
                            {
                                users &&
                                users.map((user) =>
                                    <div className="admin-msg-card admin-card"
                                        key={user.userId}>
                                        <div>
                                            <span className="username">
                                                {user.userName}
                                            </span>
                                            <span>
                                                {
                                                    user.lastmessageType === "question"
                                                        ? <IoIosMail
                                                            className="incoming-msg">
                                                        </IoIosMail>
                                                        : <ImUndo2
                                                            className="replied-msg">
                                                        </ImUndo2>
                                                }
                                            </span>
                                        </div>
                                        <div className="date">
                                            <span>Utolsó:</span>
                                            <span>{user.newest.slice(0, 10)} 
                                                ({user.newest.slice(11, 16)})
                                            </span>
                                        </div>
                                        <button className="admin-button"
                                            onClick={() => {
                                                setMessages(false)
                                                setSelectedUser(user)
                                                getMessages(user._id)
                                            }}>
                                            Üzenetek
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </Col>
                    <Col sm={12} lg={6}>
                        <div className="admin-card display-messages">
                            {
                                messages &&
                                <p className="heading">{messages[0].userName} üzenetei: </p>
                            }
                            {
                                messages &&
                                messages.map((msg) =>
                                    <div key={msg._id}
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
                    <Col sm={12} lg={3}>
                        <div className="admin-card write-message">
                            <textarea name="msg" id="msg" cols="30"
                                rows="10"
                                placeholder="Írja le üzenetét"
                                onChange={(e) => setNewMessage(e.target.value)}
                                value={newMessage}>
                            </textarea>
                            <button className="admin-button"
                                onClick={postNewMessage}
                                disabled={selectedUser && newMessage
                                    ? false : true}>
                                Válasz
                            </button>
                        </div>
                    </Col>
                </Row>
                {
                    error &&
                    <div className="res-msg res-msg-error">
                        {error}
                    </div>
                }
            </Container>
        </div>
    )
}

export default AllMessages
