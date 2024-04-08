const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema({
    title:String,
    description:String,
    permissions:{
        type:Array,
        default:[]
    },
    deleted:{
        type:Boolean,
        default:false
    },
    dateDeleted:Date
},{
    timestamps:true
});

const roles = mongoose.model("Roles",rolesSchema,"roles");
module.exports = roles;