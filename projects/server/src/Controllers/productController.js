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
        const { page, categoryId, name, orderByName, orderByPrice, size, quantity } = req.query
        const productPage = parseInt(page) || 1;
        const limitPerPage = parseInt(size) || 10;
        const offset = (productPage - 1) * limitPerPage
        const findName = { name: { [Op.like]: `%${name || ""}%` } }
        const findQuantity = { quantity: { [Op.like]: `%${quantity || ""}%` } }
        const isActive = { isActive: { [Op.eq]: 1 } }
        if (categoryId) findName.categoryId = categoryId;
        if (categoryId) findQuantity.categoryId = categoryId;
        let orderOptions = {};
        if (orderByName) {
            orderOptions = {
                ...orderOptions,
                order: [
                    ["name", orderByName]
                ]
            }
        }
        try {
            const result = await product.findAll({
                attributes: { exclude: ["categoryId"] },
                where: [findName, findQuantity, isActive],
                limit: limitPerPage,
                productPage: productPage,
                offset,
                include: [
                    { model: category, attributes: { exclude: ["createdAt", "updatedAt"] } },
                ],
                ...orderOptions
                // order: [
                //     ["name", orderByName],
                //     // ["harga_produk", orderByPrice || 'ASC']
                //     [sequelize.literal('harga_produk'), orderByPrice || 'ASC']
                // ]
            })

            return res.status(200).json({
                message: "get product success",
                productLimit: limitPerPage,
                productPage: productPage,
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    },

    getProduct2: async (req, res) => {
        const { page, categoryId, name, orderByName, orderByPrice, size, quantity } = req.query
        const productPage = parseInt(page) || 1;
        const limitPerPage = parseInt(size) || 8;
        const offset = (productPage - 1) * limitPerPage
        const findName = { name: { [Op.like]: `%${name || ""}%` } }
        const findQuantity = { quantity: { [Op.like]: `%${quantity || ""}%` } }
        // const isActive = { isActive: { [Op.eq]: 1 } }
        if (categoryId) findName.categoryId = categoryId;
        if (categoryId) findQuantity.categoryId = categoryId;
        let orderOptions = {};
        if (orderByName) {
            orderOptions = {
                ...orderOptions,
                order: [
                    ["name", orderByName]
                ]
            }
        }
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
                ...orderOptions
                // order: [
                //     ["name", orderByName],
                //     // ["harga_produk", orderByPrice || 'ASC']
                //     [sequelize.literal('harga_produk'), orderByPrice || 'ASC']
                // ]
            })

            return res.status(200).json({
                message: "get product success",
                productLimit: limitPerPage,
                productPage: productPage,
                data: result,
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
                if (req.file) {
                    if (productFind.productImg) {
                        // fs.unlink(productFind.productImg, (err) => {
                        fs.unlink(path.resolve(__dirname, `../../${productFind.productImg}`), (err) => {
                            if (err) {
                                res.status(500).json({ error: "ubah gambar error" })
                                return;
                            }
                        });
                    }
                    await db.sequelize.transaction(async (t) => {
                        // IF GA ADA GAMBAR GAUSAH UNLINK. DI ATAS SUDAH CUKUP
                        const result = await product.update(
                            {
                                productImg: req.file.path,
                            },
                            {
                                where: {
                                    id
                                },
                                transaction: t // Move the transaction option here
                            }
                        );
                        if (!result) {
                            return res.status(500).json({
                                message: "Change avatar failed",
                                error: err.message,
                            });
                        }
                    });
                    // productFind.productImg = req.file.path
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
                    error: "product not found"
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