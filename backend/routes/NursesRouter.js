const express = require("express")
const router = express.Router()
const Nurse = require("../models/Nurse")

router.get("/", async (req, res) => {

    const messages = await Nurse.find()
    res.json(messages)
});

router.post("/", async (req, res) => {
    const newNurse = new Nurse(req.body)
    await newNurse.save()

    res.json({msg: "Sikeres mentés"})
})

router.put("/", async (req, res) => {
    const nurse = req.body
    const query = { _id: nurse._id}
    const newvalues = { $set: { name: nurse.name, phone: nurse.phone } }
    const resp = await Nurse.findOneAndUpdate(query, newvalues)
    if (!resp) {
        return res.status(404).json({msg: "Nem található a megadott védőnő!"})
    } 
    res.json({msg: "Sikeres mentés"})
})

router.delete("/:_id", async (req, res) => {
    const id = req.params._id
    const resp = await Nurse.findOneAndDelete({_id: id})
    if (!resp) {
        return res.status(404).json({msg: "Nem található a megadott védőnő!"})
    } 
    res.json({msg: "Sikeres mentés"})
})

module.exports = router;