const db = require("../../models");
const path = require("path");
const user = db.User;
const transaction = db.Transaction;
const transactionItem = db.TransactionItem;
const product = db.Product;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({
    path: path.resolve("../.env"),
});
const { multerUpload } = require("../middleware/multer");
const fs = require("fs").promises;
const sequelize = db.Sequelize;
const { Op } = sequelize;

const reportController = {
    getProductInTransaction: async (req, res) => {
        try {
            const data = await transaction.findAll({
                include: [
                    {
                        model: transactionItem,
                        include: [product], // Include Product model for each TransactionItem
                    },
                    {
                        model: user
                    },
                    // {
                    //     model: product,
                    // },
                ],
            });
            return res.status(200).json({
                message: "get data success",
                data: data
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    dayAggregate: async (req, res) => {
        try {
            let {
                date
            } = req.body;

            const result = await transaction.findAll({
                attributes: [
                    [sequelize.fn('DATE', sequelize.col('createdAt')), 'day'],
                    [sequelize.fn('SUM', sequelize.col('totalPrice')), 'totalSales'],
                ],
                group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
            });

            return res.status(200).json({
                message: "get data success",
                data: result
            });

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    salesReport: async (req, res) => {
        try {
            let {
                startDate,
                endDate
            } = req.body;

            const result = await transaction.findAll({
                attributes: [
                    [sequelize.fn('DATE', sequelize.col('createdAt')), 'day'],
                    [sequelize.fn('SUM', sequelize.col('totalPrice')), 'totalSales'],
                ],
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                },
                group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
            });

            return res.status(200).json({
                message: "get data success",
                data: result
            });

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }

};

module.exports = reportController;