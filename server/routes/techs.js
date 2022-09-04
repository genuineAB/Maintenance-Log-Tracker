const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {body, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../models/User');
const Tech = require('../models/Techs');
// @route GET api/tech
// @desc Get Saved Maintenance tech
//@access Private
router.get('/', auth, async(req, res) => {
    try {
        let techs = await Tech.find({user: req.user.id}).select('firstName lastName email occupation employment_type role');
        res.json({techs});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

// @route POST api/tech
// @desc Add to Maintenance tech
//@access Private
router.post('/', auth,
    // email validation
    body('email', 'Please include a valid email').isEmail(),
    //username must not be empty
    body('firstName', 'Please add first Name').not().isEmpty(),
    body('lastName', 'Please add last Name').not().isEmpty(),
    // password must be at least 6 chars long
    body('hashed_password', 'Password must be a minimum of 6 characters').isLength({ min: 6 }),
    //Phone Number must not be empty
    body('phoneNumber', 'Please add a phone number').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const {firstName, lastName, hashed_password, phoneNumber, email, occupation, employment_type, role} = req.body;

        
        try {
            let tech = await Tech.findOne({email});

            if(tech){
                return res.status(400).json({msg: "Technician Already Exist"});
            }

            tech = new Tech ({
                firstName,
                lastName,
                email,
                role,
                hashed_password,
                phoneNumber,
                occupation,
                employment_type,
                user: req.user.id
            })

            //Encrypting Password
            const salt = await bcrypt.genSalt(10);
            tech.hashed_password = await bcrypt.hash(hashed_password, salt);

            await tech.save();

            const payload ={
                tech: {
                    id: tech.id
                }
            }
            
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 36000
            }, (err, token) => {
                if(err) throw err;
                res.json({ token });
            })

            
            // res.json({tech});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
});

// @route PATCH api/tech
// @desc Update Maintenance Log
//@access Private
router.patch('/:id', (req, res) => {
    res.json({msg: 'Update Maintenance tech'});
});

// @route DELETE api/tech
// @desc Delete Maintenance Log
//@access Private
router.delete('/:id', (req, res) => {
    res.json({msg: 'Delete Maintenance tech'});
});

module.exports = router;