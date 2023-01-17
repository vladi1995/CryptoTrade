const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/env');
const bcrypt = require('bcrypt');

exports.create = (user) => User.create(user);
exports.findOneUser = (user) => User.findOne(user);

exports.login = async (email, password) => {
    const foundUser = await User.findOne({email});

    if (!foundUser) {
        throw {
            message: 'Cannot find email or password!',
        }
    }

    const isValid = await bcrypt.compare(password, foundUser.password);

    if (!isValid) {
        throw {
            message: 'Cannot find email or password!',
        }
    }

    return foundUser;
}
exports.createToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
    }

    const options = {
        expiresIn: '2d',
    }

    const tokenPromise = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, options, (err, token) => {
            if (err) {
                return reject(err);
            }
            return resolve(token);
        });
    });

    return tokenPromise;
}