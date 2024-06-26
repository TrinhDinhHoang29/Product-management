const productsRoutes = require("./products.route");
const homeRoutes = require("./home.route");
const searchRoutes = require("./search.route");
const cartMiddleware = require("../../middlewares/cart.middleware");
const menuProductsCategory = require("../../middlewares/menuProductsCategory.middleware");
const cartRoutes = require("./cart.route");
const orderRoutes = require("./checkout.route");
const customerRoutes = require("./customer.route");
const chatRoutes = require("./chat.route");
const usersRoutes = require("./users.route");
// const closeTab = require("../../middlewares/closeTab.middleware");
const authClient = require("../../middlewares/authClient.middleware");
const customerMiddlewares = require("../../middlewares/customer.middleware");
const storageMessageMiddleware = require("../../middlewares/storageMessage.middleware");
module.exports = (app)=>{
app.use(cartMiddleware.cartId);
app.use(customerMiddlewares.login);
app.use(menuProductsCategory.menuProductsCategory);
// app.use(closeTab.closeTab);
app.use("/",homeRoutes);
app.use("/products",productsRoutes);
app.use("/search",searchRoutes);
app.use("/cart",cartRoutes);
app.use("/checkout",orderRoutes);
app.use("/customer",customerRoutes);
app.use("/chat",authClient.checkLogin,chatRoutes);
app.use("/users",authClient.checkLogin,storageMessageMiddleware.storageMessage,usersRoutes);

}