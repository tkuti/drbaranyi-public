const express = require("express")
const router = express.Router()
const WarningMessages = require("../models/WarningMessage")
const { checkUser, checkUserAdminRole } = require('../middlewares/checkAuthorization')

router.get("/", async (req, res) => {

    const messages = await WarningMessages.find()
    res.json(messages)
});


router.post("/",
    checkUser,
    checkUserAdminRole,
    async (req, res) => {

        let messages = req.body

        const upserts = messages.map(msg => {
            const query = { name: msg.name }
            const newvalues = { $set: { message: msg.message } }
            return WarningMessages.findOneAndUpdate(query, newvalues, {
                upsert: true,
                new: true
            })
        })

        await Promise.all(upserts)

        res.json({ msg: "Sikeres mentés" })
    })

module.exports = router;