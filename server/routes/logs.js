const express = require('express');
const router = express.Router();

// @route GET api/logs
// @desc Get Saved Maintenance Logs
//@access Private
router.get('/', (req, res) => {
    res.json({msg: 'Get Maintenance Log'});
});

// @route POST api/logs
// @desc Add to Maintenance Logs
//@access Private
router.post('/', (req, res) => {
    res.json({msg: 'Add Maintenance Logs'});
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