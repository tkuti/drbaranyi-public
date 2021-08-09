const jwt = require('jsonwebtoken')
require('dotenv').config()

const requestHandler = (req, res, next) => {

    jwt.verify(req.header('authorization'), process.env.JWT_SECRET, async (err, authData) => {
        if (err) {
            console.log(err)
            next()
        } else {
            res.locals.user = authData
            next()
        }
      })
}

module.exports = requestHandler