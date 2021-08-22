import axios from 'axios'

const createInstance = () => {

    const instance = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${localStorage.getItem('authorization')}`
        }
    })


    const setTokenInAxiosHeader = (token) => {
        instance.defaults.headers['authorization'] = token
    }

    const removeTokenFromAxiosHeader = () => {
        instance.defaults.headers['authorization'] = ""
    }

    const checkJwtToken = () => {
        return instance
        .get(`/token`)
    }

    const login = () => {
        const windowUrl = new URL(window.location.href)
        const code = windowUrl.searchParams.get('code')
        return instance.post('/login', { code })
    }
    
    const getWarningMessages = () => {
        return instance
        .get(`/warning-messages`)
    }

    const postWarningMessages = ( messages) => {
        return instance.post(`/warning-messages`, messages)
    }

    const getStreets = () => {
        return instance
        .get(`/streets`)
    }

    const postStreet = ( street ) => {
        return instance.post(`/streets`, street)
    }

    const updateStreet = (streetId, street) => {
        return instance
        .put(`/streets/${streetId}`, street)
    }

    const deleteStreet = (streetId) => {
        return instance
        .delete(`/streets/${streetId}`)
    }

    const getNurses = () => {
        return instance
        .get(`/nurses`)
    }

    const getQuestions = () => {
        return instance
        .get(`/questions`)
    }

    const getMessagesByUser = (userId) => {
        return instance
        .get(`/messages/byuser/${userId}`)
    }

    const postMessage = (userId, message) => {
        return instance.post(`/messages/${userId}`, message)
    }

    return { 
        setTokenInAxiosHeader, removeTokenFromAxiosHeader, checkJwtToken, login, getWarningMessages, postWarningMessages, getStreets, postStreet, updateStreet, deleteStreet, getNurses, getQuestions, 
        getMessagesByUser, postMessage }
}

export default createInstance()

