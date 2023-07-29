const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const { loginValidator, validateRegist } = require("../middleware/Validator");

router.post("/auth/login", loginValidator,validateRegist,authController.login)
router.put("/auth/forgotPassword")

module.exports = router