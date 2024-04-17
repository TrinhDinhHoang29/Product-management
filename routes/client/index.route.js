const productsRoutes = require("./products.route");
const homeRoutes = require("./home.route");
const searchRoutes = require("./search.route");

const menuProductsCategory = require("../../middlewares/menuProductsCategory.middleware");
module.exports = (app)=>{
    
app.use(menuProductsCategory.menuProductsCategory);
app.use("/",homeRoutes);
app.use("/products",productsRoutes);
app.use("/search",searchRoutes);

}