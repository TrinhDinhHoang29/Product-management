const cartsModel = require("../../models/cart.model");
const ProductsModel = require("../../models/products.model");

module.exports.index = async (req,res)=>{
    const carts = await cartsModel.findOne({_id:req.cookies.cartId});
    for(let item of carts.Products){
        item.product = await ProductsModel.findOne({_id:item.product_id}).select("title thumbnail price slug");
    }
    carts.totalMoney = carts.Products.reduce((total,value)=>total+value.product.price*value.quantity,0);
    res.render("client/pages/cart/index",{carts:carts});
}

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


module.exports.delete = async(req,res)=>{
    const productId = req.params.productId;
   const product= await cartsModel.updateOne({_id:req.cookies.cartId},{
        $pull:{Products:{
            product_id:productId
        }}
    })
    req.flash("success","Đã xóa thành công sản phẩm !!");
    res.redirect("back");
}
module.exports.updateQuantity = async(req,res)=>{
    const productId = req.params.productId;
    const quantity = req.params.quantity;
    await cartsModel.updateOne({_id:req.cookies.cartId,"Products.product_id":productId},{
        "$set":{
            "Products.$.quantity":quantity
        }
    })
    res.redirect("back");
   
}
