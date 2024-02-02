const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    companyConfigs: {
        
    },
    landingPageMeals: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "Meal",
        }],
        default: [],
    },
    landingPageCategories: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "Category",
        }],
        default: [],
    },
    available: {
        type: Boolean,
        default: true,
    },
    closedMessage: {
        type: String,
        default: "",
    },
}, { timestamps: true, });

module.exports = mongoose.model('Configs', schema);