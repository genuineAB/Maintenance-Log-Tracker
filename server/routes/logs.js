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
        let logs = await Logs.find({logs: req.user.id}).sort({date: -1});
        res.json({logs})
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

            log = new Logs ({
                message,
                attention,
                technician,
                user: req.user.id
            })

            await log.save();
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
});

// @route PATCH api/logs
// @desc Update Maintenance Log
//@access Private
router.patch('/:id', (req, res) => {
    res.json({msg: 'Update Maintenance Logs'});
});

// @route DELETE api/logs
// @desc Delete Maintenance Log
//@access Private
router.delete('/:id', (req, res) => {
    res.json({msg: 'Delete Maintenance Logs'});
});

module.exports = router;