const {
  body,
  validationResult
} = require("express-validator");

const loginValidator = [
  body("password").notEmpty().withMessage("Password cannot empty"),
  body("username")
  .if(body("username").exists())
  .exists()
  .withMessage("Username cannot be empty")
  .matches(/^.*(?=.{6,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
  .withMessage(
    "Username must contain at least 6 characters, one uppercase, one number"
  ),
  body("email")
  .if(body("email").exists())
  .exists()
  .withMessage("Email cannot be empty")
  .isEmail()
  .withMessage("Invalid email address format"),
  body("phone")
  .if(body("phone").exists())
  .exists()
  .withMessage("Phone number cannot empty")
  .isLength({
    min: 10,
    max: 12
  })
  .withMessage("Phone must have min 10 number and max 12 number"),
];

const createCashierValidator = [
  body("username").notEmpty().withMessage("username cannot empty"),
  body("Password")
  .if(body("Password").exists())
  .exists()
  .withMessage("Password cannot be empty")
  .matches(/^.*(?=.{6,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
  .withMessage(
    "Password must contain at least 6 characters, one uppercase, one number"
  ),
  body("email")
  .if(body("email").exists())
  .exists()
  .withMessage("Email cannot be empty")
  .isEmail()
  .withMessage("Invalid email address format"),
];

const createProductValidator = [
  body('name').notEmpty().withMessage('Nama produk tidak boleh kosong.'),
  body('categoryId').notEmpty().withMessage('Kode kategori tidak boleh kosong.'),
  body('productImg').notEmpty().withMessage('Gambar produk tidak boleh kosong.'),
  body('modal_produk').notEmpty().withMessage('Harga modal produk tidak boleh kosong.'),
  body('harga_produk').notEmpty().withMessage('Harga produk tidak boleh kosong.'),
  body('quantity').notEmpty().withMessage('Jumlah stok produk tidak boleh kosong.'),
  body('description').notEmpty().withMessage('Deskripsi produk tidak boleh kosong.'),
];

const forgotPassValidator = [
  body("email").notEmpty().withMessage("Email cannot be empty").isEmail().withMessage("Invalid email address format")
]

const resetPasswordValidator = [
  body("newPassword").notEmpty().withMessage("Password can not be empty")
  .matches(/^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
  .withMessage("Password must contain 6 character, one uppercase, one number, and one special case character"),
  body("confirmPassword").custom((confirmPassword, {
    req
  }) => {
    if (confirmPassword !== req.body.newPassword) {
      throw new Error("Password not match")
    }
    return true
  })
]

const validateRegist = (req, res, next) => {
  const errors = validationResult(req);
  //   validationResult memiliki method isEmpty untuk mengembalikan nilai true/false
  if (errors.isEmpty() === false) {
    return res.status(400).json({
      errors: errors.array()
    });
  };
  next();
}

module.exports = {
  validateRegist,
  loginValidator,
  forgotPassValidator,
  resetPasswordValidator,
  createCashierValidator,
  createProductValidator
}
