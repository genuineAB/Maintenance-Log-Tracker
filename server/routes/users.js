const express = require('express');
const router = express.Router();

// @route POST api/users
// @desc Register a user
//@access Public
router.post('/', (req, res) => {
    res.json({msg: 'Register a user'});
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