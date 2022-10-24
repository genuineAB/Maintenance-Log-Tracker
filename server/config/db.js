const mongoose = require('mongoose');
const config = require('config');

const db = "mongodb+srv://abLogs123:abLogs123@maintenancelogkeeper.5tybs4o.mongodb.net/?retryWrites=true&w=majority";

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