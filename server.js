const express = require('express');

const server = express();
    server.get('/',(req,res)=>{
        res.write('welcome to express js');
        res.end();
    })
server.listen(197,()=>{
    console.log('server start at http://localhost:197')
})