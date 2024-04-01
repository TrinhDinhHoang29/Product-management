const productsModel = require("../../models/products.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
module.exports.products =async (req,res)=>{
    
    let filterStatus = filterStatusHelper(req.query);//Lấy từ helper
    let find = {deleted:true};
    if(req.query.status)//kiểm tra có status nào hay không
      find.status = req.query.status;//nếu có thêm vào đối tượng find 1 value status 

    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }



    // pagination start -----------------------------------
    let objPagination = {
        limiteItem:4,
        currentPage:1
    }
    const countProducts = await productsModel.find(find).count();
    objPagination.totalPage = Math.ceil(countProducts/objPagination.limiteItem);
    const resultPagination = paginationHelper(objPagination,req.query);

    // pagination end ---------------------------------------
    let Products=await productsModel.find(find).limit(objPagination.limiteItem).skip(objPagination.skipItem);
    res.render("admin/pages/products/index",{products:Products,
                                            filterStatus:filterStatus,
                                            keyword:objectSearch.keyword,
                                            objPagination:resultPagination
                                        });
}

module.exports.changeStatus = async (req,res)=>{
    const id = req.params.id;
    const status = req.params.status;
    await productsModel.updateOne({_id:id},{status:status});
    res.redirect("back");
}