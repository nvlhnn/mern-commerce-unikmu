const router = require('express').Router();

const authRoutes = require('./api/auth');
const userRoutes = require('./api/user');
const productRoutes = require('./api/product');
const categoryRoutes = require('./api/category');
const cartRoutes = require('./api/Cart');


// auth routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);



router.use('/api', router)
// router.get('api/user/stat', (req, res) => res.status(200).json('ok'))
router.get('/api', (req, res) => res.status(404).json('No API route found'));

module.exports = router;