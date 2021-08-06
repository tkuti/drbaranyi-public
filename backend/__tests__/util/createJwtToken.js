require('dotenv').config({ path: '.env.test' })
const jwt = require('jsonwebtoken')

function createJwtAdminToken () {
    const adminToken = jwt.sign({
        userId: "123456789",
        email: "teszt@teszt.hu",
        name: "Test User",
        role: "admin"
      }, process.env.JWT_SECRET)

      return adminToken
}


function createJwtUserToken () {
    const userToken = jwt.sign({
        userId: "123456789",
        email: "teszt@teszt.hu",
        name: "Test User",
        role: "user"
      }, process.env.JWT_SECRET)

      return userToken
}

module.exports = {
    createJwtAdminToken,
    createJwtUserToken
}