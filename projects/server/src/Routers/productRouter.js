const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");
const {
  loginValidator,
  validateRegist,
  createProductValidator
} = require("../middleware/Validator");
const {
  auth
} = require("../middleware/auth");

router.get(
  "/products",
  // auth.verifyToken,
  productController.getProduct
);
router.post(
  "/create",
  // createProductValidator,
  // validateRegist,
  // auth.verifyToken,
  productController.createProduct
);
router.patch(
  "/update/:id",
  // auth.verifyToken,
  productController.updateProduct
);
router.patch("/delete/:id",
  // auth.verifyToken,
  productController.deleteProduct);

module.exports = router;