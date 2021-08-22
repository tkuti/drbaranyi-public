import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import FaqEdit from './FaqEdit'
import FaqNew from './FaqNew'
import UrlContext from '../../../contexts/urlContext'

function AdminFaq() {
    const [questions, setQuestions] = useState()
    const [images, setImages] = useState()
    const [selectedQuestion, setSelectedQuestion] = useState("")
    const [newImage, setNewImage] = useState()
    const [response, setResponse] = useState(false)
    const [newQuestion, setNewQuestion] = useState(false)
    const url = useContext(UrlContext)


    useEffect(() => {
        axios
            .get(`${url}/questions`)
            .then((res) => {
                setQuestions(res.data)
            })
    }, [response])


    useEffect(() => {
        axios
            .get(`${url}/images`)
            .then((res) => {
                setImages(res.data)
            })
    }, [response])


    const uploadImage = () => {
        const fd = new FormData()
        fd.append('image', newImage)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `${localStorage.getItem('authorization')}`
            }
        }
        axios
            .post(`${url}/images`, fd, config)
            .then((res) => {
                setResponse(res.data.msg)
                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
    }

    return (
        <div className="admin-container" >
            <Container fluid className="admin-questions">
                <Row>
                    <Col sm={12} lg={4}>
                        <p className="heading-admin">Kérdések</p>
                        <hr />
                        {
                            questions &&
                            questions.map(quest =>
                                <div className="questions-card admin-card"
                                    key={quest._id}>
                                    <p>{quest.question}</p>
                                    <button
                                        className="admin-button"
                                        onClick={() => {
                                            setNewQuestion(false)
                                            setSelectedQuestion(
                                                questions.find(q =>
                                                    q.question === quest.question))
                                        }}>
                                        Szerkesztés
                                    </button>
                                </div>
                            )
                        }
                        <div className="admin-card questions-card">
                            <button
                                className="admin-button"
                                onClick={() => {
                                    setNewQuestion(true)
                                    setSelectedQuestion("")
                                }}>
                                Új kérdés
                            </button>
                        </div>
                    </Col>
                    <Col sm={12} lg={8} >
                        {
                            selectedQuestion &&
                            <FaqEdit
                                selectedQuestion={selectedQuestion}
                                setSelectedQuestion={setSelectedQuestion}
                                images={images}
                                setResponse={setResponse}
                            ></FaqEdit>
                        }
                        {
                            newQuestion &&
                            <FaqNew
                                images={images}
                                setNewQuestion={setNewQuestion}
                                setResponse={setResponse}>
                            </FaqNew>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="admin-card">
                            <input type="file"
                                name="upload-image"
                                id="upload-image"
                                onChange={(e) =>
                                    setNewImage(e.target.files[0])} />
                            <button
                                className="admin-button"
                                onClick={uploadImage}>
                                Feltöltés
                            </button>
                        </div>
                    </Col>
                </Row>
                {
                    response &&
                    <div className="res-msg res-msg-success">
                        {response}
                    </div>
                }
            </Container>
        </div>
    )
}

export default AdminFaq
