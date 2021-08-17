const express = require("express")
const router = express.Router()
const { checkUser, checkUserAdminRole } = require('../middlewares/checkAuthorization')
const fs = require('fs')
const uploads = require('../config/multerConfig')


router.get("/",
    async (req, res) => {

        const images = fs.readdirSync('./uploads')

        res.json(images)
    }
);


router.post("/",
    checkUser,
    checkUserAdminRole,
    uploads.single('image'), (req, res) => {
        const image = req.file.path
        res.json({ msg: "Sikeres mentés" })
    }
);





module.exports = router;