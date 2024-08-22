const express = require('express');
const {RegisterUser,loginUser} = require('../controller/user.controller');
// addNewUser,getAllUser,getUser, updateUser,deleteUser
const userRoutes = express.Router();
// userRoutes.post('/',addNewUser);
// userRoutes.get('/',getAllUser);
// userRoutes.get('/getUser',getUser);
// userRoutes.put('/',updateUser);
// userRoutes.delete('/',deleteUser);
userRoutes.post('/register',RegisterUser);
userRoutes.post('/login',loginUser);
module.exports =userRoutes;
