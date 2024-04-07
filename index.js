require('dotenv').config();
const express= require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// flash------------------
app.use(cookieParser("vadasd"));
app.use(session({cookie:{maxAge:6000}}));
app.use(flash());
// flash end ------------------
const routesClient= require("./routes/client/index.route");
const routesAdmin= require("./routes/admin/index.router");

const port = process.env.PORT;
const database = require("./config/database");

database.connect();
app.set("views",`${__dirname}/views`);
app.set("view engine","pug");
app.use(express.static(`${__dirname}/public`));
app.set(express.urlencoded());
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


routesClient(app);
routesAdmin(app);
app.listen(port,()=>{
    console.log("Đã chạy với cổng: "+port
    );
})