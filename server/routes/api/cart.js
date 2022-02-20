const {
    add,
    update,
    get,
    destroy,
    destroyProduct,
} = require('../../controllers/cart.js')

const router = require('express').Router()
const middleware = require('../../middleware')

router.post('/', [middleware.auth], add)
router.put('/', [middleware.auth], update)
router.get('/', [middleware.auth], get)
router.delete('/:productId', [middleware.auth], destroyProduct)
router.delete('/', [middleware.auth], destroy)


module.exports = router