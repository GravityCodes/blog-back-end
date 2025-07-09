const { body } = require("express-validator");

const createUser = [
  body("email")
    .notEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Email has incorrect format"),
  body("password").notEmpty().withMessage("Password must not be empty"),
  body("name").notEmpty().withMessage("Name must not be empty"),
];

const loginUser = [
  body("email")
    .notEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Email has incorrect format"),
  body("password").notEmpty().withMessage("Password must not be empty"),
];

module.exports = {
  createUser,
  loginUser,
};
