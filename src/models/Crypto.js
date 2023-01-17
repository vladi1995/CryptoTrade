const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'The name should be at least two characters long!'],
    },

    image: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: [0.1, 'The price should be a positive number'],
    },

    cryptoDescription: {
        type: String,
        required: true,
        minLength: [10, 'The description should be at least 10 characters long!'],
    },

    paymentMethod: {
        type: String,
        required: true,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
    },

    buyACrypto: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

cryptoSchema.path('image').validate(function () {
    const matcher = this.get('image').match(/http[s]*[:][\/][\/]/g);
    return this.get('image').startsWith(matcher);
}, 'Image url should start with http/https!');

const Crypto = mongoose.model('Housing', cryptoSchema);
module.exports = Crypto;