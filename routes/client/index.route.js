const productsRoutes = require("./products.route");
const homeRoutes = require("./home.route");
const searchRoutes = require("./search.route");
const cartMiddleware = require("../../middlewares/cart.middleware");
const menuProductsCategory = require("../../middlewares/menuProductsCategory.middleware");
const cartRoutes = require("./cart.route");
const orderRoutes = require("./checkout.route");
const customerRoutes = require("./customer.route");
const customerMiddlewares = require("../../middlewares/customer.middleware");

module.exports = (app)=>{
app.use(cartMiddleware.cartId);
app.use(customerMiddlewares.login);
app.use(menuProductsCategory.menuProductsCategory);
app.use("/",homeRoutes);
app.use("/products",productsRoutes);
app.use("/search",searchRoutes);
app.use("/cart",cartRoutes);
app.use("/checkout",orderRoutes);
app.use("/customer",customerRoutes);

}