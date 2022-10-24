const mongoose = require('mongoose');
const config = require('config');
require('dotenv').config();

const db = process.env.mongoURI;

const connectDB = async () => {
    try {
        mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        })

        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;