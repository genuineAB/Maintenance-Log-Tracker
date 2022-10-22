const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First Name is Required']
    },

    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name is Required']
    },

    email: {
        type: String,
        required: [true, 'Email is Required'], 
        lowercase: true,
        trim: true,
        unique: true,
        // validate: [validateEmail, 'Please Enter a Valid Email Address'],
        match: [/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i , 'Please Enter a Valid Email Address']
    },

    hashed_password: {
        type: String,
        required: [true, 'Password is Required']
    },

    employment_type: {
        type: String
        // required: [true, 'Employment Type is Required']
    },

    occupation: {
        type: String
        // required: [true, 'Occupation is Required']
    },

    phoneNumber: {
        type: String,
        required: [true, 'Phone Number is Required']
        // validate: [validatePhoneNumber, 'Please Enter a Valid Phone Number'],
        // match: [/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i , 'Please Enter a Valid Phone Number']
    },

    organizationNumber: {
        type: Number,
        required: [true, 'Ogranization Number is required'],
        // unique: true
    },

    organizationName: {
        type: String,
        required: [true, 'Organization Name is required'],
        // unique: true
    },

    role: {
        type: String,
        default: "Admin"
    },

    verified: {
        type: Boolean,
        default: false
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


//Handling the Password String as a virtual field
/* 
In Mongoose, the virtual is the property that is not stored in the database, they only exist logically, and you cannot query directly on the basis of this property
*/
// UserSchema
//     .virtual('password')
//     .set(function(password) {
//         this._password = password;
//         this.salt = this.makeSalt();
//         this.hashed_password = this.encryptPassword(password);
//     })
//     .get(function () {
//         return this._password;
//     })


// //Encryption and Authentication
// UserSchema.methods = {
//     authenticate: function(plainText){
//         return this.encryptPassword(plainText) === this.hashed_password
//     },
//     encryptPassword: function(password){
//         if (!password){
//             console.error(error.msg);
//             res.status(500).send('Server Error');
//         }

//         try {
//             return crypto
//                 .createHmac('sha1', this.salt)
//                 .update(password)
//                 .digest('hex')
//         } catch (error) {
//             console.error(error.msg);
//             res.status(500).send('Server Error');
//         }
//     },

//     makeSalt: function() {
//         return Math.round((new Date().valueOf() * Math.random)) + ''
//     }
// }


// //Password Field Validation
// const decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

// UserSchema.path('hashed_password').validate(function(v) {
//     if(this._password && !this._password.match(decimal)){
//         this.invalidate('password', 'Password must be 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character');
//     }
//     if(this.isNew && !this._password){
//         this.invalidate('password', 'Password is required');
//     }
// }, null)



module.exports = mongoose.model('user', UserSchema)
