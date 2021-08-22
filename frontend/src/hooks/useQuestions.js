import { useState } from 'react'
import api from '../api/createAxiosInstance'

function useQuestions(errorHandler, successHandler, setNewQuestion) {

    const [questions, setQuestions] = useState()


    const getQuestions = () =>
        api.getQuestions()
            .then((res) => {
                setQuestions(res.data)
            })
            .catch((err) => {
                errorHandler(err)
            })

    const postQuestion = async (question) => {
        try {
            await api.postQuestion(question)
            setNewQuestion(false)
            successHandler()
        } catch (err) {
            errorHandler(err)
        }
    }

    const updateQuestion = async (questionId, question) => {

        try {
            await api.updateQuestion(questionId, question)
            successHandler()
        } catch (err) {
            errorHandler(err)
        }
    }

    
    const deleteQuestion = async (questionId) => {
        try {
            await api.deleteQuestion(questionId)
            successHandler()
        } catch (err) {
            errorHandler(err)
        }
    }


    return { questions, getQuestions, postQuestion, updateQuestion, deleteQuestion }
}

export default useQuestions
