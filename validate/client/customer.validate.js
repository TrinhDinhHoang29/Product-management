const customerModel = require("../../models/customer.model");


module.exports.register =async (req,res,next)=>{
    const customers = await customerModel.find({deleted:false,email:req.body.email});
    if(customers.length>0){
        req.flash("error","Email đã tồn tại !!");
        res.redirect("back");
        return;
    }
    if(req.body.fullName==""||req.body.userName==""||req.body.email==""||req.body.password==""){
        req.flash("error","Vui lòng không để trống thông tin!!");
        res.redirect("back");
        return;
    }
    next();
}
module.exports.login =async (req,res,next)=>{
    const customers = await customerModel.find({deleted:false,email:req.body.email});
    if(customers.length<1){
        req.flash("error","Không tìm thấy Email!!");
        res.redirect("back");
        return;
    }
    if(req.body.userName==""||req.body.email==""||req.body.password==""){
        req.flash("error","Vui lòng không để trống thông tin!!");
        res.redirect("back");
        return;
    }
    next();
}

module.exports.comfirmOtp = async (req,res,next)=>{
    if(req.body.email==""||req.body.otp==""){
        req.flash("error","Error !!");
        res.redirect("back");
        return;
    }
    next();
}