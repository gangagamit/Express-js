const express = require('express');
const {RegisterUser,loginUser, userProfile} = require('../controller/user.controller');
const {VerifyToken} = require('../helpers/tokenVerify');
// addNewUser,getAllUser,getUser, updateUser,deleteUser
const userRoutes = express.Router();
// userRoutes.post('/',addNewUser);
// userRoutes.get('/',getAllUser);
// userRoutes.get('/getUser',getUser);
// userRoutes.put('/',updateUser);
// userRoutes.delete('/',deleteUser);
userRoutes.post('/register',RegisterUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/me',VerifyToken,userProfile);
module.exports =userRoutes;
