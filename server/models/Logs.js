const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
    // organizationNumber:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },

    organizationNumber: {
        type: Number,
        required: true
    },
    
    // tech:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Tech'
    // },

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
        // required: [true, 'Please select a technician'],
        default: 'None'
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