const express = require('express');
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
    // password must be at least 5 chars long
    body('hashed_password', 'Password must be a minimum of 6 characters').isLength({ min: 6 }),(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        } 
        res.send('passed');
        // res.json({msg: 'Register a user'});
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