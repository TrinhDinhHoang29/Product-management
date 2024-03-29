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
        let keyword = req.query.keyword;
    if(req.query.keyword){
        const regex = new RegExp(keyword,"i");/// i để k phân biệt chữ hoa chữ thường
        find.title = regex;
    }
    let Products=await productsModel.find(find);
    res.render("admin/pages/products/index",{products:Products,filterStatus:filterStatus,keyword:keyword});
}