const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { increment } = require('./Counter');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "First Name is required!"],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required!"]
    },
    number: {
        type: Number,
        default: 0,
    },
    username: {
        type: String,
        index: true,
        trim: true,
        required: [true, "Email is required!"]
    },
    suspended: {
        type: Boolean,
        default: false,
    },
    master: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        trim: true,
    },
    pinNumber: {
        type: String,
        required: [true, "Pin number is required!"],
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        required: [true, "Phone is required!"]
    },
    lastActive: {
        type: Date,
        default: null,
    },
    roles: {
        type: {

        },
        default: {},
    },
}, { timestamps: true, });

schema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        this.password = await bcrypt.hash(this.password, await bcrypt.genSalt());
    }
    if (user.isModified('pinNumber')) {
        this.pinNumber = await bcrypt.hash(this.pinNumber, await bcrypt.genSalt());
    }

    if (user.isNew) {
        const count = await increment('admins');
        user.number = count;
    }
    next();
});




module.exports = mongoose.model('Admin', schema);   