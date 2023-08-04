const db = require("../models");
const path = require("path");
const user = db.User;
const fs = require("fs").promises
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({
    path: path.resolve("../.env"),
});

const authController = {
    getAccount : async(req,res) => {
        try {
            const account = await user.findAll()
            return res.status(200).json({message : "Get Data success", data: account})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },
    getAccountById : async(req,res) => {
        try {
        const {id} = req.params
        const account = await user.findOne({
            where : {
                id : id
            }
        })
        return res.status(200).json({message : "Success", data : account})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }        
        
    },
    login: async (req, res) => {
        try {
            const {
                username,
                email,
                password
            } = req.body
            let account = {}
            if (username) {
                account.username = username
            }
            if (email) {
                account.email = email
            }
            const checkLogin = await user.findOne({
                where: account
            })
            if (!checkLogin) return res.status(500).json({
                message: "Account not defined"
            })
            const checkPassword = await bcrypt.compare(password, checkLogin.password)
            if (!checkPassword) return res.status(500).json({
                message: "Incorrect password"
            })
            let payload = {
                id: checkLogin.id,
                username: checkLogin.username,
                email: checkLogin.email,
                role: checkLogin.role,
                isActive: checkLogin.isActive,
                imgProfile: checkLogin.imgProfile
            }
            console.log("role => ", checkLogin.role)
            console.log("payload => ", payload)
            const token = jwt.sign(payload, process.env.JWT_KEY, {
                expiresIn: "3h"
            })
            res.status(200).json({
                message: "Login Success",
                isAccountExist: payload,
                token: token
            })
        } catch (error) {
            res.status(500).json({
                message: error.message, checkPassword : checckPassword
            })
        }
    },
    patchChangeProfile : async(req, res) => {
        try {
            const {id} = req.user
            console.log("Tujuan ?",req.file)
            const oldPicture = await user.findOne({ where : {id} })
            if(oldPicture.imgProfile){
                fs.unlink(path.resolve(__dirname, `../src/${oldPicture.imgProfile}`), (err) => {
                    return res.status(500).json({message : err.message})
                })
            }
            await db.sequelize.transaction( async (t) => {
                const result = await user.update({
                    imgProfile : req.file.path
                }, {
                    where : {id}
                }, {transaction : t})
                return res.status(200).json({message : "Profile picture change"})
            })
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },
    userKeepLogin : async(req, res) => {
        try {
            const {id} = req.user
            const findUser = await user.findOne({where : {id}})
            return res.status(200).json({message : "Still Login", findUser})
        } catch (error) {
            return res.status(500).json({message : error.message})
            
        }
    }
};

module.exports = authController;