const express= require('express');
const app = express();
const routes= require("./routes/client/index.route");
const port = 8080;

app.set("views","./views");
app.set("view engine","pug");
app.use(express.static("public"));
app.set(express.urlencoded());

routes(app);

app.listen(port,()=>{
    console.log("Đã chạy với cổng: "+port
    );
})