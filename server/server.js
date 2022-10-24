// Create an instance of a server
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const path = require('path');
const app = express();

//Connect DB
connectDB();



//Initialize Middleware
app.use(express.json({extended:false}));
app.use(express.urlencoded({extended:false}));
app.use(express.static('server'));

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

//Serve static assets in production

__dirname = path.resolve()
console.log(express.static('/client/build'));
if(process.env.NODE_ENV === 'production'){
    //
    app.use(express.static('/client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

app.listen(port, () => console.log(`Server Started at ${port}`));