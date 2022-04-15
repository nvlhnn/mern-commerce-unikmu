const router = require("express").Router();

const authRoutes = require("./api/auth");
const userRoutes = require("./api/user");
const productRoutes = require("./api/product");
const categoryRoutes = require("./api/category");
const cartRoutes = require("./api/Cart");
const orderRoutes = require("./api/Order");
const colorRoutes = require("./api/Color");

// auth routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/carts", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/colors", colorRoutes);

router.use("/api", router);

// router.get('api/user/stat', (req, res) => res.status(200).json('ok'))
router.get("/api", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
