const express = require('express');
const {addNewUser} = require('../controller/user.controller');
const userRoutes = express.Router();
userRoutes.post('/',addNewUser);
module.exports =userRoutes;
