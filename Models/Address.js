const mongoose = require('mongoose');
exports.addressSchema = new mongoose.Schema({
    address: {
        type: String,
        default: '',
        maxLength: 200,
        trim: true,
    },
    city: {
        type: String,
        default: '',
        maxLength: 100,
        trim: true,
    },
    street: {
        type: String,
        default: '',
        maxLength: 100,
        trim: true,
    },
})