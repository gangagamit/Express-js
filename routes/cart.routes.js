const express =  require('express');
const cartRoutes = express.Router();

const {
    addtoCart,
    getAllCarts,
    updateCart
} 
=require('../controller/cart.controller');

const {VerifyToken} = require('../helpers/tokenVerify');

cartRoutes.post('/',VerifyToken,addtoCart);
cartRoutes.get('/',VerifyToken,getAllCarts);
cartRoutes.put('/',VerifyToken,updateCart);

module.exports= cartRoutes;