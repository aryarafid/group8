const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");
const {
  loginValidator,
  validateRegist,
  createProductValidator
} = require("../middleware/Validator");
const {
  auth, verifyToken} = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");

router.get(
  "/products",
  // auth.verifyToken,
  productController.getProduct
);
router.post(
  "/create",
  multerUpload.single("productImg"),
  createProductValidator,
  validateRegist,
  verifyToken,
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