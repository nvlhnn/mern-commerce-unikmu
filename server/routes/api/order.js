const {
  create,
  get,
  getAll,
  update,
  destroy,
  income,
  generateMidtransToken,
  getById,
} = require("../../controllers/order.js");

const { notification } = require("../../config/midtrans.js");

const router = require("express").Router();
const middleware = require("../../middleware");

router.post("/notification", notification);
router.post(
  "/generate-token-midtrans",
  [middleware.auth],
  generateMidtransToken
);
router.post("/", [middleware.auth], create);
router.put("/:id", [middleware.auth, middleware.isAdmin], update);
router.get("/:userId", [middleware.auth, middleware.isUserOrAdmin], get);
router.get(
  "/:userId/:orderId",
  [middleware.auth, middleware.isUserOrAdmin],
  getById
);
router.get("/", [middleware.auth, middleware.isAdmin], getAll);
router.get("/income", [middleware.auth, middleware.isAdmin], income);
router.delete(
  "/:userId/:orderId",
  [middleware.auth, middleware.isUserOrAdmin],
  destroy
);

module.exports = router;
