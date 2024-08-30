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


// const product=require("../Model/product.model"); 
// // add new Product 
// exports.addNewProduct=async(req,res)=> 
//     { 
//     try{ 
//         console.log(req.body); 
//         const {firstname ,lastname,email,age,hobbies,address}=req.body; 
//         let Product =await product.findOne({email:email}); 
//         if(Product) 
//         { 
//             return res.status(400).json({message:"product already exists......"}); 
//         } 
             
//             Product=await product.create({ 
//             firstname ,lastname,email,age,hobbies,address, 
//             }); 
//             // Product.save(); 
//             res.status(201).json({message:"product Added"}); 
//     } 
//     catch(err){ 
//         console.log(err); 
//         res.status(500).json({message:"Internal server error"}) 
//     } 
// }; 
 
// // Get all product 
// exports.getAllProduct=async(req,res)=> 
// { 
//     try{ 
//         let Products=await product.find(); 
//         res.status(200).json(Products); 
//     } 
//     catch(error) 
//     { 
//         console.log(error) 
//         res.status(500).json({message:"Internal server error"}); 
//     } 
// }; 
 
// //get user 
// exports.getProduct=async (req,res)=>{ 
//     try{ 
//         let Product= await product.findOne({firstname:req.query.firstname}); 
//         if(!Product){ 
//             return res.status(404).json({message:"Product not Found.."}) 
//         } 
//         res.status(200).json(Product); 
//     } 
//         catch(error) 
//         { 
//             console.log(error); 
//             res.status(500).json({message:"Internal server error"}); 
//         } 
         
//     }


const Product = require("../model/product.model"); 
 
// Add New User 
exports.addNewProduct = async (req, res) => { 
    try { 
        // console.log(req.body); 
        const { title, description, category, price, discountPercentage, brand,  
            sku, weight, rating, stock, tags, dimensions, reviews, returnPolicy,  
            minimumOrderQuantity, meta, images, thumbnail, warrantyInformation,  
            shippingInformation, availabilityStatus } = req.body; 
        let product = await Product.findOne({sku,isDelete:false}); 
        if(product) 
            return res.status(400).json({message:"Product already exists"}); 
        product = await Product.create({ 
            title, 
            description, 
            category, 
            price, 
            discountPercentage, 
            brand, 
            sku, 
            weight, 
            rating, 
            stock, 
            tags, 
            dimensions, // Make sure this is an object with width, height, and depth 
            reviews,  
            images, 
            thumbnail, 
            warrantyInformation, 
            shippingInformation, 
            availabilityStatus, 
            meta: { 
                createdAt: new Date().toISOString(), 
                updatedAt: new Date().toISOString(), 
                barcode: "your-barcode-here", 
                qrCode: "your-qrCode-here" 
            } 
 
        }); 
        product.save(); 
        res.status(201).json({product,message:"Product Added"}); 
    } catch(error) { 
        console.log(error); 
        res.status(500).json({message:"Internal Server Error"}); 
    } 
}; 
 
// Get All Users 
exports.getAllProduct = async(req,res) =>{ 
    try { 
        let products = await Product.find(); 
        res.status(200).json(products); 
    }  
    catch(error) { 
        console.log(error); 
        res.status(500).json({message:"Internal Server Error"}) 
    } 
} 
 
// Get User by ID 
exports.getProduct = async(req,res)=>{ 
    try{ 
        // let user = await User.findOne({_id:req.query.userId}); 
        let product = await Product.findById(req.query.productId); 
        if(!product) 
            return res.status(404).json({message:"Product not found"}); 
        res.status(200).json(product); 
    } 
    catch(error){ 
        console.log(error); 
        res.status(500).json({message:"Internal Server Error"}) 
    } 
}; 
 
// Update product 
exports.updateProduct = async(req,res)=>{ 
    try { 
        let product = await Product.findById(req.query.productId); 
        // console.log(user); 
        if(!product){ 
            return res.status(404).json({message:"Product not found"}); 
        } 
        // user = await User.updateOne({_id:req.query.userId},{$set:req.body},{new:true});  
        product = await Product.findByIdAndUpdate(req.query.productId,{$set:req.body},{new:true});  
        product.save(); 
        res.status(200).json({product,message:"Product update success"}); 
}  
catch (error) { 
    console.log(error); 
    res.status(500).json({message:"Internal Server Error"}) 
    } 
} 
 
// Delete product 
exports.deleteProduct = async(req,res)=>{ 
    try{ 
        let product = await Product.findById(req.query.productId); 
        if(!product){ 
            return res.status(404).json({message:"Product not found"}); 
        } 
        // product = await Product.deleteOne({_id:product._id}); 
        product = await Product.findByIdAndDelete(product._id); 
        // product = await Product.findOneAndDelete(product._id); 
        res.status(200).json({product,message:"Product deleted successfully"}); 
    } 
    catch(error){ 
        console.log(error); 
        res.status(500).json({message:"Internal Server Error"}) 
    } 
}