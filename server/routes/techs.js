const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {body, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../models/User');
const Tech = require('../models/Techs');
const { has } = require('config');
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
            let techEmail = await Tech.findOne({email});
            let techfirstName = await Tech.findOne({firstName});
            let techlastName = await Tech.findOne({lastName});
            let techphoneNumber = await Tech.findOne({phoneNumber})

            if((techEmail) || (techphoneNumber) || (techfirstName && techlastName)){
                return res.status(400).json({msg: "Technician Already Exist"});
            }

            let tech = new Tech ({
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
router.patch('/:id', auth, async (req, res) => {
    const {firstName, lastName, hashed_password, phoneNumber, email, occupation, employment_type, role} = req.body;

    //Create Tech Fields
    const techField = {};

    if(firstName){
        techField.firstName = firstName
    }
    if(lastName){
        techField.lastName = lastName
    }
    if(hashed_password){
        //Encrypting Password
        const salt = await bcrypt.genSalt(10);
        let newPassword = await bcrypt.hash(hashed_password, salt);
        techField.hashed_password = newPassword
    }
    if(phoneNumber){
        techField.phoneNumber = phoneNumber
    }
    if(email){
        techField.email = email
    }
    if(occupation){
        techField.occupation = occupation
    }
    if(employment_type){
        techField.employment_type = employment_type
    }
    if(role){
        techField.role = role
    }
    techField.updated = Date.now();

    try {
        let tech = await Tech.findById(req.params.id);

        if(!tech){
            return res.status(400).send("Technician not found");
        }

        tech = await Tech.findByIdAndUpdate(
            req.params.id,
            {$set: techField},
            {new: true}
        )

        tech.hashed_password = undefined;
        res.json({tech});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

// @route DELETE api/tech
// @desc Delete Maintenance Log
//@access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let tech = await Tech.findById(req.params.id);

        if(!tech){
            return res.status(400).send("Technician not Found");
        }

        await Tech.findByIdAndDelete(req.params.id);

        res.json({msg: 'Technician Deleted'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;