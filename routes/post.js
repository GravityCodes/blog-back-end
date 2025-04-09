const { Router } = require('express');
const controller = require('../controller/post');
const validator = require("../validator");
const route = Router();

route.get('/', controller.fetchPosts);
route.get('/:id', controller.fetchPost);


route.post('/', validator.post.createPost , controller.createPost);
route.put('/:id', validator.post.editPost , controller.editPost);

module.exports = route;