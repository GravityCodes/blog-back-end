const { Router } = require('express');
const controller = require('../controller/post');
const validator = require("../validator");
const route = Router();

//post
route.get('/', controller.fetchPosts);
route.get('/:id', controller.fetchPost);
route.post('/', validator.post.createPost , controller.createPost);
route.put('/:id', validator.post.editPost , controller.editPost);
route.delete('/:id', controller.deletePost);

//comment
route.get('/:postid/comments', controller.fetchComments);
route.get('/:postid/comments/:id', controller.fetchComment);
route.post('/:postid/comments', validator.post.createComment, controller.createComment);
route.delete('/:postid/comments/:id', controller.deleteComment);


module.exports = route;