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
    "/history",
    // verifyToken,
    reportController.salesHistory
);
router.get(
    "/graph",
    // verifyToken,
    reportController.salesGraph
);
router.post(
    "/sales-report",
    // verifyToken,
    reportController.salesReport
);


module.exports = router;