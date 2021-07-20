const express = require("express")
const router = express.Router()
const WarningMessages = require("../models/WarningMessages")

router.get("/", async (req, res) => {

    const messages = await WarningMessages.find()
    res.json(messages)
});

router.post("/", async (req, res) => {
    let messages = req.body

    for (let msg of messages) {
            const query = { name: msg.name }
            const newvalues = { $set: { message: msg.message, type: msg.type } }
            await WarningMessages.findOneAndUpdate(query, newvalues, {
                upsert: true,
                new: true
             })
    }
    res.json({ success: true })
})

module.exports = router;