const express = require('express')
const cors = require('cors')
const app = express()
const loginRouter = require('./routes/LoginRouter')
const warningMessagesRouter = require('./routes/WarningMessagesRouter')
const nursesRouter = require('./routes/NursesRouter')
const streetsRouter = require('./routes/StreetsRouter')


app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/warning-messages', warningMessagesRouter)
app.use('/api/nurses', nursesRouter)
app.use('/api/streets', streetsRouter)

app.get("/", async (req, res) => {
    res.send({ message: "hello" })
})




module.exports = app;