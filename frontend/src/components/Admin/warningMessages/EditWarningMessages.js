import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UrlContext from '../../../contexts/urlContext'
import UserContext from '../../../contexts/userContext'

function EditWarningMessages() {
    const [messages, setMessages] = useState(null)
    const [response, setResponse] = useState(false)
    const [error, setError] = useState(false)
    const url = useContext(UrlContext)
    const { error401Handler } = useContext(UserContext)

    useEffect(() => {
        axios
            .get(`${url}/warning-messages`)
            .then((res) => {
                setMessages(res.data)
            })
    }, [response])

    const handleMessageChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setMessages(messages.map(msg => msg.name === name
            ? { ...msg, name: name, message: value }
            : msg));
    }

    const postMessages = () => {
        axios.post(`${url}/warning-messages`, messages,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`
                },
            })
            .then((res) => {
                setResponse(res.data.msg)
                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
            .catch((err) => {
                setError(err.response.data.msg)
                error401Handler(err)
            })
    }

    return (
        <div className="admin-container" >
            <Container className="admin-edit">
                <Row>
                    <Col sm={12} lg={12}>
                        <div className="admin-card edit-container">
                            <p className="heading">
                                Főoldalon megjelenő üzenet szerkesztése
                            </p>
                            <div className="warning-messages">
                                <textarea name="home-msg-1" id="msg1"
                                    cols="30" rows="5"
                                    placeholder="Üzenet tartalma"
                                    onChange={(e) => handleMessageChange(e)}
                                    value={messages
                                        ? messages.find(obj =>
                                            obj.name === "home-msg-1").message
                                        : ""}>
                                </textarea>
                                <textarea name="home-msg-2" id="msg2"
                                    cols="30" rows="5"
                                    placeholder="Üzenet tartalma"
                                    onChange={(e) => handleMessageChange(e)}
                                    value={messages
                                        ? messages.find(obj =>
                                            obj.name === "home-msg-2").message
                                        : ""}>
                                </textarea>
                            </div>
                            <div key={messages}>
                                <select name="style" id="style"
                                    defaultValue={messages
                                        ? messages.find(msg =>
                                            msg.name.includes("home")).type
                                        : "error"}
                                    onChange={(e) => setMessages(
                                        messages.map(msg =>
                                            msg.name.includes("home")
                                                ? { ...msg, type: e.target.value }
                                                : msg
                                        )
                                    )}>
                                    <option value="success">SUCCESS</option>
                                    <option value="error" >ERROR</option>
                                    <option value="default">DEFAULT</option>
                                    <option value="none">NONE</option>
                                </select>
                                <button onClick={postMessages}
                                    className="admin-button save-btn">
                                    Mentés
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={12}>
                        <div className="admin-card edit-container">
                            <p className="heading">
                                A naptár felett megjelenő üzenet szerkesztése
                            </p>
                            <div className="warning-messages">
                                <textarea name="calendar-msg-1" id="msg1"
                                    cols="30" rows="5"
                                    placeholder="Üzenet tartalma"
                                    onChange={(e) => handleMessageChange(e)}
                                    value={messages
                                        ? messages.find(obj => obj.name === "calendar-msg-1").message
                                        : ""}>
                                </textarea>
                                <textarea name="calendar-msg-2" id="msg2"
                                    cols="30" rows="5"
                                    placeholder="Üzenet tartalma"
                                    onChange={(e) => handleMessageChange(e)}
                                    value={messages
                                        ? messages.find(obj => obj.name === "calendar-msg-2").message
                                        : ""}>
                                </textarea>
                            </div>
                            <div key={messages}>
                                <select name="style" id="style"
                                    defaultValue={messages
                                        ? messages.find(msg => msg.name.includes("calendar")).type
                                        : "error"}
                                    onChange={(e) => setMessages(
                                        messages.map(msg => msg.name.includes("calendar")
                                            ? { ...msg, type: e.target.value }
                                            : msg
                                        )
                                    )}>
                                    <option value="success">SUCCESS</option>
                                    <option value="error">ERROR</option>
                                    <option value="default">DEFAULT</option>
                                    <option value="none">NONE</option>
                                </select>
                                <button onClick={postMessages}
                                    className="admin-button save-btn">
                                    Mentés
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                {
                    response &&
                    <div className="res-msg res-msg-success">
                        {response}
                    </div>
                }
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

export default EditWarningMessages
