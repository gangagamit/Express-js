const products = require('../product.json');

exports.addnewProduct = (req,res)=>{
    products.push(req.body);
    res.json({product:req.body,msg:'product add successfully'});
};

exports.getallProduct = (req,res)=>{
    res.json(products);
};

exports.getProduct = (req,res)=>{
    let id =  +req.params.id;
    let item = products.find((product)=>product.id ===  id)
    res.json(item);
};

exports.replaceProduct = (req,res)=>{
    let id = +req.params.id;
    let proIndx = products.findIndex((product)=> product.id === id);
    console.log(proIndx);
    products.splice(proIndx,1,{...req.body});
    res.json({message:"product replace successfully"});
};

exports.updateProduct = (req,res)=>{
    let id = +req.params.id;
    let proIndx = products.findIndex((product)=> product.id === id);
    console.log(proIndx);
    const product = products[proIndx];
    console.log(product);
    products.splice(proIndx,1,{...product,...req.body});
    res.json({message:'update succesfully'});
};

exports.deleteProduct = (req,res)=>{
    let id = +req.params.id;
    let proIndx = products.findIndex((product)=>product.id === id);
    console.log(proIndx);
    products.splice(proIndx,2);
    res.json({products,message:"delete successfully"});
}
