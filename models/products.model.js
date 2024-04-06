const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new  mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    discountPercentage:Number,
    rating:Number,
    stock:Number,
    brand:String,
    category:String,
    thumbnail:String,
    status:String,
    slug:{
        type:String,
        slug:"title",
        unique:true
    },
    deleted:{
        type:Boolean,
        default:true
    },
    dateDeleted:Date
},{
    timestamps:true
});

const Product= mongoose.model("Product",productSchema,"products");
module.exports = Product;