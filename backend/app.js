const express = require('express')
const cors = require('cors')
const app = express()
const loginRouter = require('./routes/LoginRouter')
const tokenRouter = require('./routes/TokenRouter')
const warningMessagesRouter = require('./routes/WarningMessagesRouter')
const nursesRouter = require('./routes/NursesRouter')
const streetsRouter = require('./routes/StreetsRouter')
const messagesRouter = require('./routes/MessagesRouter')
const consultingHoursRouter = require('./routes/ConsultingHoursRouter')
const specialDaysRouter = require('./routes/SpecialDaysRouter')

const requestHandler = require('./middlewares/requestHandler')


app.use(cors())
app.use(express.json())

app.use(requestHandler)
app.use('/api/login', loginRouter)
app.use('/api/token', tokenRouter)
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