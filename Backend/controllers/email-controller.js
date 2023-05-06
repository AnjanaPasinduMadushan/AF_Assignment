
const nodemailer = require('nodemailer')

//ping server
const pingEmailServer = async (req, res, next) => {
    var msg = "Ping to Email server Successful!";
    try {
      return res.status(200).json({ message: msg });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error: "+ err });
    }
  };
  

const sendVerificationEmail = async(email, text, callback)=>{


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'Y3S1DSAyuProject@gmail.com',
        pass:'krngebjrguapwmhc'
    }
})

var mailOptions = {
    from:'Y3S1DSAyuProject@gmail.com',
    to:email,
    text:text
}

transporter.sendMail(mailOptions, function(err, info){
    if(err){
        console.log(err)
        if(err.responseCode == 535){
            return res.status(401).json({
              message: "Authentication Failed!"
            });
          }else{
            // other error except authentication
            return res.status(500).json(err);
          }
    }else{
        console.log('Email sent : '+info.response)
        return res.status(200).json({message: "Mail Successfully Sent!"});
    }
})

}

exports.sendVerificationEmail = sendVerificationEmail
exports.pingEmailServer = pingEmailServer;