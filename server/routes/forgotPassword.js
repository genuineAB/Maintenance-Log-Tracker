const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
require('dotenv').config();
const nodemailer = require('nodemailer');
const open = require('open');



const User = require('../models/User');



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
          
            

            const secret = process.env.jwtSecret + user.hashed_password;
            
            const payload = {
                email,
                id: user.id
            }

            const token = jwt.sign(payload, secret, {expiresIn: '10min'});

            
            const link = process.env.baseURL+`/api/forgotpassword/${user.id}/${token}`;
            console.log(link)
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
            return res.status(200).json({payload});
        } catch (error) {
            
            console.error(error.message);
            return res.status(500).send('Server Error');
}
});

router.get('/:id/:token', async (req, res) => {
    const {id, token} = req.params;
    console.log(id);
    
        const user = await User.findOne({
            _id : id
        });
        
        if(!user){
            return res.status(400).send("Invalid User Id");
        }

        const secret = process.env.jwtSecret + user.hashed_password;


    try {
        const payload = jwt.verify(token, secret);
        return res.render('resetpassword', {email: payload.email});
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
    

});


router.post('/:id/:token',
    // must include password
    body('password', 'Please Must Be At Least 8 Ch').isLength({min: 8, max:15}),
    body('password2', 'Please Confirm Password').exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        } 
        const {id, token} = req.params;
        let {password, password2} = req.body;


        const validatePassword = (password) => {
            const res =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
            return res.test(String(password));
        }
        let message;
        if(!validatePassword(password)){
            message = "Password Must Contain A Number, An UpperCase and s special symbol"
            return res.status(400).send(message);
        };
        
        if(password !== password2){
            message = "Password does not match"
            return res.status(400).send(message);
        }

        const user = await User.findOne({
            _id: id
        });

        if(!user){
            message = "Invalid User Id"
            return res.status(400).send(message);
        }

        const secret = process.env.jwtSecret + user.hashed_password;
        

    try {
        
        jwt.verify(token, secret);
        

        // Encrypt Password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        await User.updateOne({_id: id}, {hashed_password: password});

        message = "Password Reset Successfully. Please sign in with your new password";
        await open(process.env.frontendBaseURL);
        return res.status(200).send(message);
        
        
    } catch (error) {
        console.error(error.message);
        message = 'Server Error'
        return res.status(500).send(message);
    }
    

})
module.exports = router;