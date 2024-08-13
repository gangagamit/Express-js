const User = require('../model/user.model');

exports.addNewUser = async (req,res)=>{
    try{
        console.log(req.body);
        const user = await User.create({...req.body});
        user.save();
        res.status(201).json({message:'user add successfully'});

    }
    catch{
        console.log(error);
        res.status(500).json({message:'Internal server error'});
    }
}; 