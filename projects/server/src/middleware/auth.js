const jwt = require("jsonwebtoken")
const db = require("../../models");
const user = db.User
const bcrypt = require("bcrypt")
const { check } = require("express-validator")

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if(!token){
        return res.status(500).send("Invalid Token")
    }
    try {
        token = token.split(" ")[1];
        if(token === "null" || !token){
            return res.status(500).send("Access Denied")
        }
        let verifiedUser = jwt.verify(token, process.env.JWT_KEY)
        if(!verifiedUser){
            return res.status(500).send("Unathorized request")
        }
        req.user = verifiedUser;
        console.log("ini apa?",req.user);
        next();
    } catch (error) {
        return res.status(500).send("Invalid Token")
    }
}

const verifyResetPassword = async (req, res, next) => {
    const {id} = req.user
    const {newPassword, confirmPassword} = req.body
    const account = await user.findOne({ where : {id}})
    const checkPassword = await bcrypt.compare(newPassword, account.password)
    if(checkPassword === true) return res.status(500).json({message : "New password can not same as old password"})
    next();
}
module.exports = {verifyToken, verifyResetPassword}