const { body } = require("express-validator");

const createPost = [
  body("title").notEmpty().withMessage("title must not be empty."),
];

const editPost = [
  body("content")
    .optional()
    .isObject()
    .withMessage("content must be of type JSON"),
  body("publish")
    .optional()
    .isBoolean()
    .withMessage("publish must be of type boolean"),
];

const createComment = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("comment can not be empty")
    .escape(),
];

module.exports = {
  createPost,
  editPost,
  createComment,
};
