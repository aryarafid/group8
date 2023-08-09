const authRouter = require("./authRouter");
const adminRouter = require("./adminRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const transactionRouter = require("./transactionRouter")
const reportRouter = require("./reportRouter")


module.exports = {
    authRouter,
    adminRouter,
    categoryRouter,
    productRouter,
    transactionRouter,
    reportRouter
};
