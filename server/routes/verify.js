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

//Generating OTP
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    };

//Send OTP for Email Verification

const sendOTPVerificationEmail = async ({id, email, firstName, lastName}, res) => {
    
    try {
        const otp = getRandomNumber(333651, 999234);

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
            subject: 'Maintenance Log Keeper',
            html: `Hello ${firstName} ${lastName}. <br> <br> <p>Enter <b> ${otp} </b> in the app to verify your email addressa and complete your registration.</p><br> <p> This OTP expires in one hour. </p>`
        }

        const salt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(otp.toString(), salt);

        console.log(hashedOTP);
        let verify = new Verify ({
            userId: id,
            token: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000

        });

        await verify.save();
        //Step 3
        transporter.sendMail(mailOptions);

        console.log("Email Sent");
        // res.json({
        //     status: 'Pending',
        //     message: 'Verification OTP Email Sent',
        //     data: {
        //         userId: _id,
        //         email
        //     }
        // })

    } catch (error) {
        console.log(error.message);
        // res.json({
        //     status: 'Failed',
        //     message: error.message
        // })
        
    }
}


// @route GET api/verify
// @desc Verify registered user
// @access Public

router.post('/',
    // email validation
    body('otp', 'Please include a valid otp').isLength({ min: 6 , max: 6}),
    //username must not be empty
    body('userId', 'Please add user Id').not().isEmpty(),
    auth, async(req,res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        } 
        try {
            let {userId, otp} = req.body;
            const userOTPVerification = await Verify.find({
                userId,
            });
            
            if(userOTPVerification.length <= 0){
                res.status(400).send("Account Invalid or has already been veified. Sign Up or Log In");
            } else {
                const {expiresAt} = userOTPVerification[0];
                const hashedOTP = userOTPVerification[0].token;
                const {_id} = userOTPVerification[0]._id;

                if(expiresAt < Date.now()){
                    await Verify.findByIdAndDelete(userId);
                    return res.status(400).json({msg: "Code has expired, Please Request Again"});
                } else {
                   const validOTP = await bcrypt.compare(otp.toString(), hashedOTP);
                   
                   if(!validOTP){
                    return res.status(400).json({msg: "Invalid code passed. Check your inbox"});
                   } else {
                    await User.updateOne({_id: userId}, {verified: true});
                    
                    await Verify.findByIdAndDelete(_id);
                    res.json({
                        status: "VERIFIED",
                        message: "User Email Verified Successfully"
                    })
                   }
                }

        }
        
        
    } catch (error) {
        
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/verify
// @desc Verify registered user
// @access Public

router.post('/resend',
    // email validation
    body('email', 'Please include an email').isEmail(),
    //username must not be empty
    body('userId', 'Please add user Id').not().isEmpty(),
    auth, async(req,res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        } 
        try {
            
            
            
            let {userId, email} = req.body;
            const userOTPVerification = await Verify.findOne({
                userId,
            });
            
            if(!userOTPVerification || userOTPVerification.length === 0){
                
                return res.status(400).json({msg: "Token Not Found"});
            }

            const {_id} = userOTPVerification[0]._id;
            await Verify.findByIdAndDelete(_id);

           
            let user = await User.findOne({email});
            console.log(user)
            
            await sendOTPVerificationEmail(user);

        }
         catch (error) {
        
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;