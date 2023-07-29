const {body, validationResult} = require('express-validator')

const loginValidator = [
    body("password").notEmpty().withMessage("Password cannot empty"),  
    body("username")
      .if(body("username").exists())
        .exists().withMessage("Username cannot be empty")
        .matches(/^.*(?=.{6,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
        .withMessage("Username must contain at least 6 characters, one uppercase, one number"),
      body("email")
      .if(body("email").exists())
        .exists().withMessage("Email cannot be empty")
        .isEmail().withMessage("Invalid email address format"),
      body("phone")
      .if(body("phone").exists())
      .exists().withMessage("Phone number cannot empty")
      .isLength({min : 10, max : 12}).withMessage("Phone must have min 10 number and max 12 number")
]

const validateRegist = (req, res, next) => {
    const errors = validationResult(req);
  //   validationResult memiliki method isEmpty untuk mengembalikan nilai true/false
    if (errors.isEmpty() === false) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

  module.exports = {
    validateRegist, loginValidator
  }

