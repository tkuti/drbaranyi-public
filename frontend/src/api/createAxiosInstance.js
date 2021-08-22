import axios from 'axios'

const createInstance = () => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_URL}/api`,
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

    const postNurse = ( nurse ) => {
        return instance.post(`/nurses`, nurse)
    }

    const updateNurse = (nurseId, nurse) => {
        return instance
        .put(`/nurses/${nurseId}`, nurse)
    }

    const deleteNurse = (nurseId) => {
        return instance
        .delete(`/nurses/${nurseId}`)
    }

    const getQuestions = () => {
        return instance
        .get(`/questions`)
    }

    const postQuestion = ( question ) => {
        return instance.post(`/questions`, question)
    }

    const updateQuestion = (questionId, question) => {
        return instance
        .put(`/questions/${questionId}`, question)
    }

    const deleteQuestion = (questionId) => {
        return instance
        .delete(`/questions/${questionId}`)
    }

    const getImages = () => {
        return instance
        .get(`/images`)
    }

    const postImage = ( image ) => {
        return instance.post(`/images`, image)
    }

    const getMessagesByUser = (userId) => {
        return instance
        .get(`/messages/byuser/${userId}`)
    }

    const getLastMessagesByUsers = () => {
        return instance
        .get(`/messages/lastMessageByUsers`)
    }

    const postMessage = (userId, message) => {
        return instance.post(`/messages/${userId}`, message)
    }

    const getConsultingHours = () => {
        return instance
        .get(`/consulting-hours`)
    }

    const getSpecialDay = (date) => {
        return instance
        .get(`/special-days/${date}`)
    }

    const getSpecialDays = (startDate, endDate) => {
        return instance
        .get(`/special-days/${startDate}/${endDate}`)
    }

    const postSpecialDay = (specialDay) => {
        return instance.post(`/special-days`, specialDay)
    }

    const getAppointments = (startDate, endDate) => {
        return instance
        .get(`/appointments/byInterval/${startDate}/${endDate}`)
    }

    const getAppointmentsByUser = (userId) => {
        return instance
        .get(`/appointments/${userId}`)
    }

    const getReservedTimesByDate = (date) => {
        return instance
        .get(`/appointments/listTimesByDate/${date}`)
    }

    const postAppointment = (appointment) => {
        return instance.post(`/appointments/`, appointment)
    }

    const deleteAppointment = (appointmentId) => {
        return instance
        .delete(`/appointments/${appointmentId}`)
    }

    const getUsers = () => {
        return instance
        .get(`/users`)
    }

    return { 
        setTokenInAxiosHeader, removeTokenFromAxiosHeader, checkJwtToken, login, getWarningMessages, postWarningMessages, getStreets, postStreet, updateStreet, deleteStreet, getNurses, postNurse, updateNurse, deleteNurse, getQuestions, postQuestion, updateQuestion, deleteQuestion, getImages, postImage,  
        getMessagesByUser, getLastMessagesByUsers, postMessage, getConsultingHours, getSpecialDay, getSpecialDays, postSpecialDay, getAppointments, getAppointmentsByUser, getReservedTimesByDate, postAppointment, deleteAppointment, getUsers }
}

export default createInstance()

