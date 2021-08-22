import { useState, useEffect } from 'react'
import api from '../api/createAxiosInstance'

function useWarningMessages(type, successHandler, errorHandler) {

    const [messages, setMessages] = useState()


    const getWarningMessages = () =>
        api.getWarningMessages()
            .then((res) => {
                setMessages(res.data.filter(msg =>
                    msg.name.includes(type)))
            })
            .catch((err) => {
                errorHandler(err)
            })


    const postWarningMessages = async (messages) => {

        try {
            await api.postWarningMessages(messages)
            await getWarningMessages()
            successHandler()
        } catch (err) {
            errorHandler(err)
        }

    }

    useEffect(() => {
        getWarningMessages()
    }, [])



    return { messages, setMessages, postWarningMessages }
}

export default useWarningMessages