const cloud = require("../../helper/uploadCloud.helper");
module.exports.uploadCloud =async (req, res, next)=>{
    if(req.file){   
        const link =await cloud.upload(req.file.buffer);
        req.body[req.file.fieldname] = link;
    }
    next();
}