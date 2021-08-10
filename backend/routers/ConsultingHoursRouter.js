const express = require("express")
const router = express.Router()
const ConsultingHours = require("../models/ConsultingHours")
const { checkUser } = require('../middlewares/checkAuthorization')

router.get("/", checkUser, async (req, res) => {

    const consultingHours = await ConsultingHours.find()
    res.json(consultingHours)
});


module.exports = router;