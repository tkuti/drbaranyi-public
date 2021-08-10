const express = require("express")
const router = express.Router()
const SpecialDay = require("../models/SpecialDay")
const { checkUser, checkUserAdminRole } = require('../middlewares/checkAuthorization')

router.get("/:day", checkUser, async (req, res) => {

    const query = { day: new Date(req.params.day).toISOString() }
    const specialDay = await SpecialDay.findOne(query)

    res.json(specialDay)
});


router.get("/:startDate/:endDate", checkUser, async (req, res) => {

    const query = { day: {
        $gte: new Date(req.params.startDate).toISOString(),
        $lte: new Date(req.params.endDate).toISOString()
    }}
    const specialDays = await SpecialDay.find(query)

    res.json(specialDays)
});


router.post("/", checkUser, checkUserAdminRole, async (req, res) => {
    let newSpecialDay = req.body

    const query = { day: newSpecialDay.day }
    const newvalues = { $set: { type: newSpecialDay.type, newDay: newSpecialDay.newDay } }
    const options = { upsert: true };
    await SpecialDay.findOneAndUpdate(query, newvalues, options)

    res.json({ msg: "Sikeres mentés"})
});


module.exports = router;