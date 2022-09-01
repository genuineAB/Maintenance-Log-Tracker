const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { body, validationResult } = require('express-validator');



const User = require('../models/User');

// @route POST api/users
// @desc Register a user
//@access Public
router.post('/', 
    // email validation
    body('email', 'Please include a valid email').isEmail(),
    //username must not be empty
    body('name', 'Please add Name').not().isEmpty(),
    // password must be at least 6 chars long
    body('hashed_password', 'Password must be a minimum of 6 characters').isLength({ min: 6 }), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        } 
        
        const {name, email, hashed_password} = req.body;

        try {
            let user = await User.findOne({email});

            if(user){
                return res.status(400).json({msg: "User already exist"});

            }

            user = new User ({
                name,
                email,
                hashed_password
            });
            // 
            const salt = await bcrypt.genSalt(10);
            user.hashed_password = await bcrypt.hash(hashed_password, salt);

            
            await user.save();

            const payload ={
                user: {
                    id: user.id
                }
            }
            
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 36000
            }, (err, token) => {
                if(err) throw err;
                res.json({ token });
            })

        } catch (error) {
            console.error(error.msg);
            res.status(500).send('Server Error');
        }
});


// @route GET api/users
// @desc Get all registered users
// @access Private
router.get('/', async (req, res) => {
    try {
        let users = await User.find().select('name email created updated').sort({date: -1});
        res.json({users});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

// @route UPDATE api/users/:id
// @desc UPDATE registered user
// @access Private
router.patch('/:id', async (req, res) => {
    const {name, email, hashed_password} = req.body;

    //Encrypting Password
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(hashed_password, salt);
    
    //Create Contact Field Object
    const userFields = {};
    if (name){
        userFields.name = name;
    }
    if (email){
        userFields.email = email;
    }
    if (hashed_password){
        userFields.hashed_password = newPassword;
    }
    userFields.updated = Date.now();

    try {
        let user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({msg: " User not found"})
        }

        contact = await User.findByIdAndUpdate(
            req.params.id,
            { $set: userFields },
            { new: true }
          );
        
        // Password Sanitization
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
router.delete('/:id', (req, res) => {
    res.json({msg: 'Delete a registered user'});
});

module.exports = router;