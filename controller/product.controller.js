// const products = require('../product.json');

// exports.addnewProduct = (req,res)=>{
//     products.push(req.body);
//     res.json({product:req.body,msg:'product add successfully'});
// };

// exports.getallProduct = (req,res)=>{
//     res.json(products);
// };

// exports.getProduct = (req,res)=>{
//     let id =  +req.params.id;
//     let item = products.find((product)=>product.id ===  id)
//     res.json(item);
// };

// exports.replaceProduct = (req,res)=>{
//     let id = +req.params.id;
//     let proIndx = products.findIndex((product)=> product.id === id);
//     console.log(proIndx);
//     products.splice(proIndx,1,{...req.body});
//     res.json({message:"product replace successfully"});
// };

// exports.updateProduct = (req,res)=>{
//     let id = +req.params.id;
//     let proIndx = products.findIndex((product)=> product.id === id);
//     console.log(proIndx);
//     const product = products[proIndx];
//     console.log(product);
//     products.splice(proIndx,1,{...product,...req.body});
//     res.json({message:'update succesfully'});
// };

// exports.deleteProduct = (req,res)=>{
//     let id = +req.params.id;
//     let proIndx = products.findIndex((product)=>product.id === id);
//     console.log(proIndx);
//     products.splice(proIndx,2);
//     res.json({products,message:"delete successfully"});
// }


const product=require("../Model/product.model"); 
// add new Product 
exports.addNewProduct=async(req,res)=> 
    { 
    try{ 
        console.log(req.body); 
        const {firstname ,lastname,email,age,hobbies,address}=req.body; 
        let Product =await product.findOne({email:email}); 
        if(Product) 
        { 
            return res.status(400).json({message:"product already exists......"}); 
        } 
             
            Product=await product.create({ 
            firstname ,lastname,email,age,hobbies,address, 
            }); 
            // Product.save(); 
            res.status(201).json({message:"product Added"}); 
    } 
    catch(err){ 
        console.log(err); 
        res.status(500).json({message:"Internal server error"}) 
    } 
}; 
 
// Get all product 
exports.getAllProduct=async(req,res)=> 
{ 
    try{ 
        let Products=await product.find(); 
        res.status(200).json(Products); 
    } 
    catch(error) 
    { 
        console.log(error) 
        res.status(500).json({message:"Internal server error"}); 
    } 
}; 
 
//get user 
exports.getProduct=async (req,res)=>{ 
    try{ 
        let Product= await product.findOne({firstname:req.query.firstname}); 
        if(!Product){ 
            return res.status(404).json({message:"Product not Found.."}) 
        } 
        res.status(200).json(Product); 
    } 
        catch(error) 
        { 
            console.log(error); 
            res.status(500).json({message:"Internal server error"}); 
        } 
         
    }