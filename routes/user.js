const { Router } = require("express");
const controller = require("../controller/user");
const validator = require("../validator/user");
const route = Router();

//route.get('/', controller.fetchUser);
route.post("/logout", controller.logoutUser);
route.post("/", validator.createUser, controller.createUser);
route.post("/login", validator.loginUser, controller.loginUser);
// route.delete('/', controller.deleteUser);
// route.put('/', constroller.updateUser );

module.exports = route;
