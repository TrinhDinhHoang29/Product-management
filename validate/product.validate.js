module.exports.createPost = (req,res,next)=>{
    if(!req.body.title){
        req.flash("error","Thêm thất bại!!");
        res.redirect("back");
        return;
    }
    return next();
}