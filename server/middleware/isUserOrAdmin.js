const authorizer = (req, res, next) => {
    if (req.user.isAdmin || req.params.userId == req.user.id) {
        return next()
    } else {
        return res.status(403).send('You are not allowed to make this request.');

    }
}

module.exports = authorizer;