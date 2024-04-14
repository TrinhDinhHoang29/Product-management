module.exports.createPost = (req,res,next)=>{
    if(!req.body.password||!req.body.fullName||!req.body.userName){
        req.flash("error","Không để trống thông tin quan trọng !!");
        res.redirect("back");
    }else{
        next();
    }
}