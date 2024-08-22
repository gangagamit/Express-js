
const User = require('../model/user.model');

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

exports.addNewUser = async (req,res)=>{
    try{
        const {firstName,lastName,email,age,address,hobbies} = req.body;
        let user = await User.findOne({email : email,isDelete:false});
        if(user){
            return res.status(400).json({message:'User already exist'});
        }
        user = await User.create({
            firstName,lastName,email,age,address,hobbies
        });
        user.save();
        res.status(201).json({message:'user add successfully'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server Error'});
    }
};

//Get All User 

exports.getAllUser = async (req,res)=>{
    try {
        let users = await User.find({isDelete:false});
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({massage:'Internal server Erroe'})
    }
};

//Get user

exports.getUser = async (req,res)=>{
    try {
        // let user = await User.findOne({firstName : req.query.firstName});
        let user = await User.findOne({_id : req.query.user_id})
        if(!user){
            res.status(404).json({message:'User not Found'});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server Error'})
    }
};

//Update user

exports.updateUser = async (req,res)=>{
    try {
        let user = await User.findById(req.query.userId);

        if(!user){
            res.status(404).json({message:'User not found'});
        }
        // user = await User.updateOne({_id:req.query.user_id},{$set:req.body},{new:true});
        user =  await User.findByIdAndUpdate(req.query.userId,{$set: req.body},{new:true});
        user.save();
        res.status(202).json({user,message:'User update successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server Error'})
    }
};

//Delete user

exports.deleteUser = async (req,res) =>{
    try {
        let user = await User.findOne({_id:req.query.userId, isDelete:false});
        if(!user){
            res.status(404).json({message:'User not found'})
        }
        user = await User.deleteOne(user._id,
            {$set:{isDelete:true}},
            {new:true}
        );
        res.status(200).json({user,message:'user delete successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internav server Error'})
    }
}

