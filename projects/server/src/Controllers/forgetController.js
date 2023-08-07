const db = require("../../models");
const user = db.User
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const handlebars = require("handlebars")
const transporter = require("../helpers/transporter")
const path = require("path")
const fs = require("fs").promises
// fs => filesystem

const forgetController = {
    forgetPassword : async(req,res) => {
        try {
            const {email} = req.body
            const checkEmail = await user.findOne({where : {email}})
            if(!checkEmail) return res.status(500).json({message : "Invalid email address"})
            let payload = {
                id : checkEmail.id,
                username : checkEmail.username,
                email : checkEmail.email,
                role : checkEmail.role
            }
            const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn : "3h"})
            const redirect = `http://localhost:3000/reset-password/${token}`
            const data = await fs.readFile(path.resolve(__dirname, "../emails/forgetPassword.html"), "utf-8")
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({email, redirect})
            await transporter.sendMail({
                to : email,
                subject : "Reset Password",
                html : tempResult
            })
            return res.status(200).json({message : "Check your email", token : token})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },
    resetPassword : async(req, res) => {
        try {
            const {id,username,email} = req.user
            const {newPassword, confirmPassword} = req.body
            const users = await user.findOne({where : {id}})
            if(!users) return res.status(500).json({message : "Account not defined"})
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(newPassword, salt)
            await db.sequelize.transaction(async (t) => {
                const result = await user.update({
                    password : hashPassword
                }, {where : {id}}, {transaction : t})
            })
            const data = await fs.readFile(path.resolve(__dirname, "../emails/changePassword.html"), "utf-8")
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({username})
            await transporter.sendMail({
                to : email,
                subject : "Reset Password",
                html : tempResult
            })
            return res.status(200).json({message : "Change password success"})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    }
}

module.exports = forgetController