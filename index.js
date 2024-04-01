require('dotenv').config()
const express= require('express');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
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