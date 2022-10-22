require('dotenv').config();
const nodemailer = require('nodemailer');

// step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

//Step 2
let mailOptions = {
    from: process.env.EMAIL,
    to: 'bamigboyeabiola@yahoo.com',
    subject: 'Testing email sending option',
    text: 'The mail works'
}

//Step 3
transporter.sendMail(mailOptions, function(err, data){
    if (err){
        console.log('Error Occurs', err);
    }
    else {
        console.log('Email Sent')
    }
})