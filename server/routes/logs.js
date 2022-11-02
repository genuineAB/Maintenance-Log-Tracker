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
        return res.status(500).send("Server Error");
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
    
        const {message, attention, addedBy, logDescription} = req.body;
        let {technician} = req.body;

        
        const {organizationNumber, firstName, lastName} = req.user;

        try {
            let log = await Logs.findOne({message});
            let orgNum = await Logs.findOne({organizationNumber});

            if(log && orgNum){
                return res.status(400).json({msg: "Log Already Exist"});
            }
            
            let user = await Users.findOne({organizationNumber: organizationNumber, role: 'Admin'}).select('email firstName lastName');
            
            
            if(!technician || technician.trim().length === 0){
                technician = 'None';
            }
            else{
                
                technician = technician.split(' ');
                let tech = Users.findOne({email: technician[2], organizationNumber});

                if(!tech){
                    return res.status(400).json({msg: "Invalid Technician Selection"});
                }
            }

            log = new Logs ({
                message,
                attention,
                technician: `${(technician === 'None') ? 'None' : technician[0] + ' ' + technician[1]}`,
                addedBy,
                logDescription,
                organizationNumber: req.user.organizationNumber
            })

            await log.save();

            
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
                to: `${(technician !== 'None') ? `${technician[2]}` : `${user.email}`}`,
                cc: `${(technician !== 'None') ? `${user.email}` : ''}`,
                subject: `${!attention ? '' : 'Very Urgent: '} New Task Assignment`,
                html: `<p>
                <b>Hi ${(technician !== 'None') ? `${technician[0]} ${technician[1]}` : `${user.firstName} ${user.lastName}` }, </b>
                </p>
                <br>
                <br>
                <p>
                ${firstName} ${lastName} wants you to attend to the task below: 
                </p>
                <p> 
                <a href=${process.env.frontendBaseURL}> ${message} </a>
                </p>
                <br>
                <br>
            
                <p>
                Maintenance Logger Team
                </p>
                `
            }

            //Step 3
            transporter.sendMail(mailOptions);
           

            return res.json({msg: "Log Added"});
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Server Error");
        }
});

// @route PATCH api/logs
// @desc Update Maintenance Log
//@access Private
router.patch('/:id', auth, async (req, res) => {
    const {message, attention, updatedBy, completed, logDescription } = req.body;
    let {technician} = req.body
    const {organizationNumber, firstName, lastName} = req.user;


    //Create Contact Field Object
    let tech;
    const logFields = {};
    if (message){
        logFields.message = message;
    }
    if (attention){
        logFields.attention = attention;
    }
    if (technician){
        if((technician === null) || (technician.trim().length === 0) || technician==='None'){
            technician = 'None'
        }
        else{
            
            technician = technician.split(' ');
            tech = await Users.findOne({firstName: technician[0], organizationNumber: organizationNumber}).select('email');

            if(!tech){
                return res.status(400).json({msg: "Invalid Technician Selection"});
            }
        };
        logFields.technician = `${(technician === 'None') ? 'None' : technician[0] + ' ' + technician[1]}`;
    }
    if(updatedBy){
        logFields.updatedBy = updatedBy;
    }

    if(!logFields.attention){
        logFields.attention = false
    }
    if(logDescription){
        logFields.logDescription = logDescription;
    }
    if(completed){
        logFields.completed = completed;
    }
    if(!logFields.completed){
        logFields.completed = false;
    }
    logFields.updated = Date.now();
   
    try {
        let log = await Logs.findById(req.params.id);

        let user = await Users.findOne({organizationNumber: organizationNumber, role: 'Admin'}).select('email firstName lastName');

        

        if(!user){
            return res.status(400).send("User Not Found");
        }

        if((!log) || (log.organizationNumber !== req.user.organizationNumber)){
            return res.status(404).json({msg: "Log not found"})
        }
        
        log = await Logs.findByIdAndUpdate(
            req.params.id,
            { $set: logFields },
            { new: true }
          );

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
            let mailOptions;
            if(completed === true){
                mailOptions = {
                    from: process.env.EMAIL,
                    to: `${user.email}`,
                    subject: 'Task Marked As Completed',
                    html: `<p>
                    <b>Hi ${user.firstName} ${user.lastName}, </b>
                    </p>
                    <br>
                    <br>
                    <p>
                    ${firstName} ${lastName} has marked the task below as completed: 
                    </p>
                    <p> 
                    <a href=${process.env.frontendBaseURL}> ${message} </a>
                    </p>
                    <br>
                
                    <p>
                    Maintenance Logger Team
                    </p>
                    `
                }
            }
            else{
                mailOptions = {
                    from: process.env.EMAIL,
                    to: `${(technician !== 'None') ? `${tech.email}` : `${user.email}`}`,
                    cc: `${(technician !== 'None') ? `${user.email}` : ''}`,
                    subject: `${!attention ? '' : 'Very Urgent: '} Updated Task Assignment`,
                    html: `<p>
                    <b>Hi ${(technician !== 'None') ? `${technician[0]} ${technician[1]}` : `${user.firstName} ${user.lastName}` }, </b>
                    </p>
                    <br>
                    <br>
                    <p>
                    ${firstName} ${lastName} wants you to attend to the task below: 
                    </p>
                    <p> 
                    <a href=${process.env.frontendBaseURL}> ${message} </a>
                    </p>
                    <br>
                
                    <p>
                    Maintenance Logger Team
                    </p>
                    `
                }
            }
            

            //Step 3
            transporter.sendMail(mailOptions);
        
        res.json(log);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server Error");
        
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
        return res.status(500).send("Server Error");
    }
});

module.exports = router;