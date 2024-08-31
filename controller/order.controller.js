const Order = require('../model/order.model');
const Cart = require('../model/carts.model');

exports.addNewOrder = async (req,res) =>{
    try {
        let carts = await Cart.find({
            user: req.user._id,
            isDelete:false,
        }).populate("productId");

        let orderItems = carts.map((item)=>({
            productId:item.productId._id,
            quantity:item.quantity,
            price:item.productId.price,
            totalAmount:item.quantity*item.productId.price,
        }));
        //total price for all item
        let amount = orderItems.reduce(
            (total,item)=>(total+= item.totalAmount),0
        );

        let order = await Order.create({
            userId:req.user._id,
            items:orderItems,
            totalPrice:amount
        });

        await Cart.updateMany(
            {
                user:req.user._id,
                isDelete: false,
            },
            {
                isDelete:true
            }
        );
        res.json({message:"Order Place",order});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server Error"});        
    }
};