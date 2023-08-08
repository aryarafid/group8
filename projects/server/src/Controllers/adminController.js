const db = require("../../models");
const path = require("path");
const user = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const { multerUpload } = require("../middleware/multer");
const fs = require("fs").promises;


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

  getCashierById: async (req, res) => {
    try {
      const { id } = req.params
      const userFind = await user.findOne({
        where: {
          id: id,
          role: "Cashier",
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
        password,
        imgProfile
      } = req.body;

      // return res.json(req.body)

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await db.sequelize.transaction(async (t) => {
        const cashCreate = await user.create({
          username,
          email,
          password: hashPassword,
          role: "Cashier",
          imgProfile: req.file.path,
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
        imgProfile
      } = req.body;

      let userFind2 = await user.findByPk(id);
      if (userFind2) {
        if (username) userFind2.username = username;
        if (email) userFind2.email = email;
        if (req.file) {
          await db.sequelize.transaction(async (t) => {
            const result = await user.update(
              {
                imgProfile: req.file.path,
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
            fs.unlink(userFind2.imgProfile, (err) => {
              if (err) {
                res.status(500).json({ error: "ubah gambar error" })
                return;
              }
            });
          });
          // productFind.productImg = req.file.path
        }
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

  activateCashier: async (req, res) => {
    try {
      const {
        id
      } = req.params;

      const userFind = await user.findByPk(id);
      if (userFind) {
        await db.sequelize.transaction(async (t) => {
          userFind.isActive = true
          await userFind.save({
            transaction: t
          })
          return res
            .status(200)
            .json({
              message: "activate cashier success",
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