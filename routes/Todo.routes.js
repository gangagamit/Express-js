const express = require('express');
const { showRegisterPage, registerUser, showLoginPage, loginUser } = require('../controller/Todo.controller');
const todoRoutes = express.Router();

todoRoutes.get("/registration", showRegisterPage);
todoRoutes.post("/registration", registerUser);

todoRoutes.get("/login", showLoginPage);
todoRoutes.post("/login", loginUser);

todoRoutes.get("/index",showLoginPage);

module.exports = todoRoutes;