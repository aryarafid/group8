const db = require("../models");
const path = require("path");
const user = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  now
} = require("sequelize/types/utils");
require("dotenv").config({
  path: path.resolve("../.env"),
});

const adminController = {
  getCashier: async (req, res) => {
    try {
      const userFind = await user.findAll({
        where: {
          role: "Cashier"
        }
      });
      return res.status(200).json({
        message: "get cashier success",
        data: userFind
      });
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  },

  createCashier: async (req, res) => {
    try {
      const {
        username,
        email,
        password
      } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await db.sequelize.transaction(async (t) => {
        const cashCreate = await user.create({
          username,
          email,
          password: hashPassword,
          role: "Cashier",
          isActive: true,
        }, {
          transaction: t
        });
        res.status(200).json({
          message: "create cashier success",
          data: cashCreate
        });
      });

    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  },

  updateCashier: async (req, res) => {
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

  deleteCashier: async (req, res) => {
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

module.exports = adminController;