const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
require('dotenv').config();
const nodemailer = require('nodemailer');




const User = require('../models/User');
const Verify = require('../models/Verify');



// @route POST api/forgotpassword
// @desc Reset User Password
// @access Public

router.post('/',
    //Email Validation
    body('email', 'Please Add Valid Email').isEmail(),
     async(req,res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        } 
        try {
            let {email} = req.body;
            const user = await User.findOne({
                email
            });
            
            
            if(!user){
                return  res.status(400).send("User Not Found. Register User");
            }
          
            const payload = {
                email,
                id: user.id
            }

            const secret = config.get('jwtSecret') + user.hashed_password;
            
            const token = jwt.sign(payload, secret, {expiresIn: '15min'});

            const link = `http://localhost:5000/api/forgotpassword/${user.id}/${token}`;

            // // Send Email
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
                to: email,
                subject: 'Reset Your Maintenance Logger Password',
                html: `<p>
                Someone (hopefully you) has requested a password reset for your Maintenance Logs account. Follow the link below to set a new password: 
                </p>
                <br>
                <a href=${link}> Reset Password </a>
                <br>
                <p>
                If you don't wish to reset your password, disregard this email and no action will be taken.
                </p>
                <br>
                
                <p>
                Maintenance Logger Team
                </p>
                `
            }

            //Step 3
            transporter.sendMail(mailOptions);
            return res.status(200).send("Password Reset Link Sent to Email");
        } catch (error) {
            
            console.error(error.message);
            return res.status(500).send('Server Error');
}
});

router.get('/:id/:token', async (req, res) => {
    const {id, token} = req.params;
        const user = await User.findOne({
            id
        });

        if(!user){
            return res.status(400).send("Invalid User Id");
        }

        const secret = config.get('jwtSecret') + user.hashed_password;

        console.log(token);

    try {
        const payload = jwt.verify(token, secret);
        console.log(payload)
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
    

});


router.post('/:id/:token', async (req, res) => {
    const {id, token} = req.params;
    let {password} = req.body;

        const user = await User.findOne({
            id
        });

        if(!user){
            return res.status(400).send("Invalid User Id");
        }

        const secret = config.get('jwtSecret') + user.hashed_password;
        

    try {
        const payload = jwt.verify(token, secret);
        console.log(payload);

         // Encrypt Password
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            console.log(password)

        await User.updateOne({_id: id}, {hashed_password: password});

        return res.status(200).send("Password Reset Successfully")
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
    

})
module.exports = router;