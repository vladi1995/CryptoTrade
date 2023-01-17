const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/env');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [5, 'Username must be at least 5 characters long!'],
    },

    email: {
        type: String,
        required: true,
        minLength: [10, 'Email must be at least 10 characters long!'],
    },

    password: {
        type: String,
        required: true,
        minLength: [4, 'Password must be at least 4 characters long!'],
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
    .then(hashedPassword => {
        this.password = hashedPassword;
        next();
    });
});

const User = mongoose.model('User', userSchema);
module.exports = User;