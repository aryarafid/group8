const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");

router.post("/create-cashier", adminController.createCashier);
router.post("/update-cashier/:id", adminController.updateCashier);
router.post("/delete-cashier/:id", adminController.deleteCashier);

module.exports = router;
