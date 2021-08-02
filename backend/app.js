const express = require('express')
const cors = require('cors')
const app = express()
const warningMessagesRouter = require('./routes/WarningMessagesRouter')
const nursesRouter = require('./routes/NursesRouter')


app.use(cors())
app.use(express.json())
app.use('/api/warning-messages', warningMessagesRouter)
app.use('/api/nurses', nursesRouter)

app.get("/", async (req, res) => {
    res.send({ message: "hello" })
})




module.exports = app;