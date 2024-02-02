const mongoose = require('mongoose');
exports.schemaPrice = new mongoose.Schema({
    active: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: 0,
    },
    afterDiscount: {
        type: Number,
        default: 0,
    },
})