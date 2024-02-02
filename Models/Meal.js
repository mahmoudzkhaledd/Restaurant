const mongoose = require('mongoose');
const { increment } = require('./Counter');
const { schemaPrice } = require('./PriceSchema');

const schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
        requried: [true, "Admin id is required"],
    },
    name: {
        type: String,
        requried: [true, "name is required"],
    },
    subDescription: {
        type: String,
        requried: [true, "Sub description is required"],
    },
    description: {
        type: String,
        requried: [true, "description is required"],
    },
    categories: [{
        type: mongoose.Schema.ObjectId,
        ref: "Category",
    }],
    ingredients: [String],
    imagesUrl: [{
        type: String,
        ref: "Image",
    }],
    thumbnailUrl: {
        type: mongoose.Schema.ObjectId,
        ref: "Image",
    },
    available: {
        type: Boolean,
        default: false,
    },
    smallSize: {
        type: schemaPrice,
        requried: [true, 'please enter small price'],
    },
    mediumSize: {
        type: schemaPrice,
        requried: [true, 'please enter medium price'],
    },
    largeSize: {
        type: schemaPrice,
        requried: [true, 'please enter large price'],
    },
    showFront: {
        type: String,
        default: "smallSize",
        enum: ['smallSize', 'mediumSize', 'largeSize'],
    }
}, { timestamps: true, });
schema.pre('save', function (next) {
    const doc = this;
    if (!doc.isNew) return next();
    increment('meals').then(function (count) {
        doc.number = count;
        next();
    });
})
module.exports = mongoose.model('Meal', schema); 