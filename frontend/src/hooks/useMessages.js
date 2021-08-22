import { useState } from 'react'
import api from '../api/createAxiosInstance'

function useMessages( errorHandler) {

    const [messages, setMessages] = useState()
    const [lastMessagesByUsers, setLastMessagesByUsers] = useState()


    const getMessages =  (userId) =>
        api.getMessagesByUser(userId)
            .then((res) => {
                setMessages(res.data)
            })
            .catch((err) => {
                errorHandler(err)
            })


    const getLastMessagesByUsers =  () =>
        api.getLastMessagesByUsers()
            .then((res) => {
                setLastMessagesByUsers(res.data)
            })
            .catch((err) => {
                errorHandler(err)
            })


            
    const postNewMessage = async (userId,newMessage) => {

        try {
            await api.postMessage(userId, newMessage)
            await getMessages(userId)
        } catch (err) {
            errorHandler(err)
        }

    }



    return { messages,  getMessages, lastMessagesByUsers, getLastMessagesByUsers,  postNewMessage }
}

export default useMessages
