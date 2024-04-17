const cartsModel = require("../../models/cart.model");
const ProductsModel = require("../../models/products.model");
const orderModel = require("../../models/order.model");

module.exports.index = async (req,res)=>{
    const carts = await cartsModel.findOne({_id:req.cookies.cartId});
    for(let item of carts.Products){
        item.product = await ProductsModel.findOne({_id:item.product_id}).select("title thumbnail price slug");
    }
    carts.totalMoney = carts.Products.reduce((total,value)=>total+value.product.price*value.quantity,0);
    res.render("client/pages/checkout/index",{carts:carts});
}
module.exports.order = async (req,res)=>{
    const cartId = req.cookies.cartId;
    const userInfo = req.body;
    const carts = await cartsModel.findOne({_id:cartId});
    for(let item of carts.Products){
        const product = await ProductsModel.findOne({_id:item.product_id}).select("price");
        item.price = product.price;
    }
    const productsInfo = carts.Products;
    try{
    const order = new orderModel({
        cart_id:cartId,
        userInfo:userInfo,
        products:productsInfo
    });
    await order.save();
    req.flash("success","Đặt hàng thành công !!");
    await cartsModel.updateOne({_id:cartId},{Products:[]});
    res.redirect("back");
    }catch(err){
        console.log(err);
        req.flash("success","Đặt hàng thất bại");
        res.redirect("back");
    }
    
}