const { body } = require("express-validator");

const createUser = [
  body("email")
    .notEmpty()
    .withMessage("email must not be empty")
    .isEmail()
    .withMessage("email has incorrect format"),
  body("password").notEmpty().withMessage("password must not be empty"),
  body("name").notEmpty().withMessage("name must not be empty"),
];

const loginUser = [
  body("email")
    .notEmpty()
    .withMessage("email must not be empty")
    .isEmail()
    .withMessage("email has incorrect format"),
  body("password").notEmpty().withMessage("password must not be empty"),
];

module.exports = {
  createUser,
  loginUser,
};
