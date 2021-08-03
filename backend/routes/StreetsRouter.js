const express = require("express")
const router = express.Router()
const Street = require("../models/Street")

router.get("/", async (req, res) => {

    const streets = await Street.find()
    res.json(streets)
});

router.post("/", async (req, res) => {
    const newStreet = new Street(req.body)
    await newStreet.save()

    res.json({msg: "Sikeres mentés"})
})

router.put("/:_id", async (req, res) => {
    const query = { _id: req.params._id}
    const newvalues = { $set: req.body}
    const resp = await Street.findOneAndUpdate(query, newvalues)
    if (!resp) {
        return res.status(404).json({msg: "Nem található a megadott utca!"})
    } 
    res.json({msg: "Sikeres mentés"})
})

router.delete("/:_id", async (req, res) => {
    const id = req.params._id
    const resp = await Street.findOneAndDelete({_id: id})
    if (!resp) {
        return res.status(404).json({msg: "Nem található a megadott utca!"})
    } 
    res.json({msg: "Sikeres mentés"})
})

module.exports = router;