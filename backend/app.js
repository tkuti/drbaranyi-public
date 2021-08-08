const express = require('express')
const cors = require('cors')
const app = express()
const loginRouter = require('./routes/LoginRouter')
const tokenRouter = require('./routes/TokenRouter')
const warningMessagesRouter = require('./routes/WarningMessagesRouter')
const nursesRouter = require('./routes/NursesRouter')
const streetsRouter = require('./routes/StreetsRouter')
const requestHandler = require('./middlewares/requestHandler')


app.use(cors())
app.use(express.json())

app.use(requestHandler)
app.use('/api/login', loginRouter)
app.use('/api/token', tokenRouter)
app.use('/api/warning-messages', warningMessagesRouter)
app.use('/api/nurses', nursesRouter)
app.use('/api/streets', streetsRouter)

app.get("/", async (req, res) => {
    res.send({ message: "hello" })
})




module.exports = app;