const express = require('express');

const server = express();

    server.get('/',(req,res)=>{
        res.write('welcome to express js');
        res.end();
    })
    
    //CRUD -->  create(post),read(Get),update(Put,Patch),Delete(Delete)
    
    server.get('/user',(req,res)=>{
        res.status(200);
        res.json({message:'user get method'});
    })

    server.post('/user',(req,res)=>{
        res.status(201);
        res.json({message:'user post method'});
    })

    server.put('/user',(req,res)=>{
        res.status(200);
        res.json({message:'user put method'});
    })

    server.patch('/user',(req,res)=>{
        res.status(200);
        res.json({message:'user patch method'});
    })

    server.delete('/user',(req,res)=>{
        res.status(200);
        res.json({message:'user delete method'});
    })
server.listen(197,()=>{
    console.log('server start at http://localhost:197')
})
