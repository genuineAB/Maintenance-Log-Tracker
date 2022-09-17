const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');



const User = require('../models/User');

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    };

// @route POST api/users
// @desc Register a user
//@access Public
router.post('/', 
    // email validation
    body('email', 'Please include a valid email').isEmail(),
    //username must not be empty
    body('name', 'Please add Name').not().isEmpty(),
    body('organizationName', 'Please add organization Name').not().isEmpty(),
    // password must be at least 6 chars long
    body('hashed_password', 'Password must be a minimum of 6 characters').isLength({ min: 6 }), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        } 
        
        const {name, email, hashed_password, organizationName} = req.body;


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
                name,
                email,
                hashed_password,
                organizationName,
                organizationNumber: orgNumber,
                
            });
            // 
            const salt = await bcrypt.genSalt(10);
            user.hashed_password = await bcrypt.hash(hashed_password, salt);

            
            await user.save();

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
        //     res.status(403).json({msg: "Permission Denied"})
        // }
        console.log(req.user.organizationNumber)
        let users = await User.find({organizationNumber: req.user.organizationNumber}).select('-hashed_password').sort({date: -1});
        res.json({users});
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
        
        if(((req.user.role !== "Admin") || (req.user.id !== req.params.id)) ){
            return res.status(403).json({msg: "Permission Denied"})
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
    const {name, email, hashed_password, organizationName} = req.body;

    
    
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
    if (hashed_password){
        //Encrypting Password
        const salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(hashed_password, salt);
        userFields.hashed_password = newPassword;
    }

    
    
    userFields.updated = Date.now();

    try {
        let user = await User.findById(req.params.id);
        

        if(!user || (req.user.organizationNumber !== user.organizationNumber)){
            return res.status(404).json({msg: " User not found"})
        }

        if(((req.user.role !== "Admin") || (req.user.id !== req.params.id))){
            return res.status(403).json({msg: "Permission Denied"})
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
            return res.status(403).json({msg: "Permission Denied"})
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({msg: "User deleted"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;