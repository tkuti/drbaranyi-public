require('dotenv').config()
const app = require("./app.js");
const port = process.env.PORT

const mongoose = require('mongoose')

mongoose.connect( process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))



app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) }
)