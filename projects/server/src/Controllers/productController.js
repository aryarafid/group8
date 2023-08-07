const db = require("../../models");
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
const { multerUpload } = require("../middleware/multer");

const productController = {
    getProduct: async (req, res) => {
        const { page, categoryId, name, orderBy, sortByDate, size, quantity } = req.query
        const productPage = parseInt(page) || 1;
        const limitPerPage = parseInt(size) || 2;
        const offset = (productPage - 1) * limitPerPage
        const findName = { name: { [Op.like]: `%${name || ""}%` } }
        const findQuantity = { quantity: { [Op.like]: `%${quantity || ""}%` } }
        if (categoryId) findName.categoryId = categoryId
        if (categoryId) findQuantity.categoryId = categoryId;
        try {
            const result = await product.findAll({
                attributes: { exclude: ["categoryId"] },
                where: [findName, findQuantity],
                limit: limitPerPage,
                productPage: productPage,
                offset,
                include: [
                    { model: category, attributes: { exclude: ["createdAt", "updatedAt"] } },
                ],
                order: [["createdAt", orderBy || "ASC"]]
            })

            return res.status(200).json({
                message: "get product success",
                productLimit: limitPerPage,
                productPage: productPage,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    },

    createProduct: async (req, res) => {
        try {
            const {
                name,
                categoryId,
                productImg,
                modal_produk,
                harga_produk,
                quantity,
                description,
            } = req.body;
            await db.sequelize.transaction(async (t) => {
                const productCreate = await product.create({
                    name,
                    categoryId,
                    productImg: req.file.path,
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
                name,
                categoryId,
                productImg,
                modal_produk,
                harga_produk,
                quantity,
                description,
            } = req.body;

            let productFind = await product.findByPk(id);
            if (productFind) {
                if (name) productFind.name = name;
                if (categoryId) productFind.categoryId = categoryId;
                if (modal_produk) productFind.modal_produk = modal_produk;
                if (harga_produk) productFind.harga_produk = harga_produk;
                if (quantity) productFind.quantity = quantity;
                if (description) productFind.description = description;
                if (productImg) {
                    const result = await product.update({
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
                }

                await db.sequelize.transaction(async (t) => {
                    await productFind.save({
                        transaction: t
                    });
                    return res
                        .status(200)
                        .json({
                            message: "update product success",
                            data: productFind
                        });
                })
            } else {
                res.status(404).json({
                    message: "product not found"
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

            const productFind = await product.findByPk(id);
            if (productFind) {
                await db.sequelize.transaction(async (t) => {
                    productFind.isActive = false
                    await productFind.save({
                        transaction: t
                    })
                    return res
                        .status(200)
                        .json({
                            message: "delete product success",
                            data: productFind
                        });
                })
            } else {
                res.status(404).json({
                    message: "product not found"
                });
            }
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    activateProduct: async (req, res) => {
        try {
            const {
                id
            } = req.params;

            const productFind = await product.findByPk(id);
            if (productFind) {
                await db.sequelize.transaction(async (t) => {
                    productFind.isActive = true
                    await productFind.save({
                        transaction: t
                    })
                    return res
                        .status(200)
                        .json({
                            message: "activate product success",
                            data: productFind
                        });
                })
            } else {
                res.status(404).json({
                    message: "product not found"
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