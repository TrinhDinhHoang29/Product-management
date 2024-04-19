const nodemailer = require('nodemailer');

module.exports.sendOTP = (toEmail,subject,html)=>{
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'behoangloduoc@gmail.com',
    pass: 'ajuh fuqu pwiv ugqj'
  }
});

const mailOptions = {
  from: 'behoangloduoc@gmail.com',
  to: toEmail,
  subject: subject,
  html: html
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
 console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    // do something useful
  }
});
}