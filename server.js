const express = require('express');   
const server = express();

// const data = require('./friend.json');

const fs = require('fs');
const data = fs.readFileSync('./friend.json','utf-8');
console.log(data);
 const morgan =  require('morgan');

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use('/hello',express.static('public'));
server.use(morgan('tiny'));

let mdlwr = (req,res,next)=>{
    console.log(req.body);
    if(req.body.age >=18){
        console.log('success');
        next();
    }
    else
    {
        return res.json({message:'incorrect way'});
    }
}
server.get('/',mdlwr,(req,res)=>{
    res.write('welcome to express js');
    res.end();
})
//   server.get('/friend',(req,res)=>{
    //     res.status(200);
    //     res.json(JSON.parse(data));
    // })

// let midlwr = (req,res,next)=>{
    // console.log(req.query);

//     if(req.query.password === '456'){
//         console.log('valid')
//         next();
//     }
//     else
//     {
//         return res.json({message:'invalid password'})
//     }
// }

// server.use(midlwr);
    
    //CRUD -->  create(post),read(Get),update(Put,Patch),Delete(Delete)
    
    server.get('/user',(req,res)=>{
        res.status(200);
        res.json({message:'user login successfuly'});
    })

    server.post('/user',(req,res)=>{
        res.status(201);
        res.json({message:'user post method'});
    })
    // server.get('/admin',mdlwr,(req,res)=>{
    //     res.status(200);
    //     res.json({message:'user login successfuly'});
    //     res.end();
    // })

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
server.listen(199,()=>{
    console.log('server start at http://localhost:199');
});