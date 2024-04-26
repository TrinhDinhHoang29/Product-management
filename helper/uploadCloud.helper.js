//Thu vien upload start ------------------------
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const cloudConfig = require("../config/cloudinary.config");
//Thu vien upload end ------------------------

cloudConfig(cloudinary);

const  streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
module.exports.upload = async (buffer)=>{
  let result = await streamUpload(buffer);
  return result.url
} 