const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/categoryController");
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
    categoryController.getCategory
);
router.post(
    "/create",
    // createCashierValidator,
    // validateRegist,
    // auth.verifyToken,
    categoryController.createCategory
);
router.patch(
    "/update/:id",
    // auth.verifyToken,
    categoryController.updateCategory
);
router.delete("/delete/:id",
    // auth.verifyToken,
    categoryController.deleteCategory);

module.exports = router;