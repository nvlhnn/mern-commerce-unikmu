const {
    update,
    getById,
    getAll,
    getStat,
} = require('../../controllers/user.js')

const router = require('express').Router()
const middleware = require('../../middleware')

router.get('/stat', [middleware.auth], getStat)
router.get('/:id', [middleware.auth, middleware.isAdmin], getById)
router.get('/', [middleware.auth, middleware.isAdmin], getAll)
router.put('/', [middleware.auth], update)
// router.get('/:id', get)
// router.delete('/:id', deleteu)

module.exports = router