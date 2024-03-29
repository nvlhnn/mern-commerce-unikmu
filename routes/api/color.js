const {
  create,
  update,
  get,
  getAll,
  destroy,
} = require("../../controllers/color.js");

const router = require("express").Router();
const middleware = require("../../middleware");

router.post("/", [middleware.auth, middleware.isAdmin], create);
router.get("/:id", get);
router.get("/", getAll);
router.put("/:id", [middleware.auth, middleware.isAdmin], update);
router.delete("/:id", [middleware.auth, middleware.isAdmin], destroy);

module.exports = router;
