import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { IoIosMail } from 'react-icons/io'
import { ImUndo2 } from 'react-icons/im'
import UserContext from '../../../contexts/userContext'
import useMessages from '../../../hooks/useMessages'

function AllMessages() {
    
    const { user, errorHandler } = useContext(UserContext)
    const { messages, getMessages, lastMessagesByUsers, getLastMessagesByUsers, postNewMessage } = useMessages(errorHandler)
    const [selectedUser, setSelectedUser] = useState()
    const [newMessage, setNewMessage] = useState("")


    useEffect(() => {
        getLastMessagesByUsers()
    }, [])


    const getUserMessages = async (lastMsg) => {
        setSelectedUser(lastMsg)
        await getMessages(lastMsg._id)
    }

    const sendNewMessage = async () => {
        const message = {
            userId: selectedUser._id,
            type: "answer",
            userName: selectedUser.userName,
            date: new Date(),
            message: newMessage,
            creatorId: user.userId
        }

        await postNewMessage(selectedUser._id, message)
        setNewMessage("")
        getLastMessagesByUsers()
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
                            lastMessagesByUsers &&
                            lastMessagesByUsers.map((lastMsg) =>
                                <div className="admin-msg-card admin-card"
                                    key={lastMsg.userId}>
                                    <div>
                                        <span className="username">
                                            {lastMsg.userName}
                                        </span>
                                        <span>
                                            {
                                                lastMsg.lastmessageType === "question"
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
                                        <span>{lastMsg.newest.slice(0, 10)}
                                            ({lastMsg.newest.slice(11, 16)})
                                        </span>
                                    </div>
                                    <button className="admin-button"
                                        onClick={() => {
                                            getUserMessages(lastMsg)
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
                            onClick={sendNewMessage}
                            disabled={selectedUser && newMessage
                                ? false : true}>
                            Válasz
                        </button>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
)
}

export default AllMessages
