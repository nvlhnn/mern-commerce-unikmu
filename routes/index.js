const router = require("express").Router();

const authRoutes = require("./api/auth");
const userRoutes = require("./api/user");
const productRoutes = require("./api/product");
const categoryRoutes = require("./api/category");
const cartRoutes = require("./api/cart");
const orderRoutes = require("./api/order");
const colorRoutes = require("./api/color");

// auth routes
router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/products", productRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/carts", cartRoutes);
router.use("/api/orders", orderRoutes);
router.use("/api/colors", colorRoutes);

// router.use("/api", router);

// router.get('api/user/stat', (req, res) => res.status(200).json('ok'))
// router.get("/api", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
