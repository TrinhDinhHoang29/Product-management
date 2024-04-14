const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const productsCategorySchema = new mongoose.Schema({
    title:String,
    parentId:String, 
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
    deletedBy:{
        id:String,
        deleteAt:Date
    },
    createdBy:{
        id:String,
        createAt:{
            type:Date,
            default:Date.now
        }
    }

},{
    timestamps:true
    });

const productCategory = mongoose.model("products-category",productsCategorySchema,"ProductsCategory");
module.exports = productCategory;