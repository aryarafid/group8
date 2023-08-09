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
router.get(
    "/aggregate",
    // verifyToken,
    reportController.dayAggregate
);
router.post(
    "/sales-report",
    // verifyToken,
    reportController.salesReport
);


module.exports = router;