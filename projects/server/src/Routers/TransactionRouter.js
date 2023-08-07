const express = require("express")
const transactionController = require("../Controllers/TransactionController")
const { verifyToken } = require("../middleware/auth")
const router = express.Router()

router.post("/transaction", verifyToken, transactionController.createTransaction)

module.exports = router