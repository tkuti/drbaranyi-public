const express = require("express")
const router = express.Router()
const WarningMessages = require("../models/WarningMessages")

router.get("/", async (req, res) => {

    const messages = await WarningMessages.find()
    res.json(messages)
});

router.post("/", async (req, res) => {
    let messages = req.body

    const upserts = messages.map( msg => {
        const query = { name: msg.name }
        const newvalues = { $set: { message: msg.message, type: msg.type } }
        return WarningMessages.findOneAndUpdate(query, newvalues, {
            upsert: true,
            new: true
         })
    })

    await Promise.all(upserts)
    res.json({ msg: "Sikeres mentés" })
})

module.exports = router;