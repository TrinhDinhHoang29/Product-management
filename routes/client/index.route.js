const productsRoutes = require("./products.route");
const homeRoutes = require("./home.route");
const searchRoutes = require("./search.route");
const cartMiddleware = require("../../middlewares/cart.middleware");
const menuProductsCategory = require("../../middlewares/menuProductsCategory.middleware");
const cartRoutes = require("./cart.route");
module.exports = (app)=>{
app.use(cartMiddleware.cartId);
app.use(menuProductsCategory.menuProductsCategory);
app.use("/",homeRoutes);
app.use("/products",productsRoutes);
app.use("/search",searchRoutes);
app.use("/cart",cartRoutes);


}