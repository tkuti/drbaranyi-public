const express = require("express")
const router = express.Router()
const Appointment = require("../models/Appointment")
const { checkUser, checkUserAdminRole } = require('../middlewares/checkAuthorization')
const checkBody = require('../middlewares/checkBody')


router.get("/:userId",
    checkUser,
    async (req, res) => {

        const userId = req.params.userId

        if (res.locals.user.userId !== userId) {
            return res.status(403).json({ msg: "Eltérő user!" })
        }

        const query = { userId: userId }
        const sort = { day: -1 }
        const appointments = await Appointment.find(query).sort(sort)

        res.json(appointments)
    }
);


router.get("/byInterval/:startDate/:endDate",
    checkUser,
    checkUserAdminRole,
    async (req, res) => {

        const query = {
            day: {
                $gte: new Date(req.params.startDate).toISOString(),
                $lte: new Date(req.params.endDate).toISOString()
            }
        }
        const appointments = await Appointment.find(query)

        res.json(appointments)
    }
);

router.get("/listTimesByDate/:date",
    checkUser,
    async (req, res) => {

        const query = {
            day: new Date(req.params.date).toISOString(),
        }

        const appointments = await Appointment.find(query)
            .select("time -_id")

        res.json(appointments.map(app => app.time))
    }
);


router.post("/",
    checkUser,
    checkBody,
    async (req, res) => {
        const newAppointment = req.body

        if ((res.locals.user.userId !== newAppointment.userId
            || res.locals.user.name !== newAppointment.userName)
            && res.locals.user.role !== "admin") {
            return res.status(403).json({ msg: "Eltérő user!" })
        }

        await new Appointment(newAppointment).save()

        res.json({ msg: "Sikeres mentés" })
    }
);


router.delete("/:_id",
    checkUser,
    async (req, res) => {

        const id = req.params._id

        const appointment = await Appointment.findOne({ _id: id })

        if (!appointment) {
            return res.status(404).json(
                { msg: "Nem található a megadott időpont!" }
            )
        }

        if (appointment.userId !== res.locals.user.userId
            && res.locals.user.role !== "admin") {
            return res.status(403).json(
                { msg: "Eltérő user!" }
            )
        }

        await Appointment.deleteOne({ _id: id })

        res.json({ msg: "Sikeres törlés" })
    }
)



module.exports = router;