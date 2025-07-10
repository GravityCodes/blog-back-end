const { body } = require("express-validator");

const createPost = [
  body("title").notEmpty().withMessage("title must not be empty."),
  body("content")
    .notEmpty()
    .withMessage("content must not be empty")
    .isJSON()
    .withMessage("content must be of type JSON"),
  body("authorId")
    .notEmpty()
    .withMessage("No valid author")
    .isNumeric()
    .withMessage("authorId must be a number"),
  body("publish")
    .notEmpty()
    .withMessage("publish must not be empty")
    .isBoolean()
    .withMessage("publish must be of type boolean"),
];

const editPost = [
  body("content")
    .optional()
    .isJSON()
    .withMessage("content must be of type JSON"),
  body("publish")
    .optional()
    .isBoolean()
    .withMessage("publish must be of type boolean"),
];

const createComment = [
  body("content").trim().notEmpty().withMessage("comment can not be empty").escape(),
];

module.exports = {
  createPost,
  editPost,
  createComment,
};
