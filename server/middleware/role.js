const checkRole = (req, res, next) => {
    if (req.user.isAdmin) {
        return next()
    } else {
        return res.status(403).send('You are not allowed to make this request.');

    }
}

module.exports = checkRole;