const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
require('dotenv').config();
const nodemailer = require('nodemailer');

const Users = require('../models/User');
const Tech = require('../models/Verify');
const Logs = require('../models/Logs');

// @route GET api/logs
// @desc Get Saved Maintenance Logs
//@access Private
router.get('/', auth, async (req, res) => {
    try{
        let logs = await Logs.find({organizationNumber: req.user.organizationNumber}).sort({date: -1});
        res.json(logs)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route POST api/logs
// @desc Add to Maintenance Logs
//@access Private
router.post('/', auth,
    //Log Message must not be empty
    body('message', 'Please add Log Message').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
    
        const {message, attention, addedBy} = req.body;
        let {technician} = req.body
        const {organizationNumber} = req.user
        try {
            let log = await Logs.findOne({message});
            let orgNum = await Logs.findOne({organizationNumber});

            if(log && orgNum){
                return res.status(400).json({msg: "Log Already Exist"});
            }
            
            let user = Users.find({organizationNumber: organizationNumber, role: 'Admin'});
            if(user){
                console.log(" User exist")
            }
            
            if((technician === null) || (technician.trim().length === 0)){
                technician = 'None'
            }
            log = new Logs ({
                message,
                attention,
                technician,
                addedBy,
                organizationNumber: req.user.organizationNumber
            })

            await log.save();

            // // // Send Email
            // // step 1
            // let transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: process.env.EMAIL,
            //         pass: process.env.PASSWORD
            //     }
            // });

            // //Step 2
            // let mailOptions = {
            //     from: process.env.EMAIL,
            //     to: email,
            //     subject: 'Reset Your Maintenance Logger Password',
            //     html: `<p>
            //     Someone (hopefully you) has requested a password reset for your Maintenance Logs account. Follow the link below to set a new password: 
            //     </p>
            //     <br>
            //     <a href=${link}> Reset Password </a>
            //     <br>
            //     <p>
            //     If you don't wish to reset your password, disregard this email and no action will be taken.
            //     </p>
            //     <br>
                
            //     <p>
            //     Maintenance Logger Team
            //     </p>
            //     `
            // }

            // //Step 3
            // transporter.sendMail(mailOptions);

            return res.json({msg: "Log Added"});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
});

// @route PATCH api/logs
// @desc Update Maintenance Log
//@access Private
router.patch('/:id', auth, async (req, res) => {
    const {message, attention, technician, updatedBy } = req.body;

    //Create Contact Field Object
    const logFields = {};
    if (message){
        logFields.message = message;
    }
    if (attention){
        logFields.attention = attention;
    }
    if (technician){
        logFields.technician = technician;
    }
    if(updatedBy){
        logFields.updatedBy = updatedBy;
    }

    if(!logFields.attention){
        logFields.attention = false
    }
    logFields.updated = Date.now();
   
    try {
        let log = await Logs.findById(req.params.id);

        if((!log) || (log.organizationNumber !== req.user.organizationNumber)){
            return res.status(404).json({msg: "Log not found"})
        }


        log = await Logs.findByIdAndUpdate(
            req.params.id,
            { $set: logFields },
            { new: true }
          );

        res.json(log);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
        
    };
});

// @route DELETE api/logs
// @desc Delete Maintenance Log
//@access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let log = await Logs.findById(req.params.id);

        if(!log || (log.organizationNumber !== req.user.organizationNumber)){
            return res.status(404).json({msg: "Log not found"})
        }

        // Make sure user owns log
        if (req.user.role !== 'Admin') {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Logs.findByIdAndDelete(req.params.id);

        res.json({msg: "Log deleted"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;