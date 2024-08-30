// const express = require('express');

// const productRoutes = express.Router();
// const {addnewProduct,
//     getallProduct,
//     getProduct,
//     replaceProduct,
//     updateProduct,
//     deleteProduct

// } = require('../controller/product.controller');

// productRoutes.post('/',addnewProduct);

// productRoutes.get('/',getallProduct);

// productRoutes.get('/:id',getProduct);

// productRoutes.put('/:id',replaceProduct);

// productRoutes.patch('/:id',updateProduct);

// productRoutes.delete('/:id',deleteProduct);

// module.exports = productRoutes;

// const express = require('express') 
// const productRoutes = express.Router(); 
 
// const { 
//     addNewProduct, 
//     getAllProduct, 
//     getProduct 
 
// }=require("../controller/product.controller"); 
 
 
// productRoutes.post("/",addNewProduct); 
// productRoutes.get("/",getAllProduct); 
// productRoutes.get("/get-product",getProduct); 
 
// module.exports=productRoutes;


const express = require('express'); 
const productRoutes = express.Router(); 
const { 
    addNewProduct, 
    getAllProduct, 
    getProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controller/product.controller"); 
// const { updateUser } = require('../controller/product.controller'); 
 
//  add new product - create 
productRoutes.post("/addproduct",addNewProduct); 
productRoutes.get("/getproduct",getAllProduct); 
productRoutes.get("/get-product",getProduct); 
productRoutes.put("/",updateProduct); 
productRoutes.delete("/",deleteProduct);
 
module.exports = productRoutes;