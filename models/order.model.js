const mongoose = require("mongoose");
const ordersSchema = new  mongoose.Schema({
    // user_id:String,
    cart_id:String,
    userInfo:{
        fullName:String,
        phone:String,
        address:String
    },
    status:{
        type:String,
        default:"ordered"
    }
    ,
    products:[
        {
            product_id:String,
            quantity:Number,
            price:Number
        }
    ],
    deleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

const orders= mongoose.model("order",ordersSchema,"orders");
module.exports = orders;