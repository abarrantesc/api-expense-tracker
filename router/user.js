const express = require("express");
const multiparty = require("connect-multiparty");
const UserController = require("../controllers/user");
const md_auth = require("../middleware/authenticated");



const md_upload = multiparty({ uploadDir: "./uploads/avatar"});
const api = express.Router();


//
api.get("/user/me",[md_auth.asureAuth],UserController.getMe);
api.get("/users",[md_auth.asureAuth],UserController.getUsers); // Obtiene usuarios 
api.post("/user",[md_auth.asureAuth,md_upload],UserController.createUser); // Crea usuarios 
api.patch("/user/:id", [md_auth.asureAuth,md_upload],UserController.updateUser); //actualiza usuario
api.delete("/user/:id", [md_auth.asureAuth],UserController.deleteUser);  // elimina el usuario




module.exports = api;

// video 52