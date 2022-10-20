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
            subject: 'Verify Your Email Address',
            html: `Hi ${firstName} ${lastName}, <br> <br> 
            <p>Enter <b> ${otp} </b> in the maintenance logger application to verify your email address and complete your registration.
            </p>
            <br> 
            <p> 
            This OTP expires in one hour. 
            </p>
            <br>
            <p>
            Maintenance Logger Team
            </p>`
        }

        const salt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(otp.toString(), salt);

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


// @route POST api/users
// @desc Register a user
//@access Public
router.post('/', 
    // email validation
    body('email', 'Please include a valid email').isEmail(),
    //username must not be empty
    body('firstName', 'Please add First Name').not().isEmpty(),
    body('lastName', 'Please add Last Name').not().isEmpty(),
    //phone must not be empty
    body('phoneNumber', 'Please add Phone Number').not().isEmpty(),
    body('organizationName', 'Please add organization Name').not().isEmpty(),
    // password must be at least 6 chars long
    body('hashed_password', 'Password must be a minimum of 6 characters').isLength({ min: 6 }), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        } 
        
        const {firstName, lastName, phoneNumber, email, hashed_password, organizationName} = req.body;


        try {
            let user = await User.findOne({email});

            if(user){
                return res.status(400).json({msg: "User already exist"});

            }

            /// Genrate and Validate Organization Number
            let orgNumber;
            do {
                orgNumber = getRandomNumber(1000, 100000)
            } while (orgNumber == await User.findOne({orgNumber: orgNumber}));
            
            user = new User ({
                firstName,
                lastName,
                phoneNumber,
                email,
                hashed_password,
                organizationName,
                organizationNumber: orgNumber,
                
            });

            // Encrypt Password
            const salt = await bcrypt.genSalt(10);
            user.hashed_password = await bcrypt.hash(hashed_password, salt);

            sendOTPVerificationEmail(user);
            user = await user.save();
            // console.log(user._id)
            // sendOTPVerificationEmail(user.id, user.email);
        

            
            
            
            const payload ={
                user: {
                    id: user.id,
                    role: user.role,
                    organizationNumber: user.organizationNumber,
                    organizationName: user.organizationName
                }
            }
            
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 36000
            }, (err, token) => {
                if(err) throw err;
                res.json({ token });
            })

            
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
});



// @route GET api/users
// @desc Get all registered users
// @access Private
router.get('/', auth, async (req, res) => {
    
    try {
        // if(req.user.role !== "Admin"){
        //     res.status(401).json({msg: "Not Authorized"})
        // }
        let users = await User.find({organizationNumber: req.user.organizationNumber}).select('-hashed_password').sort({date: -1});
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});


// @route GET api/users/:id
// @desc GET a single user
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        let user = await User.findById(req.params.id).select('-hashed_password');

        
        if(!user || (req.user.organizationNumber !== user.organizationNumber)){
            return res.status(400).json({msg: "User Not Found"});
        }
        
        if(((req.user.role !== "Admin") && (req.user.id !== req.params.id)) ){
            return res.status(401).json({msg: "Not Authorized"})
        }

        res.json({user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @route UPDATE api/users/:id
// @desc UPDATE registered user
// @access Private
router.patch('/:id', auth, async (req, res) => {
    const {name, email, hashed_password, organizationName, employment_type, occupation, phoneNumber, role} = req.body;

    
    
    //Create User Field Object
    const userFields = {};
    if (name){
        userFields.name = name;
    }
    if (email){
        userFields.email = email;
    }
    if (organizationName){
        userFields.organizationName = organizationName;
    }
    if (employment_type){
        userFields.employment_type = employment_type
    }
    if (occupation){
        userFields.occupation = occupation
    }
    if (phoneNumber){
        userFields.phoneNumber = phoneNumber
    }
    if (role){
        userFields.role = role
    }
    if (hashed_password){
        //Encrypting Password
        const salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(hashed_password, salt);
        userFields.hashed_password = newPassword;
    }
    
    
    userFields.updated = Date.now();
    
    try {
        let user = await User.findById(req.params.id);
        if(req.user.role == "Admin" && req.user.id == req.params.id){
            userFields.role = "Admin"
        }

        if(!user || (req.user.organizationNumber !== user.organizationNumber)){
            return res.status(404).json({msg: " User not found"})
        }

        if(((req.user.role !== "Admin") && (req.user.id !== req.params.id))){
            return res.status(401).json({msg: "Not Authorized"})
        }

        contact = await User.findByIdAndUpdate(
            req.params.id,
            { $set: userFields },
            { new: true }
          );
        
        // Password Sanitization
        // user = await User.findById(req.params.id);
        user.hashed_password = undefined;

        res.json({user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
        
    }
});

// @route DELETE api/users/:id
// @desc DELETE registered user
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if(!user || (req.user.organizationNumber !== user.organizationNumber)){
            return res.status(404).json({msg: "User not found"})
        }

        if(((req.user.role !== "Admin"))){
            return res.status(401).json({msg: "Not Authorized"})
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({msg: "User deleted"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;