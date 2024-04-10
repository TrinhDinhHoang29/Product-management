const dashboardRouter = require("./dashboard.router");
const productsRouter = require("./products.route");
const productsCategoryRouter = require("./products-category.router");
const rolesRouter = require("./roles.router");
const usersRouter = require("./users.router");
const authRouter = require("./auth.router");
const tokenMiddlewares = require("../../middlewares/admin/auth.middleware");

module.exports = (app)=>{
    app.use("/admin/dashboard",tokenMiddlewares.checkToken,dashboardRouter);
    app.use("/admin/products",tokenMiddlewares.checkToken,productsRouter);
    app.use("/admin/products-category",tokenMiddlewares.checkToken,productsCategoryRouter);
    app.use("/admin/roles",tokenMiddlewares.checkToken,rolesRouter);
    app.use("/admin/users",tokenMiddlewares.checkToken,usersRouter);
    app.use("/admin/auth/",authRouter);
}