const md5 = require('md5');
const customerModel = require("../../models/customer.model");
const carts = require("../../models/cart.model");
const forgotPasswordModel = require("../../models/forgotPassword.model");
const nodemailer = require("../../helper/nodemailer.helper");
module.exports.index = async (req,res)=>{

    res.render("client/pages/customer/index");
}
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
    const cart = await carts.findOne({user_id:customer._id});
    if(!cart){
    await carts.updateOne({_id:req.cookies.cartId},{user_id:customer._id});
    }else{
        res.cookie("cartId",cart._id);
    }
    res.cookie("tokenCustomer",customer.tokenCustomer);
    await customerModel.updateOne({
        tokenCustomer:customer.tokenCustomer
    },{
        statusOnline:"online"
    });
    _io.once('connection',(socket) => {
        socket.broadcast.emit("SERVER_RETURN_STATUS_ONLINE",customer._id);
    });
    res.redirect("/");
}
module.exports.logout = async(req,res)=>{
    await customerModel.updateOne({
        tokenCustomer:req.cookies.tokenCustomer
    },{
        statusOnline:"offline"
    });
    const customer = await customerModel.findOne({tokenCustomer:req.cookies.tokenCustomer}).select("_id");
    _io.once('connection',(socket) => {
        socket.broadcast.emit("SERVER_RETURN_STATUS_OFFLINE",customer._id);
    });
    res.clearCookie("tokenCustomer");
    res.clearCookie("cartId");
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
    nodemailer.sendOTP(req.body.email,"Xác thực thông tin tài khoảng",`Mã OTP của bạn là : <b>${forgotPassword.otp}</b> `);
    res.redirect(`/customer/comfirmOtp/${req.body.email}`);

}
module.exports.comfirmOtp = async(req,res)=>{
   res.render("client/pages/customer/comfirmOtp",{email:req.params.email});
}
module.exports.comfirmOtpPost = async(req,res)=>{
    const forgotPassword = await forgotPasswordModel.findOne({email:req.body.email,otp:req.body.otp});
    const customer = await customerModel.findOne({email:req.body.email});
    if(!forgotPassword){
        req.flash("error","Mã otp không đúng !!");
        res.redirect("back");
        return;
    }    
    res.cookie("tokenCustomer",customer.tokenCustomer);
    res.redirect("/customer/createPasswordNew");

}
module.exports.createPasswordNew = async(req,res)=>{
    res.render("client/pages/customer/createPasswordNew");
}

module.exports.createPasswordNewPost = async(req,res)=>{
    if(req.body.password!=req.body.rePassword){
        req.flash("error","Mật khẩu không khớp");
        res.redirect("back");
        return;
    }
    if(req.body.password==""||req.body.rePassword==""){
        req.flash("error","Không để trống");
        res.redirect("back");
        return;
    }
    await customerModel.updateOne({tokenCustomer:req.cookies.tokenCustomer},{password:md5(req.body.password)});
    req.flash("success","Đổi mật khẩu thành công !!");
    res.redirect("back");
}