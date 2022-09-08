const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    tech:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tech'
    },

    message: {
        type: String,
        required: [true, 'Name is Required']
    },

    attention: {
        type: Boolean,
        required: [true, 'Attention type is Required']
    },

    technician: {
        type: String,
        required: [true, 'Please select a technician']
    },

    created: {
        type: Date,
        default: Date.now
    },

    updated : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('log', LogSchema);