const express = require("express");
const router = express.Router();
const reportController = require("../Controllers/reportController");
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
    reportController.getProductInTransaction
);


module.exports = router;