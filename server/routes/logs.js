const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const Users = require('../models/User');
const Tech = require('../models/Techs');
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
    //Technician Must not be empty
    body('technician', 'Please add Technician to Log').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
    
        const {message, attention, technician} = req.body;

        try {
            let log = await Logs.findOne({message});

            if(log){
                return res.status(400).json({msg: "Log Already Exist"});
            }
            console.log(req.user.organizationNumber)
            log = new Logs ({
                message,
                attention,
                technician,
                organizationNumber: req.user.organizationNumber
            })

            await log.save();

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
    const {message, attention, technician } = req.body;

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
   
    try {
        let log = await Logs.findById(req.params.id);

        if((!log) || (log.organizationNumber.toString() !== req.user.organizationNumber)){
            return res.status(404).json({msg: "Log not found"})
        }


        log = await Logs.findByIdAndUpdate(
            req.params.id,
            { $set: logFields },
            { new: true }
          );

        res.json({log});
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

        if(!log || (log.organizationNumber.toString() !== req.user.organizationNumber)){
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