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
router.get('/', (req, res) => {
    res.json({msg: 'Get Registered Users'});
});

// @route UPDATE api/users/:id
// @desc UPDATE registered user
// @access Private
router.patch('/:id', (req, res) => {
    res.json({msg: 'Update a registered user'});
});

// @route DELETE api/users/:id
// @desc DELETE registered user
// @access Private
router.delete('/:id', (req, res) => {
    res.json({msg: 'Delete a registered user'});
});

module.exports = router;