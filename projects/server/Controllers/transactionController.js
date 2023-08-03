const db = require("../models")
const path = require("path")
const ts = db.Transaction;

const transactionController = {
    createTransaction : async(req, res) => {
        try {
            const {totalPrice} = req.body
            await db.sequelize.transaction(async (t) => {
                const transactionCreate = await ts.create({
                    userId : req.user.id,
                    totalPrice,
                }, {transaction : t})
            })
            return res.status(200).json({message : "Success"})
        } catch (error) {
            return res.status(500).json({message : "Failed", error: error.message})
        }
    }
}
module.exports = transactionController