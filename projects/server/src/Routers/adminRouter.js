const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
const {
  loginValidator,
  validateRegist,
  createCashierValidator,
} = require("../middleware/Validator");
const {
  auth, verifyToken
} = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");

router.get(
  "/",
  // auth.verifyToken,
  adminController.getCashier
);
router.get(
  "/:id",
  verifyToken,
  adminController.getCashierById
);
router.post(
  "/create",
  multerUpload.single("imgProfile"),
  createCashierValidator,
  validateRegist,
  verifyToken,
  adminController.createCashier
);
router.patch(
  "/update/:id",
  verifyToken,
  adminController.updateCashier
);
router.patch("/delete/:id",
  verifyToken,
  adminController.deleteCashier);
router.patch("/undelete/:id",
  verifyToken,
  adminController.undeleteCashier);

module.exports = router;