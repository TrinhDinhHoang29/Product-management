const orderModel = require("../../models/order.model");
const products = require("../../models/products.model");



module.exports.index  = async(req,res)=>{
    const orders = await orderModel.find({deleted:false});
    // orders.totalQuantity = orders.products.reduce((total,currentValue)=>total + currentValue.quantity,0);
    orders.forEach((item)=>{
        item.totalQuantity = item.products.reduce((value,currentValue)=>value+currentValue.quantity,0);
        item.totalPrice = item.products.reduce((value,currentValue)=>value+currentValue.price,0);
    })
    console.log(orders);
    res.render("admin/pages/orders/index",{orders:orders});
}