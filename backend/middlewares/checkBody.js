function checkBody (req, res, next) {
    for (let key of Object.keys(req.body)) {
        if( !req.body[key] ) {
            return res.status(400).json({msg: "Hiányzó adatok!"})
        }
    }
    next()
}

module.exports = checkBody