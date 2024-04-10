const dashboardRouter = require("./dashboard.router");
const productsRouter = require("./products.route");
const productsCategoryRouter = require("./products-category.router");
const rolesRouter = require("./roles.router");
const usersRouter = require("./users.router");
const authRouter = require("./auth.router");

module.exports = (app)=>{
    app.use("/admin/dashboard",dashboardRouter);
    app.use("/admin/products",productsRouter);
    app.use("/admin/products-category",productsCategoryRouter);
    app.use("/admin/roles",rolesRouter);
    app.use("/admin/users",usersRouter);
    app.use("/admin/auth/",authRouter);
}