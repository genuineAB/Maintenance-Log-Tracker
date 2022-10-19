const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
require('dotenv').config();
const nodemailer = require('nodemailer');




const User = require('../models/User');
const Verify = require('../models/Verify');

router.get('/:id/:token', async (req, res) => {
    const {id, token} = req.params;
        const user = await User.findOne({
            id
        });

        if(!user){
            return res.status(400).send("Invalid User Id");
        }

        const secret = config.get('jwtSecret') + user.hashed_password;


    try {
        const payload = jwt.verify(token, secret);
        
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
    

});


router.post('/:id/:token', async (req, res) => {
    const {id, token} = req.params;
    let {password} = req.body;

        const user = await User.findOne({
            id
        });

        if(!user){
            return res.status(400).send("Invalid User Id");
        }

        const secret = config.get('jwtSecret') + user.hashed_password;
        

    try {
        const payload = jwt.verify(token, secret);
        console.log(user.hashed_password);

         // Encrypt Password
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            console.log(password)

        await User.updateOne({_id: id}, {hashed_password: password});

        console.log(user.hashed_password)

        return res.status(200).send("Password Reset Successfully")
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
    

})
module.exports = router;