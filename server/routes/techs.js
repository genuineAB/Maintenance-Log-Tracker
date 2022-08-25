const express = require('express');
const router = express.Router();

// @route GET api/tech
// @desc Get Saved Maintenance tech
//@access Private
router.get('/', (req, res) => {
    res.json({msg: 'Get Maintenance Log'});
});

// @route POST api/tech
// @desc Add to Maintenance tech
//@access Private
router.post('/', (req, res) => {
    res.json({msg: 'Add Maintenance tech'});
});

// @route PATCH api/tech
// @desc Update Maintenance Log
//@access Private
router.patch('/:id', (req, res) => {
    res.json({msg: 'Update Maintenance tech'});
});

// @route DELETE api/tech
// @desc Delete Maintenance Log
//@access Private
router.delete('/:id', (req, res) => {
    res.json({msg: 'Delete Maintenance tech'});
});

module.exports = router;