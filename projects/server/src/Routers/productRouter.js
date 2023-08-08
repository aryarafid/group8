const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");
const {
  loginValidator,
  validateRegist,
  createProductValidator
} = require("../middleware/Validator");
const {
  auth, verifyToken } = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");

router.get(
  "/products",
  // verifyToken,
  productController.getProduct
);
router.get(
  "/products2",
  // verifyToken,
  productController.getProduct2
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
  multerUpload.single("productImg"),
  verifyToken,
  productController.updateProduct
);
router.patch("/delete/:id",
  verifyToken,
  productController.deleteProduct
);
router.patch("/activate/:id",
  verifyToken,
  productController.activateProduct
);

module.exports = router;