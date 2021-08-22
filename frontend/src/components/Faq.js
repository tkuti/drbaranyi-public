import React, { useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserContext from '../contexts/userContext'
import useQuestions from '../hooks/useQuestions'


function Faq() {

    const { errorHandler } = useContext(UserContext)
    const { questions } = useQuestions(errorHandler)
    const [selectedQuestion, setSelectedQuestion] = useState("")


    const getVideoId = (link) => {
        return link.split('=')[1]
    }


    return (
        <>
            <div id="background-color3" className="background"></div>
            <div className="faq">
                <Container>
                    <Row>
                        <Col sm={12} lg={4}>
                            <div className="card-box">
                                <p className="heading">
                                    Gyakori kérdések
                                </p>
                            </div>
                            <hr />
                            <div className="card-box">
                                {
                                    questions &&
                                    questions.map((quest, index) =>
                                        <button className="button" key={index}
                                            onClick={() => setSelectedQuestion(questions.find(q =>
                                                q.question === quest.question))}>
                                            {quest.question}
                                        </button>
                                    )
                                }
                            </div>
                        </Col>
                        {
                            selectedQuestion &&
                            <Col sm={12} lg={8}>
                                <div className="card-box">
                                    <p className="heading">
                                        {selectedQuestion.question}
                                    </p>
                                </div>
                                <hr />
                                <div className="card-box">
                                    <Row>
                                        <Col sm={12} lg={12}>
                                            <div className="answer">
                                                {
                                                    selectedQuestion.video
                                                    && <iframe allow="autoplay; encrypted-media" allowFullScreen="" frameBorder="0" height="210" src={`https://www.youtube.com/embed/${getVideoId(selectedQuestion.video)}`}
                                                        width="380" title={selectedQuestion.question}></iframe>

                                                }
                                                {
                                                    selectedQuestion.img
                                                        .filter(img => img)
                                                        .map((img, i) =>
                                                            <img src={`${process.env.REACT_APP_URL}/${img}`} alt="pic" key={i} />
                                                        )
                                                }
                                                {
                                                    selectedQuestion.answer.split("\n").map((line, index) =>
                                                        <p key={index}>{line}</p>
                                                    )
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        }
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Faq
