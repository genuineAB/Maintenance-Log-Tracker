const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {body, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../models/User');
const Tech = require('../models/Verify');

// @route GET api/tech
// @desc Get All technician
//@access Private
router.get('/', auth, async(req, res) => {
    try {
        let techs = await Tech.find({tech: req.user.id}).select('firstName lastName email occupation employment_type role');
        res.json({techs});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

// @route POST api/tech
// @desc Add Technician
//@access Private
router.post('/', auth,
    // email validation
    body('email', 'Please include a valid email').isEmail(),
    //User Name must not be empty
    body('firstName', 'Please add  First Name').not().isEmpty(),
    body('lastName', 'Please add  Last Name').not().isEmpty(),
    body('role', 'Please add user role').not().isEmpty(),
    // password must be at least 6 chars long
    body('hashed_password', 'Password must be a minimum of 6 characters').isLength({ min: 8 }),
    //Phone Number must not be empty
    body('phoneNumber', 'Please add a phone number').not().isEmpty(),
    async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        if(req.user.role !== "Admin"){
            res.status(401).json({msg: "Not Authorized"})
        }


        const {firstName, lastName, hashed_password, phoneNumber, email, occupation, employment_type, role} = req.body;
        
        console.log(role);
        // let userRole = role
        // if(userRole !== 'Technician'){
        //     userRole = 'Guest';
        // } ;

        try {
            let userEmail = await User.findOne({email});
            let userFirstName = await User.findOne({firstName});
            let userLastName = await User.findOne({lastName});
            let userNumber = await User.findOne({phoneNumber})
            

            if((userEmail) || (userNumber) || (userFirstName && userLastName)){
                return res.status(400).json({msg: "User Already Exist"});
            }

            let user = new User ({
                firstName,
                lastName,
                email,
                role,
                hashed_password,
                phoneNumber,
                occupation,
                employment_type,
                user: req.user.id,
                organizationName: req.user.organizationName,
                organizationNumber: req.user.organizationNumber
            })

            //Encrypting Password
            const salt = await bcrypt.genSalt(10);
            user.hashed_password = await bcrypt.hash(hashed_password, salt);

            await user.save();

            const payload ={
                user: {
                    organizationNumber: req.user.organizationNumber,
                    id: user.id,
                    role: user.role
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
// @route GET api/tech/:id
// @desc Get Single User
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        let tech = await Tech.findById(req.params.id).select('firstName lastName email occupation employment_type role');

        if(!tech){
            return res.status(400).send("Technician does not exist");
        }
        res.json({tech});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @route PATCH api/tech/:id
// @desc Update Technician Details
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

// @route DELETE api/tech/:id
// @desc Delete Technician
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