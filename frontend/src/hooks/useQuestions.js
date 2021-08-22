import { useState, useEffect } from 'react'
import api from '../api/createAxiosInstance'

function useQuestions ( errorHandler) {

    const [questions, setQuestions] = useState()


    const getQuestions =  () =>
        api.getQuestions()
            .then((res) => {
                setQuestions(res.data)
            })
            .catch((err) => {
                errorHandler(err)
            })


    useEffect(() => {
        getQuestions()
    }, [])



    return { questions }
}

export default useQuestions
