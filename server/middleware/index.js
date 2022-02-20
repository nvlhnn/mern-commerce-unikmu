const isAdmin = require('./index.js')
const auth = require('./auth.js')
const isUserOrAdmin = require('./isUserOrAdmin.js')

module.exports = {
    isAdmin,
    auth,
    isUserOrAdmin
}