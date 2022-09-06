// Create an instance of a server
const express = require('express');
const connectDB = require('../config/db');
// const path = require('path');
const app = express();

//Connect DB
connectDB();

app.get('/', (req, res) => res.json({msg: "We are Here"}));

//Initialize Middleware
app.use(express.json({extended:false}))


const port = process.env.PORT || 5000;

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));
app.use('/api/authuser', require('./routes/authuser'));
app.use('/api/authtech', require('./routes/authtech'));

app.listen(port, () => console.log(`Server Started at ${port}`));