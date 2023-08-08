const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/categoryController");
const {
    loginValidator,
    validateRegist,
    createCashierValidator,
} = require("../middleware/Validator");
const {
    auth, verifyToken } = require("../middleware/auth");

router.get(
    "/",
    // verifyToken,
    categoryController.getCategory
);
router.post(
    "/create",
    // createCashierValidator,
    // validateRegist,
    verifyToken,
    categoryController.createCategory
);
router.patch(
    "/update/:id",
    verifyToken,
    categoryController.updateCategory
);
router.delete("/delete/:id",
    verifyToken,
    categoryController.deleteCategory);

module.exports = router;