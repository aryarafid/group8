const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const { loginValidator, validateRegist, forgotPassValidator, resetPasswordValidator } = require("../middleware/Validator");
const forgetController = require("../Controllers/forgetController");
const { verifyToken, verifyResetPassword } = require("../middleware/auth");

router.post("/auth/login", loginValidator,validateRegist,authController.login)
router.put("/auth/forgotPassword", forgotPassValidator, validateRegist, forgetController.forgetPassword)
router.patch("/auth/resetPassword", verifyToken, resetPasswordValidator, validateRegist, verifyResetPassword, forgetController.resetPassword)
router.patch("/auth/changePicture", verifyToken,multerUpload.single("imgProfile") ,authController.patchChangeProfile)

module.exports = router