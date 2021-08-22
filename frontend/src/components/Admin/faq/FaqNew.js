import React, { useState, useContext } from 'react'
import axios from 'axios'
import UrlContext from '../../../contexts/urlContext'

function AdminFaqNew({ images, setNewQuestion, setResponse }) {

    const [question, setQuestion] = useState({
        question: "",
        answer: "",
        img: ["", ""],
        video: ""
    })
    const url = useContext(UrlContext)


    const handleDataChange = (e) => {
        if (e.target.name.includes("img")) {
            const imgIndex = Number(e.target.name.slice(3, 4))
            const newImgArray = question.img.map((img, i) =>
                i === imgIndex ? e.target.value : img)
            setQuestion({ ...question, img: newImgArray })
        } else {
            setQuestion({ ...question, [e.target.name]: e.target.value })
        }
    }

    const insertNewQuestion = () => {
        axios.post(`${url}/questions`, question,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`
                },
            })
            .then((res) => {
                setResponse(res.data.msg)
                setNewQuestion(false)
                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
            .catch((err) => {
                setResponse(err.response.data.msg)
            })
    }

    return (
        <div className="edit-question">
            <p className="heading">Új kérdés</p>
            <input type="text" name="question"
                placeholder="Kérdés"
                onChange={handleDataChange} />
            <hr />
            <textarea name="answer" id="answer"
                cols="30" rows="10"
                placeholder="Válasz"
                onChange={handleDataChange}>
            </textarea>
            <hr />
            <p className="edit-heading">Képek</p>
            <div className="question-images">
                <select name="img0" id="img0"
                    onChange={handleDataChange}>
                    <option value="">-</option>
                    {images &&
                        images.map((img, i) =>
                            <option key={i} value={img}>{img}</option>
                        )
                    }
                </select>
                <select name="img1" id="img1"
                    onChange={handleDataChange}>
                    <option value="">-</option>
                    {images &&
                        images.map((img, i) =>
                            <option key={i} value={img}>{img}</option>
                        )
                    }
                </select>
            </div>
            <hr />
            <div className="question-video">
                <p className="edit-heading">Videó</p>
                <input type="text" placeholder="Videó link" name="video"
                    onChange={handleDataChange} />
            </div>
            <div className="edit-buttons">
                <button className="admin-button save-btn"
                    onClick={insertNewQuestion}>
                    Mentés
                </button>
                <button className="admin-button"
                    onClick={() => setNewQuestion(false)}>
                    Mégse
                </button>
            </div>
        </div>
    )
}

export default AdminFaqNew
