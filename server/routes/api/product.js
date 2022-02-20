const {
    create,
    update,
    get,
    getAll,
    destroy,
} = require('../../controllers/product.js')

const router = require('express').Router()
const middleware = require('../../middleware')

router.get('/:id', get)
router.get('/', getAll)
router.post('/', [middleware.auth, middleware.isAdmin], create)
router.put('/:id', [middleware.auth, middleware.isAdmin], update)
router.delete('/:id', [middleware.auth, middleware.isAdmin], destroy)


module.exports = router