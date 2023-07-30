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
  "/get-cashier",
  // auth.verifyToken,
  adminController.getCashier
);
router.post(
  "/create-cashier",
  createCashierValidator,
  validateRegist,
  // auth.verifyToken,
  adminController.createCashier
);
router.patch(
  "/update-cashier/:id",
  // auth.verifyToken,
  adminController.updateCashier
);
router.patch("/delete-cashier/:id",
  // auth.verifyToken,
  adminController.deleteCashier);

module.exports = router;