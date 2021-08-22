import React, { useContext } from 'react'
import axios from 'axios'
import UrlContext from '../../../contexts/urlContext'

function AdminFaqEdit({ selectedQuestion, setSelectedQuestion, images, setResponse }) {

    const url = useContext(UrlContext)


    const handleDataChange = (e) => {
        if (e.target.name.includes("img")) {
            const imgIndex = Number(e.target.name.slice(3, 4))
            const newImgArray = selectedQuestion.img.map((img, i) =>
                i === imgIndex ? e.target.value : img)
            setSelectedQuestion({ ...selectedQuestion, img: newImgArray })
        } else {
            setSelectedQuestion({
                ...selectedQuestion,
                [e.target.name]: e.target.value
            })
        }
    }


    const updateQuestion = () => {

        axios.put(`${url}/questions/${selectedQuestion._id}`, selectedQuestion,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`
                },
            })
            .then((res) => {
                setResponse(res.data.msg)
                setSelectedQuestion("")
                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
            .catch((err) => {
                setResponse(err.response.data.msg)
            })
    }


    const deleteQuestion = () => {
        axios.delete(`${url}/questions/${selectedQuestion._id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('authorization')}`
                },
            })
            .then((res) => {
                setResponse(res.data.msg)
                setSelectedQuestion("")
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
            <p className="heading-admin">Szerkesztés</p>
            <input type="text" name="question"
                value={selectedQuestion.question}
                onChange={handleDataChange} />
            <hr />
            <textarea name="answer" id="answer"
                cols="30" rows="10"
                value={selectedQuestion.answer}
                onChange={handleDataChange}>
            </textarea>
            <hr />
            <p className="edit-heading">Képek</p>
            <div className="question-images">
                <select name="img0" id="img0"
                    value={selectedQuestion.img
                        ? selectedQuestion.img[0]
                        : "none"}
                    onChange={handleDataChange}>
                    <option value="">-</option>
                    {images &&
                        images.map((img, i) =>
                            <option key={i} value={img}>
                                {img}
                            </option>
                        )
                    }
                </select>
                <select name="img1" id="img1"
                    value={selectedQuestion.img &&
                        selectedQuestion.img.length > 1
                        ? selectedQuestion.img[1]
                        : "none"}
                    onChange={handleDataChange}>
                    <option value="">-</option>
                    {images &&
                        images.map((img, i) =>
                            <option key={i} value={img}>
                                {img}
                            </option>
                        )
                    }
                </select>
            </div>
            <hr />
            <div className="question-video">
                <p className="edit-heading">Videó</p>
                <input type="text"
                    placeholder="Videó link"
                    name="video"
                    value={selectedQuestion.video && selectedQuestion.video}
                    onChange={handleDataChange} />
            </div>
            <div className="edit-buttons">
                <button className="admin-button save-btn"
                    onClick={updateQuestion}>
                    Mentés
                </button>
                <button className="admin-button delete-btn"
                    onClick={deleteQuestion}>
                    Törlés
                </button>
            </div>
        </div>

    )
}

export default AdminFaqEdit
