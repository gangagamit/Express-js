const express =  require('express');
const app = express();
const products = require('./product.json');
const users = require('./user.json');
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.send('welcome to express js');
  
});

//create Api

app.post('/product',(req,res)=>{
    products.push(req.body);
    res.json({product:req.body,msg:'product add successfully'});
});

// get all product
app.get('/product',(req,res)=>{
    res.json(products);
});

//get single product
app.get('/product/:id',(req,res)=>{
    let id =  +req.params.id;
    let item = products.find((product)=>product.id ===  id)
    res.json(item);
});

//replace data with put method

app.put('/product/:id',(req,res)=>{
    let id = +req.params.id;
    let proIndx = products.findIndex((product)=> product.id === id);
    console.log(proIndx);
    products.splice(proIndx,1,{...req.body});
    res.json({message:"product replace successfully"});
});

//update data with patch method

app.patch('/product/:id',(req,res)=>{
    let id = +req.params.id;
    let proIndx = products.findIndex((product)=> product.id === id);
    console.log(proIndx);
    const product = products[proIndx];
    console.log(product);
    products.splice(proIndx,1,{...product,...req.body});
    res.json({message:'update succesfully'});
});

//Delete Data with DELETE method
app.delete('/product/:id',(req,res)=>{
    let id = +req.params.id;
    let proIndx = products.findIndex((product)=>product.id === id);
    console.log(proIndx);
    products.splice(proIndx,2);
    res.json({products,message:"delete successfully"});
});


app.listen(155,()=>{
    console.log('start server');
})
