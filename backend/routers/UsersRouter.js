const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { checkUser, checkUserAdminRole} = require('../middlewares/checkAuthorization')

router.get("/", checkUser, checkUserAdminRole, async (req, res) => {

    const users = await User.find()
    res.json(users)
});


module.exports = router;