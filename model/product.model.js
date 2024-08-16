const product=require("../model/user.model"); 
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