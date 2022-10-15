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
                    res.status(400).send("Code has expired, Please Request Again");
                } else {
                   const validOTP = await bcrypt.compare(otp.toString(), hashedOTP);
                   
                   if(!validOTP){
                    res.status(400).send("Invalid code passed. Check your inbox");
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
})

module.exports = router;