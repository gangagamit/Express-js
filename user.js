const express = require('express');

const user = express();

const users = require('./user.json');
const morgan = require('morgan');

user.use(express.json());
user.use(express.urlencoded({extended:true}));
user.use(morgan('dev'));

user.get('/',(req,res)=>{
    res.send('welcome to users');
});

user.post('/user',(req,res)=>{
    // console.log(req.body);
        users.push(req.body);
        res.json({user:req.body,msg:'user add successfully'});
});

user.get('/user',(req,res)=>{
    res.json(users);
});

user.get('/user/:id',(req,res)=>{
    let id = +req.params.id;
    let list = users.find((emplist)=>emplist.id === id);
    res.json(list)
});

user.put('/user/:id',(req,res)=>{
    let id = +req.params.id;
    let empindx = users.findIndex((emplist)=> emplist.id === id);
    console.log(empindx);
    products.splice(empindx,1,{...req.body});
    res.json({message:"replace successfully"});
});

user.patch('/user/:id',(req,res)=>{
    let id = +req.params.id;
    let empindx = users.findIndex((emplistt)=> emplistt.id === id);
    console.log(empindx);
    const list = users[proIndx];
    console.log(list);
    products.splice(empindx,1,{...user,...req.body});
    res.json({message:'update succesfully'});
});

user.delete('/user/:id',(req,res)=>{
    let id = +req.params.id;
    let empindx = users.findIndex((emplist)=>emplist.id === id);
    console.log(empindx);
    products.splice(empindx,2);
    res.json({users,message:"delete successfully"});
});

user.listen(789,()=>{
    console.log('server start at http://localhost:789');
})

