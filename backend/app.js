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

const requestHandler = require('./middlewares/requestHandler')


app.use(cors())
app.use(express.json())

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

app.get("/", async (req, res) => {
    res.send({ message: "hello" })
})




module.exports = app;