const db = require("../models");
const path = require("path");
const category = db.Category;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({
    path: path.resolve("../.env"),
});

const categoryController = {
    getCategory: async (req, res) => {
        try {
            const categoryFind = await category.findAll();
            return res.status(200).json({
                message: "get Category success",
                data: categoryFind
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    createCategory: async (req, res) => {
        try {
            const {
                name
            } = req.body;

            await db.sequelize.transaction(async (t) => {
                var categoryCreate = await category.create({
                    name,
                }, {
                    transaction: t
                });
                res.status(200).json({
                    message: "create Category success",
                    data: categoryCreate
                });
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const {
                id
            } = req.params;
            let {
                name
            } = req.body;

            // return res.json(id)
            let categoryFind = await category.findByPk(id);
            if (categoryFind) {
                if (name) categoryFind.name = name;
                await db.sequelize.transaction(async (t) => {
                    await categoryFind.save({
                        transaction: t
                    });
                    return res
                        .status(200)
                        .json({
                            message: "update Category success",
                            data: categoryFind
                        });
                })
            } else {
                res.status(404).json({
                    message: "Category not found"
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error.message
            });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const {
                id
            } = req.params;

            // return res.json(id)

            const categoryFind = await category.findByPk(id);
            if (categoryFind) {
                await db.sequelize.transaction(async (t) => {
                    await categoryFind.destroy({
                        where: id
                    }, {
                        transaction: t
                    })
                    return res
                        .status(200)
                        .json({
                            message: `delete Category ${id} success`,
                        });
                })
            } else {
                res.status(404).json({
                    message: "category not found"
                });
            }
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
};

module.exports = categoryController;