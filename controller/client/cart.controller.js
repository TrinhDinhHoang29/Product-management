const cartsModel = require("../../models/cart.model");

module.exports.add= async(req,res)=>{
    const productId = req.params.id;
    const productQuantity = parseInt(req.body.quantity);
    const objectCart = {
        product_id:productId,
        quantity:productQuantity
    }
    const carts = await cartsModel.findOne({_id:req.cookies.cartId});
    const product = carts.Products.find(item=>item.product_id==productId);
    if(product){
        objectCart.quantity = product.quantity+productQuantity;
        await cartsModel.updateOne({_id:req.cookies.cartId,"Products.product_id":productId},{
            "$set":{
                "Products.$.quantity":objectCart.quantity
            }
        })
        req.flash("success","Thêm vào giỏ thành thành công !!");
        res.redirect("back");

    }else{
        await cartsModel.updateOne({_id:req.cookies.cartId},{
            $push:{Products:objectCart}
        })
        req.flash("success","Thêm vào giỏ thành thành công !!");
        res.redirect("back");
    }

}