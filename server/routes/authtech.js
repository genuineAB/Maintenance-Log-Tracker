const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');


// const Tech = require('../models/Token');

// @route GET api/authtech
// @desc Get Logged in Technician
//@access Private
router.get('/', auth, async (req, res) => {
        console.log(req.user)
        
        try {
            let tech = await Tech.findById(req.user.id).select('-hashed_password');

            res.json({tech});

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
});

// @route POST api/auth
// @desc Authenticate && Log in Technician
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
            let tech = await Tech.findOne({email});

            if(!tech){
                return res.status(400).json({msg: "User Not Found"});
            }

            const isMatch = await bcrypt.compare(hashed_password, tech.hashed_password);
            
            if(!isMatch){
                return res.status(400).json({msg: "Email and password don't match"});
            }
            
            const payload ={
                user: {
                    user: tech.user,
                    id: tech.id,
                    role: tech.role,
                    organizationNumber: 2
                }
            }

            jwt.sign(payload, process.env.jwtSecret, {
                expiresIn: 36000
            }, (err, token) => {
                if(err) throw err;
                res.json({ token });
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
});

module.exports = router;