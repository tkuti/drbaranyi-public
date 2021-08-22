import { useState, useEffect } from 'react'
import api from '../api/createAxiosInstance'

function useMessages(user, errorHandler, setNewMessage) {

    const [messages, setMessages] = useState()


    const getMessages =  () =>
        api.getMessagesByUser(user.userId)
            .then((res) => {
                setMessages(res.data)
            })
            .catch((err) => {
                errorHandler(err)
            })


    const postNewMessage = async (message) => {

        const newMessage = {
            userId: user.userId,
            type: "question",
            userName: user.name,
            date: new Date(),
            message: message,
            creatorId: user.userId
        }

        try {
            await api.postMessage(user.userId, newMessage)
            await getMessages()
            setNewMessage("")
        } catch (err) {
            errorHandler(err)
        }

    }

    useEffect(() => {
        getMessages()
    }, [])




    return { messages, postNewMessage }
}

export default useMessages
