
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: [true, 'Username is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    }, 

    date_registered: {
        type: Date,
        default: Date.now
    },

    active: {
        type: Boolean,
        default: false
    }

});


module.exports = mongoose.model('User', userSchema);