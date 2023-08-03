const db = require("../models");
const path = require("path");
const product = db.Product;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const category = db.Category;
require("dotenv").config({
    path: path.resolve("../.env"),
});
const fs = require("fs").promises;
const sequelize = db.Sequelize;
const { Op } = sequelize;

const productController = {
    getProduct: async (req, res) => {
        const { page, categoryId, name, orderBy, sortByDate, size,quantity } = req.query
            const productPage = parseInt(page) || 1;
            const limitPerPage = parseInt(size) || 2;
            const offset = (productPage - 1) * limitPerPage
            const findName = {name : {[Op.like] : `%${name || ""}%`}}
            const findQuantity = {quantity : {[Op.like] : `%${quantity || ""}%`}}
            if(categoryId) findName.categoryId = categoryId
            if(categoryId) findQuantity.categoryId = categoryId;
        try {
            const result = await product.findAll({
                attributes : {exclude : ["categoryId"]},
                where : [findName,findQuantity],
                limit: limitPerPage,
                productPage : productPage,
                offset,
                include : [
                    { model : category, attributes : {exclude : ["createdAt", "updatedAt"]} },
                ],
                    order : [["createdAt", orderBy || "ASC"]]
            })
            
            return res.status(200).json({
                message: "get product success",
                productLimit : limitPerPage,
                productPage : productPage, 
                data: result
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    },

    createProduct: async (req, res) => {
        const {
            name,
            categoryId,
            // productImg,
            modal_produk,
            harga_produk,
            quantity,
            description,
            // isActive,
        } = req.body;

        // aktifkan multer!!!!!
        return res.json(req.body)
        try {


            await db.sequelize.transaction(async (t) => {
                const productCreate = await product.create({
                    name,
                    categoryId,
                    // productImg: req.file.path,
                    modal_produk,
                    harga_produk,
                    quantity,
                    description,
                    isActive: true,
                }, {
                    transaction: t
                });
                res.status(200).json({
                    message: "create product success",
                    data: productCreate
                });
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    updateProductImage: async (req, res) => {
        try {
            const {
                id
            } = req.user;
            await db.sequelize.transaction(async (t) => {
                const oldData = await user.findOne({
                    where: {
                        id
                    }
                });
                const result = await user.update({
                    img_url: req.file.path,
                }, {
                    where: {
                        id
                    }
                }, {
                    transaction: t
                });
                if (!result) {
                    return res.status(500).json({
                        message: "Change avatar failed",
                        error: err.message,
                    });
                }
                fs.unlink(oldData.img_url, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log("Old avatar deleted successfully");
                });
                return res.status(200).json({
                    message: "Change avatar Success",
                    image: req.file.path,
                });
            });
        } catch (err) {
            return res.status(500).json({
                message: "Change avatar failed",
                error: err.message,
            });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const {
                id
            } = req.params;
            let {
                username,
                email,
                password,
                role,
                isActive
            } = req.body;

            let userFind2 = await user.findByPk(id);
            if (userFind2) {
                if (username) userFind2.username = username;
                if (email) userFind2.email = email;
                if (password) {
                    const salt = await bcrypt.genSalt(10);
                    password = await bcrypt.hash(password, salt);
                    userFind2.password = password
                }
                if (role) userFind2.role = role;
                if (isActive) userFind2.isActive = isActive
                await db.sequelize.transaction(async (t) => {
                    await userFind2.save({
                        transaction: t
                    });
                    return res
                        .status(200)
                        .json({
                            message: "update cashier success",
                            data: userFind2
                        });
                })
            } else {
                res.status(404).json({
                    message: "user not found"
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error.message
            });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const {
                id
            } = req.params;

            const userFind = await user.findByPk(id);
            if (userFind) {
                await db.sequelize.transaction(async (t) => {
                    userFind.isActive = false
                    await userFind.save({
                        transaction: t
                    })
                    return res
                        .status(200)
                        .json({
                            message: "delete cashier success",
                            data: userFind
                        });
                })
            } else {
                res.status(404).json({
                    message: "user not found"
                });
            }
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
};

module.exports = productController;