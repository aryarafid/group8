const authController = require("./authController");
const adminController = require("./adminController");
const categoryController = require("./categoryController");
const forgetController = require("./forgetController")
const productController = require("./productController")
const reportController = require("./reportController")
const transactionController = require("./transactionController")

module.exports = {
    authController,
    forgetController,
    adminController,
    categoryController,
    productController,
    reportController,
    transactionController
}
