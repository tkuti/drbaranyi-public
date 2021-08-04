const express = require("express")
const router = express.Router()
const axios = require('axios')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()


router.post("/", getGoogleToken, checkUser, createJwtToken);


async function getGoogleToken(req, res, next) {
    const code = req.body.code
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const data = new URLSearchParams({
        'code': code,
        'client_id': process.env.GOOGLE_CLIENT_ID,
        'client_secret': process.env.GOOGLE_SECRET,
        'redirect_uri': process.env.GOOGLE_REDIRECT_URI,
        'grant_type': 'authorization_code'
    })
    try {
        const response = await axios.post(
            "https://oauth2.googleapis.com/token", data, headers
        )
        res.locals.token = response.data.id_token
        next()
    } catch (error) {
        res.status(404).json({
            msg: 'Authentication failed!',
        })
    }
}

async function checkUser(req, res, next) {
    const { name, email, sub } = jwt.decode(res.locals.token)

    const foundUser = await User.findOne({ userId: sub })

    if (!foundUser) {
        const user = {
            name: name,
            email: email,
            userId: sub,
            role: "user"
        }
        const newUser = new User(user)
        res.locals.user = await newUser.save()
        next()
    } else {
        res.locals.user = foundUser.toJSON()
        next()
    }
}

async function createJwtToken(req, res) {

    jwt.sign(res.locals.user, process.env.JWT_SECRET, { expiresIn: '8h' },
        function (err, token) {
            if (err) {
                res.status(404).json({
                    msg: 'Authorization failed!',
                })
            } else {
                res.json({ authorization: token })
            }
        })
}



module.exports = router;