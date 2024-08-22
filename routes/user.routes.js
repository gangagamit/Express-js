const express = require('express');
const {addNewUser,getAllUser,getUser, updateUser,deleteUser} = require('../controller/user.controller');
const userRoutes = express.Router();
userRoutes.post('/',addNewUser);
userRoutes.get('/',getAllUser);
userRoutes.get('/getUser',getUser);
userRoutes.put('/',updateUser);
userRoutes.delete('/',deleteUser);
module.exports =userRoutes;
