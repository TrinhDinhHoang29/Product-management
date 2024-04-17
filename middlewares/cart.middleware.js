const cartsModel = require("../models/cart.model");


module.exports.cartId = async (req,res,next)=>{
    if(!req.cookies.cartId){
        const cart = new cartsModel();
        await cart.save();    
        res.cookie("cartId",cart.id,{expires: new Date(Date.now()+360*24*60*60*1000)});
    }
    else{
        const cart = await cartsModel.findOne({_id:req.cookies.cartId});
        cart.totalQuantity = cart.Products.reduce((total,current)=>total+current.quantity,0);
        res.locals.cart =cart;
    }
    next();
}