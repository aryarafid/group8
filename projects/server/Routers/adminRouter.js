const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
const {
  loginValidator,
  validateRegist,
  createCashierValidator,
} = require("../middleware/Validator");
const {
  auth
} = require("../middleware/auth");

router.get(
  "/",
  // auth.verifyToken,
  adminController.getCashier
);
router.post(
  "/create",
  createCashierValidator,
  validateRegist,
  // auth.verifyToken,
  adminController.createCashier
);
router.patch(
  "/update/:id",
  // auth.verifyToken,
  adminController.updateCashier
);
router.patch("/delete/:id",
  // auth.verifyToken,
  adminController.deleteCashier);

module.exports = router;