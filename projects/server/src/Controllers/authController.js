const db = require('../models')
const path = require("path")
const user = db.user

const authController = {
    login : async (req, res) => {
        try {
            const {username, email, phone, password} = req.body
            let account = {}
            if(username){account.username = username}
            if(email){account.email = email}
            if(phone){account.phone = phone}
            const checkAccount = await user.findOne({where : account})
        } catch (error) {
            res.status(500).json({message : error.message})
        }
    }
}