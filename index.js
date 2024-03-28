require('dotenv').config()
const express= require('express');
const app = express();
const routesClient= require("./routes/client/index.route");
const routesAdmin= require("./routes/admin/index.router");

const port = process.env.PORT;
const database = require("./config/database");

database.connect();
app.set("views","./views");
app.set("view engine","pug");
app.use(express.static("public"));
app.set(express.urlencoded());

routesClient(app);
routesAdmin(app);
app.listen(port,()=>{
    console.log("Đã chạy với cổng: "+port
    );
})