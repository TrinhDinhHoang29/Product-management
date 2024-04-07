const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const productsCategorySchema = new mongoose.Schema({
    title:String,
    parentId:Number, 
    desciption:String, 
    status:String, 
    thumbnail:String, 
    posision: Number,
    slug:{
        type:String,
        slug:"title",
        unique:true
    },
    deleted:{
        type:Boolean,
        default:false
    },
    dateDeleted:Date
},{
    timestamps:true
    });

const productCategory = mongoose.model("products-category",productsCategorySchema,"ProductsCategory");
module.exports = productCategory;