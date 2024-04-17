const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const blogSchema = new  mongoose.Schema({
    title:String,
    description:String,
    Status:String,
    featured:Boolean,
    thumbnail:String,
    slug:{
        type:String,
        slug:"title",
        unique:true
    },deleted:{
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
});
const productCategory = mongoose.model("products-category",blogSchema,"ProductsCategory");
module.exports = productCategory;