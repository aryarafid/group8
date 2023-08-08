const db = require("../../models");
const path = require("path")
const ts = db.Transaction;
const product = db.Product;
const transActionItem = db.TransactionItem

const transactionController = {
    createTransaction : async(req, res) => {
        try {
            const {totalPrice} = req.body
            console.log("3",totalPrice)
            await db.sequelize.transaction(async (t) => {
                const result = await ts.create({
                    userId : req.user.id,
                    totalPrice,
                }, {transaction : t})
                return res.status(200).json({message : "Success", result})
            })
        } catch (error) {
            return res.status(500).json({message : "Failed", error: error.message})
        }
    },
    cartToTransaction : async(req, res) => {
        const {transactionId, item} = req.body
        console.log("cart => ",transactionId, item)
        try {
            const result = await transActionItem.create({
                transactionId,
                productId : item.id,
                quantity : item.quantity,
                price : item.harga_produk
            })
            const itemTransaction = await product.findByPk(item.id);
            await itemTransaction.decrement("quantity", {by:item.quantity})
            if(itemTransaction.quantity - item.quantity <= 0){
                await itemTransaction.update({isActive: false})
            }
            return res.status(200).json({message : "Succes", result})
        } catch (error) {
            return res.status(500).json({message : "Failed", error: error.message})
        }
    }

}
module.exports = transactionController