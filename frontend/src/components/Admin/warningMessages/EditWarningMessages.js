import React, {  useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserContext from '../../../contexts/userContext'
import useWarningMessages from '../../../hooks/useWarningMessages'


function EditWarningMessages () {

    const { successHandler, errorHandler } = useContext(UserContext)
    const {messages, setMessages, postWarningMessages} = useWarningMessages("-", successHandler, errorHandler)


    const handleMessageChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setMessages(messages.map(msg => msg.name === name
            ? { ...msg, name: name, message: value }
            : msg));
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
                                <button onClick={() => postWarningMessages(messages)}
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
                                <button onClick={() => postWarningMessages(messages)}
                                    className="admin-button save-btn">
                                    Mentés
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default EditWarningMessages
