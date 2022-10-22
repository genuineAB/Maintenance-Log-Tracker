const mongoose = require('mongoose');



const TokenSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true
    },

    token: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    expiresAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('token', TokenSchema)