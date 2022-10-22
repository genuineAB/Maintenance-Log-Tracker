const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({

    organizationNumber: {
        type: Number,
        required: true
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
        default: 'None'
    },

    addedBy: {
        type: String,
        required: true
    },

    updatedBy: {
        type: String,
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