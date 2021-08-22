const express = require("express")
const router = express.Router()
const Message = require("../models/Message")
const { checkUser, checkUserAdminRole } = require('../middlewares/checkAuthorization')
const checkBody = require('../middlewares/checkBody')


router.post("/:userId",
    checkUser,
    checkBody,
    async (req, res) => {

        const userId = req.params.userId

        if (res.locals.user.userId !== userId &&
            res.locals.user.role !== "admin") {
            return res.status(403).json({ msg: "Eltérő user!" })
        }

        const message = new Message(req.body)
        await message.save()

        res.json({ msg: "Sikeres mentés" })
    });


router.get("/byuser/:userId",
    checkUser,
    async (req, res) => {

        const userId = req.params.userId

        if (res.locals.user.userId !== userId &&
            res.locals.user.role !== "admin") {
            return res.status(403).json({ msg: "Eltérő user!" })
        }
        const query = { userId: userId }
        const sort = { date: -1 };
        const messages = await Message.find(query).sort(sort)

        res.json(messages)
    });



router.get("/lastMessageByUsers",
    checkUser,
    checkUserAdminRole,
    async (req, res) => {

        const lastMessageByUsers = await Message.aggregate([
            {
                $group: {
                    _id: "$userId",
                    userName: { $first: "$userName" },
                    lastmessageType: { $last: "$type" },
                    newest: { $max: "$date" }
                }
            },
            {
                $sort: { newest: -1 }
            }
        ])

        res.json(lastMessageByUsers)
    })


module.exports = router;