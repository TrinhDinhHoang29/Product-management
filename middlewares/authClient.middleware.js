

module.exports.checkLogin = async (req,res,next)=>{
    if(!res.locals.customerInfo){
        res.redirect("/customer/login");
        return;
    }
    next();
}