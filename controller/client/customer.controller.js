const md5 = require('md5');
const customerModel = require("../../models/customer.model");
const carts = require("../../models/cart.model");
const forgotPasswordModel = require("../../models/forgotPassword.model");
module.exports.register = async (req,res)=>{

    res.render("client/pages/customer/register");
}
module.exports.registerPost = async (req,res)=>{
    req.body.password = md5(req.body.password);
    const customer = customerModel(req.body);
    await customer.save();
    res.redirect("/customer/login");
}
module.exports.login = async (req,res)=>{
    res.render("client/pages/customer/login");
}
module.exports.loginPost = async(req,res)=>{
    const customer =await customerModel.findOne({email:req.body.email});
    req.body.password = md5(req.body.password);
    if(customer.password!=req.body.password){
        req.flash("error","Sai mật khẩu !!");
        res.redirect("back");
        return;
    }
    if(customer.status=="unactive"){
        req.flash("error","Tài khoản đã bị khóa!!");
        res.redirect("back");
        return;
    }
    //await carts.updateOne({_id:req.cookies.cartId},{user_id:customer._id});
    res.cookie("tokenCustomer",customer.tokenCustomer);
    res.redirect("/");
}
module.exports.logout = (req,res)=>{
    res.clearCookie("tokenCustomer");
    res.redirect("/customer/login");
}
module.exports.forgotPassword = async(req,res)=>{
    res.render("client/pages/customer/forgotPassword");
}
module.exports.forgotPasswordPost = async(req,res)=>{
    const customers = await customerModel.find({email:req.body.email,userName:req.body.userName,deleted:false});
    if(customers.length<1){
        req.flash("error","Sai thông tin !!");
        res.redirect("back");
        return;
    }
    req.body.expireAt = Date.now();
    const forgotPassword = new forgotPasswordModel(req.body);
    await forgotPassword.save();
    res.redirect("back");

}