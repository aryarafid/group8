const express = require("express")
const { verifyToken } = require("../middleware/auth")
const transactionController = require("../Controllers/transactionController")
const router = express.Router()

router.post("/transaction", verifyToken, transactionController.createTransaction)

module.exports = router