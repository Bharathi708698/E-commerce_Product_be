const router = require("express").Router();
const {
  GetProducts,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/productControllers");
const Auth = require("../middleware/Auth");

router.route("/").get(Auth, GetProducts);
router.route("/:id").get(Auth, GetProducts);
router.route("/").post(Auth, CreateProduct);
router.route("/:id").put(Auth, UpdateProduct);
router.route("/:id").delete(Auth, DeleteProduct);

module.exports = router;
