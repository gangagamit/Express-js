const product=require("../model/user.model"); 
// add new Product 
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
 
// Get all product 
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


const mongoose = require("mongoose"); 
 
 
const productSchema = mongoose.Schema({ 
  "isDeleted" : { 
        type : Boolean, 
        default : false 
    }, 
    "title": { 
        type : String, 
        required : true 
    }, 
    "description": { 
        type : String, 
        required : true 
    }, 
    "category": { 
        type : String , 
        required : true 
    } , 
    "price" : { 
        type : Number, 
        required : true 
    }, 
    "discountPercentage": Number, 
    "brand": String, 
    "sku": { 
        type : String, 
        required : true 
    }, 
    "weight":{ 
        type : Number, 
        required : true 
    }, 
    "rating":{ 
        type : Number, 
        required : true 
    }, 
    "stock": { 
        type : Number, 
        required : true 
    }, 
    "tags": [{type : String}], // array of string types  
    "dimensions": { 
      "width":  { 
        type : Number, 
        required : true 
      }, 
      "height": { 
        type : Number, 
        required : true 
      }, 
      "depth":  { 
        type : Number, 
        required : true 
      } 
    }, 
    "reviews": [{ 
        "rating": Number , 
        "comment": String ,  
        "date": String , 
        "reviewerName": String , 
        "reviewerEmail": String 
      }], 
    "returnPolicy": String, 
    "minimumOrderQuantity": Number, 
    "meta": { 
      "createdAt": { 
        type : String, 
        required : true 
      }, 
      "updatedAt":  { 
        type : String, 
        required : true 
      }, 
      "barcode": { 
        type : String, 
        required : true 
      } , 
      "qrCode":  { 
        type : String, 
        required : true 
      }  
    }, 
    "images": [{type : String , required : true}], 
    "thumbnail":{type : String , required : true}, 
    "warrantyInformation": {type : String , required : true}, 
    "shippingInformation": {type : String , required : true}, 
    "availabilityStatus": String 
  }); 
 
  module.exports = mongoose.model('products',productSchema);