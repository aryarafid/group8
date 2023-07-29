const db = require("../models")
const path = require("path")
const user = db.User;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config({
    path: path.resolve("../.env")
})


const authController = {
    login : async(req, res) => {
        try {
            const {username,email,password} = req.body
            let account = {}
            if(username){account.username = username}
            if(email){account.email = email}
            const checkLogin = await user.findOne({where: account})
            if(!checkLogin) return res.status(500).json({message : "Account not defined"})
            const checkPassword = await bcrypt.compare(password, checkLogin.password)
            if(!checkPassword) return res.status(500).json({message : "Password wrong"})
            let payload = {
                id : checkLogin.id,
                username : checkLogin.username,
                role : checkLogin.role
            }
            console.log("role => ", checkLogin.role)
            console.log("payload => ", payload)
            const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn : "3h"})
            res.status(200).json({message : "Login Success", isAccountExist : payload, role: checkLogin.role, token : token})
        } catch (error) {
            res.status(500).json({message : error.message})
        }
    }
}

module.exports = authController