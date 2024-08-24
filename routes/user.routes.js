const express = require('express');
const {RegisterUser,loginUser, userProfile,updateUser,deleteUser} = require('../controller/user.controller');
const {VerifyToken} = require('../helpers/tokenVerify');
const {upload} = require('../helpers/imageUpload');
// addNewUser,getAllUser,getUser, updateUser,deleteUser
const userRoutes = express.Router();
// userRoutes.post('/',addNewUser);
// userRoutes.get('/',getAllUser);
// userRoutes.get('/getUser',getUser);
// userRoutes.put('/',updateUser);
// userRoutes.delete('/',deleteUser);
userRoutes.post('/register',upload.single('profileImage'),RegisterUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/verifyuser',VerifyToken,userProfile);
userRoutes.put('/userprofile',VerifyToken,updateUser);
// userRoutes.delete('/',deleteUser);
module.exports =userRoutes;
