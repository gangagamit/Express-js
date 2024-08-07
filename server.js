const express = require('express');   
const server = express();

// const data = require('./friend.json');

const fs = require('fs');
const data = fs.readFileSync('./friend.json','utf-8');
console.log(data);

    server.get('/',(req,res)=>{
        res.write('welcome to express js');
        res.end();
    })

    //   server.get('/friend',(req,res)=>{
    //     res.status(200);
    //     res.json(JSON.parse(data));
    // })

let midlwr = (req,res,next)=>{
    // console.log(req.query);

    if(req.query.password === '456'){
        console.log('valid')
        next();
    }
    else
    {
        return res.json({message:'invalid password'})
    }
}

server.use(midlwr);
    
    //CRUD -->  create(post),read(Get),update(Put,Patch),Delete(Delete)
    
    server.get('/user',midlwr,(req,res)=>{
        res.status(200);
        res.json({message:'user login successfuly'});
    })

    server.post('/user',(req,res)=>{
        res.status(201);
        res.json({message:'user post method'});
    })

    // server.put('/user',(req,res)=>{
    //     res.status(200);
    //     res.json({message:'user put method'});
    // })

    // server.patch('/user',(req,res)=>{
    //     res.status(200);
    //     res.json({message:'user patch method'});
    // })

    // server.delete('/user',(req,res)=>{
    //     res.status(200);
    //     res.json({message:'user delete method'});
    // })
server.listen(197,()=>{
    console.log('server start at http://localhost:197')
})




