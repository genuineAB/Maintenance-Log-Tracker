// Create an instance of a server
const express = require('express');
const connectDB = require('../config/db');
require('dotenv').config()
// const path = require('path');
const app = express();

//Connect DB
connectDB();

app.get('/', (req, res) => res.json({msg: "We are Here"}));

//Initialize Middleware
app.use(express.json({extended:false}));
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))

//setting view engine to ejs
app.set("view engine", "ejs");


const port = process.env.PORT || 5000;

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/subUsers', require('./routes/techs'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/forgotpassword', require('./routes/forgotPassword'));
app.use('/api/verify', require('./routes/verify'));
app.use('/api/resetpassword', require('./routes/resetPassword'));

app.listen(port, () => console.log(`Server Started at ${port}`));