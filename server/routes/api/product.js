const {
    create,
    update,
    get,
    getAll,
    destroy,
} = require('../../controllers/product.js')

const router = require('express').Router()
const middleware = require('../../middleware/')

router.get('/:id', get)
router.get('/', getAll)
router.post('/', [middleware.auth, middleware.role], create)
router.put('/:id', [middleware.auth, middleware.role], update)
router.delete('/:id', [middleware.auth, middleware.role], destroy)


module.exports = router