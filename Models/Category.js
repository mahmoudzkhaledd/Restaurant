const mongoose = require('mongoose');
const { increment } = require('./Counter');
const configs = require('../ServerConfigs/ServerConfigs.json');

const schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
        required: [true, "Admin Id is required !"],
    },
    number: {
        type: Number,
        default: 0,
        index: true,
    },
    name: {
        type: String,
        required: [true, "Category name is required"],
    },
    description: {
        type: String,
        default: "",
    },
    image: {
        type: mongoose.Schema.ObjectId,
        ref: "Image",
        default: null,
    },
    meals: [{
        type: mongoose.Schema.ObjectId,
        ref: "Meal",
    }]
}, { timestamps: true, });
schema.pre('save', function (next) {
    const doc = this;
    if (!doc.isNew) return next();
    increment('categories').then(function (count) {
        doc.number = count;
        next();
    });
})
module.exports = mongoose.model('Category', schema);