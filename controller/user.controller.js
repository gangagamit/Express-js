
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Add New User

// exports.addNewUser = async (req,res)=>{
//     try{
//         console.log(req.body);
//         const user = await User.create({...req.body});
//         user.save();
//         res.status(201).json({message:'user add successfully'});
//     }
//     catch{
//         console.log(error);
//         res.status(500).json({message:'Internal server error'});
//     }
// }; 

// exports.addNewUser = async (req,res)=>{
//     try{
//         const {firstName,lastName,email,age,address,hobbies} = req.body;
//         let user = await User.findOne({email : email,isDelete:false});
//         if(user){
//             return res.status(400).json({message:'User already exist'});
//         }
//         user = await User.create({
//             firstName,lastName,email,age,address,hobbies
//         });
//         user.save();
//         res.status(201).json({message:'user add successfully'});
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({message:'internal server Error'});
//     }
// };

// //Get All User 

// exports.getAllUser = async (req,res)=>{
//     try {
//         let users = await User.find({isDelete:false});
//         res.status(200).json(users);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({massage:'Internal server Erroe'})
//     }
// };

// //Get user

// exports.getUser = async (req,res)=>{
//     try {
//         // let user = await User.findOne({firstName : req.query.firstName});
//         let user = await User.findOne({_id : req.query.user_id})
//         if(!user){
//             res.status(404).json({message:'User not Found'});
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'Internal server Error'})
//     }
// };

// //Update user

// exports.updateUser = async (req,res)=>{
//     try {
//         let user = await User.findById(req.query.userId);

//         if(!user){
//             res.status(404).json({message:'User not found'});
//         }
//         // user = await User.updateOne({_id:req.query.user_id},{$set:req.body},{new:true});
//         user =  await User.findByIdAndUpdate(req.query.userId,{$set: req.body},{new:true});
//         user.save();
//         res.status(202).json({user,message:'User update successfully'});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'Internal server Error'})
//     }
// };

// //Delete user

// exports.deleteUser = async (req,res) =>{
//     try {
//         let user = await User.findOne({_id:req.query.userId, isDelete:false});
//         if(!user){
//             res.status(404).json({message:'User not found'})
//         }
//         user = await User.deleteOne(user._id,
//             {$set:{isDelete:true}},
//             {new:true}
//         );
//         res.status(200).json({user,message:'user delete successfully'});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'Internav server Error'})
//     }
// }

//Register

exports.RegisterUser = async (req,res) =>{
    try {
        let imagepath = "";
        let user = await User.findOne({email:req.body.email,isDelete:false});
        if(user){
            return res.status(400).json({message:'User already exist..'});
        }
        if(req.file){
            console.log(req.file.path);
            imagepath = req.file.path.replace(/\\/g,"/");
        }
        let hasPassword = await bcrypt.hash(req.body.password,10);
        console.log(hasPassword);
        user = await User.create({...req.body,password: hasPassword,profileImage:imagepath});
        user.save();
        res.status(201).json({user,message:'user registration successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internav server error'})
    }
};

exports.loginUser = async (req,res) =>{
    try {
        let user = await User.findOne({email: req.body.email,isDelete: false});
        if(!user){
            return res.status(404).json({message:'user not found'});
        }
        let matchPassword = await bcrypt.compare(req.body.password,user.password);
        console.log(matchPassword);
        if(!matchPassword){
            return res.status(404).json({message:'email and password not match'});
        }
        let token = await jwt.sign({userId: user._id},process.env.JWT_SECRET);
        res.status(200).json({message:'Login success',token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internav server error'})
    }
};

exports.userProfile = async (req,res) =>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internav server error'});
    }
};

exports.updateUser = async (req,res) =>{
    try {
        let user =  req.user;
        user = await User.findByIdAndUpdate(
            user._id,
            {$set:req.body},
            {new:true}
        );
        res.status(202).json({user,message:'user update successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'})
    }
};

exports.deleteUser = async (req,res) =>{
    try {
        let user =  req.user;
        user = await User.findByIdAndUpdate(user._id,
            {$set:{isDelete:true}},
            {new:true}
        );
        res.status(202).json({message:'user delete successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'})
    }
};

// exports.changePassword = async (req,res,next) =>{
//     try {
//         const user = await User.findById(req.user._id);
//         const verify = await bcrypt.compare(req.body.currentPassword,user.password);
//         if(!user || !verify){
//             return res.status(400).json({message:'invalid current password'});
//         }
//         user.password = req.body.password;
//         user.passwordConfirm =  req.body.passwordConfirm;
//         user.save();

//         let token = await jwt.sign({userId: user._id},process.env.JWT_SECRET);
//         res.status(200).json({message:'Login success',token});

//         res.status(200).json({userId:"success", results:{token}})

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'Internal server error'})
//     }
// };