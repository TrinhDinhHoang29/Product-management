const customersModel = require("../models/customer.model");
module.exports.login = async(req,res,next)=>{
    if(req.cookies.tokenCustomer){
        const customer = await customersModel.find({deleted:false,status:"active",tokenCustomer:req.cookies.tokenCustomer});
        if(customer.length>0){
            res.locals.customerInfo = customer[0];
        }
    }
    next();
}