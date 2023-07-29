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
      });
      res.status(200).json({
        message: "create cashier success",
        data: token
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  },

  updateCashier: async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const {
        username,
        email,
        password,
        role,
      } = req.body;

      const userFind = await user.findByPk(id);
      if (userFind) {
        // const newValues = {}
        if (username) userFind.username = username;
        if (email) userFind.email = email;
        if (password) {
          const salt = await bcrypt.genSalt(10);
          password = await bcrypt.hash(password, salt);
          userFind.password = password
        }
        if (role) userFind.role = role;
        userFind.updatedAt = Date()
        return res.json(userFind)
        if (Object.keys(newValues).length > 0) {
          await db.sequelize.transaction(async (t) => {
            await user.update({
              userFind
            }, {
              where: {
                id: id,
              },
            }, {
              transaction: t
            });
            // return res.json(userFind);
            return res
              .status(200)
              .json({
                message: "update cashier success",
              });
          })
        } else {
          res.status(400).json({
            message: "cant be updated if every input is empty"
          });
        }
      } else {
        res.status(404).json({
          message: "user not found"
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message
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
          await user.save({
            transaction: t
          })
          return res
            .status(200)
            .json({
              message: "delete cashier success",
            });
        })

      } else {
        res.status(404).json({
          message: "user not found"
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  },
};

module.exports = adminController;