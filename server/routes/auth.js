const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { body, validationResult } = require('express-validator');



const User = require('../models/User');

// @route GET api/auth
// @desc Get Logged in User
//@access Private
router.get('/',
    // email validation
    body('email', 'Please include a valid email').isEmail(),
    // must include password 
    body('hashed_password', 'Please Enter a Password').exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        } 
        const {email, password} = req.body;
        
        try {
            let user = await User.findOne({email});

            if(!user){
                return res.status(400).json({msg: "Invalid Credentials"});
            }

            user = new User({
                email,
                password
            });

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).res.json({msg: 'Invalid Credentials'});
            }

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
            });

        } catch (error) {
            console.error(error.msg);
            res.status(500).send('Server Error');
        }
});

// @route POST api/auth
// @desc Authenticate && Log in User
//@access Public
router.post('/', 
    // email validation
    body('email', 'Please include a valid email').isEmail(),
    // must include password
    body('hashed_password', 'Please Enter a Password').exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        } 
        const {email, hashed_password} = req.body;
        
        try {
            let user = await User.findOne({email});

            if(!user){
                return res.status(400).json({msg: "Invalid User, Register User"});
            }

            const isMatch = await bcrypt.compare(hashed_password, user.hashed_password);
            
            if(!isMatch){
                return res.status(400).res.json({msg: 'Invalid Credentials'});
            }
            
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
            });

        } catch (error) {
            console.error(error.msg);
            res.status(500).send('Server Error');
        }
});

module.exports = router;