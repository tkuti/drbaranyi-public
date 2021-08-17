const express = require("express")
const router = express.Router()
const Nurse = require("../models/Nurse")
const { checkUser, checkUserAdminRole } = require('../middlewares/checkAuthorization')
const checkBody = require('../middlewares/checkBody')

router.get("/", async (req, res) => {

    const nurses = await Nurse.find()
    res.json(nurses)
});


router.post("/",
    checkUser,
    checkUserAdminRole,
    checkBody,
    async (req, res) => {

        const newNurse = new Nurse(req.body)
        await newNurse.save()

        res.json({ msg: "Sikeres mentés" })
    })


router.put("/:_id",
    checkUser,
    checkUserAdminRole,
    checkBody,
    async (req, res) => {

        const query = { _id: req.params._id }
        const newvalues = { $set: req.body }
        const resp = await Nurse.findOneAndUpdate(query, newvalues)
        if (!resp) {
            return res.status(404).json({ msg: "Nem található a megadott védőnő!" })
        }
        res.json({ msg: "Sikeres mentés" })
    })


router.delete("/:_id",
    checkUser,
    checkUserAdminRole,
    async (req, res) => {

        const id = req.params._id
        const resp = await Nurse.findOneAndDelete({ _id: id })
        if (!resp) {
            return res.status(404).json({ msg: "Nem található a megadott védőnő!" })
        }
        res.json({ msg: "Sikeres törlés" })
    })


module.exports = router;