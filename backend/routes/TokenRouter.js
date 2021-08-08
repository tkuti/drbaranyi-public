const express = require("express")
const router = express.Router()
const { checkUser } = require('../middlewares/checkAuthorization')

router.get("/", checkUser, (req, res) => {
    res.json(res.locals.user)
})


module.exports = router;