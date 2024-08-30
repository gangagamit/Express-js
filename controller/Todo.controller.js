const todoUser =  require('../model/Todo.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport')

exports.showRegisterPage = async (req, res)=>{
    try {
        res.render("registration.ejs");
    } catch (error) {
        console.log(error);
        res.json({messag: "Server error"});
    }
}

exports.registerUser = async (req, res) => {
    try {
        let user = await todoUser.findOne({ email: req.body.email, isDelete: false });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        user = await todoUser.create({ ...req.body, password: hashPassword });
        // user.save();
        // res.status(201).json({user,message:"User Registration successful"});
        res.redirect('/api/todoList/login');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
//login

exports.showLoginPage = async (req, res)=>{
    try {
        res.render("login.ejs");
    } catch (error) {
        console.log(error);
        res.json({messag: "Server error"});
    }
};

exports.loginUser = passport.authenticate("local", {
    successRedirect: '/api/profile/',
    failureRedirect: '/api/todoList/login',
    failureFlash: true,
  });

  exports.updateProfile= async (req,res) => {
    try {
        let user = req.user;
        user = await todoUser.findByIdAndUpdate(
            user._id,
            {$set:req.body},
            {new:true}
        );
        res.status(202).json({user,message:"User update success"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

exports.deleteUser= async (req,res) => {
    try {
        let user = req.user;
        user = await todoUser.findByIdAndUpdate(
            user._id,
            {isDelete: true},
            {new:true}
        );
        res.status(202).json({user,message:"User update success"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
// exports.todoUser = async (req,res) =>{
//     try {
//         let todo = {
//             firstName:'anita',
//             lastName:'patel',
//             email:'patel@gmail.com',
//             password:'patel'
//         }

//      todo = await toDoModel.findOne({firstName:req.query.name});
//      if(!todo)
//      {
//         return res.render('NotFound.ejs');
//      }
//      res.render('todoList.ejs',{todo})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'Internal server Error'});
//     }
// }

// exports.getTodo = async (req,res)=>{
//     const todo = await toDoModel.find();
//     res.send(todo)
// }


// exports.saveTodo =  (req,res)=>{
//     // console.log(req.body);
//    const todo = req.body;
//    toDoModel.create(todo)
//    res.render('todoList.ejs')
//    .then(data =>{
//     console.log("save successfully");
//     res.status(201).send(data)
//    })
//    .catch(err=>{
//     console.log(err);
//     res.send({error:err,msg:"something went wrong"});
//    });
// }

// exports.updateTodo =  (req,res)=>{
//     const {id} = req.params
//     const {todo} = req.body;
//     toDoModel.findByIdAndUpdate(id,{todo})
//     .then(()=>{
       
//         res.send("update successfully")
//        })
//        .catch(err=>{
//         console.log(err);
//         res.send({error:err,msg:"something went wrong"});
//        });
//  }


//  exports.deleteTodo =  (req,res)=>{
//     const {id} = req.params
  
//     toDoModel.findByIdAndDelete(id)
//     .then(()=>{
       
//         res.send("update successfully")
//        })
//        .catch(err=>{
//         console.log(err);
//         res.send({error:err,msg:"something went wrong"});
//        });
// }
