const express = require("express")
const router = express.Router()
const Question = require("../models/Question")
const { checkUser, checkUserAdminRole } = require('../middlewares/checkAuthorization')
const checkBody = require('../middlewares/checkBody')


router.get("/",
    async (req, res) => {

        const questions = await Question.find()

        res.json(questions)
    }
);


router.post("/",
    checkUser,
    checkUserAdminRole,
    async (req, res) => {
        const newQuestion = req.body

        await new Question(newQuestion).save()

        res.json({ msg: "Sikeres mentés" })
    }
);


router.put("/:_id",
    checkUser,
    checkUserAdminRole,
    async (req, res) => {

        const query = { _id: req.params._id }
        const newvalues = { $set: req.body }
        const resp = await Question.findOneAndUpdate(query, newvalues)
        if (!resp) {
            return res.status(404).json({ msg: "Nem található a megadott kérdés!" })
        }
        res.json({ msg: "Sikeres mentés" })
    })


router.delete("/:_id",
    checkUser,
    checkUserAdminRole,
    async (req, res) => {

        const id = req.params._id

        const resp = await Question.findOneAndDelete({ _id: id })

        if (!resp) {
            return res.status(404).json({ msg: "Nem található a megadott kérdés!" })
        }
        res.json({ msg: "Sikeres törlés" })
    }
)


module.exports = router;