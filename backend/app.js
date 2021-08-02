const express = require('express')
const cors = require('cors')
const app = express()
const warningMessagesRoutes = require('./routes/WarningMessagesRoutes')


app.use(cors())
app.use(express.json())
app.use('/api/warning-messages', warningMessagesRoutes)

app.get("/", async (req, res) => {
    res.send({ message: "hello" })
})




module.exports = app;