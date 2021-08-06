function checkUser (req, res, next) {
    if (!res.locals.user) {
        res.status(401).json({msg: "Nem azonosítható küldő (hiányzó, hibás vagy lejárt token!"} )
    } else {
        next()
    }
}

function checkUserAdminRole (req, res, next) {
    if (res.locals.user.role !== "admin") {
        res.status(403).json({msg: "Nem megfelelő jogosultság!"} )
    } else {
        next()
    }
}

module.exports = {
    checkUser,
    checkUserAdminRole
}