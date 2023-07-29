const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
const {
  loginValidator,
  validateRegist,
  createCashierValidator,
} = require("../middleware/Validator");
const {
  authValidator
} = require("../middleware/authValidator");

router.post(
  "/create-cashier",
  createCashierValidator,
  validateRegist,
  authValidator.verifyToken,
  adminController.createCashier
);
router.patch(
  "/update-cashier/:id",
  // authValidator.verifyToken,
  adminController.updateCashier
);
router.delete("/delete-cashier/:id",
  // authValidator.verifyToken,
  adminController.deleteCashier);

module.exports = router;