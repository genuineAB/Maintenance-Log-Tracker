const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc Get Logged in User
//@access Private
router.get('/', (req, res) => {
    res.json({msg: 'Get Logged in User'});
});

// @route POST api/auth
// @desc Authenticate && Log in User
//@access Public
router.post('/', (req, res) => {
    res.json({msg: 'Log in User'});
});

module.exports = router;