const mongoose = require('mongoose');
const { increment } = require('./Counter');
const configs = require('../ServerConfigs/ServerConfigs.json');
const { cartItem } = require('./CartObject');
const { addressSchema } = require('./Address');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User Id is required !"],
    },
    number: {
        type: Number,
        default: 0,
        index: true,
    },
    orders: {
        type: [{
            type: cartItem,
            required: [true, 'please enter cart items'],
        }],
        default: [],
    },
    address: {
        type: addressSchema,
        required: [true, 'please enter address'],
    },
    
    status: {
        type: String,
        enum: configs.orderStatus,
        default: "pending",
    },
    responsableAdmins: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "Admin",
            required: [true, "Please Enter AdminId"],
        }],
        default: [],
    },
    adminNotes: {
        type: String,
        default: null,
        trim: true,
    },
    refuseReason: {
        type: String,
        default: null,
        trim: true,
    },
}, { timestamps: true, });
schema.pre('save', function (next) {
    const doc = this;
    if (!doc.isNew) return next();
    increment('orders').then(function (count) {
        doc.number = count;
        next();
    });
})
module.exports = mongoose.model('Order', schema);