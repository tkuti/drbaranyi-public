import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FaqEdit from './FaqEdit'
import FaqNew from './FaqNew'
import UserContext from '../../../contexts/userContext'
import useQuestions from '../../../hooks/useQuestions'
import useImages from '../../../hooks/useImages'

function AdminFaq() {

    const { errorHandler, successHandler} = useContext(UserContext)
    const {questions, getQuestions} = useQuestions(errorHandler)
    const { images, postImage} = useImages(errorHandler, successHandler)
    const [selectedQuestion, setSelectedQuestion] = useState("")
    const [newImage, setNewImage] = useState()
    const [newQuestion, setNewQuestion] = useState(false)


    useEffect(() => {
        getQuestions()
    }, [])


    const uploadImage = async () => {
        const fd = new FormData()
        fd.append('image', newImage)
        postImage(fd)
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
                                getQuestions={getQuestions}
                            ></FaqEdit>
                        }
                        {
                            newQuestion &&
                            <FaqNew
                                images={images}
                                setNewQuestion={setNewQuestion}
                                getQuestions={getQuestions}>
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
            </Container>
        </div>
    )
}

export default AdminFaq
