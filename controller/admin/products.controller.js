const productsModel = require("../../models/products.model");

module.exports.products =async (req,res)=>{
    const filterStatus = [
        {
            name:"Tất cả",
            status:"",
            class:"active"
        },
        {
            name:"Hoạt động",
            status:"active",
            class:""
        },
        {
            name:"Dừng hoạt động",
            status:"unactive",
            class:""
        }
    ]


    let find = {deleted:true};
    if(req.query.status)
        {
            find.status=req.query.status;
            filterStatus.forEach(element=>{
                element.class="";
                if(element.status==req.query.status)
                    element.class="active";
            })
        }
    if(req.query.keyword){
        find.title = req.query.keyword;
    }
    let Products=await productsModel.find(find);
    res.render("admin/pages/products/index",{products:Products,filterStatus:filterStatus});
}