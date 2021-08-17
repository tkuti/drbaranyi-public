const express = require('express')
const cors = require('cors')
const app = express()
const loginRouter = require('./routers/LoginRouter')
const tokenRouter = require('./routers/TokenRouter')
const usersRouter = require('./routers/UsersRouter')
const warningMessagesRouter = require('./routers/WarningMessagesRouter')
const nursesRouter = require('./routers/NursesRouter')
const streetsRouter = require('./routers/StreetsRouter')
const messagesRouter = require('./routers/MessagesRouter')
const consultingHoursRouter = require('./routers/ConsultingHoursRouter')
const specialDaysRouter = require('./routers/SpecialDaysRouter')
const appointmentsRouter = require('./routers/AppointmentsRouter')
const questionsRouter = require('./routers/QuestionsRouter')
const imagesRouter = require('./routers/ImagesRouter')
const docsRouter = require('./routers/DocsRouter')

const requestHandler = require('./middlewares/requestHandler')


app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))
app.use(requestHandler)


app.use('/api/login', loginRouter)
app.use('/api/token', tokenRouter)
app.use('/api/users', usersRouter)
app.use('/api/warning-messages', warningMessagesRouter)
app.use('/api/nurses', nursesRouter)
app.use('/api/streets', streetsRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/consulting-hours', consultingHoursRouter)
app.use('/api/special-days', specialDaysRouter)
app.use('/api/appointments', appointmentsRouter)
app.use('/api/questions', questionsRouter)
app.use('/api/images', imagesRouter)
app.use('/api/docs', docsRouter)





module.exports = app;