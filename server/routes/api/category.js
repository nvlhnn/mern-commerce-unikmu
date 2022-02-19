const {
    create,
    update,
    get,
    getAll,
    destroy,
} = require('../../controllers/category.js')

const router = require('express').Router()
const middleware = require('../../middleware')

router.post('/', [middleware.auth, middleware.role], create)
router.get('/:slug', get)
router.get('/', getAll)
router.put('/:id', [middleware.auth, middleware.role], update)
router.delete('/:id', [middleware.auth, middleware.role], destroy)


module.exports = router