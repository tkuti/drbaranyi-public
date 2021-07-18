const app = require("./index.js");
const port = 5000

const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://drbaranyi:drbaranyi@cluster0.zbddu.mongodb.net/drbaranyi?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))



app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) }
)