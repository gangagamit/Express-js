const express = require('express');
const {addNewUser,getAllUser,getUser} = require('../controller/user.controller');
const userRoutes = express.Router();
userRoutes.post('/',addNewUser);
userRoutes.get('/',getAllUser);
userRoutes.get('/getUser',getUser);
module.exports =userRoutes;
