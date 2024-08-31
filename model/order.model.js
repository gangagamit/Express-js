const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products",  
            },
            quantity:{
                type:Number,
            },
            totalAmount: Number
        },
    ],
    totalPrice:{
        type:Boolean,
        default:false
    }
},
{
    versionKey:false,
    timestamps:true,
});

module.exports = mongoose.model("order",orderSchema);