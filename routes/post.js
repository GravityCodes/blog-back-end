const { Router } = require("express");
const controller = require("../controller/post");
const validator = require("../validator");
const route = Router();
const {token} = require('../middleware');

//post
route.get("/", controller.fetchPosts);
route.get("/:id", controller.fetchPost);
route.post("/", token.verifyToken, validator.post.createPost, controller.createPost);
route.put("/:id", token.verifyToken, validator.post.editPost, controller.editPost);
route.delete("/:id", token.verifyToken, controller.deletePost);

//comment
route.get("/:postid/comments", controller.fetchComments);
route.get("/:postid/comments/:id", controller.fetchComment);
route.post(
  "/:postid/comments",
  token.verifyToken,
  validator.post.createComment,
  controller.createComment,
);
route.delete("/:postid/comments/:id", token.verifyToken, controller.deleteComment);

module.exports = route;
